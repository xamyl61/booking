import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vfmPlugin } from 'vue-final-modal'
import App from './App.vue'
import router from './router'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vfmPlugin)
app.use(Vue3Toasity)

app.mount('#app')
