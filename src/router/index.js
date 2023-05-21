import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Products from '../views/Products.vue'
import AddSell from '../views/AddSell.vue'
import Sells from '../views/Sells.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
    ,
    {
      path: '/products',
      name: 'products',
      component: Products
    }
    ,
    {
      path: '/addSell',
      name: 'addSell',
      component: AddSell
    },
    {
      path: '/sells',
      name: 'Sells',
      component: Sells
    }
  ]
})

export default router
