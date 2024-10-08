import instance from "./axios";

const ruta_protegida = () => {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('tokenCompany');
  if (token) {
    const clienteAxios = instance.create({
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    return clienteAxios;
  }else{
    const clienteAxios = instance.create({
      headers: {
        'authorization': `Bearer null`
      }
    });
    return clienteAxios;
  }
}


export const registerCompanyRequest = async company => {
  try {
    const response = await instance.post(`/registerCompany`, company);
    return response;
  } catch (ex) {
    return ex
  }
}

export const loginRequestCompany = async company => {
  try {
    const response = await instance.post(`/loginCompany`, company)
    return response;
  } catch (error) {
    return error;
  }
}

export const verityTokenRequestCompany = async () => {
  // Recuperar el token del localStorage

  try {
    // Realizar la solicitud al servidor usando el cliente Axios configurado
    const response = await ruta_protegida().get('/verifyCompany');

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


export const getUpdateStories = async file => {
  try {
    const formData = new FormData();
    formData.append('miArchivo', file); // Agregar el archivo al objeto FormData
    const response = await ruta_protegida().post(`/addStories`, formData);
    console.log(file);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getUpdateCompany = async () => {
  try {
    const response = await ruta_protegida().get(`/profileCompany`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const sendPublications = async (file, Hola) => {
  try {
    const formData = new FormData();
    formData.append('publication', file); // Agregar el archivo al objeto FormData
    formData.append('Hola', Hola); // Agregar el texto al objeto FormData

    const response = await ruta_protegida().post("/addPublications", formData);
    console.log(file);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const addPublicationsVideo = async (file, Hola) => {
  try {
    const formData = new FormData();
    formData.append('publication', file); // Agregar el archivo al objeto FormData
    formData.append('Hola', Hola); // Agregar el texto al objeto FormData

    const response = await ruta_protegida().post("/addPublicationVideo", formData);
    console.log(file);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getPublicationsCompany = async () => {
  try {
    const response = await ruta_protegida().get('/getPublicationsCompany');
    return response
  } catch (error) {
    console.log(error);
  }
}

const ruta_protegidaReactionLike = () => {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('tokenCompany');
  const tokenUser = localStorage.getItem('token');
  if (token) {
    const clienteAxios = instance.create({
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    return clienteAxios;
  }else if(tokenUser){
    const clienteAxios = instance.create({
      headers: {
        'authorization': `Bearer ${tokenUser}`
      }
    });
    return clienteAxios;
  }else{
    const clienteAxios = instance.create({
      headers: {
        'authorization': `Bearer null`
      }
    });
    return clienteAxios;
  }
}

export const reactionLikeCompany = async (reaction) => {
  try {
    const response = await ruta_protegidaReactionLike().post('/reactionLikeCompany', reaction)
    return response
  } catch (error) {
    console.log(error);
  }
}
export const getAllPublicationsCompany = async () => {
  try {
    const response = await ruta_protegida().get('/getAllPublicationsCompany');
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const logoutCompany = async () => {
  try {
    // Eliminar el token del localStorage
    localStorage.removeItem('tokenCompany');
  } catch (ex) {
    console.log("error.status:", ex);
  }
}