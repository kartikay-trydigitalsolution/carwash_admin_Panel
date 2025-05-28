// src/pages/dashboard/DashboardHome.jsx
import { useCallback, useState, useEffect } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import AssignMaintenanceModal from "../modal/AssignedMaintenace";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffRequest } from "../../features/staff/StaffSlice";
import { createAssignTaskRequest } from "../../features/assignTask/AssignTaskSlice";
import { fetchMachineRequest } from "../../features/machine/MachineSlice";
import AddDeleteModal from "../modal/DeleteModal";

const AssignedManagement = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataForUpdate, setDataForUpdate] = useState({});
  const [dataForDelete, setDataForDelete] = useState({});
  const [type, setType] = useState("ADD");
  const [parentMessage, setParentMessage] = useState("");
  const [dataType, setDataType] = useState("STAFF");
  const staff = useSelector((state) =>
    state?.staff?.data.map(({ _id, name, role }) => ({ id: _id, name, role }))
  );
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
  const handleButtonClick = useCallback((dataFromChild) => {
    setParentMessage(dataFromChild);
  }, []);
  const handleModelClick = useCallback((dataFromChild) => {
    setShowModal(true);
  }, []);
  const handleDataFromModal = useCallback(
    (data) => {
      // dispatch(createRequest(data));
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
      // dispatch(deleteStaffRequest(id));
      setShowDeleteModal(false);
      dispatch(fetchStaffRequest());
    },
    [dispatch]
  );
  return (
    // <>
    //   {showModal && (
    //     <AssignMaintenanceModal
    //       show={showModal}
    //       onClose={() => setShowModal(false)}
    //     />
    //   )}
    //   <div className="p-5 w-100">
    //     <div className="card shadow-sm border-0 pt-4 datatable_wrapper">
    //       <DataTableHeaderContainer
    //         onButtonClick={handleButtonClick}
    //         onAddButtonClick={handleModelClick}
    //         title={"Assigned Staff"}
    //         buttonTitle={"Assign Task"}
    //       />
    //       <DataTableComponent />
    //     </div>
    //   </div>
    // </>
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
        machine={machine}
        staff={staff}
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
            onButtonClick={handleButtonClick}
            onAddButtonClick={handleModelClick}
            title={"Assigned Staff"}
            buttonTitle={"Assign Task"}
          />
          <DataTableComponent
            dataTableData={staff?.length > 0 ? staff : []}
            onDelete={handleDelete}
            onUpdate={(row) => handleUpdate(row)}
            dataTableType={dataType}
          />
        </div>
      </div>
    </>
  );
};

export default AssignedManagement;
