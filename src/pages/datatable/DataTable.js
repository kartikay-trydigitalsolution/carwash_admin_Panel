import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = () => {
  const handleEdit = (row) => {
    console.log("Edit clicked!", row);
    // You can open a modal or redirect, etc.
  };

  const handleDelete = (row) => {
    console.log("Delete clicked!", row);
    // You can show a confirmation and remove from state
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

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold
          ${row.status === "Active" ? "bg-[#EBF9F1] text-[#1F9254]" : ""}
          ${row.status === "Inactive" ? "bg-[#A30D111A] text-[#A30D11]" : ""}
          ${
            row.status === "Not Available"
              ? "bg-orange-100 text-orange-500"
              : ""
          }
        `}
        >
          {row.status}
        </span>
      ),
    },
    { name: "Password", selector: (row) => row.password, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2 d-flex justify-content-center">
          <button variant="outline" size="icon" onClick={() => handleEdit(row)}>
            <i class="fas fa-edit"></i>
          </button>
          <button
            variant="destructive"
            size="icon"
            onClick={() => handleDelete(row)}
          >
            <i class="fas fa-trash-alt img-fluid border-0 shadow-none"></i>
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      password: "password123",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "Inactive",
      password: "password456",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "Editor",
      status: "Active",
      password: "alice123",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      role: "User",
      status: "Active",
      password: "bobpass",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      role: "Admin",
      status: "Inactive",
      password: "charliepass",
    },
    {
      id: 6,
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      role: "User",
      status: "Active",
      password: "emilypass",
    },
    {
      id: 7,
      name: "Frank Thomas",
      email: "frank.thomas@example.com",
      role: "Editor",
      status: "Active",
      password: "frank123",
    },
    {
      id: 8,
      name: "Grace Lee",
      email: "grace.lee@example.com",
      role: "User",
      status: "Inactive",
      password: "gracelee",
    },
    {
      id: 9,
      name: "Hannah Moore",
      email: "hannah.moore@example.com",
      role: "Admin",
      status: "Active",
      password: "hannahpass",
    },
    {
      id: 10,
      name: "Ian Martinez",
      email: "ian.martinez@example.com",
      role: "User",
      status: "Active",
      password: "ianpass",
    },
    {
      id: 11,
      name: "Jack Taylor",
      email: "jack.taylor@example.com",
      role: "Editor",
      status: "Inactive",
      password: "jackpass",
    },
    {
      id: 12,
      name: "Karen White",
      email: "karen.white@example.com",
      role: "User",
      status: "Active",
      password: "karen123",
    },
    {
      id: 13,
      name: "Leo Harris",
      email: "leo.harris@example.com",
      role: "Admin",
      status: "Active",
      password: "leopass",
    },
    {
      id: 14,
      name: "Mia Clark",
      email: "mia.clark@example.com",
      role: "User",
      status: "Inactive",
      password: "miapass",
    },
    {
      id: 15,
      name: "Nathan Lewis",
      email: "nathan.lewis@example.com",
      role: "Editor",
      status: "Active",
      password: "nathan123",
    },
    {
      id: 16,
      name: "Olivia Hall",
      email: "olivia.hall@example.com",
      role: "User",
      status: "Active",
      password: "oliviapass",
    },
    {
      id: 17,
      name: "Paul Allen",
      email: "paul.allen@example.com",
      role: "Admin",
      status: "Inactive",
      password: "paulpass",
    },
    {
      id: 18,
      name: "Quinn Young",
      email: "quinn.young@example.com",
      role: "User",
      status: "Active",
      password: "quinn123",
    },
    {
      id: 19,
      name: "Rachel King",
      email: "rachel.king@example.com",
      role: "Editor",
      status: "Active",
      password: "rachelpass",
    },
    {
      id: 20,
      name: "Sam Scott",
      email: "sam.scott@example.com",
      role: "User",
      status: "Inactive",
      password: "sam123",
    },
    {
      id: 21,
      name: "Tina Green",
      email: "tina.green@example.com",
      role: "Admin",
      status: "Active",
      password: "tinapass",
    },
    {
      id: 22,
      name: "Uma Baker",
      email: "uma.baker@example.com",
      role: "User",
      status: "Active",
      password: "umapass",
    },
    {
      id: 23,
      name: "Victor Adams",
      email: "victor.adams@example.com",
      role: "Editor",
      status: "Inactive",
      password: "victor123",
    },
    {
      id: 24,
      name: "Wendy Nelson",
      email: "wendy.nelson@example.com",
      role: "User",
      status: "Active",
      password: "wendypass",
    },
    {
      id: 25,
      name: "Xander Price",
      email: "xander.price@example.com",
      role: "Admin",
      status: "Active",
      password: "xander123",
    },
    {
      id: 26,
      name: "Yara Bell",
      email: "yara.bell@example.com",
      role: "User",
      status: "Inactive",
      password: "yarapass",
    },
    {
      id: 27,
      name: "Zack Reed",
      email: "zack.reed@example.com",
      role: "Editor",
      status: "Active",
      password: "zackpass",
    },
    {
      id: 28,
      name: "Aaron Cook",
      email: "aaron.cook@example.com",
      role: "User",
      status: "Active",
      password: "aaron123",
    },
    {
      id: 29,
      name: "Bella Gray",
      email: "bella.gray@example.com",
      role: "Admin",
      status: "Inactive",
      password: "bellapass",
    },
    {
      id: 30,
      name: "Caleb Ward",
      email: "caleb.ward@example.com",
      role: "User",
      status: "Active",
      password: "calebpass",
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
        columns={columns}
        data={data}
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
