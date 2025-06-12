// src/pages/dashboard/DashboardHome.jsx
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffAssignTaskRequest } from "../../features/staffAssignTask/StaffAssignTaskSlice";
import { sendEmailRequest } from "../../features/email/emailSlice";
import AddDeleteModal from "../modal/DeleteModal";
import { Navigate, useNavigate } from "react-router-dom";
const MaintenanceRecordManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataForDelete, setDataForDelete] = useState({});
  const [dataType, setDataType] = useState("MAINTANCERECORD");

  const staffAssignedTask = useSelector(
    (state) => state?.staffAssignTask?.data
  );
  const filteredTasks = staffAssignedTask?.filter((item) => {
    const search = filterData?.toLowerCase();

    if (!item?.taskId?.staffId || !item?.taskId?.machineId) return false;

    const staffFields = ["name", "email", "role", "phone"];

    const machineFields = ["location"];
    const itemFields = ["task"];

    const matchStaff = staffFields.some((key) =>
      item.taskId.staffId[key]?.toString().toLowerCase().includes(search)
    );

    const matchMachine = machineFields.some((key) =>
      item.taskId.machineId[key]?.toString().toLowerCase().includes(search)
    );

    return matchStaff || matchMachine;
  });
  const handleDataFromChild = (data) => {
    setFilterData(data);
  };

  const handleDelete = (row) => {
    setShowDeleteModal(true);
    setDataForDelete(row);
  };
  const handleEye = (data) => {
    navigate("/");
  };
  const handleEmail = (data) => {
    let emailData = {
      email: data?.taskId?.machineId?.recipientEmail,
      taskId: data._id,
    };
    dispatch(sendEmailRequest(emailData));
  };
  const handleDownload = (data) => {
    console.log(data);
  };
  const handleDeleteModal = useCallback((id) => {}, [dispatch]);
  useEffect(() => {
    dispatch(fetchStaffAssignTaskRequest());
  }, [dispatch]);
  return (
    <>
      {" "}
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
            title={"Maintenance Records"}
          />
          <DataTableComponent
            onUpdate={handleEye}
            onEmailSend={handleEmail}
            dataTableData={filteredTasks?.length > 0 ? filteredTasks : []}
            onDelete={handleDelete}
            dataTableType={dataType}
            onDownloadFile={handleDownload}
          />
        </div>
      </div>
    </>
  );
};

export default MaintenanceRecordManagement;
