import React, { useState, lazy, Suspense } from "react";
import "./PerfilUsuario.css";
import SideBar from "../../../common/sidebar/sidebar.jsx";
import { Perfil } from "../../components/PerfilUsuario/Perfil";

import TopBar from "../../../common/TopBar/TopBar.jsx";


export const PerfilUsuario = () => {
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
      <Perfil />
    </div>
  );
};
