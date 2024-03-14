<template>
  <div class="container my-4">
    <h1 class="mb-4">Employees</h1>

    <div class="row justify-content-between">
      <div class="col-4">
        <employee-form @add:employee="addEmployee" />
      </div>
      <div class="col-7">
        <employee-table v-bind:employees="displayedEmployees"
                        v-bind:employeeIds="employeeIds"
                        @delete:employee="deleteEmployee"
                        @edit:employee="editEmployee" />
        <!-- Pagination -->
        <paginate v-model="currentPage"
                  :page-count="totalPages"
                  :click-handler="changePage"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'pagination'" />
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeForm from './components/EmployeeForm.vue';
import EmployeeTable from './components/EmployeeTable.vue';
import Paginate from 'vuejs-paginate-next';

export default {
  name: 'App',
  components: {
    EmployeeTable,
    EmployeeForm,
    Paginate
  },
  data() {
    return {
      employees: [], 
      currentPage: 1, 
      pageSize: 9, 
      employeeIds: []
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.employees.length / this.pageSize);
    },
    displayedEmployees() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.employees.slice(startIndex, endIndex);
    }
    // sortedEmployees() {
    //   return [...this.employees].sort((a, b) => a.id - b.id);
    // }
  },
  methods: {  
    async addEmployee(employee){
        try {
          const response = await fetch('/users.json',
          {
            method:'POST',
            body: JSON.stringify(employee),
            headers:{
              'Content-type': 'application/json; charset=UTF-8',
            }
          });
          const data = await response.json();

          this.employees = [...this.employees, data];

        } catch (error) {
          console.log(error)
          
        }
    },
    
    async deleteEmployee(id){
      try {
       await fetch('/users.json'+id),{
        method:'DELETE'
       }

        this.employees = this.employees.filter((employee)=>{
        return employee.id != id;

      })
      } catch (error) {
        console.log(error)
        
      }
      
    },
    
    async editEmployee(id, updatedEmployee){
      try {

       const response = await fetch('/users.json'+id,
        {
          method:'PUT',
          body: JSON.stringify(updatedEmployee),
          headers:{
            'Content-type': 'application/json; charset=UTF-8',
          }
        });
        const data = await response.json();

        this.employees.map((employee)=>{
        return employee.id==id? data:employee;

      })
        
      } catch (error) {
        console.log(error)
        
      }
      
    },
    async getEmployees(){
        try {
        const response = await fetch('/users.json');
        const data = await response.json();
        this.employees = data;

          
        } catch (error) {
        console.log(error)
          
        }
      
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    }
  },
  mounted() {
    this.getEmployees();
  }
}

</script>

