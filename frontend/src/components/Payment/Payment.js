import { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import "./Payment.css";

function Payment({ foods, user, onPaymentSuccess, onBackToCart }) {
  const [method, setMethod] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const total = useMemo(() => 
    foods.reduce((sum, f) => sum + Number(f.price), 0),
    [foods]
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");

    if (!method) {
      setError("Please select a payment method");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          foods,
          total,
          paymentMethod: method,
        }),
      });

      if (res.ok) {
        onPaymentSuccess();
      } else {
        const data = await res.json();
        setError(data.message || "Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [method, user.id, foods, total, onPaymentSuccess]);

  return (
    <div className="payment-container">
      <h2>Payment Gateway</h2>

      <div className="payment-total">
        <span className="total-label">Total Amount:</span>
        <span className="total-amount">₹{total}</span>
      </div>

      {error && <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="payment-methods">
          {["Credit Card", "Debit Card", "UPI", "Net Banking", "Cash on Delivery"].map(
            (m) => (
              <label key={m} className="payment-method-option">
                <input
                  type="radio"
                  name="payment"
                  value={m}
                  checked={method === m}
                  onChange={() => setMethod(m)}
                  disabled={isLoading}
                  required
                />
                <span>{m}</span>
              </label>
            )
          )}
        </div>

        <div className="payment-actions">
          <button 
            type="button"
            className="back-to-cart-btn" 
            onClick={onBackToCart}
            disabled={isLoading}
          >
            <i className="fas fa-arrow-left"></i>{' '}
            Back to Cart
          </button>
          <button type="submit" className="pay-btn" disabled={isLoading}>
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
}

Payment.propTypes = {
  foods: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onBackToCart: PropTypes.func.isRequired,
};

export default Payment;
