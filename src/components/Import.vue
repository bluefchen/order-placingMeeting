<template>
  <div class="v_import">
    <!-- 文件导入 -->
    <div class="file-import">
      <UploadFile/>
    </div>

    <div class="result-header">
      <TitlePlate title="导入结果"/>
      <div class="result-info"><span class="red">校验结果：</span>Excel中共有<b class="red">100</b>条数据，其中<b
        class="red">98</b>条校验通过有效，<b class="red">2</b>条校验不通过无效，点击提交可以导入正确信息。
      </div>
    </div>

    <!--<div class="result-table">-->
    <!--<el-table :data="tableData"-->
    <!--stripe-->
    <!--border-->
    <!--size="small"-->
    <!--style="width: 100%">-->
    <!--<el-table-column-->
    <!--prop="date"-->
    <!--label="终端编码"-->
    <!--width="180">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="name"-->
    <!--label="终端名称"-->
    <!--width="180">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="address"-->
    <!--label="终端品牌">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="tag"-->
    <!--label="终端型号"-->
    <!--width="100">-->
    <!--<template slot-scope="scope">-->
    <!--<span class="state-icon" :class="scope.row.tag === '家' ? 'ok' : 'error'"></span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->

    <!--<table width="100%" cellspacing="0" cellpadding="0" class="table">-->
    <!--<thead>-->
    <!--<tr>-->
    <!--<th width="9%">终端编码</th>-->
    <!--<th width="18%">终端名称</th>-->
    <!--<th width="9%">终端品牌</th>-->
    <!--<th>终端型号</th>-->
    <!--<th width="8%">产品类型</th>-->
    <!--<th width="8%">终端价格</th>-->
    <!--<th width="9%">是否特种机型</th>-->
    <!--<th width="7%">数量</th>-->
    <!--<th width="8%">校验结果</th>-->
    <!--<th width="9%">校验信息</th>-->
    <!--</tr>-->
    <!--</thead>-->
    <!--<tbody>-->
    <!--<tr>-->
    <!--<td>11020300001</td>-->
    <!--<td><p class="overflow-handle">VIVO-X20全面屏 美颜拍照手机</p></td>-->
    <!--<td>VIVO</td>-->
    <!--<td>VIVO-X20</td>-->
    <!--<td>集采</td>-->
    <!--<td>￥1890</td>-->
    <!--<td><i class="iconfont red">&#xe63f;</i></td>-->
    <!--<td>1890</td>-->
    <!--<td><i class="iconfont green">&#xe712;</i></td>-->
    <!--<td></td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>11020300001</td>-->
    <!--<td><p class="overflow-handle">VIVO-X20全面屏 美颜拍照手机</p></td>-->
    <!--<td>VIVO</td>-->
    <!--<td>VIVO-X20</td>-->
    <!--<td>集采</td>-->
    <!--<td>￥1890</td>-->
    <!--<td>&#45;&#45;</td>-->
    <!--<td>1890</td>-->
    <!--<td><i class="iconfont red">&#xe639;</i></td>-->
    <!--<td></td>-->
    <!--</tr>-->
    <!--</tbody>-->
    <!--</table>-->

    <Table :table-title="columns" :table-data="tableData"/>
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
        tableTitle: [{
          label: '省份',
          prop: 'date'
        }, {
          label: '地市',
          prop: 'name',
          render: function (h, param) {
            let html = "";
            if (param.row.date == "2016-05-02") {
              html = "原创";
            } else {
              html = "非原创";
            }
            return html;
          }
        }, {
          label: '零售商名称',
          prop: 'address'
        }, {
          label: '零售商类型',
          prop: 'tag',
          // render: function () {
          //   return '<button @click="handleEdit(scope.$index, scope.row)">编辑</button>'
          // }
        }],
        columns: [
          {prop: "date", label: "栏目"},
          {prop: "name", label: "创建时间"},
          {prop: "address", label: "权重"},
          {
            prop: "tag",
            label: "原创",
            render: function (h, param) {
              return h({
                template: '<div><el-button class="btn-upload" size="small" type="success" @click="handleClick">导入</el-button></div>',
                methods: {
                  handleClick: function() {
                    console.log('clicked!', param);
                  }
                }
              });
              // return h(TitlePlate, {
              //   on: {update: this.handleEdit},
              //   props: {title: param.row.name}
              // });
            }
          }
        ],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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
    .result-table {
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
  }
</style>
