<template>
  <div class="table_container">
      <h3 class="text-center">Employee List</h3>
          <b-form-input
            v-model="filter"
            type="search"
            placeholder="Type to filter data"
            class="w-25 mx-auto"
            @input="onFiltered"
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
             class="w-75 mx-auto"
          ></b-table>

          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="employee-table"
            class="w-75 mx-auto"
          ></b-pagination>
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
             { key: 'firstName', label: 'First Name', sortable: true },
             { key: 'lastName', label: 'Last Name', sortable: true },
             { key: 'gender', label: 'Gender', sortable: true },
             { key: 'birthDate', label: 'Birth Date', sortable: true, formatter: (value) => this.formatDate(value) },
             { key: 'joiningDate', label: 'Joining Date', sortable: true, formatter: (value) => this.formatDate(value) },
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
              (!this.filter || employee.firstName.toLowerCase().includes(this.filter.toLowerCase())) ||
              (employee.lastName.toLowerCase().includes(this.filter.toLowerCase()))||
              (employee.gender.toLowerCase().includes(this.filter.toLowerCase()))||
              (employee.birthDate.toLowerCase().includes(this.filter.toLowerCase()))||
              (employee.joiningDate.toLowerCase().includes(this.filter.toLowerCase()))||
              (employee.email.toLowerCase().includes(this.filter.toLowerCase()))||
              (employee.position.toLowerCase().includes(this.filter.toLowerCase()))
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
          const options = {  day: 'numeric', month: 'long', year: 'numeric' };
          return new Date(dateString).toLocaleDateString('en-IN', options);
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
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>