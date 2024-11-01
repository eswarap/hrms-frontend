import axios from 'axios';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/v1/hrms';

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