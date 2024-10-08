import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  lazy,
  Suspense,
} from "react";
import "./Perfil.css";
import { useAuth } from "../../../common/context/AuthContext.jsx";
import { Link, useParams } from "react-router-dom";
import { ChangeProfile, ModalChangeProfile } from "./ChangeProfile.jsx";
import Loader from "../Loaders/Loader";
import {
  Modal,
  Publicar,
} from "../../../common/Publications/Publicar/Publicar.jsx";
import { PublicationsId } from "../../../common/Publications/PublicationsId.jsx";
import { getProfile } from "../../../common/api/auth.js";


export const PerfilId = () => {
  const { user, profileImage, setProfileImage, profileData, setProfileData, setPublications } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalChageProfileOpen, setModalChageProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileData != null) {
      setLoading(false);
    }
  });

  const { id } = useParams();
  useEffect(() => {
    console.log("id: ", id);
    async function getP() {
      const response = await getProfile(null, id);
      console.log("getPro", response);
      setProfileData(response);
      setPublications(response.publications);
    };

    getP()
  }, [id])

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeModalChageProfile = () => {
    setModalChageProfileOpen(false);
  };

  const openModalChageProfile = () => {
    setModalChageProfileOpen(true);
  };

  return (
    <div className={"general-container"}>
      {profileData ? (
        <div className={loading ? "spinner hiddenInfo" : "profileUser"}>
          <div className="banner">
            {/* <img src="./img/banner.jpeg" alt="" />*/}
          </div>
          <div className="floatData">
            <div className="profile-picture">
              <img
                className="profileImageData"
                src={profileData.profileImage}
                alt=""
              />
            </div>
            <div className="info-usuarioData">
              <h1>{profileData.username}</h1>
              <div className="button-containerData">
                <button>Mensaje</button>
              </div>
            </div>
            <div className="user-actionsData">
              <div className="popularidad">
                <div>
                  <h3>100</h3>
                  <p>publicaciones</p>
                </div>
                <div>
                  <h3>500</h3>
                  <p>seguidores</p>
                </div>
                <div>
                  <h3>200</h3>
                  <p>seguidos</p>
                </div>
              </div>
              <div className="form-container">
                <form
                  action="/perfil"
                  method="post"
                  encType="multipart/form-data"
                ></form>
                <div></div>
              </div>
            </div>
          </div>

          <PublicationsId />
        </div>
      ) : null}
    </div>
  );
};
