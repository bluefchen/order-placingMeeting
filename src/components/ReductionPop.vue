<template>
  <span class="text">
    <abbr v-popover:popover>优惠政策</abbr>
    <el-popover
      ref="popover"
      width="100"
      trigger="hover">
      <p class="rule" v-for="item in list">{{item}}</p>
    </el-popover>
  </span>
</template>

<script>
  export default {
    name: 'Popover',
    props: {
      list: {
        type: Array,
        default: function () {
          return ['暂无优惠政策'];
        }
      }
    },
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
