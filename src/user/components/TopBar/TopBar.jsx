import React, { useState } from "react";
import "./TopBar.css";
import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar.jsx";
import { Icon } from "@iconify/react";
import { Modal, Publicar } from "../Publications/Publicar/Publicar.jsx";

const TopBar = ({ toggleSidebar }) => {
  const location = useLocation();
  const [locationStart, setLocationStart] = useState(location.pathname == "/Start")
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div>
      {!locationStart ? ( // Si locationStart es truthy, se renderiza el siguiente código
        <div className="top-bar">
          <NavLink to="/profileUser">
            <img src="./img/2.png" alt="" className="img-top-bar" />
          </NavLink>

          <SearchBar></SearchBar>
          <button className="hide-sidebar-button" onClick={toggleSidebar}>
            <Icon icon="vaadin:lines" width="1.2em" height="1.2em" />
          </button>
        </div>
      ) :

        <div className="top-bar top-bar-start">
          <div className="searchAndImg">
            <NavLink className="linkImg" to="/profileUser">
              <img src="./img/2.png" alt="" className="img-top-bar" />
            </NavLink>
            <SearchBar></SearchBar>
            <button className="hide-sidebar-button" onClick={toggleSidebar}>
              <Icon icon="vaadin:lines" width="1.2em" height="1.2em" />
            </button>
          </div>
          <div className="header-content">
            <a href="#" className="btn">
              <i className="ri-play-circle-line"></i>
              <div className="btn-text">Watch all</div>
            </a>
            <a href="#" className="btn" onClick={openModal}>
              <i className="ri-add-circle-fill"></i>
              <div className="btn-text">Add Photos</div>
            </a>
          </div>
          <Modal onClose={closeModal} isOpen={modalIsOpen}>
            <Publicar />
          </Modal>
        </div>
      } // Si locationStart no es truthy, no se renderiza nada
    </div>
  );

};

{/* <div className="header-content">
            <a href="#" className="btn" onClick={openModal}>
              <i className="ri-add-circle-fill"></i>
              <div className="btn-text">Add Photos</div>
            </a>
          </div> */}
export default TopBar;
