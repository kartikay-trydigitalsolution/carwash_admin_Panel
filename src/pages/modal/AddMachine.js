import { useState } from "react";

const AddMachineModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-[#00000099] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-xl">
        {/* Header */}
        <div className=" py-4 border-b">
          <h2 className="text-xl font-semibold text-center modal-text">
            Add Machine
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                id="name"
                type="text"
                className="form-input w-full ps-4"
                placeholder="Machine Name"
              />
              <input
                id="email"
                type="text"
                className="form-input w-full ps-4"
                placeholder="Machine ID"
              />
              <input
                id="email"
                type="text"
                className="form-input w-full ps-4"
                placeholder="Location"
              />
              <select id="role" type="text" className="form-input w-full ps-3">
                <option>Operational Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
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
            form="yourFormId"
            className="px-4 py-2 bg-[#005FAF] text-white hover:bg-[#005FAF] rounded-md modal-footer-btn"
          >
            Create Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMachineModal;
