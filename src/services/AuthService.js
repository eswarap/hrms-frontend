import axios from 'axios';

const AUTH_API_BASE_URL = '/api/v1/auth';

class AuthService {
    login(credentials) {
        return axios.post(AUTH_API_BASE_URL + "/login", credentials);
    }

    register(userData) {
        return axios.post(AUTH_API_BASE_URL + "/register", userData);
    }

    logout() {
        return axios.post(AUTH_API_BASE_URL + "/logout");
    }

    getCurrentUser() {
        return axios.get(AUTH_API_BASE_URL + "/user");
    }
}

export default new AuthService();