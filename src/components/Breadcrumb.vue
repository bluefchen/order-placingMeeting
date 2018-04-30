<template>
  <el-breadcrumb separator=">">
    <label>我的位置：</label>
    <el-breadcrumb-item v-for="(item, index) in list" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    props: {
      list: {
        type: Array,
        required: true,
        default: function () {
          return ['首页', '详情']
        }
      }
    },
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style lang="less">
  .el-breadcrumb {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    font-weight: normal;
    label {
      float: left;
      color: #aaa;
    }
  }

  .el-breadcrumb__inner {
    color: #242424;
  }

  .el-breadcrumb__separator {
    /*color: #242424;*/
    font-weight: normal;
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    color: #f82134;
  }
</style>
