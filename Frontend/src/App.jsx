import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Forget from "./pages/login/Forget";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedDash from "./routes/RoleBasedDash";
import UnAuthorized from "./common/Unauthorize";
import AdminDoctor from "./pages/admin/AdminDoctor";
import AdminPatient from "./pages/admin/AdminPatient";
import AdminAppointment from "./pages/admin/AdminAppointment";
import AdminReport from "./pages/admin/AdminReport";
import DoctorPatient from "./pages/doctor/DoctorPatient";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";
import DoctorPrescription from "./pages/doctor/DoctorPrescription";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointment from "./pages/patient/MyAppointment";
import PatientPrescription from "./pages/patient/PatientPrescription";
import { ToastContainer } from "react-toastify";
import PublicRoute from "./routes/PublicRoute";
import Profile from "./pages/login/Profile";
import MyAvailability from "./pages/doctor/MyAvailability";
import CompletePatientProfile from "./pages/login/CompleteProfile";
import DoctorList from "./pages/patient/DoctorList";

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: (
      <PublicRoute>
        <Home />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />,
      </PublicRoute>
    )
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />,
      </PublicRoute>
    )
  },
  {
    path: "/forget",
    element: (
      <PublicRoute>
        <Forget />,
      </PublicRoute>
    )
  },
  {
    path: "/unauthorize",
    element: <UnAuthorized />,
  },
  
  // Protected Routes
  {
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Doctor", "Patient"]}>
        <Layout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "/dashboard",
        element: <RoleBasedDash />,
      },

      //admin
      {
        path: "admin-doctors",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDoctor />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin-patients",
       element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminPatient />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin-appointments",
       element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminAppointment />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin-reports",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminReport />
          </ProtectedRoute>
        ),
      },

      //doctor
      {
        path: "doctor-patient",
        element: (
          <ProtectedRoute allowedRoles={["Doctor"]}>
            <DoctorPatient />
          </ProtectedRoute>
        ),
      },
      {
        path: "doctor-appointment",
        element: (
          <ProtectedRoute allowedRoles={["Doctor"]}>
            <DoctorAppointment />
          </ProtectedRoute>
        ),
      },
      {
        path: "doctor-prescription",
        element: (
          <ProtectedRoute allowedRoles={["Doctor"]}>
            <DoctorPrescription />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-availability",
        element: (
          <ProtectedRoute allowedRoles={["Doctor"]}>
            <MyAvailability />
          </ProtectedRoute>
        ),
      },
      //patient
      {
        path: "doctors-list",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <DoctorList />
          </ProtectedRoute>
        ),
      },
      {
        path: "patient-book-appointment",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <BookAppointment />
          </ProtectedRoute>
        ),
      },
      {
        path: "patient-my-appointment",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <MyAppointment />
          </ProtectedRoute>
        ),
      },
      {
        path: "patient-prescription",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <PatientPrescription />
          </ProtectedRoute>
        ),
      },
      {
        path: "complete-profile",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <CompletePatientProfile />
          </ProtectedRoute>
        ),
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Doctor", "Patient"]}>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },

]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
