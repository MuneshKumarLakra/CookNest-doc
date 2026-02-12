function Checkout({ userId }) {
  const pay = async () => {
    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, total: 250 }),
    });
    alert("Payment Successful!");
  };

  return <button onClick={pay}>Pay Now (Dummy)</button>;
}

export default Checkout;