import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PedidosView from '@/views/PedidosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/pedidos",
      name:'pedidos',
      component: () => import(/* webpackChunkName:  "pedidos"*/'../views/PedidosView.vue')
    }
  ]
})

export default router
