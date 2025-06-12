// src/pages/dashboard/DashboardHome.jsx
import { useCallback, useState, useEffect, useMemo } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import AssignMaintenanceModal from "../modal/AssignedMaintenace";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStaffRequest } from "../../features/staff/StaffSlice";
import {
  createAssignTaskRequest,
  fetchAssignTaskRequest,
} from "../../features/assignTask/AssignTaskSlice";
import { fetchMachineRequest } from "../../features/machine/MachineSlice";
import AddDeleteModal from "../modal/DeleteModal";

const AssignedManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [dataForUpdate, setDataForUpdate] = useState({});
  const [type, setType] = useState("ADD");
  const [filterData, setFilterData] = useState("");
  const [dataType, setDataType] = useState("ASSIGN_TASK");
  const staff = useSelector((state) =>
    state?.staff?.data?.map(({ _id, name, role }) => ({ id: _id, name, role }))
  );
  const assignTask = useSelector((state) => state?.assignTask?.data);
  const taskCountByStaff = useMemo(() => {
    if (!Array.isArray(assignTask)) return [];
    const grouped = assignTask?.reduce((acc, item) => {
      const staffId = item?.staffId?._id;
      if (!acc[staffId]) {
        acc[staffId] = {
          staffId: staffId,
          name: item?.staffId?.name,
          email: item?.staffId?.email,
          role: item?.staffId?.role,
          taskCount: 0,
        };
      }
      acc[staffId].taskCount += 1;
      return acc;
    }, {});
    return Object.values(grouped);
  }, [assignTask]);

  const machine = useSelector((state) =>
    state?.machine?.data?.map(
      ({ _id, machine_sr_no, location, machine_model }) => ({
        id: _id,
        machine_sr_no,
        location,
        machine_model,
      })
    )
  );
  const handleDataFromChild = (data) => {
    setFilterData(data);
  };
  const handleModelClick = useCallback((dataFromChild) => {
    setShowModal(true);
  }, []);
  const handleDataFromModal = useCallback(
    (data) => {
      data.type === "UPDATE"
        ? dispatch()
        : dispatch(createAssignTaskRequest(data));
      setShowModal(false);
      setType("ADD");
      setDataForUpdate({});
    },
    [dispatch]
  );
  useEffect(() => {
    dispatch(fetchStaffRequest());
    dispatch(fetchMachineRequest());
    dispatch(fetchAssignTaskRequest());
  }, [dispatch]);

  const handleUpdate = (data) => {
    console.log(data);
    navigate(`/dashboard/staff-assigned-management/${data.staffId}`);
  };

  return (
    <>
      <AssignMaintenanceModal
        data={dataForUpdate}
        type={type}
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setDataForUpdate({});
          setType("ADD");
        }}
        machine={machine?.length > 0 ? machine : []}
        staff={staff?.length > 0 ? staff : []}
        onSubmit={handleDataFromModal}
      />
      <div className="p-5 w-full flex justify-center">
        <div className="card shadow-sm border-0 pt-4 datatable_wrapper w-full max-w-screen-lg">
          <DataTableHeaderContainer
            onInputChange={handleDataFromChild}
            onAddButtonClick={handleModelClick}
            title={"Assigned Staff"}
            buttonTitle={"Assign Task"}
          />
          <DataTableComponent
            dataTableData={taskCountByStaff?.length > 0 ? taskCountByStaff : []}
            onUpdate={(row) => handleUpdate(row)}
            dataTableType={dataType}
          />
        </div>
      </div>
    </>
  );
};

export default AssignedManagement;
