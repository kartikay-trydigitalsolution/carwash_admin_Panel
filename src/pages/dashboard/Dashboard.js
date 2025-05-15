// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import MachineAnalyticsChart from "../layouts/MachineAnalyticsChart ";
import ClientsPieChart from "../layouts/PieChart";

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
    // <div className="p-5 w-100">
    //   <div className="card shadow-sm border-0 pt-4 datatable_wrapper">
    //     <div className="row">
    //       <div className="col-md-4 mb-4">
    //         <MachineAnalyticsChart />
    //       </div>
    //       <div className="col-md-4 mb-4">
    //         <MachineAnalyticsChart />
    //       </div>
    //     </div>
    //     <DataTableHeaderContainer
    //       onButtonClick={handleButtonClick}
    //       onAddButtonClick={handleModelClick}
    //       title={"Machines Details"}
    //       buttonTitle={"Add Machine"}
    //     />
    //     <DataTableComponent />
    //   </div>
    // </div>
    <div className="container-fluid p-4" style={{ background: "#f4f4f4" }}>
      <div className="row mb-4">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm p-3 border-0">
            <h6 className="mb-3 ms-3 me-3">Visual Indicators</h6>
            <MachineAnalyticsChart />
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm p-3 border-0">
            <h6 className="mb-3 ms-3 me-3">Visual Indicators</h6>
            <MachineAnalyticsChart />
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm p-3 border-0">
            <h6 className="mb-3 ms-3 me-3">Visual Indicators</h6>
            <ClientsPieChart />
          </div>
        </div>
      </div>

      <div className="card shadow-sm p-4 border-0">
        <DataTableHeaderContainer
          onButtonClick={handleButtonClick}
          onAddButtonClick={handleModelClick}
          title="Machines Details"
          buttonTitle="Add Machine"
        />
        <DataTableComponent />
      </div>
    </div>
  );
};

export default DashboardHome;
