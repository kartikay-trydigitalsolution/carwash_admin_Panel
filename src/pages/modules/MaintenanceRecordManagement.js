// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
const MaintenanceRecordManagement = () => {
  const [parentMessage, setParentMessage] = useState("");

  const handleButtonClick = useCallback(
    (dataFromChild) => {
      setParentMessage(dataFromChild);
    },
    [setParentMessage]
  );
  return (
    <div className="p-5 w-100">
      <div className="card shadow-sm border-0 pt-4 datatable_wrapper">
        <DataTableHeaderContainer
          onButtonClick={handleButtonClick}
          title={"Maintenance Records"}
          buttonTitle={"Maintenance Records"}
        />
        <DataTableComponent />
      </div>
    </div>
  );
};

export default MaintenanceRecordManagement;
