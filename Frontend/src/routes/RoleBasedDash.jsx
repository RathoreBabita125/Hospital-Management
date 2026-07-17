import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import PatientDashboard from "../pages/patient/PatientDashboard";
import LoadingCompo from "../common/Loading";

const RoleBasedDash=()=> {

  const {userAuth, loading} = useContext(AuthContext);

  if(loading) return <LoadingCompo/>
  
  switch (userAuth?.role?.roleName) {
    case 'Admin':
      return <AdminDashboard />;

    case 'Doctor':
      return <DoctorDashboard />;

    case 'Patient':
      return <PatientDashboard/>;

    default:
      return <Navigate to="/login" />;
  }
}
export default RoleBasedDash;