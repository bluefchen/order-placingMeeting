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
    props: {},
    data() {
      return {
        totalCnt: 0,
        successCnt: 0,
        failCnt: 0,
        tableTitle: [{
          label: '终端编码',
          prop: 'offerCode',
          width: 160
        }, {
          label: '终端名称',
          prop: 'offerName',
          width: 120
        }, {
          label: '终端品牌',
          prop: 'brandName',
          width: 100
        }, {
          label: '终端型号',
          prop: 'offerModelName',
          width: 140
        }, {
          label: '产品类型',
          prop: 'isCentman',
          width: 100,
          render: (h, params) => {
            return h({
              template: '<div><span v-if="data.row.isCentman === \'Y\'">集采</span><span v-else>社采</span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '终端价格',
          prop: 'costPrice',
          width: 100
        }, {
          label: '是否特种机型',
          prop: 'isSpecial',
          width: 100,
          render: (h, params) => {
            return h({
              template: '<div><span class="state-icon" :class="data.row.isSpecial === \'Y\' ? \'ok\' : \'error\'"></span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '数量',
          prop: 'offerQty',
          width: 100
        }, {
          label: '校验结果',
          prop: 'isSuccess',
          width: 100,
          render: (h, params) => {
            return h({
              template: '<div><span class="result-icon" v-if="data.row.isSuccess === \'Y\'"></span><span v-else>--</span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '校验信息',
          prop: 'resultMsg'
        }],
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
