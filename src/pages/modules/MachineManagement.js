// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState, useEffect } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import AssignMachineModal from "../modal/AddMachine";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRequest,
  deleteRequest,
  createRequest,
  updateRequest,
} from "../../features/machine/MachineSlice";
import AddDeleteModal from "../modal/DeleteModal";
const MachineManagement = () => {
  const dispatch = useDispatch();
  const [parentMessage, setParentMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataForUpdate, setDataForUpdate] = useState({});
  const [dataForDelete, setDataForDelete] = useState({});
  const [type, setType] = useState("ADD");
  const [dataTableType, setDataTableType] = useState("MACHINE");
  const machines = useSelector((state) => state?.machine?.data);
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
  const handleDataFromModal = useCallback(
    (data) => {
      data.type == "UPDATE"
        ? dispatch(updateRequest(data))
        : dispatch(createRequest(data));
      setShowModal(false);
      setType("ADD");
      setDataForUpdate({});
    },
    [dispatch]
  );
  useEffect(() => {
    dispatch(fetchRequest());
  }, []);

  const handleDelete = useCallback((row) => {
    setShowDeleteModal(true);
    setDataForDelete(row);
    // dispatch(deleteRequest(row._id)); // Replace with your Redux action
    // dispatch(fetchRequest());
  });

  const handleUpdate = useCallback((data) => {
    setDataForUpdate(data);
    setType("UPDATE");
    setShowModal(true);
  });

  const handleDeleteModal = useCallback(
    (id) => {
      dispatch(deleteRequest(id));
      setShowDeleteModal(false);
      dispatch(fetchRequest());
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
      />
      <div className="p-5 w-100">
        <div className="card shadow-sm border-0 pt-4 datatable_wrapper">
          <DataTableHeaderContainer
            onButtonClick={handleButtonClick}
            onAddButtonClick={handleModelClick}
            title={"Machines Details"}
            buttonTitle={"Add Machine"}
          />
          <DataTableComponent
            dataTableData={machines?.length > 0 ? machines : []}
            onDelete={handleDelete}
            onUpdate={(row) => handleUpdate(row)}
            dataTableType={dataTableType}
          />
        </div>
      </div>
    </>
  );
};

export default MachineManagement;
