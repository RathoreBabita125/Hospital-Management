import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingCompo from "../common/Loading";

const ProtectedRoute = ({ children, allowedRoles }) => {

  const { userAuth, loading } = useContext(AuthContext);

  if (loading) return <LoadingCompo />

  if (!userAuth?.role?.roleName || !userAuth) {
    return <Navigate to="/login" replace />;
  }

  //  when patient complete profile
  if (
    userAuth.role.roleName === "Patient" &&
    userAuth.patient
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userAuth?.role?.roleName)) {
    return <Navigate to="/unauthorize" replace />;
  }

  return children;
  
};
export default ProtectedRoute;