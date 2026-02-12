import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import routes from "./routes/routes";
import MainLayout from "./layouts/MainLayout";

function AppContent() {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setSelectedFoods([]);
    navigate("/login");
  };

  const toggleFood = (food) => {
    setSelectedFoods(prev =>
      prev.some(f => f.id === food.id)
        ? prev.filter(f => f.id !== food.id)
        : [...prev, food]
    );
  };

  const handlers = {
    selectedFoods,
    toggleFood,
    handleLogin: (u) => {
      setUser(u);
      navigate("/foods");
    },
    handleSwitchToRegister: () => navigate("/register"),
    handleBackToLogin: () => navigate("/login"),
    handleGoToCart: () => navigate("/cart"),
    handleProceedToPayment: () => navigate("/payment"),
    handleBackToMenu: () => navigate("/foods"),
    handleBackToCart: () => navigate("/cart"),
    handlePaymentSuccess: () => {
      setSelectedFoods([]);
      navigate("/orders");
    },
  };

  const routeConfig = routes(user, handlers);

  return (
    <Routes>
      {/* Routes without Header */}
      {routeConfig
        .filter(route => ["/", "/login", "/register"].includes(route.path))
        .map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

      {/* Routes with Header */}
      <Route element={<MainLayout user={user} onLogout={handleLogout} />}>
        {routeConfig
          .filter(route => !["/", "/login", "/register"].includes(route.path))
          .map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
