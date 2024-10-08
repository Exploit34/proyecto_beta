import "./Perfil.css";
import { useAuth } from "../../../common/context/AuthContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../../common/api/auth.js";

export const ModalChangeProfile = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modalChangeProfile">
                <div className="closeModalChangeProfile">
                    <h4>Elegir foto de perfil</h4>
                    <button className="modal-close" onClick={onClose}>
                        <i className="ri-chat-delete-line"></i>
                    </button>
                </div>
                <hr className="line-divider"/>
                {children}
            </div>
        </div>
    );
};

export const ChangeProfile = () => {
    const { setProfileImage } = useAuth()
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChangeAndPreview = (event) => {
        const file = event.target.files[0];
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const goBack = () => {
        // Navegar a la ruta '/otra-pagina'
        navigate('/profileUser');
    };

    const handleUpload = async () => {
        console.log("hola");
        try {
            const response = await getImage(file);
            if (response) {
                console.log("Response Image", response);
                setProfileImage(response.data.imagen)
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className="ChangeImgProfile">
            <form action="" className="form-container">
                <div className="file-input-container">
                    <label htmlFor="miArchivo" className="file-label">
                        <span>
                            <i class="ri-add-line"></i>
                            Subir Foto
                        </span>
                        <input id="miArchivo" name="miArchivo" type="file" onChange={handleFileChangeAndPreview} />
                    </label>
                </div>
            </form>
            <div className="preview-container">
                {previewImage && <img src={previewImage} alt="Vista Previa" className="preview-image" />}
            </div>
            {previewImage &&
                <div className="button-container">
                    <button className="button-change" onClick={handleUpload}>
                        Cambiar Imagen de perfil
                    </button>
                </div>
            }
        </div>
    )
}
