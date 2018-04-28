<template>
  <div class="hello">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    created() {
      this.$axios({
        method: 'get',
        url: '/api/data',
      }).then(rsp => {
        console.log('返回数据：', rsp.data);
      })
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style scoped lang="less">
  .hello {
    background-color: #ff0;
  }
</style>
