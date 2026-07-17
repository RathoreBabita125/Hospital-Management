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
import DoctorMedicalRecord from "./pages/doctor/DoctorMedicalRecord";
import DoctorPatientHistory from "./pages/doctor/DoctorPatientHistory";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointment from "./pages/patient/MyAppointment";
import PatientPrescription from "./pages/patient/PatientPrescription";
import PatientMedicalRecord from "./pages/patient/PatientMedicalRecord";
import PatientReport from "./pages/patient/PatientReport";
import PatientChangePassword from "./pages/patient/ChangePassword";
import { ToastContainer } from "react-toastify";
import PublicRoute from "./routes/PublicRoute";
import CompletePatientProfile from "./pages/login/CompleteProfile";
import Profile from "./pages/login/Profile";

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
    path: "/complete-profile",
    element: (
      <PublicRoute>
        <CompletePatientProfile />,
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
    element: (
      <PublicRoute>
        <UnAuthorized />,
      </PublicRoute>
    )
  },

  // Protected Routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Doctor", "Patient"]}>
        <Layout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: '',
        element: <RoleBasedDash />,
      },

      //admin
      {
        path: "admin-doctors",
        element: <AdminDoctor />,
      },
      {
        path: "admin-patients",
        element: <AdminPatient />,
      },
      {
        path: "admin-appointments",
        element: <AdminAppointment />,
      },
      {
        path: "admin-reports",
        element: <AdminReport />,
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
        path: "doctor-medical-records",
        element: (
          <ProtectedRoute allowedRoles={["Doctor"]}>
            <DoctorMedicalRecord />
          </ProtectedRoute>
        ),
      },
      {
        path: "doctor-patient-history",
        element: (
          <ProtectedRoute allowedRoles={["Doctor"]}>
            <DoctorPatientHistory />
          </ProtectedRoute>
        ),
      },
      
      //patient
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
        path: "patient-medical-records",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <PatientMedicalRecord />
          </ProtectedRoute>
        ),
      },
      {
        path: "patient-prescriptions",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <PatientPrescription />
          </ProtectedRoute>
        ),
      },
      {
        path: "patient-report",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <PatientReport />
          </ProtectedRoute>
        ),
      },
      {
        path: "patient-change-password",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <PatientChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["Admin","Doctor","Patient"]}>
            <Profile/>
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
