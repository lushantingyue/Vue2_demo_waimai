<template>
  <div class="good">
    <div class="menu-wrapper"></div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: []
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .good
    display: flex
    position: absolute
    top: 186px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
    .foods-wrapper
      flex: 1

</style>
