// src/pages/dashboard/DashboardHome.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.svg";
import { useFormik } from "formik";
import StyledImageInline from "../components/Image";
import { newPasswordRequest } from "../../features/auth/AuthSlice";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth?.userData);
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "*New Password must be at least 8 characters")
      .required("*New Password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref(" newPassword"), null], "*Passwords must match")
      .required("*Confirm Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: auth.name || "",
      email: auth.email || "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch({
        type: newPasswordRequest.type,
        payload: { ...values, id: auth._id },
      });
    },
  });
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <form
        className="bg-white py-5 px-4 rounded shadow-sm width_500"
        onSubmit={formik.handleSubmit}
      >
        <div className="main_logo_div">
          <StyledImageInline src={logo} alt="logo" />
        </div>
        <div className="d-flex justify-content-center">
          <div className="auth-heading-text">Profile</div>
        </div>
        <div className="mb-3">
          <input
            id="name"
            type="name"
            className="form-input"
            placeholder="Name"
            value={formik.values.name}
            aria-label="name"
            disabled={true}
          />
        </div>
        <div className="mb-3">
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="Email"
            value={formik.values.email}
            aria-label="Email"
            disabled={true}
          />
        </div>
        <div className="mb-4">
          <input
            id="newPassword"
            type="password"
            className="form-input"
            placeholder="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            aria-label="newPassword"
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="red">{formik.errors.newPassword}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <input
            id="confirmNewPassword"
            type="text"
            className="form-input mb-1"
            placeholder="Confirm Password"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword && (
              <div className="red">{formik.errors.confirmNewPassword}</div>
            )}
        </div>
        <button type="submit" className="logging-form-button  w-100">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
