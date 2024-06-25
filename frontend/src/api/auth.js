import request from './index';

export const registerUser = async (userData) => request('/register', 'POST', userData);

export const loginUser = async (loginData) => request('/login', 'POST', loginData);

export const createAuction = async (auctionData) => request('/create-auction', 'POST', auctionData);

export const logoutUser = () => request('/logout', 'POST');

export const fetchAuctions = async (email) => request('/dashboard', 'POST', email);
