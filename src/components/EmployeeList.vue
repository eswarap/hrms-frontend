<template>
  <div>
      <h1 class="text-center">Employee List</h1>
          <b-form-input
            v-model="filter"
            type="search"
            placeholder="Type to filter data"
            class="mb-3"
          ></b-form-input>

          <b-table
            id="employee-table"
            :items="filteredEmployees"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            @filtered="onFiltered"
            striped
            hover
          ></b-table>

          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="employee-table"
          ></b-pagination>
          </div>
    <div class="table-container">

      <table class="centered-table">
        <thead>
          <tr>
             <th><input type="checkbox" @change="toggleSelectAll" :checked="isAllSelected" /></th>
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
            <td><input type="checkbox" v-model="selectedEmployees" :value="employee.id" /></td>
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
        employees: [],
        selectedEmployees: [],
          fields: [
             { key: 'id', label: 'ID', sortable: true },
             { key: 'first_name', label: 'First Name', sortable: true },
             { key: 'last_name', label: 'Last Name', sortable: true },
             { key: 'gender', label: 'Gender', sortable: true },
             { key: 'birth_date', label: 'Birth Date', sortable: true },
             { key: 'joining_date', label: 'Joining Date', sortable: true },
             { key: 'email', label: 'Email', sortable: true },
             { key: 'position', label: 'Position', sortable: true }
           ],
           filter: null,
           perPage: 10,
           currentPage: 1,
           rows: 0
      };
    },
    computed: {
        isAllSelected() {
          return this.selectedEmployees.length === this.employees.length && this.employees.length > 0;
        },
        filteredEmployees() {
          const filtered = this.employees.filter(employee => {
            return (
              (!this.filter || employee.first_name.toLowerCase().includes(this.filter.toLowerCase())) ||
              (employee.last_name.toLowerCase().includes(this.filter.toLowerCase()))
            );
          });
          //this.rows = filtered.length; // Update total rows based on filter
          return filtered;
        }
      },
    created() {
      this.retrieveEmployees();
    },
    methods: {
      retrieveEmployees() {
        EmployeeService.getEmployees().then(response => {
          this.employees = response.data;
           this.rows = this.employees.length;
        });
      },
       toggleSelectAll(event) {
        if (event.target.checked) {
          this.selectedEmployees = this.employees.map(emp => emp.id);
        } else {
          this.selectedEmployees = [];
        }
      },
      getEmployeeById(id) {
        return this.employees.find(emp => emp.id === id);
      },
      formatDate(dateString) {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          return new Date(dateString).toLocaleDateString(undefined, options);
       },
       onFiltered(filteredItems) {
         this.rows = filteredItems.length; // Update the row count after filtering
         this.currentPage = 1; // Reset to the first page
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

.table-container {
  margin-top: 20px;
}
</style>