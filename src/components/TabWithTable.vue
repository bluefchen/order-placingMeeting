<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="参会供货商" name="first">
      <el-table :data="tableData" stripe border size="small">
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="city" label="地市"></el-table-column>
        <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
        <el-table-column prop="supplierType" label="供应商类型"></el-table-column>
        <el-table-column prop="contact" label="联系人"></el-table-column>
        <el-table-column prop="TEL" label="联系电话"></el-table-column>
        <el-table-column prop="companyTel" label="公司电话"></el-table-column>
        <el-table-column prop="fax" label="公司传真"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="参会零售商" name="second">
      <el-table :data="tableData" stripe border size="small">
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="city" label="地市"></el-table-column>
        <el-table-column prop="supplierName" label="零售商名称"></el-table-column>
        <el-table-column prop="supplierType" label="零售商类型"></el-table-column>
        <el-table-column prop="contact" label="联系人"></el-table-column>
        <el-table-column prop="TEL" label="联系电话"></el-table-column>
        <el-table-column prop="companyTel" label="公司电话"></el-table-column>
        <el-table-column prop="fax" label="公司传真"></el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: 'TabWithTable',
    data() {
      return {
        activeName: 'first',
        tableData: [{
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
    methods: {
      handleClick(tab, event) {
      }
    },
  }
</script>

<style lang="less">
  .el-tabs__header {
    position: relative;
    margin: 0;
    padding: 0;
  }

  .el-tabs--card > .el-tabs__header {
    width: 432px;
    margin: 0 auto;
    border: none;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    width: 100%;
    border: none;
    border-radius: 0;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item {
    width: 50%;
    height: 42px;
    background-color: #e4e4e4;
    line-height: 42px;
    font-size: 16px;
    text-align: center;
    border: none;
    font-weight: normal;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: #fbfbfb;
  }

  .el-tabs__item.is-active {
    position: relative;
    background-color: #fbfbfb;
    color: #ff0404;
  }

  .el-tabs__item.is-active:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #ff0404;
  }

  .el-tabs__item:hover {
    color: #ff0404;
    cursor: pointer;
  }

  .el-tab-pane {
    padding: 30px 0;
    background-color: #fbfbfb;
  }

  .el-table, .el-table__expanded-cell {
    width: 1200px;
    margin: 0 auto;
  }

  .el-table th.is-leaf {
    background-color: #f5f4f4;
    color: #000;
    font-weight: 700;
  }
</style>
