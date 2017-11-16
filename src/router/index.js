import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'

// import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'

Vue.use(Router)
Vue.use(vueResource)
const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    },
    {
      //  重定向实现默认路由
      path: '/',
      redirect: '/seller'
    }
  ]
})

export default router
