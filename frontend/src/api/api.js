import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
//   baseURL: 'http://localhost:4000/api',
//   withCredentials: true
});

export default API;