import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import StyledImageInline from "../components/Image";
const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    nPassword: Yup.string()
      .min(8, "*New Password must be at least 8 characters")
      .required("*New Password is required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref(" nPassword"), null], "*Passwords must match")
      .required("*Confirm Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      nPassword: "",
      cPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      navigate("/");
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
          <div className="auth-heading-text">Change Password</div>
        </div>
        <div className="mb-3">
          <input
            id="nPassword"
            type="password"
            className=" form-input"
            placeholder="New Password"
            value={formik.values.nPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.nPassword && formik.errors.nPassword ? (
            <div className="red">{formik.errors.nPassword}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <input
            id="cPassword"
            type="text"
            className="form-input mb-1"
            placeholder="Confirm Password"
            value={formik.values.cPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.cPassword && formik.errors.cPassword ? (
            <div className="red">{formik.errors.cPassword}</div>
          ) : null}
        </div>
        <button type="submit" className="logging-form-button  w-100">
          SAVE
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
