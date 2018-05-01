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

    <Table :table-title="tableTitle" :table-data="tableData"/>

    <table width="100%" cellspacing="0" cellpadding="0" class="table">
      <thead>
      <tr>
        <th width="9%">终端编码</th>
        <th width="18%">终端名称</th>
        <th width="9%">终端品牌</th>
        <th>终端型号</th>
        <th width="8%">产品类型</th>
        <th width="8%">终端价格</th>
        <th width="9%">是否特种机型</th>
        <th width="7%">数量</th>
        <th width="8%">校验结果</th>
        <th width="9%">校验信息</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>11020300001</td>
        <td><p class="name">VIVO-X20全面屏 美颜拍照手机</p></td>
        <td>VIVO</td>
        <td>VIVO-X20</td>
        <td>集采</td>
        <td>￥1890</td>
        <td><i class="iconfont red">&#xe63f;</i></td>
        <td>1890</td>
        <td><i class="iconfont green">&#xe712;</i></td>
        <td></td>
      </tr>
      <tr>
        <td>11020300001</td>
        <td><p class="name">VIVO-X20全面屏 美颜拍照手机</p></td>
        <td>VIVO</td>
        <td>VIVO-X20</td>
        <td>集采</td>
        <td>￥1890</td>
        <td>--</td>
        <td>1890</td>
        <td><i class="iconfont red">&#xe639;</i></td>
        <td></td>
      </tr>
      </tbody>
    </table>
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
          prop: 'province'
        }, {
          label: '地市',
          prop: 'city'
        }, {
          label: '供应商名称',
          prop: 'supplierName'
        }, {
          label: '供应商类型',
          prop: 'supplierType'
        }, {
          label: '联系人',
          prop: 'contact'
        }, {
          label: '联系电话',
          prop: 'TEL'
        }, {
          label: '公司电话',
          prop: 'companyTel'
        }, {
          label: '公司传真',
          prop: 'fax'
        }],
        tableData: [{
          province: '江苏省',
          city: '南京市',
          supplierName: '供货商AAAAA供货商AAAAA供货商AAAAA供货商AAAAA供货商AAAAA供货商AAAAA供货商AAAAA供货商AAAAA',
          supplierType: '省代',
          contact: '王小明',
          TEL: '180123456789  ',
          companyTel: '025-5800000000',
          fax: '025-5800000000'
        }, {
          province: '江苏省',
          city: '南京市',
          supplierName: '供货商AAAAA',
          supplierType: '省代',
          contact: '王小明',
          TEL: '180123456789  ',
          companyTel: '025-5800000000',
          fax: '025-5800000000'
        }, {
          province: '江苏省',
          city: '南京市',
          supplierName: '供货商AAAAA',
          supplierType: '省代',
          contact: '王小明',
          TEL: '180123456789  ',
          companyTel: '025-5800000000',
          fax: '025-5800000000'
        }]
      }
    },
    methods: {},
    components: {
      UploadFile,
      TitlePlate,
      Table
    }
  }
</script>

<style scoped lang="less">
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

    .table {
      border: 1px solid #e3e3e3;
    }

    .table thead tr {
      height: 32px;
      background-color: #efefef;
      border-bottom: 1px solid #d1d1d1;
      color: #131212;
    }

    .table thead tr th {
      text-align: center;
      border-right: 1px solid #d1d1d1;
    }

    .table tbody tr {
      height: 32px;
      border-bottom: 1px solid #e3e3e3;
    }

    .table tbody tr td {
      text-align: center;
      border-right: 1px solid #e3e3e3;
    }

    .table tbody tr:nth-of-type(2n) {
      background-color: #fcfcfc;
    }

    .table td i.iconfont {
      font-size: 18px;
    }
  }
</style>
