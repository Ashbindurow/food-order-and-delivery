import { isAuthenticated, checkRole } from "../../utils";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ role }) => {
  return isAuthenticated() && checkRole(role) ? <Outlet /> : <Navigate />;
};

export default PrivateRoutes;
