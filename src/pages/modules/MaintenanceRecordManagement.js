// src/pages/dashboard/DashboardHome.jsx
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffAssignTaskRequest } from "../../features/staffAssignTask/StaffAssignTaskSlice";
import { sendEmailRequest } from "../../features/email/emailSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const MaintenanceRecordManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState("");
  const [dataType, setDataType] = useState("MAINTANCERECORD");

  const staffAssignedTask = useSelector(
    (state) => state?.staffAssignTask?.data
  );
  console.log(staffAssignedTask);
  // const filteredTasks = staffAssignedTask?.filter((item) => {
  //   const search = filterData?.toLowerCase();
  //   if (!item?.taskId?.staffId || !item?.taskId?.machineId) return false;
  //   const staffFields = ["name"];
  //   const machineFields = ["location", "machine_sr_no"];
  //   const itemFields = ["task"];
  //   const matchStaff = staffFields.some((key) =>
  //     item.taskId.staffId[key]?.toString().toLowerCase().includes(search)
  //   );
  //   const matchMachine = machineFields.some((key) =>
  //     item.taskId.machineId[key]?.toString().toLowerCase().includes(search)
  //   );
  //   return matchStaff || matchMachine;
  // });
  const filteredTasks = staffAssignedTask?.filter((item) => {
    const search = filterData?.toLowerCase();
    if (!search) return true; // No search term, include all

    // Extract safely
    const staff = item?.taskId?.staffId;
    const machine = item?.taskId?.machineId;

    const staffFields = ["name"];
    const machineFields = ["location", "machine_sr_no"];

    const matchStaff = staffFields.some((key) =>
      staff?.[key]?.toString().toLowerCase().includes(search)
    );

    const matchMachine = machine
      ? machineFields.some((key) =>
          machine?.[key]?.toString().toLowerCase().includes(search)
        )
      : false;

    return matchStaff || matchMachine;
  });
  const handleDataFromChild = (data) => {
    setFilterData(data);
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
    if (data.isFinalSubmition) {
      let url = `http://localhost:5000${data.pdfUrl}`;
      window.open(url, "_blank"); // Open in new tab
    } else {
      toast.error("Report not available yet.");
    }
  };
  useEffect(() => {
    dispatch(fetchStaffAssignTaskRequest());
  }, [dispatch]);
  return (
    <>
      {" "}
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
            dataTableType={dataType}
            onDownloadFile={handleDownload}
          />
        </div>
      </div>
    </>
  );
};

export default MaintenanceRecordManagement;
