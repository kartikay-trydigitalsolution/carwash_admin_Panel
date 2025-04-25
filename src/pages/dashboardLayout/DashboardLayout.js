// src/components/layout/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";

const dashboardLayout = () => {
  return (
    <div className="dashboardContainer">
      <Sidebar />
      <main className="mainContent relative">
        <Outlet />
      </main>
    </div>
  );
};

export default dashboardLayout;
