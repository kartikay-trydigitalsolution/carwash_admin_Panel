import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import { useState } from "react";
const AssignMaintenanceModal = ({
  show,
  onClose,
  onSubmit,
  data,
  type,
  staff,
  machine,
}) => {
  const service_type_option = [
    { name: "Complaint", value: "Complaint" },
    { name: "Servicing", value: "Servicing" },
    { name: "Installation", value: "Installation" },
  ];
  const validationSchema = Yup.object()
    .shape({
      staffId: Yup.string().required("*Staff is required"),
      machineId: Yup.string().required("*Machine is required"),
      due_date: Yup.date()
        .required("*Due Date is required")
        .min(
          new Date(new Date().setHours(0, 0, 0, 0)),
          "*Due Date must be today or later"
        ),
      isCheckListForService: Yup.boolean(),
      isCheckToolKit: Yup.boolean(),
      service_type: Yup.string().when("isCheckListForService", {
        is: true,
        then: (schema) => schema.required("*Required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    })
    .test(
      "only-one-selected",
      "*Select either Checklist for Servicing or Tool Kit — not both",
      function (values) {
        const { isCheckListForService, isCheckToolKit } = values;
        const onlyOneSelected =
          (isCheckListForService && !isCheckToolKit) ||
          (!isCheckListForService && isCheckToolKit);

        if (onlyOneSelected) {
          return true;
        }
        return this.createError({
          path: "isCheckListForService",
          message:
            "*Select either Checklist for Servicing or Tool Kit — not both",
        });
      }
    );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      staffId: data?.staffId || "",
      machineId: data?.machineId || "",
      due_date: data?.due_date || "",
      isCheckListForService: data?.isCheckListForService || false,
      isCheckToolKit: data.isCheckToolKit || false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(
        type === "UPDATE" ? { ...values, id: data._id, type: type } : values
      );
      resetForm();
    },
  });
  const selectedStaffRole = staff.find((s) => s?.id === formik.values.staffId);
  const selectedMachine = machine.find(
    (m) => m?.id === formik.values.machineId
  );
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-[#00000099] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className=" py-4 border-b">
          <h2 className="text-xl font-semibold text-center modal-text">
            Assign Maintenance
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form onSubmit={formik.handleSubmit} id="assignForm">
            <div className="space-y-4">
              <select
                id="staffId"
                name="staffId"
                className="form-input w-full ps-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.staffId}
              >
                <option value="" disabled>
                  Select Staff{" "}
                </option>
                {staff?.map((s) => (
                  <option value={s?.id}>{s?.name}</option>
                ))}
              </select>
              {formik.touched.staffId && formik.errors.staffId && (
                <div className="red">{formik.errors.staffId}</div>
              )}
              {selectedStaffRole && (
                <select
                  id="staffRole"
                  name="staffRole"
                  className="form-input w-full ps-2"
                  value={formik.values.staffId}
                  disabled
                >
                  {staff?.map((s) => (
                    <option value={selectedStaffRole.role}>
                      {selectedStaffRole.role}
                    </option>
                  ))}
                </select>
              )}
              <select
                id="machineId"
                name="machineId"
                className="form-input w-full ps-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.machineId}
              >
                <option value="" disabled>
                  Select Machine Sr. No.{" "}
                </option>
                {machine?.map((m) => (
                  <option value={m?.id}>{m?.machine_sr_no}</option>
                ))}
              </select>
              {formik.touched.machineId && formik.errors.machineId && (
                <div className="red">{formik.errors.machineId}</div>
              )}
              {selectedMachine && (
                <select
                  id="machineModel"
                  name="machineModel"
                  className="form-input w-full ps-2"
                  value={formik.values.machineModel}
                  disabled
                >
                  {machine?.map((s) => (
                    <option value={selectedMachine?.id}>
                      {selectedMachine?.machine_model}
                    </option>
                  ))}
                </select>
              )}
              {selectedMachine && (
                <select
                  id="machineLocation"
                  name="machineLocation"
                  className="form-input w-full ps-2"
                  value={formik.values.id}
                  disabled
                >
                  {machine?.map((s) => (
                    <option value={selectedMachine?.id}>
                      {selectedMachine.location}
                    </option>
                  ))}
                </select>
              )}
              <input
                id="due_date"
                type="date"
                name="due_date"
                className="form-input w-full ps-4"
                placeholder="Due Date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.machine_model}
                aria-label="due_date"
              />
              {formik.touched.due_date && formik.errors.due_date && (
                <div className="red">{formik.errors.due_date}</div>
              )}
              <div className="content_header mb-2">
                Can Select Muliple Options{" "}
              </div>
              <div className="form-check custom-checkbox-color">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isCheckListForService"
                  name="isCheckListForService"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.isCheckListForService}
                />
                <label
                  className="form-check-label"
                  htmlFor="isCheckListForService"
                >
                  Checklist For Servicing And Maintenance of Coin Operated Water
                  Dispensers
                </label>
              </div>

              <div className="form-check custom-checkbox-color">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isCheckToolKit"
                  name="isCheckToolKit"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.isCheckToolKit}
                />
                <label className="form-check-label" htmlFor="isCheckToolKit">
                  Tool Box Meeting
                </label>
              </div>
              {formik.errors.isCheckListForService && (
                <div className="red">{formik.errors.isCheckListForService}</div>
              )}
              {formik.values.isCheckListForService && (
                <>
                  <select
                    id="service_type"
                    name="service_type"
                    className="form-input w-full ps-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.service_type}
                  >
                    <option value="" disabled>
                      Service Status
                    </option>
                    {service_type_option?.map((n_s) => {
                      return <option value={n_s.value}>{n_s.name}</option>;
                    })}
                  </select>
                  {formik.touched.service_type &&
                    formik.errors.telephoneservice_type && (
                      <div className="red">{formik.errors.service_type}</div>
                    )}
                </>
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
            form="assignForm"
            className="px-4 py-2 bg-[#005FAF] text-white hover:bg-[#005FAF] rounded-md modal-footer-btn"
          >
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignMaintenanceModal;
