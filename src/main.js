import { createApp } from 'vue'
import mitt from 'mitt'
import { createWebHistory } from 'vue-router'
import createRouter from './pages/router'
import VueBasicAlert from 'vue-basic-alert'
import {PromiseDialog} from 'vue3-promise-dialog'

import App from './App.vue'

const emitter = mitt()
const router = createRouter(createWebHistory())
const app = createApp(App)
app.use(VueBasicAlert)
app.use(PromiseDialog);
app.config.globalProperties.emitter = emitter
const root = app.use(router).mount('#app')