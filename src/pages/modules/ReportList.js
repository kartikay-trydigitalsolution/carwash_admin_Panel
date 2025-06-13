// src/pages/dashboard/DashboardHome.jsx
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportMachineAnalyticschart from "../layouts/ReportMachineAnalyticschart";
import ClientsPieChart from "../layouts/PieChart";
import {
  fetchStaffAssignTaskRequest,
  deleteStaffAssignedTaskRequest,
} from "../../features/staffAssignTask/StaffAssignTaskSlice";
import { sendEmailRequest } from "../../features/email/emailSlice";
import AddDeleteModal from "../modal/DeleteModal";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchMixDataRequest } from "../../features/mixData/mixDataSlice";
import Inventorychart from "../layouts/InventoryChart";
const ReportManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataForDelete, setDataForDelete] = useState({});
  const [dataType, setDataType] = useState("REPORT");

  const staffAssignedTask = useSelector(
    (state) => state?.staffAssignTask?.data
  );
  const mixData = useSelector((state) => state?.mixData?.data);
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
    navigate(`/dashboard/service-form/${data?.taskId?._id}`);
  };
  const handleEmail = (data) => {
    if (data?.isFinalSubmition) {
      let emailData = {
        email: data?.taskId?.machineId?.recipientEmail,
        taskId: data._id,
      };
      dispatch(sendEmailRequest(emailData));
    } else {
      toast.error("Report not available yet.");
    }
  };
  const handleDownload = async (data) => {
    let url = `http://localhost:5000${data.pdfUrl}`;
    window.open(url, "_blank"); // Open in new tab
  };
  const handleDeleteModal = useCallback(
    (id) => {
      dispatch(deleteStaffAssignedTaskRequest(id));
      setShowDeleteModal(false);
    },
    [dispatch]
  );
  useEffect(() => {
    dispatch(fetchStaffAssignTaskRequest());
    dispatch(fetchMixDataRequest());
  }, [dispatch]);
  return (
    <div className="container-fluid p-4" style={{ background: "#f4f4f4" }}>
      <div className="row mb-4">
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm p-3 border-0">
            <h6 className="mb-3 ms-3 me-3">Visual Indicators</h6>
            <ReportMachineAnalyticschart mixData={mixData} />
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm p-3 border-0">
            <h6 className="mb-3 ms-3 me-3">Visual Indicators</h6>
            <Inventorychart mixData={mixData?.inventory} />
          </div>
        </div>
      </div>

      <>
        {" "}
        <AddDeleteModal
          data={dataForDelete}
          showDelete={showDeleteModal}
          onCloseDelete={() => setShowDeleteModal(false)}
          onDelete={handleDeleteModal}
          type={dataType}
        />
        <div className="w-100">
          <div className="card shadow-sm border-0 py-2 datatable_wrapper">
            <DataTableHeaderContainer
              onInputChange={handleDataFromChild}
              title={"Report & Analysis"}
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
    </div>
  );
};

export default ReportManagement;
