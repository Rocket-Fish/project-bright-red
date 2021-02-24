import axios from 'axios';

console.log(process.env.VUE_APP_BACKEND_URL);
const httpOptions = {
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(httpOptions);

export default instance;
