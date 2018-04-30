<template>
  <div class="v_table">
    <el-table :data="tableData" stripe border @selection-change="handleSelectionChange" size="small">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column v-for="(title, index) in tableTitle" :key="index" :prop="title.prop"
                       :label="title.label"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      isSelection: {
        type: Boolean,
        default: false
      },
      tableTitle: {
        type: Array,
        require: true
      },
      tableData: {
        type: Array,
        require: true
      }
    },
    data() {
      return {}
    },
    methods: {
      handleSelectionChange(val) {
        console.log('表格选择项：', val);
      }
    }
  }
</script>

<style lang="less">
  .v_table {
    .el-table, .el-table__expanded-cell {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
    }

    .el-table th.is-leaf {
      background-color: #f5f4f4;
      color: #000;
      font-weight: 700;
      text-align: center;
    }
  }
</style>
