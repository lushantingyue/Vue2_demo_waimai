// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/store'
import App from './App'
import router from './router'

import 'common/stylus/index.styl'
// import VueRouter from 'vue-router'
// import goods from '@/components/goods/goods'
// import ratings from '@/components/ratings/ratings'
// import seller from '@/components/seller/seller'

Vue.config.productionTip = false
// Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
