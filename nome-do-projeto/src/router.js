import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import ProductDetails from './views/ProductDetails.vue'
import CartPage from './views/CartPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetails },
  { path: '/cart', component: CartPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router