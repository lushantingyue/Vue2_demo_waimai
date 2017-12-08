<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" v-on:before-enter="beforeDrop" v-on:enter="dropping" v-on:after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFood">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span class="prefix">￥</span><span>{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  // import Bus from '../../bus'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'

  export default {
    components: {
      cartcontrol
    },
    props: {
      selectFood: {
        type: Array,
        default () {
          return [
            {
              price: 10,
              count: 6
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
      }
    },
    created () {
      // Bus.$on('cartAdd', (target) => {
      //   this.drop(target)
      // })
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFood.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFood.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}起送`
        } else {
          return `去结算`
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.bscroll) {
              this.bscroll = new BScroll(this.$refs.listContent, {click: true})
            } else {
              this.bscroll.refresh()
            }
          })
        }
        return show
      }
    },
    // transitions: {
    //   drop: {
    //     beforeEnter (el) {
    //       let count = this.balls.length
    //       while (count--) {
    //         let ball = this.balls[count]
    //         if (ball.show) {
    //           let rect = ball.el.getBoundingClientRect()
    //           let x = rect.left - 32
    //           let y = -(window.innerHeight - rect.top - 22)
    //           el.style.display = ''
    //           el.style.webkitTransform = `translate3d(0,${y}px,0)`
    //           el.style.transform = `translate3d(0,${y}px,0)`
    //           // 内层动画
    //           let inner = el.getElementsByClassName('inner-hook')[0]
    //           inner.style.webkitTransform = `translate3d(${x}px,0,0)`
    //           inner.style.transform = `translate3d(${x}px,0,0)`
    //         }
    //       }
    //     },
    //     enter (el, done) {
    //       // 触发重绘html
    //       /* eslint-disable no-unused-vars */
    //       let rf = el.offsetHeight
    //       // 让动画效果异步执行,提高性能
    //       this.$nextTick(() => {
    //         el.style.webkitTransform = 'translate3d(0,0,0)'
    //         el.style.transform = 'translate3d(0,0,0)'
    //         // 处理内层动画
    //         let inner = el.getElementsByClassName('inner-hook')[0]
    //         inner.style.webkitTransform = 'translate3d(0,0,0)'
    //         inner.style.transform = 'translate3d(0,0,0)'
    //         // Vue为了知道过渡的完成，必须设置相应的事件监听器。
    //         el.addEventListener('transitionend', done)
    //       })
    //     },
    //     afterEnter (el) {
    //       // 完成一次动画就删除一个dropBalls的小球
    //       let ball = this.dropBalls.shift()
    //       if (ball) {
    //         ball.show = false
    //         el.style.display = 'none'
    //       }
    //     }
    //   }
    // },
    methods: {
      drop (el) {
        console.log('******* shopcart *******')
        console.log(el)
        // 触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            // 将false的小球放到dropBalls
            ball.show = true
            ball.el = el
            // 设置小球的el属性为一个dom对象
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop (el) {
        console.log('******* beforeDrop *******')
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            // 内层动画
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping (el, done) {
        console.log('******* dropping *******')
        // 触发重绘html
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        // 让动画效果异步执行,提高性能
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          // 处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          // Vue为了知道过渡的完成，必须设置相应的事件监听器。
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop (el) {
        console.log('******* afterDrop *******')
        // 完成一次动画就删除一个dropBalls的小球
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.selectFood.forEach((food) => {
          food.count = 0
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        font-size: 0
        .logo-wrapper
          display: inline-block
          position relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width 100%
            height 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            border-radius: 6px
            background rgb(240, 20, 20)
            text-align center
            line-height: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)

        .price
          display: inline-block
          vertical-align: top
          margin: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          line-height: 24px
          font-size: 10px
          font-weight: 700
      .content-right
        flex: 0 0 105
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff

    .ball-container
      .ball
        position: fixed //小球动画必须脱离html布局流
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear


    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transition: all 0.5s
      transform: translate3d(0,-100%,0)
      &.fold-enter, &.fold-leave
        transform translate3d(0,0,0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          font-weight 200
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        overflow: hidden
        max-height: 217px
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
            .prefix
              font-size: 10px
              font-weight normal
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px



</style>
