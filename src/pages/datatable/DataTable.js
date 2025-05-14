import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = ({
  dataTableData,
  onDelete,
  onUpdate,
  dataTableType,
}) => {
  const handleDelete = (row) => {
    onDelete?.(row); // or onDelete(row) if you're passing the full object
  };
  const handleEdit = (row) => {
    onUpdate?.(row); // or onDelete(row) if you're passing the full object
  };
  const customStyles = {
    table: {
      style: {
        border: "none", // ✅ Remove overall border
      },
    },
    headRow: {
      style: {
        border: "none", // ✅ Remove header border
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#fff", // Optional white header
        border: "none",
      },
    },
    rows: {
      style: (row, index) => ({
        // marginBottom: "10px", // ✅ Space between rows
        border: "none",
        // borderRadius: "8px", // ✅ Rounded row corners
        paddingTop: "12px",
        paddingBottom: "12px",
      }),
    },
    cells: {
      style: {
        border: "none", // ✅ Remove cell borders
      },
    },
    pagination: {
      style: {
        border: "none", // ✅ Remove pagination border
        boxShadow: "none",
        marginTop: "20px",
      },
    },
  };

  const staffColumns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    // {
    //   name: "Status",
    //   cell: (row) => (
    //     <span
    //       className={`px-3 py-1 rounded-full text-sm font-semibold
    //       ${row.status === "Active" ? "bg-[#EBF9F1] text-[#1F9254]" : ""}
    //       ${row.status === "Inactive" ? "bg-[#A30D111A] text-[#A30D11]" : ""}
    //       ${
    //         row.status === "Not Available"
    //           ? "bg-orange-100 text-orange-500"
    //           : ""
    //       }
    //     `}
    //     >
    //       {row.status}
    //     </span>
    //   ),
    // },
    { name: "Password", selector: (row) => row.password, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2 d-flex justify-content-center">
          <button variant="outline" size="icon" onClick={() => handleEdit(row)}>
            <i className="fas fa-edit"></i>
          </button>
          <button
            variant="destructive"
            size="icon"
            onClick={() => handleDelete(row)}
          >
            <i className="fas fa-trash-alt img-fluid border-0 shadow-none"></i>
          </button>
        </div>
      ),
    },
  ];

  const machineColumns = [
    {
      name: "Machine Model",
      selector: (row) => row.machine_model,
      sortable: true,
    },
    {
      name: "Machine Serial No.",
      selector: (row) => row.machine_sr_no,
      sortable: true,
    },
    { name: "Location", selector: (row) => row.location, sortable: true },
    {
      name: "Operational Status",
      sortable: true,
      cell: (row) => {
        const statusRaw = row.operation_status || "Unknown";
        const status = statusRaw.toLowerCase();

        const statusMap = {
          active: "bg-light-green text-success",
          in_maintenance: "bg-light-yellow text-warning",
          inactive: "bg-light-red text-danger",
        };

        // Capitalize first letter
        const formatStatus = (str) =>
          str.charAt(0).toUpperCase() + str.slice(1);

        return (
          <span
            className={`rounded-pill px-3 py-1 fw-semibold ${
              statusMap[status] || "bg-secondary text-white"
            }`}
          >
            {formatStatus(status)}
          </span>
        );
      },
    },
    {
      name: "Maintenance Alerts",
      sortable: true,
      cell: (row) => {
        const statusRaw = row.maintenance_alerts || "Unknown";
        const status = statusRaw.toLowerCase();

        const statusMap = {
          overdue: "bg-light-red text-danger",
          upcoming: "bg-light-yellow text-warning",
        };

        // Capitalize first letter
        const formatStatus = (str) =>
          str.charAt(0).toUpperCase() + str.slice(1);

        return (
          <span
            className={`rounded-pill px-3 py-1 fw-semibold ${
              statusMap[status] || "bg-secondary text-white"
            }`}
          >
            {formatStatus(status)}
          </span>
        );
      },
    },
    // {
    //   name: "Status",
    //   cell: (row) => (
    //     <span
    //       className={`px-3 py-1 rounded-full text-sm font-semibold
    //       ${row.status === "Active" ? "bg-[#EBF9F1] text-[#1F9254]" : ""}
    //       ${row.status === "Inactive" ? "bg-[#A30D111A] text-[#A30D11]" : ""}
    //       ${
    //         row.status === "Not Available"
    //           ? "bg-orange-100 text-orange-500"
    //           : ""
    //       }
    //     `}
    //     >
    //       {row.status}
    //     </span>
    //   ),
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2 d-flex justify-content-center">
          <button variant="outline" size="icon" onClick={() => handleEdit(row)}>
            <i className="fas fa-edit"></i>
          </button>
          <button
            variant="destructive"
            size="icon"
            onClick={() => handleDelete(row)}
          >
            <i className="fas fa-trash-alt img-fluid border-0 shadow-none"></i>
          </button>
        </div>
      ),
    },
  ];

  const contextActions = useMemo(
    () => [
      <button
        key="delete"
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          console.log("Delete clicked!");
        }}
      >
        Delete
      </button>,
    ],
    []
  );

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  return (
    <div className="p-4 datatable">
      <DataTable
        columns={
          dataTableType == "STAFF"
            ? staffColumns
            : dataTableType == "MACHINE"
            ? machineColumns
            : machineColumns
        }
        data={dataTableData}
        contextActions={contextActions}
        onSelectedRowsChange={handleSelectedRowsChange}
        pagination
        paginationPerPage={10}
        customStyles={customStyles}
      />
    </div>
  );
};

export default DataTableComponent;
