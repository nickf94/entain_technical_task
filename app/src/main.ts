import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './index.css'
import App from './App.vue'

const pinia = createPinia()
const vuetify = createVuetify()

createApp(App).use(pinia).use(vuetify).mount('#app')
