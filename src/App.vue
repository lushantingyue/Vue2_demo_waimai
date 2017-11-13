<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">Tab</div>
    <div class="content">Content</div>
    <router-view/>
  </div>
</template>

<script>
  import header from './components/header/Header.vue'

  export default {
    name: 'app',
    components: {'v-header': header}
  }
</script>

<style>
  /*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*}*/
</style>
