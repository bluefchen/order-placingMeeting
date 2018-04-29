<template>
  <el-pagination
    :page-size="20"
    :pager-count="11"
    layout="prev, pager, next"
    :total="1000"
    @current-change="handlePageChanged">
  </el-pagination>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      pageChanged: {
        type: Function,
        required: true
      }
    },
    data() {
      return {}
    },
    methods: {
      handlePageChanged(val) {
        this.pageChanged(val);
      }
    },
  }
</script>

<style lang="less">

</style>
