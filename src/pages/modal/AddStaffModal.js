import { memo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const AddStaffModal = ({ show, onClose, onSubmit, data, type }) => {
  const role_option = [
    { name: "Technician", value: "Technician" },
    { name: "Inventory", value: "Inventory" },
  ];
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.(com|net|org|edu|gov|co|in|uk|us|io|info|biz|me)$/i;
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "*Name must be at least 3 characters")
      .max(25, "*Name not more than 25 characters")
      .required("*Name is required")
      .matches(/^[A-Za-z\s]+$/, "*Name must contain only letters"),
    email: Yup.string()
      .trim()
      .required("*Email is required")
      .max(30, "Email must be at most 30 characters")
      .email("*Invalid email format")
      .test(
        "email-regex",
        "*Email domain can only contain letters, dots, and dashes",
        (value) => (value ? emailRegex.test(value) : false)
      ),
    role: Yup.string().required("*Role is required"),
    phone: Yup.string()
      .trim()
      .required("*Phone number is required")
      .matches(/^\+?[1-9]\d{7,14}$/, "*Invalid phone number format") // E.164 format with minimum 8 digits
      .test(
        "no-repeating-digits",
        "*Phone number cannot consist of repeating digits",
        (value) => {
          if (!value) return false;
          const digits = value.replace(/\D/g, ""); // Remove non-digit characters
          return !/^(\d)\1+$/.test(digits); // Check for repeating digits
        }
      ),
    password: Yup.string()
      .trim()
      .min(8, "*Password must be at least 8 characters")
      .max(20, "*Password not more than 20 characters")
      .required("*Password is required"),
    confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("password"), null], "*Passwords must match")
      .required("*Confirm password is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || "",
      email: data?.email || "",
      password: data?.password || "",
      confirmPassword: data?.password || "",
      role: data?.role || "",
      phone: data?.phone || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(
        type === "UPDATE" ? { ...values, id: data._id, type: type } : values
      );
      resetForm();
    },
  });
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-[#00000099] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="py-4 border-b">
          <h2 className="text-xl font-semibold text-center modal-text">
            {type === "UPDATE" ? "Update Staff" : "Add Staff"}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form id="staffForm" onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
              <input
                id="name"
                type="text"
                name="name"
                className="form-input w-full ps-3"
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
                className="form-input w-full ps-3"
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
                className="form-input w-full ps-3"
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
                className="form-input w-full ps-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
              >
                <option value="" disabled>
                  Select a role…
                </option>
                {role_option?.map((r_o) => {
                  return <option value={r_o.value}>{r_o.name}</option>;
                })}
              </select>
              {formik.touched.role && formik.errors.role && (
                <div className="red">{formik.errors.role}</div>
              )}
              <input
                id="password"
                type="password"
                name="password"
                className="form-input w-full ps-3"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                aria-label="password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="red">{formik.errors.password}</div>
              )}
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-input w-full ps-3"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="red">{formik.errors.confirmPassword}</div>
                )}
              {/* All your input fields remain unchanged */}
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
            className="px-4 py-2 text-white bg-[#000000] hover:bg-[#000000] rounded-md modal-footer-btn"
          >
            Cancel
          </button>
          <button
            form="staffForm"
            type="submit"
            className="px-4 py-2 bg-[#005FAF] text-white hover:bg-[#004c8c] rounded-md modal-footer-btn"
          >
            {type === "UPDATE" ? "UPDATE" : "Create Staff"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(AddStaffModal);
