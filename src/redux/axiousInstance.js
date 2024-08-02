import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${window.localStorage.getItem("token") ? window.localStorage.getItem("token").replace(/"/g, "") : ""}`;

export default instance
