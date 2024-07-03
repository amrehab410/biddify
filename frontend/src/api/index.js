const API_URL = 'https://username.pythonanywhere.com';

const request = async (url, method, body = null) => {
    const headers = { 'Content-Type': 'application/json' };
    const options = { method, headers };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${url}`, options);
    return response.json();
};

export default request;
