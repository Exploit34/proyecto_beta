import React from "react";
import "./home.css";
import SideBar from "../../components/sidebar/sidebar.jsx";
import LoginRegister from "../../components/Home/LoginRegister.jsx";
import Publications from "../../../common/Publications/Publications.jsx";

const Home = () => {
  return (
    <div className="div-general">
      <SideBar />
      <Publications />
      <LoginRegister />
    </div>
  );
};

export default Home;
