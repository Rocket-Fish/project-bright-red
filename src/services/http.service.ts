import axios from "axios";

console.log(process.env.VUE_APP_BACKEND_URL);
const httpOptions = {
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(httpOptions);

export const saveJWT = (jwt: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${jwt}`;
};

export const removeJWT = () => {
  instance.defaults.headers.common.Authorization = "";
};

instance.interceptors.response.use(
  (response) => response,
  (e) => {
    const { data } = e.response;
    throw data;
  },
);

export default instance;
