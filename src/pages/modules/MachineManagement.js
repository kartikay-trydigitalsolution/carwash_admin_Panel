// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState, useEffect } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import AssignMachineModal from "../modal/AddMachine";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMachineRequest,
  deleteMachineRequest,
  createMachineRequest,
  updateMachineRequest,
} from "../../features/machine/MachineSlice";
import AddDeleteModal from "../modal/DeleteModal";
const MachineManagement = () => {
  const dispatch = useDispatch();
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
    <>
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
      <div className="p-5 w-100">
        <div className="card shadow-sm border-0 pt-4 datatable_wrapper">
          <DataTableHeaderContainer
            onInputChange={handleDataFromChild}
            onAddButtonClick={handleModelClick}
            title={"Machines Details"}
            buttonTitle={"Add Machine"}
          />
          <DataTableComponent
            dataTableData={filteredMachines?.length > 0 ? filteredMachines : []}
            onDelete={handleDelete}
            onUpdate={(row) => handleUpdate(row)}
            dataTableType={dataType}
          />
        </div>
      </div>
    </>
  );
};

export default MachineManagement;
