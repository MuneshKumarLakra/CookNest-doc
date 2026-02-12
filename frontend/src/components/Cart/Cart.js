import PropTypes from "prop-types";
import "./Cart.css";
import Carousel from "../Carousel/Carousel";

function Order({ foods, onProceedToPayment, onBackToMenu }) {
  const carouselImages = [
    "/4.png",
    "/5.png",
    "/6.png",
    "/7.png",
    "/8.png",
    "/9.png",
    
  ];

  if (!foods || foods.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>No items selected</h2>
          <p>Please select food items from the menu.</p>
          <button className="back-to-menu-btn" onClick={onBackToMenu}>
            <i className="fas fa-arrow-left"></i>{' '}
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const total = foods.reduce(
    (sum, food) => sum + Number(food.price),
    0
  );

  return (
    <div className="cart-container">
      <Carousel images={carouselImages} />
      <h2>Order Summary</h2>

      <div className="cart-items">
        {foods.map(f => (
          <div key={f.id} className="cart-item">
            <div className="cart-item-details">
              <strong>{f.name}</strong>
              <span className="cart-item-price">₹{f.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <span className="total-label">Total:</span>
        <span className="total-amount">₹{total}</span>
      </div>

      <div className="cart-actions">
        <button className="back-to-menu-btn" onClick={onBackToMenu}>
          <i className="fas fa-arrow-left"></i>{' '}
          Continue Shopping
        </button>
        <button className="proceed-btn" onClick={onProceedToPayment}>
          Proceed to Payment{' '}
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

Order.propTypes = {
  foods: PropTypes.array.isRequired,
  onProceedToPayment: PropTypes.func.isRequired,
  onBackToMenu: PropTypes.func.isRequired,
};

export default Order;
