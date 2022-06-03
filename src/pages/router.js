import {createRouter} from 'vue-router'
import Home from './Home.vue'
import Gateways from './Gateways.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/gateways',
        name: 'Gateways',
        component: Gateways
    }
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}