<template>
  <div id="app">
    <v-header :seller="seller"></v-header>

    <div class="border-1px-top tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
        <!--<a v-link="{path:'/goods'}">商品</a>-->
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>

</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'

  const STATE_SUCESS = 0

  export default {
    name: 'app',
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        console.log(response)
        if (response.errno === STATE_SUCESS) {
          this.seller = response.data
          console.log(this.seller)
        }
      })
    },
    components: {'v-header': header}
  }
</script>

<style lang="stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display block
          text-decoration none
          font-size 14px
          color rgb(77, 85, 93)
          &.active
            color rgb(240, 20, 20)

  /*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*}*/
</style>
