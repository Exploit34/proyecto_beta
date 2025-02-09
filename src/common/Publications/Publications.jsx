import React, { useEffect, useState } from "react";
import "./Publications.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { reactionLike, getAllPublications, getProfile, getPublications, commentAdd, commentDelete } from '../api/auth';
import { useAuth } from "../context/AuthContext";
import { getAllPublicationsCompany, reactionLikeCompany } from "../api/auth.company";
import { ModalShare, Share } from "./Share/Share";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-review">
        <div className="modal-content-review">{children}</div>
      </div>
    </div>
  );
};

export const Publications = () => {
  const location = useLocation();
  const [locationStart, setLocationStart] = useState(
    location.pathname === "/start"
  );
  const [sharedLink, setSharedLink] = useState("");
  const {
    companyData,
    isAuthenticatedCompany,
    user,
    publications,
    profileImage,
    setPublications,
    isAuthenticated,
    setProfileData,
    profileData,
    setAllPublications,
    allPublications
  } = useAuth();
  const [modalStates, setModalStates] = useState([]);
  const [closingIndex, setClosingIndex] = useState(null);
  const [modalCommentState, setModalComments] = useState([]);
  const [closingIndexComents, setClosingIndexComments] = useState(null);
  const [locationStartCompany, setLocationStartCompany] = useState(
    location.pathname === "/HomeCompany"
  );
  const [modalShareState, setModalShare] = useState(false)
  const [dataShare, setDataShare] = useState(false)
  const [typeShare, setTypeShare] = useState(null)
  const [comment, setComment] = useState('');
  const [isModalOpenDeleteComment, setIsModalOpenDeleteComment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalDeleteComment = () => {
    setIsModalOpenDeleteComment(false);
  };

  const OpenModalDeleteComment = () => {
    setIsModalOpenDeleteComment(true);
  };

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleClose = (index) => {
    setTimeout(() => {
      setModalStates((prev) => ({
        ...prev,
        [index]: false,
      }));
    }, 300);
    setClosingIndex(index);
  };

  const handleCloseModalComments = (index) => {
    setTimeout(() => {
      setModalComments((prev) => ({
        ...prev,
        [index]: false,
      }));
    }, 300);
    setClosingIndexComments(index);
  };

  const openModalShare = (link, type) => {
    setModalShare(true);
    setSharedLink(link);
    setTypeShare(type)
  };

  const closeModalShare = () => {
    setModalShare(false);
  };

  const increaseReactions = async (url, userName) => {
    const reaction = {
      userName: userName,
      reaction: "love",
      link: url,
    };
    try {
      const response = await reactionLikeCompany(reaction);
      console.log(response);
      const updateReaction = publications.map((item, idx) => {
        if (item.Publication[0].url == response.data.publications.url) {
          item.Publication[0].reactions.like = response.data.publications.reactions.like;
          return item;
        }
        return item; // Mantener los elementos que no necesitan actualización
      });
      setPublications(updateReaction);

      // Actualizar el estado con el nuevo arreglo que tiene la posición modificada
    } catch (error) {
      console.log(error);
    }
  };

  const increaseReactionsLocationStart = async (url, userName) => {
    const reaction = {
      userName: userName,
      reaction: "love",
      link: url,
    };
    try {
      const response = await reactionLikeCompany(reaction);
      console.log(response);
      const updateReaction = allPublications.map((item) => {
        if (item.url === response.data.publications.url) {
          console.log("igual");
          item.reactions.like = response.data.publications.reactions.like;
        }
        // No need to return anything here for the elements that don't need updating
        return item; // Return the updated or unchanged item
      });
      setAllPublications(updateReaction);

      // Actualizar el estado con el nuevo arreglo que tiene la posición modificada
    } catch (error) {
      console.log(error);
    }
  };

  const increaseReactionsProfileC = async (url, userName) => {
    const reaction = {
      userName: userName,
      reaction: "love",
      link: url,
    };
    try {
      const response = await reactionLikeCompany(reaction);
      console.log(response);
      const updateReaction = publications.map((item) => {
        if (item.url === response.data.publications.url) {
          console.log("igual");
          item.reactions.like = response.data.publications.reactions.like;
        }
        // No need to return anything here for the elements that don't need updating
        return item; // Return the updated or unchanged item
      });
      setPublications(updateReaction);

      // Actualizar el estado con el nuevo arreglo que tiene la posición modificada
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (comment, link, userName) => {
    const res = await commentAdd(comment, link, userName);
    console.log(res);
    if (res.response) {
      console.log("response");
      openModal();
    }
    const updateReaction = allPublications.map((item) => {
      if (item.url === res.data.publications.url) {
        console.log("igual");
        item.reactions.comments = res.data.publications.reactions.comments;
      }
      // No need to return anything here for the elements that don't need updating
      return item; // Return the updated or unchanged item
    });
    setAllPublications(updateReaction);
    setPublications(updateReaction);
  }

  const deleteComment = async () => {
    try {
      const dataDeleteComment = JSON.parse(localStorage.getItem("commentDelete"))
      console.log(dataDeleteComment);

      const res = await commentDelete(dataDeleteComment.id, dataDeleteComment.url, dataDeleteComment.user)
      console.log(res);
      if (res.data) {
        const updateReaction = allPublications.map((item) => {
          if (item.url === res.data.publications.url) {
            console.log("igual");
            item.reactions.comments = res.data.publications.reactions.comments;
          }
          // No need to return anything here for the elements that don't need updating
          return item; // Return the updated or unchanged item
        });
        setAllPublications(updateReaction);
      }
      closeModalDeleteComment();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("AS", locationStart);
    console.log("location", location.pathname);
    console.log("All", allPublications);
  }, [locationStart]);

  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const getProfileUser = (username) => {
    // Simula la obtención del ID del usuario
    setTimeout(async () => {
      console.log(username);
      const response = await getProfile(username, null);
      console.log("getPro", response);
      setProfileData(response);
      setPublications(response.publications);
      setUserId(response.id);
    }, 1000);
  };

  if (userId) {
    // Redireccionar a la página de perfil del usuario cuando se obtenga el ID
    navigate(`/profile/:${userId}`);
  }

  return (
    <div className="publications">
      {isAuthenticated === false ? (
        // Caso: Ningún usuario autenticado
        allPublications.map((element, index) => (
          <div key={index} className="publication">
            <div className="nombre-usuario">
              <div className="post-profile">
                <div className="post-img">
                  <img src={element.profileImage} alt="" />
                </div>
                <h3>{element.user}</h3>
              </div>
            </div>
            <div className="contenido">{element.contenido}</div>
            {element.type === "video/mp4" ? (
              <video className="video" src={element.url} controls></video>
            ) : (
              <img
                src={element.url}
                alt="Imagen de la publicación"
                className="imagen-publicacion"
              />
            )}
          </div>
        ))
      ) : isAuthenticated === true ? (
        // Caso: Solo el usuario autenticado
        location.pathname == "/start" ? (
          allPublications.map((element, index) => (
            <div key={index} data-key={index} className="publication">
              <Modal isOpen={isModalOpenDeleteComment} onClose={closeModalDeleteComment}>
                <h2 className="Tile-Review">Eliminar Comentario</h2>
                <p className="P-content-Review">¿Estás seguro de que quieres eliminar este comentario?</p>
                <div className="options-delete">
                  <button onClick={closeModalDeleteComment}>Cancelar</button>
                  <button onClick={deleteComment}>Eliminar</button>
                </div>
              </Modal>
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="Tile-Review">Contenido Inadecuado</h2>
                <p className="P-content-Review">
                  Lo siento, pero tu comentario parece no ser constructivo o adecuado para esta plataforma.
                  Por favor, asegúrate de que tus comentarios sean relevantes, respetuosos y aporten valor a la conversación.
                  Recuerda que los comentarios deben centrarse en la calidad, experiencia o características del producto,
                  y evitar cualquier lenguaje ofensivo o inapropiado.
                  ¡Gracias por tu comprensión y colaboración!
                </p>
                <button onClick={closeModal}>Cerrar</button>
              </Modal>
              <div className="nombre-usuario">
                <div className="post-profile">
                  <div className="post-img">
                    <img src={element.profileImage} alt="" />
                  </div>
                  <a onClick={() => {
                    getProfileUser(element.user)
                  }} href="#">
                    <h3>{element.user}</h3>
                  </a>
                </div>
              </div>
              <div className="contenido">{element.contenido}</div>
              {element.type === "video/mp4" ? (
                <video className="video" src={element.url} controls></video>
              ) : (
                <img
                  src={element.url}
                  alt="Imagen de la publicación"
                  className="imagen-publicacion"
                />
              )}
              <div className="post-box">
                <div>
                  {modalStates[index] && (
                    <div
                      className={`modal ${closingIndex == null ? "open" : "closed"
                        }`}
                    >
                      <div className="modal-buttons">
                        <button
                          className="modal-close"
                          onClick={() => handleClose(index)}
                        >
                          <i className="ri-chat-delete-line"></i>
                        </button>
                        <button>
                          <i className="ri-heart-line"></i>
                        </button>
                      </div>
                      {element.reactions.like.map((userReaction, key) => (
                        <div key={key}>
                          <div className="post-img">
                            <img src={userReaction.imageProfile} alt="" />
                          </div>
                          <h3>{userReaction.user}</h3>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    name="Love"
                    className="love-button"
                    onClick={() =>
                      increaseReactionsLocationStart(element.url, element.user)
                    }
                  >
                    <i className="ri-heart-line"></i>
                  </button>
                  <button
                    onClick={() => {
                      setClosingIndex(null);
                      setModalStates((prev) => ({ ...prev, [index]: true }));
                    }}
                    className="number-likes"
                  >
                    <span>{element.reactions.like.length}</span>
                  </button>
                </div>

                <div className="div-comments">
                  {modalCommentState[index] && (
                    <div
                      className={`modal ${closingIndexComents == null ? "open" : "closed"
                        }`}
                    >
                      <div className="modal-buttons">
                        <button
                          className="modal-close"
                          onClick={() => handleCloseModalComments(index)}
                        >
                          <i className="ri-chat-delete-line"></i>
                        </button>
                        <button>
                          <i className="ri-heart-line"></i>
                        </button>
                      </div>
                      {element.reactions.comments.map((userReaction, key) => (
                        <div key={key}>
                          <div>
                            <div className="post-img">
                              <img src={userReaction.profileImage} alt="" />
                            </div>
                            <p>{userReaction.user}</p>
                          </div>
                          <p>{userReaction.comment}</p>
                          {userReaction.user == user.username ? (
                            <button onClick={() => {
                              localStorage.setItem("commentDelete", JSON.stringify({ "id": userReaction._id, "url": element.url, "user": element.user }))
                              OpenModalDeleteComment();
                            }}>Eliminar</button>
                          ) : null}
                        </div>
                      ))}

                      <input
                        type="text"
                        value={comment}
                        onChange={handleInputChange}
                        placeholder="Comment"
                      />
                      <button onClick={() => addComment(comment, element.url, element.user)}>
                        <i className="ri-send-plane-2-fill"></i>
                      </button>


                    </div>
                  )}
                  <button
                    onClick={() => {
                      setClosingIndexComments(null);
                      setModalComments((prev) => ({ ...prev, [index]: true }));
                    }}
                    className="love-button"
                  >
                    <i className="ri-chat-3-line"></i>
                  </button>
                  <span>{element.reactions.comments.length}</span>
                </div>
                {/* <button name="comments" className="comment-button">
                  <i className="ri-download-cloud-2-line"></i>
                  <span>{200000}k</span>
                </button> */}
                <button name="comments" className="comment-button" onClick={() => { openModalShare(element.url, element.type) }}>
                  <i class="ri-stackshare-line"></i>
                </button>
                {modalShareState ? (
                  <ModalShare onClose={closeModalShare} isOpen={modalShareState}>
                    <Share link={sharedLink} type={typeShare} />
                  </ModalShare>
                ) : null}
              </div>
            </div>
          ))
        ) : location.pathname == "/ProfileUser" && Array.isArray(publications) ? (
          // Código adicional cuando locationStart no es verdadero
          publications.map((element, index) => (
            <div key={index} class="publication">
              <div className="nombre-usuario">
                <div className="post-profile">
                  <div className="post-img">
                    <img
                      src={profileData ? element.profileImage : profileImage}
                      alt=""
                    />
                  </div>
                  <h3>{element.user}</h3>
                </div>
              </div>
              <div className="contenido">{element.contenido}</div>
              <div className="nombre-usuario">
                <div className="post-profile">
                  <div className="post-img">
                    <img
                      src={profileData ? element.profileImage : element.Publication[0].profileImage}
                      alt=""
                    />
                  </div>
                  <h3>{element.Publication[0].user}</h3>
                </div>
                <div className="contenido">{element.Publication[0].contenido}</div>
              </div>
              {
                element.Publication[0].type === "video/mp4" ? (
                  <video className="video" src={element.Publication[0].url} controls></video>
                ) : (
                  <img
                    src={element.Publication[0].url}
                    alt="Imagen de la publicación"
                    className="imagen-publicacion"
                  />
                )
              }
              <div className="post-box">
                <div className="div-comments">
                  {modalStates[index] && (
                    <div
                      className={`modal ${closingIndex == null ? "open" : "closed"
                        }`}
                    >
                      <div className="modal-buttons">
                        <button
                          className="modal-close"
                          onClick={() => handleClose(index)}
                        >
                          <i className="ri-chat-delete-line"></i>
                        </button>
                        <button>
                          <i className="ri-heart-line"></i>
                        </button>
                      </div>
                      {element.Publication[0].reactions.like.map((userReaction, key) => (
                        <div key={key}>
                          <div className="post-img">
                            <img src={userReaction.imageProfile} alt="" />
                          </div>
                          <h3>{userReaction.user}</h3>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    name="Love"
                    className="love-button"
                    onClick={() =>
                      profileData
                        ? increaseReactions(element.Publication[0].url, element.Publication[0].user)
                        : increaseReactions(element.Publication[0].url, user.username)
                    }
                  >
                    <i className="ri-heart-line"></i>
                  </button>

                  <button
                    onClick={() => {
                      // Primera función
                      setClosingIndex(null); // Llama a otraFuncion()
                      setModalStates((prev) => ({
                        ...prev,
                        [index]: true,
                      }));
                      // Segunda función
                    }}
                    className="number-likes"
                  >
                    <span>{element.Publication[0].reactions.like.length}</span>
                  </button>
                </div>

                <div>
                  {modalCommentState[index] && (
                    <div
                      className={`modal ${closingIndexComents == null ? "open" : "closed"
                        }`}
                    >
                      <div className="modal-buttons">
                        <button
                          className="modal-close"
                          onClick={() => handleCloseModalComments(index)}
                        >
                          <i className="ri-chat-delete-line"></i>
                        </button>
                        <button>
                          <i className="ri-heart-line"></i>
                        </button>
                      </div>
                      {element.Publication[0].reactions.comments.map((userReaction, key) => (
                        <div key={key}>
                          <div>
                            <div className="post-img">
                              <img src={userReaction.profileImage} alt="" />
                            </div>
                            <p>{userReaction.user}</p>
                          </div>
                          <p>{userReaction.comment}</p>
                          {userReaction.user == user.username ? (
                            <button onClick={() => {
                              localStorage.setItem("commentDelete", JSON.stringify({ "id": userReaction._id, "url": element.url, "user": element.user }))
                              OpenModalDeleteComment();
                            }}>Eliminar</button>
                          ) : null}
                        </div>
                      ))}

                      <input type="text" placeholder="comment" />
                      <button>
                        <i class="ri-send-plane-2-fill"></i>
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setClosingIndexComments(null);
                      setModalComments((prev) => ({
                        ...prev,
                        [index]: true,
                      }));
                    }}
                    className="love-button"
                  >
                    <i className="ri-chat-3-line"></i>
                  </button>
                  <span>{element.Publication[0].reactions.comments.length}</span>
                </div>
                {/* <button className="" name="comments">
                  <i className="ri-download-cloud-2-line"></i>
                  <span>{200000}k</span>
                </button> */}
              </div>
            </div>
          ))
        ) : null
      ) : (
        location.pathname == "/profileCompany" ? (
          publications.map((element, index) => (
            <div key={index} class="publication">
              <div className="nombre-usuario">
                <div className="post-profile">
                  <div className="post-img">
                    <img
                      src={profileData ? element.profileImage : companyData.profileImage}
                      alt=""
                    />
                  </div>
                  <h3>{companyData.userNameCompany}</h3>
                </div>
              </div>
              <div className="contenido">{element.contenido}</div>
              {element.type == "video/mp4" ? (
                <video className="video" src={element.url} controls></video>
              ) : (
                <img
                  src={element.url}
                  alt="Imagen de la publicación"
                  className="imagen-publicacion"
                />
              )}
              <div className="post-box">
                <div className="div-comments">
                  {modalStates[index] && (
                    <div
                      className={`modal ${closingIndex == null ? "open" : "closed"
                        }`}
                    >
                      <div className="modal-buttons">
                        <button
                          className="modal-close"
                          onClick={() => handleClose(index)}
                        >
                          <i className="ri-chat-delete-line"></i>
                        </button>
                        <button>
                          <i className="ri-heart-line"></i>
                        </button>
                      </div>
                      {element.reactions.like.map((userReaction, key) => (
                        <div key={key}>
                          <div className="post-img">
                            <img src={userReaction.imageProfile} alt="" />
                          </div>
                          <h3>{userReaction.user}</h3>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    name="Love"
                    className="love-button"
                    onClick={() =>
                      profileData
                        ? increaseReactions(element.url, element.user)
                        : increaseReactionsProfileC(element.url, companyData.userNameCompany)
                    }
                  >
                    <i className="ri-heart-line"></i>
                  </button>

                  <button
                    onClick={() => {
                      // Primera función
                      setClosingIndex(null); // Llama a otraFuncion()
                      setModalStates((prev) => ({
                        ...prev,
                        [index]: true,
                      }));
                      // Segunda función
                    }}
                    className="number-likes"
                  >
                    <span>{element.reactions.like.length}</span>
                  </button>
                </div>

                <div>
                  {modalCommentState[index] && (
                    <div
                      className={`modal ${closingIndexComents == null ? "open" : "closed"
                        }`}
                    >
                      <div className="modal-buttons">
                        <button
                          className="modal-close"
                          onClick={() => handleCloseModalComments(index)}
                        >
                          <i className="ri-chat-delete-line"></i>
                        </button>
                        <button>
                          <i className="ri-heart-line"></i>
                        </button>
                      </div>
                      {element.reactions.comments.map((userReaction, key) => (
                        <div key={key}>
                          {/* <div className="post-img">
                                                                    <img src={userImage.profileImage} alt="" />
                                                                </div> */}
                          <h3>{userReaction.comment}</h3>
                        </div>
                      ))}

                      <input type="text" placeholder="comment" />
                      <button>
                        <i class="ri-send-plane-2-fill"></i>
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setClosingIndexComments(null);
                      setModalComments((prev) => ({
                        ...prev,
                        [index]: true,
                      }));
                    }}
                    className="love-button"
                  >
                    <i className="ri-chat-3-line"></i>
                  </button>
                  <span>{element.reactions.comments.length}</span>
                </div>
                {/* <button className="" name="comments">
                  <i className="ri-download-cloud-2-line"></i>
                  <span>{200000}k</span>
                </button> */}
              </div>
            </div>
          ))
        ) : (
          // Código adicional cuando locationStart no es verdadero
          allPublications.map((element, index) => (
            <div key={index} data-key={index} className="publication">
              <div className="nombre-usuario">
                <div className="post-profile">
                  <div className="post-img">
                    <img src={element.profileImage} alt="" />
                  </div>
                  <h3>{element.user}</h3>
                </div>
              </div>
              <div className="contenido">{element.contenido}</div>
              {element.type == "video/mp4" ? (
                <video className="video" src={element.url} controls></video>
              ) : (
                <img
                  src={element.url}
                  alt="Imagen de la publicación"
                  className="imagen-publicacion"
                />
              )}
              <div className="post-box">
                <div>
                  {modalStates[index] && (
                    <div
                      className={`modal ${closingIndex == null ? "open" : "closed"
                        }`}
                    >
                      <div className="modal-buttons">
                        <button
                          className="modal-close"
                          onClick={() => handleClose(index)}
                        >
                          <i className="ri-chat-delete-line"></i>
                        </button>
                        <button>
                          <i className="ri-heart-line"></i>
                        </button>
                      </div>
                      {element.reactions.like.map((userReaction, key) => (
                        <div key={key}>
                          <div className="post-img">
                            <img src={userReaction.imageProfile} alt="" />
                          </div>
                          <h3>{userReaction.user}</h3>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    name="Love"
                    className="love-button"
                    onClick={() =>
                      increaseReactionsLocationStart(element.url, element.user)
                    }
                  >
                    <i className="ri-heart-line"></i>
                  </button>
                  <button
                    onClick={() => {
                      setClosingIndex(null);
                      setModalStates((prev) => ({ ...prev, [index]: true }));
                    }}
                    className="number-likes"
                  >
                    <span>{element.reactions.like.length}</span>
                  </button>
                </div>

                <div className="div-comments">
                  {modalCommentState[index] && (
                    <div
                      className={`modal ${closingIndexComents == null ? "open" : "closed"
                        }`}
                    >
                      <div className="modal-buttons">
                        <button
                          className="modal-close"
                          onClick={() => handleCloseModalComments(index)}
                        >
                          <i className="ri-chat-delete-line"></i>
                        </button>
                        <button>
                          <i className="ri-heart-line"></i>
                        </button>
                      </div>
                      {element.reactions.comments.map((userReaction, key) => (
                        <div key={key}>
                          <div className="post-img">
                            <img src={element.profileImage} alt="" />
                          </div>
                          <h3>{userReaction.comment}</h3>
                        </div>
                      ))}
                      <form action="">
                        <input type="text" placeholder="comment" />
                        <button>
                          <i className="ri-send-plane-2-fill"></i>
                        </button>
                      </form>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setClosingIndexComments(null);
                      setModalComments((prev) => ({ ...prev, [index]: true }));
                    }}
                    className="love-button"
                  >
                    <i className="ri-chat-3-line"></i>
                  </button>
                  <span>{element.reactions.comments.length}</span>
                </div>
                {/* <button name="comments" className="comment-button">
                  <i className="ri-download-cloud-2-line"></i>
                  <span>{200000}k</span>
                </button> */}
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
}

export default Publications;