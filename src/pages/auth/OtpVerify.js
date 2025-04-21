import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { toast } from "react-toastify";
import OTPInput from "./OtpInput";
import StyledImageInline from "../components/Image";

const OTPVerifyPage = () => {
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOtpChange = (otp) => {
    setOtpValue(otp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let success = true;

    // Trim whitespace just in case
    const trimmedOtp = otpValue.trim();

    if (!trimmedOtp) {
      toast.error("OTP is required");
      success = false;
    }

    if (trimmedOtp.length !== 4) {
      toast.error("OTP must be a 4-digit number");
      success = false;
    }

    if (!/^\d{4}$/.test(trimmedOtp)) {
      toast.error("OTP must contain only numbers");
      success = false;
    }

    if (success == true) {
      // Simulate a successful submission
      setIsSubmitting(true);
      toast.success("OTP Verified!");

      // Mock navigation after verification
      setTimeout(() => {
        navigate("/change-password"); // replace with actual route
      }, 1000);
    }
  };

  const inputCustomStyle = {
    borderRadius: "5px",
    border: "1px solid #CDCDCD",
    fontSize: "2.5em",
    background: "#F4F4F4",
  };

  const containerCustomStyle = {
    marginBottom: "1em",
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 auth-form-wrap">
      <form
        onSubmit={handleSubmit}
        className="bg-white py-5 px-4 rounded shadow-sm width_500"
      >
        <div className="main_logo_div text-center">
        <StyledImageInline src={logo} alt="logo" />
        </div>

        <div className="d-flex justify-content-center">
          <div className="auth-heading-text">Confirmation Code</div>
        </div>

        <div className="mb-3 d-flex justify-content-center">
          <OTPInput
            length={4}
            onOtpChange={handleOtpChange}
            inputStyle={inputCustomStyle}
            containerStyle={containerCustomStyle}
          />
        </div>

        <button
          type="submit"
          className="logging-form-button w-100"
          disabled={otpValue.length !== 4 || isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "SUBMIT"}
        </button>

        <div className="mt-3 text-center">
          <a
            onClick={() => navigate("/change-password")}
            className="text-decoration-none forgot_password_text"
            role="button"
          >
            Resend Code
          </a>
        </div>
      </form>
    </div>
  );
};

export default OTPVerifyPage;
