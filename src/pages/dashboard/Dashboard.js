// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
const DashboardHome = () => {
  const [parentMessage, setParentMessage] = useState("");
  const [showModel, setShowModel] = useState(false);

  const handleButtonClick = useCallback(
    (dataFromChild) => {
      setParentMessage(dataFromChild);
    },
    [setParentMessage]
  );
  const handleModelClick = useCallback(
    (dataFromChild) => {
      setShowModel(true);
    },
    [setParentMessage]
  );
  return (
    <div className="p-5 w-100">
      <div className="card shadow-sm border-0 pt-4 datatable_wrapper">
        <DataTableHeaderContainer
          onButtonClick={handleButtonClick}
          onAddButtonClick={handleModelClick}
          title={"Machines Details"}
          buttonTitle={"Add Machine"}
        />
        <DataTableComponent />
      </div>
    </div>
  );
};

export default DashboardHome;
