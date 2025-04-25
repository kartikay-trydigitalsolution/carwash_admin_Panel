import { useState } from "react";

const AssignMaintenanceModal = ({ show, onClose }) => {
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
          Assign Maintenance
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <select id="role" type="text" className="form-input w-full ps-3">
                <option>Staff Name</option>
                <option>Staff1</option>
                <option>Staff2</option>
              </select>
              <select id="role" type="text" className="form-input w-full ps-3">
                <option>Role</option>
                <option>Role1</option>
                <option>Role2</option>
              </select>
              <select id="role" type="text" className="form-input w-full ps-3">
                <option>Machine ID</option>
                <option>Machine1</option>
                <option>Machine2</option>
              </select>
              <input
                id="date"
                type="date"
                className="form-input w-full ps-4"
                placeholder="Select a date"
              />
              <div>
                <div className="content_header mb-2">
                  Can Select Muliple Options{" "}
                </div>
                <div className="form-check custom-checkbox-color">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Checklist For Servicing And Maintenance of Coin Operated
                    Water Dispensers
                  </label>
                </div>
                <div className="form-check custom-checkbox-color">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Tool Box Meeting
                  </label>
                </div>
              </div>
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

export default AssignMaintenanceModal;
