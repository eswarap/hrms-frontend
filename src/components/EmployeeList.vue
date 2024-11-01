<template>
    <div class="table-container">
      <h1 class="text-center">Employee List</h1>
      <table class="centered-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Position</th>
            <th>Date of Birth</th>
            <th>Date of Joining</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.gender }}</td>
            <td>{{ employee.position }}</td>
            <td>{{ formatDate(employee.birthDate) }}</td>
            <td>{{ formatDate(employee.joiningDate) }}</td>
            <td>{{ employee.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import EmployeeService from '../services/EmployeeService';
  
  export default {
    data() {
      return {
        employees: []
      };
    },
    created() {
      this.retrieveEmployees();
    },
    methods: {
      retrieveEmployees() {
        EmployeeService.getEmployees().then(response => {
          this.employees = response.data;
        });
      },
      formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
    }
  };
  </script>

<style scoped>
.table-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.centered-table {
  width: auto; /* Adjust width as needed */
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
}

.centered-table th,
.centered-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.centered-table th {
  background-color: #f2f2f2;
}

.centered-table tr:hover {
  background-color: #f1f1f1;
}
</style>