// frontend/src/utils/api.js
import axios from 'axios';

const base =
  import.meta.env.VITE_API_URL ||
  'https://fullstack-project-2-lad3.onrender.com'; // <- your Render URL

const baseURL = base.replace(/\/$/, '') + '/api';

const api = axios.create({
  baseURL,
});

export default api;
