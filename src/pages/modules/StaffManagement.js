// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
const StaffManagement = () => {
  const [parentMessage, setParentMessage] = useState("");

  const handleButtonClick = useCallback(
    (dataFromChild) => {
      setParentMessage(dataFromChild);
    },
    [setParentMessage]
  );
  return (
    <div class="p-5 w-100">
      <div class="card shadow-sm p-4">
        <DataTableHeaderContainer
          onButtonClick={handleButtonClick}
          title={"Machines Details"}
          buttonTitle={"Add Machine"}
        />
        <DataTableComponent />
      </div>
    </div>
  );
};

export default StaffManagement;
