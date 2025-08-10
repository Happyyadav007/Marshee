import axios from 'axios';

const API = axios.create({
    baseURL: 'https://marshee.onrender.com/api',
//   baseURL: 'http://localhost:3000/api',
//   baseURL: 'http://localhost:4000/api',
//   withCredentials: true
});

export default API;