// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState, useEffect } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import { useDispatch, useSelector } from "react-redux";
import DataTableComponent from "../datatable/DataTable";

import {
  fetchStaffRequest,
  deleteStaffRequest,
  createStaffRequest,
  updateStaffRequest,
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
  const [filterData, setFilterData] = useState("");
  const [dataType, setDataType] = useState("STAFF");
  const staff = useSelector((state) => state?.staff?.data);
  const filteredStaff = staff?.filter((item) => {
    const fieldsToCheck = ["name", "email", "phone", "role"];
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
      // dispatch(createRequest(data));
      data.type === "UPDATE"
        ? dispatch(updateStaffRequest(data))
        : dispatch(createStaffRequest(data));
      setShowModal(false);
      setType("ADD");
      setDataForUpdate({});
    },
    [dispatch]
  );
  useEffect(() => {
    dispatch(fetchStaffRequest());
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
      dispatch(deleteStaffRequest(id));
      setShowDeleteModal(false);
      dispatch(fetchStaffRequest());
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
        type={dataType}
      />
      <div className="p-5 w-100">
        <div className="card shadow-sm border-0 pt-4 datatable_wrapper">
          <DataTableHeaderContainer
            onInputChange={handleDataFromChild}
            onAddButtonClick={handleModelClick}
            title={"Staff List"}
            buttonTitle={"Add Staff"}
          />
          <DataTableComponent
            dataTableData={filteredStaff?.length > 0 ? filteredStaff : []}
            onDelete={handleDelete}
            onUpdate={(row) => handleUpdate(row)}
            dataTableType={dataType}
          />
        </div>
      </div>
    </>
  );
};

export default StaffManagement;
