import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import StyledImageInline from "../components/Image";
import { useDispatch, useSelector } from "react-redux";

import { forgetPasswordRequest } from "../../features/auth/AuthSlice";
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const otpSuccess = useSelector((state) => state.auth.otpSuccess);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("*Invalid email format")
      .max(30, "Email must be at most 30 characters")
      .required("*Email is required"),
  });
  useEffect(() => {
    if (otpSuccess) {
      navigate("/otp-verify");
    }
  }, [otpSuccess]);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values = { ...values, id: params.id };
      dispatch(forgetPasswordRequest(values));
    },
  });
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 auth-form-wrap">
      <form
        className="bg-white py-5 px-4 rounded shadow-sm width_500"
        onSubmit={formik.handleSubmit}
      >
        <div className="main_logo_div">
          <StyledImageInline src={logo} alt="logo" />
        </div>
        <div className="d-flex justify-content-center">
          <div className="auth-heading-text">Forgot Password</div>
        </div>
        <div className="mb-3">
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="Your Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            aria-label="Email address"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="red">{formik.errors.email}</div>
          )}
        </div>
        <button type="submit" className="logging-form-button  w-100">
          SEND CODE
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
