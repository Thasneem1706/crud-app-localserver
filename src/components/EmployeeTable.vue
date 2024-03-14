<template>
     <div id="employee-table">
        <p v-if="employees.length<1" class="empty-table">No employee</p>
        <table v-else>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Employee name</th>
                    <th>Employee email</th>
                    <th>Action</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employee) in employees" :key="employee.id">
                    <td>{{ employee.id}}</td>
                    <td v-if="editing==employee.id">
                        <input type="text" v-model="employee.name">
                    </td>
                    <td v-else>{{employee.name}}</td>
                    <td v-if="editing==employee.id">
                        <input type="text" v-model="employee.email">
                    </td>

                    <td v-else>{{employee.email}}</td> 
                    <td v-if="editing==employee.id">
                        <button class="mx-2"  @click="editEmployee(employee)">save</button>
                        <button class="muted-button" @click="cancelEdit(employee)">cancel</button>
                    </td>
                    <td v-else> 
                        <button class="mx-2 btn btn-success px-3 py-2 rounded-0" @click="editMode(employee)">Edit</button>
                        <!-- <button @click="$emit('delete:employee', employee.id)">Delete</button> -->
                        <button class="btn btn-success  py-2 px-3 rounded-0" @click="showDeleteModal(employee.id)">Delete</button>
                        
                    </td>
                </tr>
            </tbody>
        </table>
        <delete-modal :showModal="deleteModalVisible" @cancel="cancelDeleteModal" @confirm="confirmDeleteModal" />
    </div>
</template>

<script>
import DeleteModal from './DeleteModal.vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
    name : 'employee-table',
    components: {
        DeleteModal
    },
    props:{
        employees : Array
    },
    data(){
        return{
            editing: null,
            deleteModalVisible: false,
            employeeToDelete: null,
            employee:{
                name:'',
                email:''

            },
            catchedEmployee : null
        }

    },
    methods:{
        showDeleteModal(employeeId) {
            this.employeeToDelete = employeeId;
            this.deleteModalVisible = true;
        },
        cancelDeleteModal() {
            this.deleteModalVisible = false;
            this.employeeToDelete = null;
        },
        async confirmDeleteModal() {
            if (this.employeeToDelete) {
                await this.$emit('delete:employee', this.employeeToDelete);
                this.cancelDeleteModal();
            }
        },
        editMode(employee){
            this.editing = employee.id;
            this.catchedEmployee = Object.assign({},employee)
        },
        editEmployee(employee){
            if(employee.name === '' || employee.email === '') {
                toast.error("Please ensure all fields are filled out");
                return;
            }

            // Check if the email contains '@'
            if (!this.validateEmail(employee.email)) {
                toast.error("Please include a valid email with '@'");
                return;
            }

            this.$emit('edit:employee', employee.id, employee);
            this.editing = null;
        },
        cancelEdit(employee){
            this.editing = null;
            Object.assign(employee, this.catchedEmployee);
        },
        validateEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }
    }
}
</script>


<style scoped>
    /* button{
        margin: 0 0.25rem 0 0;
    } */

</style>