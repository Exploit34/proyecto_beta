import React from "react";
import "./TopBar.css";
import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../../user/components/searchBar/SearchBar.jsx";
import { Icon } from "@iconify/react";
import { useState } from "react";

const TopBar = ({ toggleSidebar }) => {
  const location = useLocation();
  const activeLinkStyle = {
    color: 'blue'
  };
  return (
    <div>
      {!(location.pathname === "/HomeCompany") ? (
        <div className="top-bar">
          <NavLink to="/">
            <img src="https://firebasestorage.googleapis.com/v0/b/marketshare-c5720.appspot.com/o/logo%2F2.png?alt=media&token=185dc8fe-2d51-4934-b199-ef325ce64022" alt="" className="img-top-bar" />
          </NavLink>

          <SearchBar></SearchBar>
          <button className="hide-sidebar-button" onClick={toggleSidebar}>
            <Icon icon="vaadin:lines" width="1.2em" height="1.2em" />
          </button>
        </div>
      ) :
        <div>
          <div className="top-Company">
            <div className="imgAndSearch">
              <NavLink to="/HomeCompany">
                <img src="./img/2.png" alt="" className="img-top-bar" />
              </NavLink>

              <SearchBar></SearchBar>
              <button className="hide-sidebar-button" onClick={toggleSidebar}>
                <Icon icon="vaadin:lines" width="1.2em" height="1.2em" />
              </button>
            </div>
            <div className="Nav">
              <NavLink className="Inicio" activeStyle={activeLinkStyle} to="/">
                <span className="icon">
                  <i className="ri-home-8-line"></i>
                </span>
              </NavLink>
              <NavLink className="Inicio" activeClassName="active" to="/">
                <span className="icon">
                  <i className="ri-function-line"></i>
                </span>
              </NavLink>
              <NavLink className="Inicio" activeClassName="active" to="/">
                <span className="icon">
                  <i className="ri-notification-4-line"></i>
                </span>
              </NavLink>
              <NavLink className="Inicio" activeClassName="active" to="/">
                <span className="icon">
                  <i className="ri-mail-unread-fill"></i>
                </span>
              </NavLink>
              <NavLink className="Inicio" activeClassName="active" to="/">
                <span className="icon">
                  <i className="ri-align-justify"></i>
                </span>
              </NavLink>
              <NavLink className="Inicio" activeClassName="active" to="/">
                <span className="icon">
                  <i className="ri-settings-5-line"></i>
                </span>
              </NavLink>
              <NavLink className="Inicio" activeClassName="active" to="/">
                <span className="icon">
                  <i className="ri-profile-line"></i>
                </span>
              </NavLink>
              <NavLink className="Inicio" activeClassName="active" to="/">
                <span className="icon">
                  <i class="ri-user-line"></i>
                </span>
              </NavLink>
              <NavLink className="Inicio" activeClassName="active" onClick={() => {console.log("hola")}} to="/ProfileUser">
                <span className="icon">
                  <i className="ri-logout-box-r-line"></i>
                </span>
              </NavLink>
              {/* <button className="button-logout">
                <span>
                  <i className="ri-logout-box-r-line"></i>
                </span>
              </button> */}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default TopBar;
