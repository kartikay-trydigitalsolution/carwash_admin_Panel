import { memo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const AddDeleteModal = ({
  showDelete,
  onCloseDelete,
  data,
  onDelete,
  type,
}) => {
  const deleteClick = () => {
    onDelete(data._id);
  };
  if (!showDelete) return null;
  return (
    <div className="absolute inset-0 bg-[#00000099] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-xl">
        {/* Header */}
        <div className=" py-4 border-b">
          <h2 className="text-xl font-semibold text-center modal-text">
            Delete{" "}
            {type === "INVENTORY"
              ? "Inventory"
              : type === "STAFF"
              ? "Staff"
              : type === "MACHINE"
              ? "Machine"
              : type === "STAFF_ASSIGN_TASK"
              ? "Assign Task"
              : "NONE"}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            {console.log(
              type,
              `${data?.machineId?.machine_model} task for ${data?.staffId?.name}`
            )}
            Are you sure you want to delete this record for{" "}
            {type === "INVENTORY"
              ? data?.itemName
              : type === "STAFF"
              ? data?.name
              : type === "MACHINE"
              ? data?.machine_sr_no
              : type === "STAFF_ASSIGN_TASK"
              ? `${data?.machineId?.machine_model} task for ${data?.staffId?.name}`
              : "NONE"}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onCloseDelete();
            }}
            className="px-4 py-2 text-white bg-[#000000] hover:bg-[#00000] rounded-md modal-footer-btn"
          >
            Cancel
          </button>
          <button
            form="staffForm"
            onClick={() => {
              deleteClick();
            }}
            className="px-4 py-2 bg-[#8B0000] text-white hover:bg-[#8B0000] rounded-md modal-footer-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(AddDeleteModal);
