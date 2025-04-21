import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/auth/Login";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import OTPVerifyPage from "./pages/auth/OtpVerify";
import ChangePasswordPage from "./pages/auth/ChangePassword";
import DashboardLayout from "./pages/dashboardLayout/DashboardLayout";
import DashboardHome from "./pages/dashboard/Dashboard";
import UserProfile from "./pages/components/UserProfile";
import StaffManagement from "./pages/components/UserProfile";
import Settings from "./pages/components/Settings";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp-verify" element={<OTPVerifyPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          {/* <Route path="/staff-management" element={<UserProfile />} /> */}
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
