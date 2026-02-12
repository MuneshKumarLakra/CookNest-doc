import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.css";

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleOrderHistoryClick = useCallback(() => {
    navigate("/orders");
  }, [navigate]);

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="app-logo">
          <h1>CookNest</h1>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <i className="fas fa-user-circle"></i>
            <span className="username">{user?.name || "Guest"}</span>
            <button 
              className="order-history" 
              onClick={handleOrderHistoryClick}
              aria-label="View order history"
              type="button"
            >
              <i className="fas fa-history"></i>
            </button>
          </div>
          <button className="logout-btn" onClick={onLogout} type="button">
            <i className="fas fa-sign-out-alt"></i>{' '}
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default Header;
