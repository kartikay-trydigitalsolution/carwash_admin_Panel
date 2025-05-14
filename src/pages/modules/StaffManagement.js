// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState, useEffect } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import { useDispatch, useSelector } from "react-redux";
import DataTableComponent from "../datatable/DataTable";
import { toast } from "sonner";

import {
  fetchRequest,
  deleteRequest,
  createRequest,
  updateRequest,
} from "../../features/staff/StaffSlice";
import AddStaffModal from "../modal/AddStaffModal";
import AddDeleteModal from "../modal/DeleteModal";
const StaffManagement = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataForUpdate, setDataForUpdate] = useState({});
  const [dataForDelete, setDataForDelete] = useState({});
  const [type, setType] = useState("ADD");
  const [parentMessage, setParentMessage] = useState("");  
  const [dataTableType, setDataTableType] = useState("STAFF");  
  const staff = useSelector((state) => state?.staff?.data);
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
      // dispatch(createRequest(data));
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
      <AddStaffModal
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
            title={"Staff List"}
            buttonTitle={"Add Staff"}
          />
          <DataTableComponent
            dataTableData={staff?.length > 0 ? staff : []}
            onDelete={handleDelete}
            onUpdate={(row) => handleUpdate(row)}
            dataTableType={dataTableType}
          />
        </div>
      </div>
    </>
  );
};

export default StaffManagement;
