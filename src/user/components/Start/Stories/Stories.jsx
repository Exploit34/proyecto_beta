import React, { useState, useRef, useEffect } from "react";
import "./Stories.css";
import { useAuth } from "../../../../common/context/AuthContext.jsx";
import { getUpdateUser } from "../../../../common/api/auth.js";
import { Link } from "react-router-dom";
import {Modal, Publicar} from "../../../../common/Publications/Publicar/Publicar.jsx";
import Publications from "../../../../common/Publications/Publications.jsx";


export const Stories = () => {
  const { user, setUser, profileImage } = useAuth();
  const [selectedFileVideo, setSelectedFileVideo] = useState();
  const [selectedFileImage, setSelectedFileImage] = useState();
  const [story, setStory] = useState(user.stories);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const imageRef = useRef();
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        // Es un archivo de video
        setSelectedFileVideo(e.target.files[0]);
        // Realiza acciones específicas para videos
      } else if (file.type.startsWith("image/")) {
        setSelectedFileImage(e.target.files[0]);
        const imageURL = URL.createObjectURL(file);
        imageRef.current.src = imageURL;
        // Es un archivo de imagen
        // Realiza acciones específicas para imágenes
      } else {
        // El archivo no es ni video ni imagen
        // Puedes mostrar un mensaje de error o tomar otras medidas
      }
    }
  };

  const handleUploadImage = async () => {
    console.log("hola");
    try {
      const response = await getUpdateStories(selectedFileImage);
      if (response) {
        console.log("Response", response);
      }
      checkLogin();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function checkLogin() {
    try {
      const res = await getUpdateUser();
      console.log("Get LOGON", res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setStory(user.stories);
    console.log(user);
  }, [user]);

  return (
    <>
      <div className="Stories">
        <div className="margin-top"></div>
        <div className="header">
          <div className="stories-title">
            <a href="#" className="btn">
              <i className="ri-play-circle-line"></i>
              <div className="text">Ver todo</div>
            </a>
          </div>
        </div>
        <div className="stories">
        </div>
        
        <Publications />
      </div>
    </>
  );
};

{
  /* // import React, { useState } from 'react';

// function App() {
//   const [selectedFile, setSelectedFile] = useState();

//   const handleFileInput = (e) => {
//     setSelectedFile(e.target.files[0]);
//   }

//   return (
//     <div>
//       <input type="file" onChange={handleFileInput} />
//       {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
//     </div>
//   );
// }

// export default App; */
}
