import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Banner from "../Banner/Banner";
import "./Register.css";

function Register({ onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    // Validation
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => onBack(), 1500);
      } else {
        const data = await res.json();
        setErrors({ submit: data.message || "Registration failed" });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }, [name, email, password, onBack]);

  return (
    <>
      <Banner />
      <div className="register-container">
        <h2>Register</h2>
      
        {successMessage && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
        {errors.submit && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              placeholder="Name" 
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors(prev => ({ ...prev, name: "" }));
              }}
              className={`form-input ${errors.name ? "error" : ""}`}
              disabled={isLoading}
              required
              aria-label="Name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <input 
              placeholder="Email" 
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: "" }));
              }}
              className={`form-input ${errors.email ? "error" : ""}`}
              disabled={isLoading}
              required
              aria-label="Email"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors(prev => ({ ...prev, password: "" }));
                }}
                className={`password-input ${errors.password ? "error" : ""}`}
                disabled={isLoading}
                required
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-button"
                title={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
            <div className="hint-text">
              Min 6 characters with uppercase, lowercase, and number
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          
          <button 
            type="button" 
            onClick={onBack} 
            className="btn-secondary"
            disabled={isLoading}
          >
            Back to Login
          </button>
        </form>
      </div>
    </>
  );
}

Register.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default Register;
