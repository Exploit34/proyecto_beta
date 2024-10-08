import axios from "axios";
// https://backend-ve18.onrender.com/api
// http://localhost:4000/api
const instance = axios.create({
  // baseURL: "http://localhost:4000/api",
  baseURL: " https://backend-ve18.onrender.com/api",
  withCredentials: true,
});

export default instance;
