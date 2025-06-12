// src/pages/dashboard/DashboardHome.jsx
import { useCallback, useState, useEffect } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStaffRequest } from "../../features/staff/StaffSlice";
import {
  fetchAssignTaskRequest,
  deleteAssignTaskRequest,
} from "../../features/assignTask/AssignTaskSlice";
import AddDeleteModal from "../modal/DeleteModal";

const StaffAssignedManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataForDelete, setDataForDelete] = useState({});
  const [filterData, setFilterData] = useState("");
  const [dataType, setDataType] = useState("STAFF_ASSIGN_TASK");
  const staffDetails = useSelector((state) =>
    state?.staff?.data?.find((a_s) => a_s?._id === params?.id)
  );
  const assignTask = useSelector((state) =>
    state?.assignTask?.data.filter((a_s) => a_s.staffId?._id === params?.id)
  );
  const filteredTask = assignTask?.filter((item) => {
    const fieldsToCheck = [
      item.staffId?.name,
      item.staffId?.email,
      item.machineId?.machine_model,
      item.machineId?.machine_sr_no,
      item.machineId?.location,
      item.machineId?.operation_status,
      item.machineId?.maintenance_alerts,
      item.due_date,
    ];

    return fieldsToCheck.some((field) =>
      field?.toString().toLowerCase().includes(filterData.toLowerCase())
    );
  });
  const handleSatffDataFromChild = (data) => {
    setFilterData(data);
  };
  useEffect(() => {
    dispatch(fetchStaffRequest());
    dispatch(fetchAssignTaskRequest());
  }, [dispatch]);

  const handleDelete = (row) => {
    setShowDeleteModal(true);
    setDataForDelete(row);
  };

  const handleDeleteModal = useCallback(
    (id) => {
      dispatch(deleteAssignTaskRequest(id));
      setShowDeleteModal(false);
    },
    [dispatch]
  );
  const handleUpdate = (data) => {
    let url = null;
    if (!data.isCheckToolKit) {
      url = `/dashboard/service-form/${data._id}`;
    } else {
      url = `/dashboard/toolkit-form/${data._id}`;
    }
    navigate(url);
  };
  return (
    <>
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
            onInputChange={handleSatffDataFromChild}
            title={`${staffDetails?.name.toUpperCase()} TASKS`}
          />
          <DataTableComponent
            dataTableData={filteredTask?.length > 0 ? filteredTask : []}
            onDelete={handleDelete}
            onUpdate={(row) => handleUpdate(row)}
            dataTableType={dataType}
          />
        </div>
      </div>
    </>
  );
};

export default StaffAssignedManagement;
