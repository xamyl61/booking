import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { vfmPlugin } from 'vue-final-modal'
import App from './App.vue'
import router from './router'
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import VOtpInput from "vue3-otp-input";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import VueEasyLightbox from 'vue-easy-lightbox'
import VueSnip from 'vue-snip'
import ru from 'element-plus/dist/locale/ru.mjs'
import 'dayjs/locale/ru'

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker)

app.use(createPinia())
app.use(ElementPlus, {
    locale: ru
})
app.use(router)
app.use(vfmPlugin)
app.use(Vue3Toasity)
app.use(VueEasyLightbox)
app.use(VueSnip)
app.component('v-otp-input', VOtpInput)
app.mount('#app')
