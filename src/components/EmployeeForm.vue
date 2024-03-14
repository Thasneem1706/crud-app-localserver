<template>
    <div id="employee-form">
        <form @submit.prevent="handleSubmit">
            <label for="">Employee Name</label>
            <input type="text"
                   v-model="employee.name"
                   :class="{'has-error': submitting && invalidName}"
                   @focus="clearStatus"
                   @keypress="clearStatus"
                   ref="firstInput">
                   
            <p v-if="submitting && error" class="error-message" v-show="invalidName">{{ errorMessage.name }}</p>
            <label for="">Employee Mail</label>
            <input type="text" v-model="employee.email"
                   :class="{'has-error': submitting && (invalidMail || invalidMailFormat)}"
                   @focus="clearStatus"
                   @keypress="clearStatus">
            
            <p v-if="submitting && error" class="error-message" v-show="invalidMail">{{ errorMessage.email }}</p>
            <p v-if="submitting && error" class="error-message" v-show="invalidMailFormat && !invalidMail">{{ errorMessage.emailFormat }}</p>
            <p v-if="success" class="success-message">Employee successfully added</p>
            <button class="btn btn-success py-3 px-4 rounded-0">Add employee</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'employee-form',
    data() {
        return {
            submitting: false,
            success: false,
            error: false,
            errorMessage: {
                name: "Please provide the employee's name",
                email: "Please provide the employee's email address",
                emailFormat: "Please enter a valid email address",
            },
            employee: {
                name: '',
                email: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            this.submitting = true;
            this.clearStatus();

            if (this.invalidName) {
                this.error = true;
                return;
            } else if (this.invalidMail || this.invalidMailFormat || (this.invalidMail && this.invalidMailFormat)) {
                this.error = true;
                return;
            }

            this.$emit('add:employee', this.employee); // event emitting 
            this.$refs.firstInput.focus(); // template reference
            this.employee = {
                name: '',
                email: ''
            };
            this.success = true;
            this.error = false;
            this.submitting = false;
        },
        clearStatus() {
            this.success = false;
            this.error = false;
        },
        validateEmail(email) {
            // Basic email validation with the presence of '@'
            return /\S+@\S+\.\S+/.test(email);
        }
    },
    computed: {
        invalidName() {
            return this.employee.name === '';
        },
        invalidMail() {
            return this.employee.email === '';
        },
        invalidMailFormat() {
            return !this.validateEmail(this.employee.email);
        }
    }
}
</script>

<style scoped>
    [class*='-message'] {
        font-weight: 500;
    }

    .error-message {
        color: #d33c40;
    }

    .success-message {
        color: #32a95d;
    }
</style>
