import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? element : <Navigate to="/auth" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};
