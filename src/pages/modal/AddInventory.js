import { useFormik } from "formik";
import * as Yup from "yup";
const AddInventoryModal = ({ show, onClose, onSubmit, data, type }) => {
  const notification_status_option = [
    { name: "Available", value: "available" },
    { name: "Low", value: "low" },
    { name: "Very Low", value: "very_low" },
  ];
  const validationSchema = Yup.object({
    itemName: Yup.string()
      .trim()
      .min(5, "*Item name must be at least 5 characters")
      .max(25, "*Item name not more than 25 characters")
      .required("*Item name is required"),
    quantity: Yup.number().required("*Quantity no. is required"),
    usedQuantity: Yup.number()
      .required("*Used quantity is required")
      .typeError("*Used quantity must be a number")
      .test(
        "max-used-quantity",
        "*Used quantity cannot be more than total quantity",
        function (value) {
          const { quantity } = this.parent;
          if (typeof quantity !== "number" || typeof value !== "number")
            return true;
          return value <= quantity;
        }
      ),
    notification: Yup.string().required("*Notification is required"),
    remarks: Yup.string().trim(),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      itemName: data?.itemName || "",
      quantity: data?.quantity || "",
      usedQuantity: data?.usedQuantity || "",
      notification: data?.notification || "",
      remarks: data?.remarks || "",
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
            Add Inventory
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form onSubmit={formik.handleSubmit} id="inventoryForm">
            <div className="space-y-4">
              <input
                id="itemName"
                type="text"
                name="itemName"
                className="form-input w-full ps-3"
                placeholder="Item Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.itemName}
                aria-label="itemName"
              />
              {formik.touched.itemName && formik.errors.itemName && (
                <div className="red">{formik.errors.itemName}</div>
              )}
              <input
                id="quantity"
                type="number"
                name="quantity"
                className="form-input w-full ps-3"
                placeholder="Quantity"
                onChange={(e) => {
                  const quantityigitsOnly = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  formik.setFieldValue("quantity", quantityigitsOnly);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
                aria-label="quantity"
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <div className="red">{formik.errors.quantity}</div>
              )}
              <input
                id="usedQuantity"
                type="number"
                name="usedQuantity"
                className="form-input w-full ps-3"
                placeholder="Used Quantity"
                onChange={(e) => {
                  const usedQuantityDigitsOnly = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  formik.setFieldValue("usedQuantity", usedQuantityDigitsOnly);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.usedQuantity}
                aria-label="usedQuantity"
              />
              {formik.touched.usedQuantity && formik.errors.usedQuantity && (
                <div className="red">{formik.errors.usedQuantity}</div>
              )}
              <select
                id="notification"
                name="notification"
                className="form-input w-full ps-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notification}
              >
                <option value="" disabled>
                  Notification Status
                </option>
                {notification_status_option?.map((n_s) => {
                  return <option value={n_s.value}>{n_s.name}</option>;
                })}
              </select>
              {formik.touched.notification && formik.errors.notification && (
                <div className="red">{formik.errors.notification}</div>
              )}
              <textarea
                id="remarks"
                name="remarks"
                className="form-input w-full ps-3"
                placeholder="Enter remarks"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.remarks}
                aria-label="remarks"
              />
              {formik.touched.remarks && formik.errors.remarks && (
                <div className="red">{formik.errors.remarks}</div>
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
            form="inventoryForm"
            className="px-4 py-2 bg-[#005FAF] text-white hover:bg-[#005FAF] rounded-md modal-footer-btn"
          >
            Create Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInventoryModal;
