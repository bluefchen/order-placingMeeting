<template>
  <div class="v_pagination">
    <el-pagination
      :page-size="pageSize"
      :current-page="currentPage"
      :pager-count="11"
      layout="prev, pager, next"
      :total="total"
      @current-change="handlePageChanged">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      pageSize: {
        type: Number,
        default: 10
      },
      currentPage: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 1,
        require: true
      }
    },
    data() {
      return {}
    },
    methods: {
      handlePageChanged(val) {
        this.$emit('pageChanged', val);
      }
    }
  }
</script>

<style lang="less">
  .v_pagination {
    .el-pagination {
      margin-top: 20px;
      text-align: center;
    }

    .el-pager li {
      min-width: 20px;
      height: 20px;
      margin: 0 4px;
      background-color: transparent;
      line-height: 20px;
      font-size: 12px;
      font-weight: normal;
    }

    .el-pagination button, .el-pagination span:not([class*=suffix]) {
      height: 20px;
      line-height: 20px;
    }

    .el-pager li.btn-quicknext, .el-pager li.btn-quickprev {
      line-height: 20px;
    }

    .el-pager li:hover, .el-pager li.btn-quicknext:hover, .el-pager li.btn-quickprev:hover {
      color: #fa0000;
    }

    .el-pager .more::before {
      line-height: 20px;
    }

    .el-pager li.active {
      background-color: #fa0000;
      border-radius: 14px;
      color: #fff;
    }

    .el-pagination .btn-next, .el-pagination .btn-prev {
      background-color: transparent;
    }

    .el-pagination button:disabled {
      background-color: transparent;
    }

    .el-pagination button:hover {
      color: #fa0000;
    }
  }
</style>
