import React from "react";
import { NavLink } from "react-router-dom";
import side_logo from "../../assets/images/navbar_logo.svg"
import "./Sidebar.css";
import StyledImageInline from "../components/Image";

const sidebar=  ()=> {
  return (
    <div className="sidebar d-flex flex-column">
      {/* Header */}
      <div className="sidebar-header">
        <StyledImageInline src={side_logo} alt="logo" />
        <div className="sidebar-title">Admin Panel</div>
      </div>

      {/* Nav Items */}
      <nav className="nav flex-column mt-2">
        <NavLink to="/dashboard" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Home
        </NavLink>
        <NavLink to="/dashboard/staff-management" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Staff Management
        </NavLink>
        <NavLink to="/dashboard/assigned-management" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Assigned Maintenance
        </NavLink>
        <NavLink to="/dashboard/machine-management" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Machine Management
        </NavLink>
        <NavLink to="/dashboard/maintenance-record-management" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Maintenance Record Management
        </NavLink>
        <NavLink to="/dashboard/recepient-list-management" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Recipient List Management
        </NavLink>
        <NavLink to="/inventory-management" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Inventory Management
        </NavLink>
        <NavLink to="/master-data" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Master Data Management
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Reports & Analytics
        </NavLink>
        <NavLink to="/profile-settings" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Profile Settings
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="logout-btn mt-auto">
        <NavLink to="/logout" className="text-white text-decoration-none d-block fw-light">
          LOGOUT
        </NavLink>
      </div>
    </div>

  );
};

export default sidebar;