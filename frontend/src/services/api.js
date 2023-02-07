import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://200.201.240.189/',
  // withCredentials: true,
});
