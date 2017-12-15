<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"
                    @select="selectRating" @toggle="toggleContent"></ratingselect>
      <div class="ratings-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28"/>
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="36" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../../components/star/star'
  import ratingselect from '../../components/ratingselect/ratingselect'
  import split from '../../components/split/split'
  import BScroll from 'better-scroll'

  const ALL = 2
  const STATE_SUCESS = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: false
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === STATE_SUCESS) {
          this.ratings = response.data
        }
      })
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        })
      })
    },
    methods: {
      toggleContent () {
        this.onlyContent = !this.onlyContent
      },
      selectRating (type) {
        this.selectType = type
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex: 0 0 137px
        padding 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align center
        @media only screen and (max-width 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)

      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size 0
          .title
            display: inline-block
            vertical-align top
            line-height: 18px
            font-size 12px
            color rgb(7, 17, 27)
          .star
            display inline-block
            vertical-align top
            margin: 0 12px
          .score
            display inline-block
            vertical-align top
            line-height: 18px
            font-size 12px
            color rgb(255, 153, 0)
        .delivery-wrapper
          font-size 0
          .title
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .delivery
            margin-left 12px
            line-height 18px
            font-size 12px
            color rgb(147, 153, 159)
    .ratings-wrapper
      padding 18px 0
      .rating-item
        margin 0 18px
        .avatar
          img
            border-radius 28px
        .content
          .name
            font-size 10px
          .star-wrapper
            margin 4px 0 6px 0
            font-size 0
            .star
              line-height 12px
              display inline-block
              vertical-align top
            .delivery
              margin-left 6px
              display inline-block
              line-height 12px
              vertical-align top
              font-size 10px
              color rgb(147, 153, 159)
          .text
            font-size 12px
            color rgb(7, 17, 27)
</style>
