import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const AddMachineModal = ({ show, onClose, onSubmit, data, type }) => {
  const operation_status_option = [
    { name: "In Maintenance", value: "in_maintenance" },
    { name: "Inactive", value: "inactive" },
    { name: "Active", value: "active" },
  ];
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.(com|net|org|edu|gov|co|in|uk|us|io|info|biz|me)$/i;
  const validationSchema = Yup.object({
    machine_model: Yup.string()
      .trim()
      .min(5, "*Model must be at least 5 characters")
      .max(20, "*Model not more than 20 characters")
      .required("*Machine Model is required"),
    machine_sr_no: Yup.string()
      .trim()
      .min(5, "*Serial Number must be at least 5 characters")
      .max(20, "*Serial Number not more than 20 characters")
      .required("*Machine Sr. No. is required"),
    location: Yup.string()
      .trim()
      .min(10, "*Address must be at least 10 characters")
      .max(50, "*Address not more than 50 characters")
      .required("*location is required"),
    operation_status: Yup.string().required("*location is required"),
    recipientName: Yup.string()
      .trim()
      .min(3, "*Name must be at least 3 characters")
      .max(25, "*Name not more than 25 characters")
      .required("*Name is required")
      .matches(/^[A-Za-z\s]+$/, "*Name must contain only letters"),
    recipientEmail: Yup.string()
      .trim()
      .required("*Email is required")
      .email("*Invalid email format")
      .test(
        "email-regex",
        "*Email domain can only contain letters, dots, and dashes",
        (value) => (value ? emailRegex.test(value) : false)
      ),
    recipientPhone: Yup.string()
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
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      machine_model: data?.machine_model || "",
      machine_sr_no: data?.machine_sr_no || "",
      location: data?.location || "",
      operation_status: data?.operation_status || "",
      recipientName: data?.recipientName || "",
      recipientPhone: data?.recipientPhone || "",
      recipientEmail: data?.recipientEmail || "",
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
        <div className=" py-4 border-b">
          <h2 className="text-xl font-semibold text-center modal-text">
            Add Machine
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form onSubmit={formik.handleSubmit} id="machineForm">
            <div className="space-y-4">
              <input
                id="machine_model"
                type="text"
                name="machine_model"
                className="form-input w-full ps-3"
                placeholder="Machine Model"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.machine_model}
                aria-label="machine_model"
              />
              {formik.touched.machine_model && formik.errors.machine_model && (
                <div className="red">{formik.errors.machine_model}</div>
              )}
              <input
                id="machine_sr_no"
                type="text"
                name="machine_sr_no"
                className="form-input w-full ps-3"
                placeholder="Machine Sr. No."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.machine_sr_no}
                aria-label="machine_sr_no"
              />
              {formik.touched.machine_sr_no && formik.errors.machine_sr_no && (
                <div className="red">{formik.errors.machine_sr_no}</div>
              )}
              <input
                id="location"
                type="text"
                name="location"
                className="form-input w-full ps-3"
                placeholder="Location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
                aria-label="location"
              />
              {formik.touched.location && formik.errors.location && (
                <div className="red">{formik.errors.location}</div>
              )}

              <select
                id="operation_status"
                name="operation_status"
                className="form-input w-full ps-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.operation_status}
              >
                <option value="" disabled>
                  Operational Status
                </option>
                {operation_status_option?.map((o_s_o) => {
                  return <option value={o_s_o.value}>{o_s_o.name}</option>;
                })}
                {/* <option value="inactive">In Active</option>
                <option value="in_maintenance">In Maintenance</option> */}
              </select>
              {formik.touched.operation_status &&
                formik.errors.operation_status && (
                  <div className="red">{formik.errors.operation_status}</div>
                )}
              <input
                id="recipientName"
                type="text"
                name="recipientName"
                className="form-input w-full ps-3"
                placeholder="Recipient Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.recipientName}
                aria-label="recipientName"
              />
              {formik.touched.recipientName && formik.errors.recipientName && (
                <div className="red">{formik.errors.recipientName}</div>
              )}
              <input
                id="recipientPhone"
                type="Number"
                name="recipientPhone"
                className="form-input w-full ps-3"
                placeholder="Recipient Phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.recipientPhone}
                aria-label="recipientPhone"
              />
              {formik.touched.recipientPhone &&
                formik.errors.recipientPhone && (
                  <div className="red">{formik.errors.recipientPhone}</div>
                )}
              <input
                id="recipientEmail"
                type="text"
                name="recipientEmail"
                className="form-input w-full ps-3"
                placeholder="Recipient Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.recipientEmail}
                aria-label="recipientEmail"
              />
              {formik.touched.recipientEmail &&
                formik.errors.recipientEmail && (
                  <div className="red">{formik.errors.recipientEmail}</div>
                )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-white bg-[#000000] hover:bg-[#00000] rounded-md modal-footer-btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="machineForm"
            className="px-4 py-2 bg-[#005FAF] text-white hover:bg-[#005FAF] rounded-md modal-footer-btn"
          >
            Create Machine
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMachineModal;
