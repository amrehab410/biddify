import request from './index';

export const registerUser = (userData) => request('/register', 'POST', userData);

export const loginUser = async (loginData) => request('/login', 'POST', loginData);

export const logoutUser = () => request('/logout', 'POST');