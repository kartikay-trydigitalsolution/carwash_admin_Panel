// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import AssignMachineModal from "../modal/AddMachine";
const MachineManagement = () => {
  const [parentMessage, setParentMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

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
      <AssignMachineModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
      <div class="p-5 w-100">
        <div class="card shadow-sm border-0 pt-4 datatable_wrapper">
          <DataTableHeaderContainer
            onButtonClick={handleButtonClick}
            onAddButtonClick={handleModelClick}
            title={"Machines Details"}
            buttonTitle={"Add Machine"}
          />
          <DataTableComponent />
        </div>
      </div>
    </>
  );
};

export default MachineManagement;
