<template>
  <div class="good">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item" @click="showIndex(item)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h4 class="title">{{ item.name }}</h4>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.image">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const STATE_SUCESS = 0

  export default {
    props: {
      seller: {type: Object}
    },
    data () {
      return {
        goods: [],
        listData: []
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === STATE_SUCESS) {
          this.goods = response.data
          console.log(this.goods)
        }
      })
    },
    methods: {
      showIndex (item) {
//        this.listData = item.foods
//        console.log(this.listData)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .good
    display: flex
    position: absolute
    top: 186px
    bottom: 46px
    left: 0
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      ul
        font-size: 0
        .menu-item
          display: table
          height: 54px
          width: 56px
          padding: 0 12px
          line-height: 14px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px, 12px
            background-repeat: no-repeat
            font-size: 0
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
          .text
            display: table-cell
            width: 56px
            vertical-align: middle
            border-1px(rgba(7, 17, 27, 0.1))
            font-size: 12px

    .foods-wrapper
      flex: 1
      overflow: auto
      .food-list
        .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147, 153, 159)
          background: #f3f5f7
         ul
          .food-item
            display: flex
            margin: 18px
            border-1px(rgba(7, 17, 27, 0.1))
            .icon
              flex 0 0 57px
              margin-right: 10px
            .content
                flex: 1
              .name
                margin-top: 2px
                font-size 14px
                color: rgb(7, 17, 27)
                height: 14px
                line-height: 14px
              .desc
                font-size: 10px
              .extra
                margin: 8px 0
                font-size: 10px
              .price
                font-size: 10px

  //.ul
  //list-style: none
  //float: left
</style>
