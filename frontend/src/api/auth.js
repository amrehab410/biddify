import request from './index';

export const registerUser = (userData) => request('/register', 'POST', userData);

export const loginUser = (loginData) => request('/login', 'POST', loginData);

export const logoutUser = () => request('/logout', 'POST');
