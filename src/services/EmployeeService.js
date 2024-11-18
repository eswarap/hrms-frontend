import axios from 'axios';

const EMPLOYEE_API_BASE_URL = '/api/v1/hrms';

// Add request interceptor to include auth token
axios.interceptors.request.use(
    config => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            config.headers.Authorization = `Bearer ${userData.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

class EmployeeService {
    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL+"/employees");
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    // Additional methods for update and delete...
}

export default new EmployeeService();