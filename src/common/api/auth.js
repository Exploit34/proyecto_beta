import instance from "./axios";


const ruta_protegida = () => {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');
  if (token) {
    const clienteAxios = instance.create({
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    return clienteAxios;
  } else {
    const clienteAxios = instance.create({
      headers: {
        'authorization': `Bearer null`
      }
    });
    return clienteAxios;
  }
}

export const registerRequest = async user => {
  try {
    const response = await instance.post(`/registerUser`, user);
    return response;
  } catch (ex) {
    console.log("error.status:", ex);
    return ex
  }
}

export const loginRequest = async user => {
  try {
    const response = await instance.post(`/loginUser`, user);
    return response
  } catch (ex) {
    console.log("error.status:", ex);
    return ex
  }
}

export const verityTokenRequest = async () => {
  // Recuperar el token del localStorage

  try {
    // Realizar la solicitud al servidor usando el cliente Axios configurado
    const response = await ruta_protegida().get('/verify');

    // Si la solicitud tiene éxito, puedes hacer lo que necesites con la respuesta

    // Puedes devolver la respuesta si es necesario
    return response;
  } catch (error) {
    // Si ocurre un error durante la solicitud, lo manejas aquí
    console.error('Error al llamar a la ruta protegida:', error);

    // Puedes hacer lo que necesites en caso de error, como mostrar un mensaje al usuario o realizar alguna acción adicional
    // Si quieres devolver algo en caso de error, también puedes hacerlo aquí
  }

}

export const logoutUser = async () => {
  try {
    // Eliminar el token del localStorage
    const response = await ruta_protegida().post(`/logoutUser`);
    localStorage.removeItem('token');
    return response
  } catch (ex) {
    console.log("error.status:", ex);
  }
}

export const getImage = async file => {
  try {
    const formData = new FormData();
    formData.append('miArchivo', file); // Agregar el archivo al objeto FormData
    const response = await ruta_protegida().post(`/imageProfile`, formData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getProfileImage = async () => {
  try {
    const response = await ruta_protegida().get(`/getProfileImage`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getUpdateUser = async () => {
  try {
    const response = await ruta_protegida().get(`/profileUser`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

const deleteStories = async () => {
  try {
    const response = await ruta_protegida().put('/deleteStories')
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const reactionLike = async (reaction) => {
  try {
    const response = await ruta_protegida().post('/reactionLike', reaction)
    return response
  } catch (error) {
    console.log(error);
  }
}

export const getPublications = async () => {
  try {
    const response = await ruta_protegida().get('/getPublications');
    return response
  } catch (error) {
    console.log(error);
  }
}

export const getAllPublications = async () => {
  try {
    const response = await ruta_protegida().get('/getAllPublications');
    return response;
  } catch (error) {
    console.log(error);
  }
}


export const getProfile = async (username, id) => {
  const postData = {
    username: username,
    id: id
    // Otros datos que deseas enviar
  };

  try {
    const response = await ruta_protegida().post('/getProfile', postData);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Puedes manejar el error según tus necesidades
    throw error; // Lanzar el error nuevamente o manejarlo de otra manera
  }
}

export const shareData = async (contenido, link) => {
  const data = {
    contenido: contenido,
    link: link
  }

  try {
    const response = await ruta_protegida().post("/sharePublication", data);
    return response;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Puedes manejar el error según tus necesidades
    throw error; // Lanzar el error nuevamente o manejarlo de otra manera
  }
}

export const getShareData = async () => {
  try {
    const response = await ruta_protegida().get("/getSharePublications");
    return response;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Puedes manejar el error según tus necesidades
    throw error; // Lanzar el error nuevamente o manejarlo de otra manera
  }
}

export const commentAdd = async (comment, link, userName) => {
  try {
    const data = {
      comment: comment,
      link: link,
      username: userName
    }
    const response = await ruta_protegida().post("/comment", data);
    return response;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Puedes manejar el error según tus necesidades
    return error
  }
}


export const commentDelete = async (idComment, link, userName) => {
  try {
    const data = {
      idComment: idComment,
      link: link,
      username: userName
    }
    const response = await ruta_protegida().post("/deleteComment", data);
    return response;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Puedes manejar el error según tus necesidades
    return error
  }
}