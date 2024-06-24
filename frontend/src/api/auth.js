import request from './index';

export const registerUser = (userData) => request('/register', 'POST', userData);

export const loginUser = async (loginData) => {
    try {
        const response = await request('/login', 'POST', loginData);
        if (response.status !== 200) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        if (data.message !== 'Login successful') {
            throw new Error(data.message || 'Login failed');
        }
        return data;
    } catch (error) {
        throw new Error(error.message || 'An error occurred during login.');
    }
};

export const logoutUser = () => request('/logout', 'POST');