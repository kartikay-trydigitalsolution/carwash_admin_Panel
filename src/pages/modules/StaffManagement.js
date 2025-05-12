// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState, useEffect } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import { useDispatch, useSelector } from "react-redux";
import DataTableComponent from "../datatable/DataTable";
import { fetchRequest } from "../../features/staff/StaffSlice";
import AddStaffModal from "../modal/AddStaffModal";
const StaffManagement = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [parentMessage, setParentMessage] = useState("");
  const staff = useSelector((state) => state.staff.data.user);
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
  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);
  return (
    <>
      <AddStaffModal show={showModal} onClose={() => setShowModal(false)} />
      <div className="p-5 w-100">
        <div className="card shadow-sm border-0 pt-4 datatable_wrapper">
          <DataTableHeaderContainer
            onButtonClick={handleButtonClick}
            onAddButtonClick={handleModelClick}
            title={"Staff List"}
            buttonTitle={"Add Staff"}
          />
          <DataTableComponent dataTableData={staff?.length > 0 ? staff : []} />
        </div>
      </div>
    </>
  );
};

export default StaffManagement;
