<template>
  <div class="v_import">
    <div class="file-import">
      <UploadFile @callback="uploadData"/>
    </div>

    <div class="result-header">
      <TitlePlate title="导入结果"/>
      <div class="result-info"><span>校验结果：</span>Excel中共有<b>{{totalCnt}}</b>条数据，其中<b
      >{{successCnt}}</b>条校验通过有效，<b>{{failCnt}}</b>条校验不通过无效，点击提交可以导入正确信息。
      </div>
    </div>

    <Table :table-title="tableTitle" :table-data="tableData"/>
  </div>
</template>

<script>
  import UploadFile from '@/components/UploadFile';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';

  export default {
    name: 'Import',
    props: {
      tableTitle: {
        type: Array,
        require: true
      }
    },
    data() {
      return {
        totalCnt: 0,
        successCnt: 0,
        failCnt: 0,
        tableData: []
      }
    },
    methods: {
      uploadData(data) {
        this.totalCnt = data.totalCnt;
        this.successCnt = data.successCnt;
        this.failCnt = data.failCnt;
        this.tableData = data.rows;
        console.log('导入文件返回的数据：', data);
      }
    },
    components: {
      UploadFile,
      TitlePlate,
      Table
    }
  }
</script>

<style lang="less">
  .v_import {
    .file-import {
      margin-top: 20px;
      padding: 20px;
      background-color: #fcfcfc;
      border: 1px solid #e8e8e8;
    }
    .result-header {
      position: relative;
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
      .result-info {
        position: absolute;
        top: 0;
        right: 0;
        > span {
          color: #f82134;
        }
        > b {
          margin: 0 3px;
          color: #f82134;
          font-size: 14px;
        }
      }
    }
    .state-icon {
      width: 20px;
      height: 20px;
      font-family: 'iconfont';
      font-size: 14px;
      &.ok::after {
        content: '\e712';
        color: #3fbf2e;
      }
      &.error::after {
        content: '\e639';
        color: #f71515;
      }
    }
    .result-icon {
      width: 20px;
      height: 20px;
      font-family: 'iconfont';
      font-size: 14px;
      &::after {
        content: '\e63f';
        color: #f71515;
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
      font-weight: 700;
      text-align: center;
    }
  }
</style>
