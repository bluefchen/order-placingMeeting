<template>
  <span class="text">
    <abbr v-popover:popover>优惠政策</abbr>
    <el-popover
      ref="popover"
      width="100"
      trigger="hover">
      <p class="rule">满<span>10000</span>减<span>200</span></p>
      <p class="rule">满<span>20000</span>减<span>400</span></p>
    </el-popover>
  </span>
</template>

<script>
  export default {
    name: 'Popover',
    props: {},
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  .text {
    border-radius: 3px;
    border: 1px solid #e23a3a;
    color: #e23a3a;
    cursor: pointer;
  }

  .rule {
    color: #333;
    font-size: 12px;
    span {
      color: #f60e0e;
    }
  }
</style>
