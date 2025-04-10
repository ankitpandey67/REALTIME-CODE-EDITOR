import axios from 'axios';
const API = 'http://localhost:5000/api';

export const signup = (email, password) => axios.post(`${API}/signup`, { email, password });
export const login = (email, password) => axios.post(`${API}/login`, { email, password });
