0<template>
  <div class="v_table">
    <el-table :data="tableData" :stripe="stripe" :border="border" @selection-change="handleSelectionChange" size="small"
              :highlight-current-row="highlightCurrentRow" @current-change="handleCurrentChange" tooltip-effect="light">
      <el-table-column v-if="isIndex" type="index" label="序号" width="50"></el-table-column>
      <el-table-column v-if="isSelection" type="selection" width="50"></el-table-column>
      <el-table-column v-for="(column, index) in tableTitle" :key="index" :prop="column.prop" :label="column.label" :width="column.width" :show-overflow-tooltip="true">
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
      isIndex: {
        type: Boolean,
        default: false
      },
      isSelection: {
        type: Boolean,
        default: false
      },
      selectionChange: {
        type: Function
      },
      tableTitle: {
        type: Array,
        require: true
      },
      tableData: {
        type: Array,
        require: true
      },
      highlightCurrentRow: {
        type: Boolean,
        default: false
      },
      currentChange: {
        type: Function
      }
    },
    data() {
      return {}
    },
    methods: {
      handleSelectionChange(val) {
        console.log('表格选择项：', val);
        this.$emit('selectionChange', val);
      },
      handleCurrentChange(val) {
        console.log('表格当前选中行：', val);
        this.$emit('currentChange', val);
      }
    },
    components: {
      TableRow
    }
  }
</script>

<style lang="less">
  .table-radio {
    &:after {
      font-family: 'iconfont';
      content: '\e74a';
      display: block;
      margin: 0 auto;
      width: 25px;
      height: 20px;
      font-size: 24px;
      color: #c5c4c4;
    }
  }

  .current-row {
    .table-radio {
      &:after {
        font-family: 'iconfont';
        content: '\e74b';
        display: block;
        margin: 0 auto;
        width: 25px;
        height: 20px;
        font-size: 24px;
        color: #f41b1b;
      }
    }
  }

  .v_table {

    .is-focus{
      .el-checkbox__inner{
        border-color: #fa0000;
      }
    }

    .el-checkbox__inner{
      &:hover{
        border-color: #fa0000;
      }
      &:after{
        border: 2px solid #f00;
        border-left: 0;
        border-top: 0;
        left: 4px;
        top: 0px;
      };
    }

    .el-checkbox__input{
      &.is-checked, &.is-indeterminate{
        .el-checkbox__inner{
          background-color: #fff;
          border-color: #fa0000;
        }
      }
    }

    .el-checkbox__input{
      &.is-indeterminate{
        .el-checkbox__inner{
          background-color: #fff;
          border-color: #fa0000;
        }
      }
    }

    .el-checkbox__input{
      &.is-indeterminate {
        .el-checkbox__inner::before {
          background-color: #f00;
          height: 3px;
        }
      }
    }

    .el-table, .el-table__expanded-cell {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
    }

    .el-table th.is-leaf {
      background-color: #f5f4f4;
      color: #000;
      font-weight: 800;
      text-align: center;
    }

    .text-link {
      color: #e52941;
      text-decoration: underline;
      cursor: pointer;
    }

    .text-tag-danger {
      color: #e52941;
      font-weight: 800;
    }

    .text-tag-stress {
      color: #000;
      font-weight: 800;
    }

    .delete-btn {
      padding: 2px 5px;
      border: 1px solid transparent;
      color: #ff0000;
      font-size: 12px;
      text-decoration: underline;
      &:hover {
        border: 1px solid #f82134;
        border-radius: 3px;
        color: #ff0000;
        text-decoration: none;
      }
    }

    .updown-btn {
      padding: 2px 5px;
      border: 1px solid transparent;
      color: #ff0000;
      font-size: 12px;
      text-decoration: underline;
      cursor: pointer;
      text-decoration: underline;
      &:hover {
        border: 1px solid #f82134;
        border-radius: 3px;
        color: #e52941;
        text-decoration: none;
      }
    }
  }
  /*真实姓名*/
  .role-man{
    text-align: left;
    .iconfont{
      margin: 0 15px;
      color: #f7626f;
      font-size: 18px;
    }
  }
</style>
