// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import AssignMaintenanceModal from "../modal/AssignedMaintenace";
const AssignedManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [parentMessage, setParentMessage] = useState("");
  const handleButtonClick = useCallback(
    (dataFromChild) => {
      setParentMessage(dataFromChild);
    },
    [setParentMessage]
  );
  const handleModelClick = useCallback(
    (dataFromChild) => {
      setShowModal(true);
    },
    [setParentMessage]
  );
  return (
    <>
      {showModal && <AssignMaintenanceModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />}
      <div className="p-5 w-100">
        <div className="card shadow-sm border-0 pt-4 datatable_wrapper">
          <DataTableHeaderContainer
            onButtonClick={handleButtonClick}
            onAddButtonClick={handleModelClick}
            title={"Assigned Staff"}
            buttonTitle={"Assign Task"}
          />
          <DataTableComponent />
        </div>
      </div>
    </>
  );
};

export default AssignedManagement;
