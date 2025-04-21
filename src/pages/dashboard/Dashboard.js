// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
const DashboardHome = () => {
  const [parentMessage, setParentMessage] = useState("");

  const handleButtonClick = useCallback(
    (dataFromChild) => {
      setParentMessage(dataFromChild);
    },
    [setParentMessage]
  );
  return (
    <div class="p-5 w-100">
      <div class="card shadow-sm border-0 pt-4 datatable_wrapper">
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

export default DashboardHome;
