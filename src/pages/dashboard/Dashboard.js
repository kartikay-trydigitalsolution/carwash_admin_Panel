// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useEffect, useState } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import ReportMachineAnalyticschart from "../layouts/ReportMachineAnalyticschart";
import InventoryChart from "../layouts/InventoryChart";
import ClientsPieChart from "../layouts/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchMixDataRequest } from "../../features/mixData/mixDataSlice";

const DashboardHome = () => {
  const dispatch = useDispatch();
  const [parentMessage, setParentMessage] = useState("");
  const [showModel, setShowModel] = useState(false);
  const mixData = useSelector((state) => state?.mixData?.data);
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
  useEffect(() => {
    dispatch(fetchMixDataRequest());
  }, []);
  return (
    <div className="container-fluid p-4" style={{ background: "#f4f4f4" }}>
      <div className="row mb-4">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm p-3 border-0">
            <h6 className="mb-3 ms-3 me-3">Visual Indicators</h6>
            <ReportMachineAnalyticschart mixData={mixData} />
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm p-3 border-0">
            <h6 className="mb-3 ms-3 me-3">Visual Indicators</h6>
            <InventoryChart mixData={mixData?.inventory} />
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm p-3 border-0 h-100">
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
