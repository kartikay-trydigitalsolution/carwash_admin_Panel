// src/pages/dashboard/DashboardHome.jsx
import React, { useCallback, useState, useEffect } from "react";
import DataTableHeaderContainer from "../components/DataTableHeaderContainer";
import DataTableComponent from "../datatable/DataTable";
import AddInventoryModal from "../modal/AddInventory";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInventoryRequest,
  deleteInventoryRequest,
  createInventoryRequest,
  updateInventoryRequest,
} from "../../features/inventory/InventorySlice";
import AddDeleteModal from "../modal/DeleteModal";
const InventoryManagement = () => {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState("");
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataForUpdate, setDataForUpdate] = useState({});
  const [dataForDelete, setDataForDelete] = useState({});
  const [type, setType] = useState("ADD");
  const [dataType, setDataType] = useState("INVENTORY");
  const inventory = useSelector((state) => state.inventory.data);
  const handleDataFromChild = (data) => {
    setFilterData(data);
  };
  const filteredInventries = inventory?.filter((item) => {
    const fieldsToCheck = [
      "itemName",
      "usedQuantity",
      "quantity",
      "notification",
      "remarks",
    ];
    return fieldsToCheck.some((key) =>
      item[key]?.toString().toLowerCase().includes(filterData.toLowerCase())
    );
  });
  const handleModelClick = useCallback((dataFromChild) => {
    setShowInventoryModal(true);
  }, []);
  const handleDataFromModal = useCallback(
    (data) => {
      data.type === "UPDATE"
        ? dispatch(updateInventoryRequest(data))
        : dispatch(createInventoryRequest(data));
      setShowInventoryModal(false);
      setType("ADD");
      setDataForUpdate({});
    },
    [dispatch]
  );
  useEffect(() => {
    dispatch(fetchInventoryRequest());
  }, [dispatch]);

  const handleDelete = (row) => {
    setShowDeleteModal(true);
    setDataForDelete(row);
  };

  const handleUpdate = (data) => {
    setDataForUpdate(data);
    setType("UPDATE");
    setShowInventoryModal(true);
  };

  const handleDeleteModal = useCallback(
    (id) => {
      dispatch(deleteInventoryRequest(id));
      setShowDeleteModal(false);
      dispatch(fetchInventoryRequest());
    },
    [dispatch]
  );
  return (
    <>
      <AddInventoryModal
        data={dataForUpdate}
        type={type}
        show={showInventoryModal}
        onClose={() => {
          setShowInventoryModal(false);
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
            title={"Inventory Details"}
            buttonTitle={"Add Items"}
          />
          <DataTableComponent
            dataTableData={
              filteredInventries?.length > 0 ? filteredInventries : []
            }
            onDelete={handleDelete}
            onUpdate={(row) => handleUpdate(row)}
            dataTableType={dataType}
          />
        </div>
      </div>
    </>
  );
};

export default InventoryManagement;
