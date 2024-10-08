import React, { useState } from "react";
import SideBar from "../../../common/sidebar/sidebar.jsx";

import TopBar from "../../../common/TopBar/TopBar.jsx";
import { Stories } from "../../components/Start/Stories/Stories.jsx";
// import Publications from "../../../common/Publications/Publications.jsx";

export const Start = () => {
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
      <Stories></Stories>
    </div>
  );
};
