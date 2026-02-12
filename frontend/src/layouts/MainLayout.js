import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/Header/Header";

function MainLayout({ user, onLogout }) {
  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <Outlet />
    </>
  );
}

MainLayout.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default MainLayout;
