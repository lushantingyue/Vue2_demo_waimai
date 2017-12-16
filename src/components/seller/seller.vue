<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text" v-if="seller.sellCount">月售{{seller.sellCount}}单</span>
        </div>
      </div>

      <split></split>

      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>

      <split></split>

      <div class="pics">
        <h1 class="title">商家实景</h1>
        <span class="pic" v-for="pic in seller.pics" v-show="seller.pics">
        <img :src="pic" width="240" height="180"/>
      </span>
      </div>

      <split></split>

      <div class="infos">
        <h1 class="title">商家信息</h1>
        <div class="text" v-for="text in seller.infos">{{text}}</div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import split from '../../components/split/split'
  import star from '../../components/star/star'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      split,
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position absolute
    .overview
      position relative
      padding 18px
      .title
        margin-bottom 8px
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
      .desc
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 0
        .star
          display inline-block
          padding-right 8px
          vertical-align top
        .text
          display inline-block
          margin-right 12px
          vertical-align top
          line-height 18px
          font-size 10px
          color rgb(77,85,93)
    .bulletin
      padding 18px
      .title
        padding-bottom 8px
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
      .content-wrapper
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height 24px
          font-size 12px
          color rgb(240, 20, 20)
          padding 0 12px 16px 12px
      .supports
        .support-item
          padding 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 0px
          &:last-child
            border-none()
          .text
            line-height 16px
            font-size 12px
            color rgb(7,17,27)
          .icon
            display: inline-block
            vertical-align top
            width: 16px
            height: 16px
            margin-right: 6px
            background-size: 16px, 16px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_2')
            &.discount
              bg-image('discount_2')
            &.guarantee
              bg-image('guarantee_2')
            &.invoice
              bg-image('invoice_2')
            &.special
              bg-image('special_2')

    .pics
      padding 18px 0 18px 18px
      .title
        padding-bottom 12px
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
    .infos
      padding 18px
      .title
        padding-bottom 12px
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
        border-1px(rgba(7, 17, 27, 0.1))
      .text
        padding 16px 12px
        line-height 16px
        font-size 12px
        color rgb(7,17,27)
        border-1px(rgba(7, 17, 27, 0.1))


</style>
