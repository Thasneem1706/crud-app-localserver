<template>
    <div class="modal fade" :class="{ show: showModal }" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Delete Employee</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this employee?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancelDelete">Cancel</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeleteModal',
    props: {
      showModal: Boolean
    },
    methods: {
      cancelDelete() {
        this.$emit('cancel');
      },
      confirmDelete() {
        this.$emit('confirm');
      }
    }
  }
  </script>
  
  <style scoped>
  /* .modal {
    display: none;
    z-index: 1050;
    overflow-x: hidden;
    overflow-y: auto;
  } */
  </style>
  