import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import StyledImageInline from "../components/Image";
import { newPasswordRequest } from "../../features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSuccess = useSelector((state) => state.auth.loginSuccess);
  const params = useParams();
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "*New Password must be at least 8 characters")
      .max(20, "*Password must be at most 20 characters")
      .required("*New Password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref(" newPassword"), null], "*Passwords must match")
      .required("*Confirm Password is required"),
  });
  useEffect(() => {
    if (loginSuccess) {
      navigate("/");
    }
  }, [loginSuccess]);
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch({
        type: newPasswordRequest.type,
        payload: { ...values, id: params.id },
      });
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
            id="newPassword"
            type="password"
            className=" form-input"
            placeholder="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="red">{formik.errors.newPassword}</div>
          )}
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
          SAVE
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
