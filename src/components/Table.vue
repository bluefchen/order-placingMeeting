<template>
  <div class="v_table">
    <el-table :data="tableData" :stripe="stripe" :border="border" @selection-change="handleSelectionChange" size="small">
      <el-table-column v-if="isSelection" type="selection" width="55"></el-table-column>
      <el-table-column v-for="(column, index) in tableTitle" :key="index" :prop="column.prop" :label="column.label" :width="column.width">
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
      stripe: {
        type: Boolean,
        default: true
      },
      border: {
        type: Boolean,
        default: true
      },
      isSelection: {
        type: Boolean,
        default: false
      },
      handleSelectionChange: {
        type: Function,
        default: function (val) {
          console.log('表格选择项：', val);
        }
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

    .delete-btn {
      padding: 0;
      color: #ff0000;
      font-size: 12px;
      &:hover {
        color: #ff0000;
        text-decoration: underline;
      }
    }
  }
</style>
