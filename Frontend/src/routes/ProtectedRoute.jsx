import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingCompo from "../common/Loading";

const ProtectedRoute = ({ children, allowedRoles }) => {

  const { userAuth, loading } = useContext(AuthContext);
  if (loading) return <LoadingCompo />
  console.log("Protected Route");
  console.log("Loading:", loading);
  console.log("User:", userAuth);

  if (!userAuth?.role?.roleName) {
    return <Navigate to="/login" replace />;
  }
if(!userAuth){
  return <Navigate to="/login" replace />;
}
  // when patient doen not complete profile
  if (
    userAuth.role.roleName === "Patient" &&
    !userAuth.patient &&
    location.pathname !== "/complete-profile"
  ) {
    return <Navigate to="/complete-profile" replace />;
  }

  //  when patient complete profile
  if (
    userAuth.role.roleName === "Patient" &&
    userAuth.patient &&
    location.pathname === "/complete-profile"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userAuth?.role?.roleName)) {
    return <Navigate to="/unauthorize" replace />;
  }
  return children;
};
export default ProtectedRoute;