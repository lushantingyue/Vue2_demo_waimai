import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)
// store对象
var store = new vuex.Store({
  state: {
    addItem: false
  }
})

export default store
