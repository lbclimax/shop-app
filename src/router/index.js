import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Products from '../views/Products.vue'
import AddSell from '../views/AddSell.vue'
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
    }
  ]
})

export default router
