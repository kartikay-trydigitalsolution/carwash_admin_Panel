import React from "react";

const TextInput = ({ id, name, type = "text", placeholder, formik, label }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        className="form-input w-full ps-3"
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        aria-label={name}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default TextInput;
