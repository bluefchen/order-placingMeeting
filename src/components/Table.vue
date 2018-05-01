<template>
  <div class="v_table">
    <el-table :data="tableData" stripe border @selection-change="handleSelectionChange" size="small">
      <el-table-column v-if="isSelection" type="selection" width="55"></el-table-column>
      <el-table-column v-for="(column, index) in tableTitle" :key="index" :prop="column.prop" :label="column.label">
        <template slot-scope="scope">
          <table-row v-if="column.render" :index="index" :row="scope.row" :render="column.render"></table-row>
          <span v-else>
            {{scope.row[column.prop]}}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import TableRow from '@/components/TableRow';

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
    },
    components: {
      TableRow
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
