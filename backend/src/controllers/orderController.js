const db = require("../config/db");

exports.placeOrder = async (req, res) => {
  const { userId, foods, total, paymentMethod } = req.body;

  if (!userId || !foods || foods.length === 0) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    // 1️⃣ Insert order
    const orderResult = await db.query(
      `INSERT INTO orders(user_id, total_amount, payment_method)
       VALUES($1,$2,$3) RETURNING id`,
      [userId, total, paymentMethod]
    );

    const orderId = orderResult.rows[0].id;

    // 2️⃣ Insert order items
    for (const food of foods) {
      await db.query(
        `INSERT INTO order_items(order_id, food_item_id, food_name, price)
         VALUES($1,$2,$3,$4)`,
        [orderId, food.id, food.name, food.price]
      );
    }

    res.status(201).json({ orderId });
  } catch (err) {
    console.error("ORDER SAVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await db.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );

    for (const order of orders.rows) {
      const items = await db.query(
        "SELECT food_name, price FROM order_items WHERE order_id=$1",
        [order.id]
      );
      order.items = items.rows;
    }

    res.json(orders.rows);
  } catch (err) {
    console.error("FETCH ORDERS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
