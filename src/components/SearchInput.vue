<template>
  <!-- 搜索 -->
  <div class="search-cnt box-1200 fn-clear">
    <div class="search fn-left">
      <input type="text" class="search-input" v-model="input" placeholder="输入终端名称、编码名称搜索">
    </div>
    <button class="search-btn fn-left" @click="handleSearch()">搜 索</button>
  </div>
</template>

<script>
  export default {
    name: 'InputWithSelect',
    props: {
      search: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        input: '',
      }
    },
    methods: {
      handleSearch() {
        this.search({
          value: this.input
        });
      }
    },
  }
</script>

<style scoped lang="less">
  .search-cnt{
    margin: 18px auto 12px;
    .search{
      display: flex;
      width: 416px;
      height: 34px;
      line-height: 34px;
      border: 1px solid #d5d5d5;
      border-right:0;
      &:hover{
        border: 1px solid #f13939;
        border-right:0;
      }
      .search-input{
        flex:1;
        padding: 0 16px;
        height: 34px;
        line-height: 34px;
      }
    }
    .search-btn{
      width: 62px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #f13939;
      color:#fff;
      font-size: 14px;
      border:0;
    }
  }
</style>
