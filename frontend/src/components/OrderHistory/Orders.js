import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "../Carousel/Carousel";
import "./Orders.css";

function Orders({ onBack }) {
  const [orders, setOrders] = useState([]);

  const carouselImages = [
    "/4.png",
    "/5.png",
    "/6.png",
    "/7.png",
    "/8.png",
    "/9.png",
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div className="orders-container">
      <Carousel images={carouselImages} />
      <h2>My Orders</h2>

      {orders.length === 0 && (
        <div className="empty-orders">
          <p>No orders yet</p>
        </div>
      )}

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order #{order.id}</span>
              <span className="order-amount">₹{order.total_amount}</span>
            </div>
            
            <div className="order-payment">
              <i className="fas fa-credit-card"></i>
              <span>{order.payment_method}</span>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={`${order.id}-${item.food_name}-${index}`} className="order-item">
                  <span className="item-name">{item.food_name}</span>
                  <span className="item-price">₹{item.food_price}</span>
                </div>
              ))}
            </div>

            <div className="order-date">
              <i className="fas fa-clock"></i>
              <span>{new Date(order.created_at).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={onBack}>
        <i className="fas fa-arrow-left"></i>{' '}
        Back to Menu
      </button>
    </div>
  );
}

Orders.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default Orders;
