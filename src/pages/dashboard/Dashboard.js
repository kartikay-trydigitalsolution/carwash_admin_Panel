// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useEffect, useState } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import ReportMachineAnalyticschart from "../layouts/ReportMachineAnalyticschart";
import InventoryChart from "../layouts/InventoryChart";
import ClientsPieChart from "../layouts/PieChart";
import AssignMachineModal from "../modal/AddMachine";
import { useDispatch, useSelector } from "react-redux";
import { fetchMixDataRequest } from "../../features/mixData/mixDataSlice";
import {
  fetchMachineRequest,
  deleteMachineRequest,
  createMachineRequest,
  updateMachineRequest,
} from "../../features/machine/MachineSlice";
import AddDeleteModal from "../modal/DeleteModal";
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
  useEffect(() => {
    dispatch(fetchMixDataRequest());
  }, []);
  const [filterData, setFilterData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataForUpdate, setDataForUpdate] = useState({});
  const [dataForDelete, setDataForDelete] = useState({});
  const [type, setType] = useState("ADD");
  const [dataType, setDataType] = useState("MACHINE");
  const machines = useSelector((state) => state?.machine?.data);
  const filteredMachines = machines?.filter((item) => {
    const fieldsToCheck = [
      "machine_model",
      "maintenance_alerts",
      "operation_status",
      "location",
      "machine_sr_no",
    ];
    return fieldsToCheck.some((key) =>
      item[key]?.toString().toLowerCase().includes(filterData.toLowerCase())
    );
  });
  const handleDataFromChild = (data) => {
    setFilterData(data);
  };
  const handleModelClick = useCallback((dataFromChild) => {
    setShowModal(true);
  }, []);
  const handleDataFromModal = useCallback(
    (data) => {
      data.type === "UPDATE"
        ? dispatch(updateMachineRequest(data))
        : dispatch(createMachineRequest(data));
      setShowModal(false);
      setType("ADD");
      setDataForUpdate({});
    },
    [dispatch]
  );
  useEffect(() => {
    dispatch(fetchMachineRequest());
  }, [dispatch]);

  const handleDelete = (row) => {
    setShowDeleteModal(true);
    setDataForDelete(row);
  };

  const handleUpdate = (data) => {
    setDataForUpdate(data);
    setType("UPDATE");
    setShowModal(true);
  };

  const handleDeleteModal = useCallback(
    (id) => {
      dispatch(deleteMachineRequest(id));
      setShowDeleteModal(false);
    },
    [dispatch]
  );
  return (
    <div className="container-fluid p-4">
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
        <AssignMachineModal
          data={dataForUpdate}
          type={type}
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setDataForUpdate({});
            setType("ADD");
          }}
          onSubmit={handleDataFromModal}
        />
        <AddDeleteModal
          data={dataForDelete}
          showDelete={showDeleteModal}
          onCloseDelete={() => setShowDeleteModal(false)}
          onDelete={handleDeleteModal}
          type={dataType}
        />
        <div className="w-100">
          <div className="card border-0 datatable_wrapper">
            <DataTableHeaderContainer
              onInputChange={handleDataFromChild}
              onAddButtonClick={handleModelClick}
              title={"Machines Details"}
              buttonTitle={"Add Machine"}
            />
            <DataTableComponent
              dataTableData={
                filteredMachines?.length > 0 ? filteredMachines : []
              }
              onDelete={handleDelete}
              onUpdate={(row) => handleUpdate(row)}
              dataTableType={dataType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
