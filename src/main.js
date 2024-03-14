import { createApp } from 'vue'; // Import createApp function from Vue
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Vue3Toastify from 'vue3-toastify';
import Paginate from 'vuejs-paginate-next';

// Create a Vue application instance using createApp
const app = createApp(App);
app.use(Paginate);


// Use Toasted plugin
app.use(Vue3Toastify, {
    autoClose: 3000,
});

// Mount the app instance to the DOM
app.mount('#app');
