<template>
  <div id="app">
    <img src="@/assets/images/logo.png">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
  #app {
    margin-top: 60px;
    color: #2c3e50;
    text-align: center;
  }
</style>
