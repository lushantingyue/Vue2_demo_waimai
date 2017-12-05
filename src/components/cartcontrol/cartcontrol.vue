<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" @click="decreaseCart" v-show="food.count>0"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {

    props: {
      food: {
        type: Object
      }
    },
    created () {},
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        console.log('click')
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count > 0) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0px
    .cart-decrease, .cart-increase
      display: inline-block
      padding: 6px
      font-size 24px
      line-height: 24px
      color: rgb(0, 160, 220)
    .cart-count
      display: inline-block
      width: 12px
      vertical-align: top
      padding-top : 6px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-increase
      display: inline-block

</style>
