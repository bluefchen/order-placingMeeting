<template>
  <el-table :data="tabsList.tableData" size="small">
    <el-table-column v-if="isSelection" type="selection" width="55"></el-table-column>
    <el-table-column v-for="(item, index) in tabsList.tableTitle" :key="index" :label="item.label" :prop="item.prop"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'Tabulation',
    props: {
      isSelection: {
        type: Boolean,
        require: false
      },
      tabsList: {
        type: Object,
        require: true
      }
    },
    data() {
      return{}
    }
  }
</script>

<style lang="less">
  .el-table .cell{
    text-align: center;
  }
  .el-table__header{
    border: 1px solid #dcdcdc;
    table-layout: inherit;
  }
  .el-table thead tr th{
    height: 40px;
    background-color: #efefef;
    color: #131212;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #f9f9f9;
  }
</style>