<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
        </div>
        <div class="content">
          <div class="content-left">
            <span class="name">{{food.name}}</span>
            <div class="extra">
              <span class="count">{{food.price}}</span><span></span>
            </div>
            <div class="price">
              <span class="new">{{food.price}}</span><span class="old">{{food.old}}</span>
            </div>
          </div>
          <div class="content-right">
            <cartcontrol :food="food"></cartcontrol>
          </div>
        </div>
      </div>
      <div class="food-detail"></div>
      <div class="rating"></div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  // import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'

  export default {
    components: {
      cartcontrol
    },
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      }
    },
    computed: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left 0
    top 0
    bottom 48px
    width 100%
    z-index 30
    background #fff
    transform translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-to
      transform translate3d(100%, 0, 0)

    .food-content
      position relative
      display inline
      font-size 0
      .image-header
        position: relative
        width 100%
        height 0
        padding-top 100%
        .img
          position: absolute
          top  0
          left 0
          width 100%
          height 100%



</style>
