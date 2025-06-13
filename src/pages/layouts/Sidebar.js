import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import side_logo from "../../assets/images/navbar_logo.svg";
import "./Sidebar.css";
import StyledImageInline from "../components/Image";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../features/auth/AuthSlice";
import { persistor } from "../../redux/Store";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRole = useSelector((state) => state?.auth?.userRole);
  const isRoleId = useSelector((state) => state?.auth?.userData?._id);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async (e) => {
    dispatch(logoutRequest());
    persistor.purge();
    navigate("/");
  };

  return (
    <>
      {/* Toggle Button for Tablets */}
      <button className="sidebar-toggle-btn d-lg-none" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar d-flex flex-column ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <StyledImageInline src={side_logo} alt="logo" />
          <div className="sidebar-title">Admin Panel</div>
        </div>

        {/* Nav Items */}
        {isRole == "Admin" ? (
          <nav className="nav flex-column mt-2">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard/staff-management"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Staff Management
            </NavLink>
            <NavLink
              to="/dashboard/assigned-management"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Assigned Maintenance
            </NavLink>
            <NavLink
              to="/dashboard/machine-management"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Machine Management
            </NavLink>
            <NavLink
              to="/dashboard/maintenance-record-management"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Maintenance Record Management
            </NavLink>
            <NavLink
              to="/dashboard/recepient-list-management"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Recipient List Management
            </NavLink>
            <NavLink
              to="/dashboard/inventory-management"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Inventory Management
            </NavLink>
            <NavLink
              to="/dashboard/reports"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Reports & Analytics
            </NavLink>
            <NavLink
              to="/dashboard/my-profile"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Profile Settings
            </NavLink>
          </nav>
        ) : isRole == "Technician" ? (
          <nav className="nav flex-column mt-2">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={`/dashboard/staff-assigned-management/${isRoleId}`}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              My Assigned Maintenance
            </NavLink>
            <NavLink
              to="/dashboard/my-profile"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Profile Settings
            </NavLink>
          </nav>
        ) : (
          <nav className="nav flex-column mt-2">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard/inventory-management"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Inventory Management
            </NavLink>
            <NavLink
              to="/dashboard/my-profile"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Profile Settings
            </NavLink>
          </nav>
        )}

        {/* Logout */}
        <div className="logout-btn mt-auto">
          <NavLink
            to="/"
            className="text-white text-decoration-none d-block fw-light"
            onClick={handleLogout}
          >
            LOGOUT
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
