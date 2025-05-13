// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState, useEffect } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import { useDispatch, useSelector } from "react-redux";
import DataTableComponent from "../datatable/DataTable";
import {
  fetchRequest,
  resetSuccess,
  deleteRequest,
  createRequest,
} from "../../features/staff/StaffSlice";
import AddStaffModal from "../modal/AddStaffModal";
const StaffManagement = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [parentMessage, setParentMessage] = useState("");
  const staff = useSelector((state) => state.staff.data.user);
  const success = useSelector((state) => state?.staff?.data?.success);
  console.log(success, "success");
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
  const handleDataFromModal = useCallback((data) => {
    // setModalData(data); // Save or use the data
    console.log("Received from modal:", data);
    dispatch(createRequest(data));
  });
  const handleAddStaffSuccess = useCallback(() => {
    dispatch(fetchRequest());
    dispatch(resetSuccess());
    setShowModal(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRequest());
    setShowModal(false);
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteRequest(id)); // Replace with your Redux action
    dispatch(fetchRequest());
  };

  const handleUpdate = (id) => {};
  return (
    <>
      <AddStaffModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => handleAddStaffSuccess()}
        parentData={handleDataFromModal}
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
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </>
  );
};

export default StaffManagement;
