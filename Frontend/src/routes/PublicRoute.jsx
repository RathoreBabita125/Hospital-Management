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

  if (userAuth?.role?.roleName === "Patient" && !userAuth?.patient) {
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
};

export default PublicRoute;