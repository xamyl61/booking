import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import VueTailwindDatepicker from 'vue-tailwind-datepicker'
// import '@vuepic/vue-datepicker/dist/main.css'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
// app.use(VueTailwindDatepicker)
app.use(router)

app.mount('#app')
