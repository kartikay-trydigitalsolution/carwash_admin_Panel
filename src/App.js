import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import LoginPage from "./pages/auth/Login";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import OTPVerifyPage from "./pages/auth/OtpVerify";
import ChangePasswordPage from "./pages/auth/ChangePassword";
import DashboardLayout from "./pages/dashboardLayout/DashboardLayout";
import DashboardHome from "./pages/dashboard/Dashboard";
import StaffManagement from "./pages/modules/StaffManagement";
import Settings from "./pages/components/Settings";
import ServiceForm from "./pages/modules/ServiceListForm";
import ToolKitForm from "./pages/modules/ToolKitForm";
import "bootstrap/dist/css/bootstrap.min.css";
import AssignedManagement from "./pages/modules/AssignedMaintenace";
import StaffAssignedManagement from "./pages/modules/StaffAssignedMaintenance";
import MachineManagement from "./pages/modules/MachineManagement";
import InventoryManagement from "./pages/modules/InventoryManagement";
import RecepientListManagement from "./pages/modules/RecepientListManagement";
import MaintenanceRecordManagement from "./pages/modules/MaintenanceRecordManagement";
import MyProfile from "./pages/modules/ProfilePage";
import Report from "./pages/modules/ReportList";
import PrivateRoute from "./PrivateRoute";
import { Toaster } from "sonner";
function App() {
  const isLogging = useSelector((state) => state?.auth?.isLogging);
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={isLogging ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp-verify" element={<OTPVerifyPage />} />
        <Route path="/change-password/:id" element={<ChangePasswordPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="staff-management" element={<StaffManagement />} />
          <Route path="assigned-management" element={<AssignedManagement />} />
          <Route path="service-form/:id" element={<ServiceForm />} />
          <Route path="toolkit-form/:id" element={<ToolKitForm />} />
          <Route
            path="staff-assigned-management/:id"
            element={<StaffAssignedManagement />}
          />
          <Route path="machine-management" element={<MachineManagement />} />
          <Route
            path="inventory-management"
            element={<InventoryManagement />}
          />
          <Route
            path="recepient-list-management"
            element={<RecepientListManagement />}
          />
          <Route
            path="maintenance-record-management"
            element={<MaintenanceRecordManagement />}
          />
          <Route path="reports" element={<Report />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* <Route
          path="/"
          element={isLogging ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp-verify" element={<OTPVerifyPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="staff-management" element={<StaffManagement />} />
          <Route path="assigned-management" element={<AssignedManagement />} />
          <Route path="machine-management" element={<MachineManagement />} />
          <Route
            path="inventory-management"
            element={<InventoryManagement />}
          />
          <Route
            path="recepient-list-management"
            element={<RecepientListManagement />}
          />
          <Route
            path="maintenance-record-management"
            element={<MaintenanceRecordManagement />}
          />
          <Route path="settings" element={<Settings />} />
        </Route> */}
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
