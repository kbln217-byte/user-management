// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')


import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import { persistPlugin } from "./stores/persist";



createApp(App).use(createPinia()).mount("#app");

const pinia = createPinia();
pinia.use(persistPlugin);
createApp(App).use(pinia).mount("#app");

