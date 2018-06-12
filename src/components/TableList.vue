<template>
  <div class="v_table-list">
    <div class="table-list-box">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in tableTitle" :key="index" :span="item.colSpan" :width="item.width">
          <p class="text-center">{{item.label}}</p>
        </el-col>
      </el-row>
    </div>
    <ul class="ul-tab">
      <li class="li-list" v-for="(item, index) in tableData" :key="index">
        <div class="p-line fn-clear">
          <el-row :gutter="20">
            <el-col v-for="(opt, optIndex) in tableHeader" :key="optIndex" :span="opt.colSpan" :offset="opt.colOffset">
              <span v-if="!opt.render">
                {{opt.prop}}
              </span>
              <table-row v-else :index="index" :row="item" :render="opt.render"></table-row>
            </el-col>
          </el-row>
        </div>
        <div class="dll">
          <el-row :gutter="20">
            <el-col 
              v-for="(column, colIndex) in tableTitle" 
              :key="colIndex" 
              :span="column.colSpan" 
              :offset="column.colOffset">
                <span v-if="!column.render">
                  {{item[column.prop]}}
                </span>
                <table-row v-else :index="index" :row="item" :render="column.render"></table-row>
            </el-col>
          </el-row>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import TableRow from '@/components/TableRow';

  export default {
    name: 'TableList',
    props: {
      activeName: {
        type: String,
        require: true
      },
      tabsList: {
        type: Array,
        require: true
      },
      tableTitle: {
        type: Array,
        require: true
      },
      tableData: {
        type: Array,
        require: true
      },
      tableHeader: {
        type: Array,
        require: true
      }
    },
    data() {
      return {}
    },
    computed: {
    },
    components: {
      TableRow
    }
  }
</script>

<style lang="less">
  .v_table-list{
    .table-list-box{
      height: 28px;
      line-height: 28px;
      background-color: #efefef;
      border: 1px solid #dcdcdc;
      color: #131212;
      font-size: 12px;
      font-weight: bold;
    }
    .li-list {
      margin-top: 10px;
      border: 1px solid #e0e0e0;
      &:hover {
        border: 1px solid #f00;
      }
    }
    .p-line {
      height: 35px;
      padding: 0 10px;
      background: #f8f8f8;
      color: #aaa;
      line-height: 35px;
      border-bottom: 1px solid #e0e0e0;
      .date-color {
        color: #4c4848;
        b{
          color: #000;
        }
      }
      .btn-del {
        background: none;
        border: none;
        cursor: pointer;
        .iconfont {
          color: #8f8f8f;
          font-size: 16px;
          padding: 0;
        }
        &:hover {
          .iconfont {
            color: #f82134;
            font-size: 16px;
            padding: 0;
          }
        }
      }
    }
    .dll {
      padding: 0 10px;
      height: 84px;
      line-height: 84px;
      text-align: center;
    }

    .photo-wrap {
      padding: 9px;
      text-align: left;
      cursor: pointer;
      .photo-pic {
        width: 66px;
        height: 66px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .photo-info {
        box-sizing: border-box;
        width: calc(100% - 85px);
        padding-top: 6px;
        padding-left: 15px;
        line-height: 30px;
        color: #333;
        .name {
          height: 26px;
          line-height: 26px;
          color: #050505;
          font-size: 14px;
          font-weight: bold;
          &:hover {
            color: #ed0000;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }

    .device-type {
      margin: 21px auto 0;
      width: 44px;
      height: 44px;
      line-height: 44px;
      border: 2px solid;
      border-radius: 50%;
      &.not-start {
        background: #ffecec;
        border-color: #f00;
        color: #f00;
      }
      &.underway {
        background: #eeffec;
        border-color: #47c044;
        color: #47c044;
      }
      &.done {
        background: #f8f8f8;
        border-color: #bcbcbc;
        color: #bcbcbc;
      }
    }

    .edit-btn {
      padding: 2px 5px;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      border-radius: 3px;
    }
    .edit-btn:hover {
      color: #f82134;
      border: 1px solid #f82134;
      border-radius: 3px;
      text-decoration: none;
      cursor: pointer;
    }

    .updown-btn {
      padding: 2px 5px;
      border: 0;
      text-decoration: underline;
      &:hover {
        border: 1px solid #f82134;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
    }
    .red {
      color: #f82134;
    }
  
    .text-left{
      text-align: left;
    }
    .text-center{
      text-align: center;
    }
    .text-right{
      text-align: right;
    }
  }
</style>
