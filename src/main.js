import Vue from 'vue'
import App from './App.vue'
import router from './router'
window.$ = require("jquery");
window.axios = require("axios");
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
