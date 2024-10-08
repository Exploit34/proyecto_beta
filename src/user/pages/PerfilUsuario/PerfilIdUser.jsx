import React, { useState, lazy, Suspense } from "react";
import "./PerfilUsuario.css";
import SideBar from "../../../common/sidebar/sidebar.jsx";
import { PerfilId } from "../../components/PerfilUsuario/PerfilId.jsx";

import TopBar from "../../../common/TopBar/TopBar.jsx";


export const PerfilIdUser = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div
      className={`div-general ${isSidebarExpanded ? "sidebar-expanded" : ""}`}
    >
      <TopBar toggleSidebar={toggleSidebar} />
      <SideBar />
      <PerfilId />
    </div>
  );
};
