<template>
  <div>
    I'm seller.
  </div>
</template>

<script type="text/ecmascript-6">
  const STATE_SUCESS = 0

  export default {
    props: [],
    data () {
      return {
        seller: Object
      }
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        if (response.errno === STATE_SUCESS) {
          this.seller = response.data
          console.log('=========' + this.seller)
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
