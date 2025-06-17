import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/logo.svg";
import StyledImageInline from "../components/Image";
import { loginRequest } from "../../features/auth/AuthSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("*Invalid email format")
      .max(30, "Email must be at most 30 characters")
      .required("*Email is required"),
    password: Yup.string()
      .min(8, "*Password must be at least 8 characters")
      .max(20, "*Password must be at most 20 characters")
      .required("*Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginRequest(values));
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
          <div className="auth-heading-text">Login Admin Panel</div>
        </div>
        <div className="mb-3">
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            aria-label="Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="red">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            aria-label="Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="red">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="logging-form-button  w-100">
          LOGIN
        </button>
        <div className="mt-3 d-flex justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input "
              type="checkbox"
              id="rememberMe"
              // checked={rememberMe}
              // onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>
          <a
            onClick={() => {
              navigate("/forgot-password");
            }}
            className="text-decoration-none forgot_password_text"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
