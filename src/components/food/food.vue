<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  // import BScroll from 'better-scroll'

  export default {
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
    computed: {
      show () {
        if (this.food.length > 0) {
          this.showFlag = true
        } else {
          this.showFlag = false
        }
      }
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


</style>
