import axios from "axios";

console.log(process.env.VUE_APP_BACKEND_URL);
const httpOptions = {
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(httpOptions);

// TODO: implement this somewhere else
// instance.interceptors.request.use((config) => {
//   console.log("here", store, store.getters.isLoggedIn);
//   if (store.getters.isLoggedIn) {
//     console.log("config isloggedin");

//     config.headers.Authorization = `Bearer ${store.getters.jwt}`;
//   }
//   console.log("config");
//   return config;
// });

instance.interceptors.response.use(
  (response) => response,
  (e) => {
    const { data } = e.response;
    throw data;
  },
);

export default instance;
