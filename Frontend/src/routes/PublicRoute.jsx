import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingCompo from "../common/Loading";

const PublicRoute = ({ children }) => {
  const { userAuth, loading } = useContext(AuthContext);

  if (loading) return <LoadingCompo />;

  if (userAuth?.role?.roleName) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default PublicRoute;