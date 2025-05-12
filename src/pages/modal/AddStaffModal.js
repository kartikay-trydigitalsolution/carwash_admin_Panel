import { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createRequest, fetchRequest } from "../../features/staff/StaffSlice";
import { useNavigate } from "react-router-dom";
const AddStaffModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state.staff.success);
  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success, navigate]);
  const validationSchema = Yup.object({
    name: Yup.string().required("*Name is required"),
    email: Yup.string()
      .email("*Invalid email format")
      .required("*Email is required"),
    role: Yup.string().required("*Role is required"),
    phone: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, "*Invalid phone number")
      .required("*Phone number is required"),
    password: Yup.string()
      .min(8, "*Password must be at least 8 characters")
      .required("*Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "*Passwords must match")
      .required("*Confirm password is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(createRequest(values));
      // navigate("/dashboard");
    },
  });
  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);
  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-[#00000099] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-xl">
        {/* Header */}
        <div className=" py-4 border-b">
          <h2 className="text-xl font-semibold text-center modal-text">
            Add Staff
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="staffForm" onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
              <input
                id="name"
                type="text"
                name="name"
                className="form-input w-full ps-4"
                placeholder="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                aria-label="name"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="red">{formik.errors.name}</div>
              ) : null}
              <input
                id="email"
                type="email"
                name="email"
                className="form-input w-full ps-4"
                placeholder="Email Address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                aria-label="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="red">{formik.errors.email}</div>
              ) : null}
              <input
                type="tel"
                name="phone"
                className="form-input w-full ps-4"
                placeholder="Phone Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="red">{formik.errors.phone}</div>
              ) : null}
              <select
                id="role"
                name="role"
                className="form-input w-full ps-3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
              >
                <option value="" disabled>
                  Select a role…
                </option>
                <option value="Role1">Role1</option>
                <option value="Role2">Role2</option>
              </select>
              {formik.touched.role && formik.errors.role && (
                <div className="red">{formik.errors.role}</div>
              )}
              <input
                id="password"
                type="password"
                name="password"
                className="form-input w-full ps-4"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                aria-label="password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="red">{formik.errors.password}</div>
              ) : null}
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-input w-full ps-4"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="red">{formik.errors.confirmPassword}</div>
                )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              formik.resetForm();
            }}
            className="px-4 py-2 text-white bg-[#000000] hover:bg-[#00000] rounded-md modal-footer-btn"
          >
            Cancel
          </button>
          <button
            form="staffForm"
            type="submit"
            className="px-4 py-2 bg-[#005FAF] text-white hover:bg-[#005FAF] rounded-md modal-footer-btn"
          >
            Create Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(AddStaffModal);
