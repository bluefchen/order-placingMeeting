<template>
  <div>
    <!-- 中间背景图片 (首页和其他页面不一样)-->
    <div class="img-bg">
      <div class="info">
        <p class="p-titl">2018夏季VIVO品牌新品订货会</p>
        <div class="activity">
          <p>活动日期：2018/04/10-2018/04/11</p>
          <p>活动地址：XXX市XXXXXXXXX街XXX路XX号</p>
        </div>
      </div>
    </div>
    <!-- 中间背景图片 -->
    <!-- 内容 -->
    <div class="content">
      <div class="mid-cnt">
        <p class="tit"><span>订货会介绍</span></p>
        <div class="cnt-info">
          <label>4月22日，中国电信股份有限公司XX分公司2017春季订货会在石家庄隆重召开。本次盛会由中国电信XX分公司举办，22家国内知名品牌手机厂商和全省上百家手机分销商、零售商代表等2000余人均到场参观交流、洽商合作，盛况空前。</label>
          <label>4本次订货会突出两大主题： <span class="red">全网通天下，生态赢未来。</span></label>
          <label><span class="red">全网通天下，销售更无忧</span></label>
          <label>XX电信传承创业、创新、创造的企业文化，推出六模全网通，共建互联网生态。助力实体经济振兴和产业链发展壮大，构建良好的终端产业生态。</label>
          <label>XX电信作为省内通信行业翘楚，本次订货会吸引了华为、三星、OPPO、VIVO、酷派、金立、荣耀、小米、魅族等二十二家知名厂商参展，各厂家纷纷携多款全网通手机终端亮相。终端价位从高到低覆盖完全，周边产品和业务选择多样化，手机终端的竞争力扩展至农村，实现了产业链的多元发展。</label>
        </div>
      </div>
      <div class="stores">
        <template>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="参会供货商" name="first">
              <div class="stores-tab">
                <el-table :data="tableData" stripe style="width: 100%">
                  <el-table-column prop="province" label="省份"></el-table-column>
                  <el-table-column prop="city" label="地市"></el-table-column>
                  <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
                  <el-table-column prop="supplierType" label="供应商类型"></el-table-column>
                  <el-table-column prop="contact" label="联系人"></el-table-column>
                  <el-table-column prop="TEL" label="联系电话"></el-table-column>
                  <el-table-column prop="companyTel" label="公司电话"></el-table-column>
                  <el-table-column prop="fax" label="公司传真"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="参会零售商" name="second">
              <div class="stores-tab">
                <el-table :data="tableData" stripe style="width: 100%">
                  <el-table-column prop="province" label="省份"></el-table-column>
                  <el-table-column prop="city" label="地市"></el-table-column>
                  <el-table-column prop="supplierName" label="零售商名称"></el-table-column>
                  <el-table-column prop="supplierType" label="零售商类型"></el-table-column>
                  <el-table-column prop="contact" label="联系人"></el-table-column>
                  <el-table-column prop="TEL" label="联系电话"></el-table-column>
                  <el-table-column prop="companyTel" label="公司电话"></el-table-column>
                  <el-table-column prop="fax" label="公司传真"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrderIndex',
    created() {

    },
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
    }
  }
</script>

<style lang="less">

  .el-tabs__header{
    padding: 0;
    position: relative;
    margin: 0;
  }
  .el-table{
    font-size: 12px;
  }
  .el-table td, .el-table th{
    padding: 0;
  }
  .el-tabs--card>.el-tabs__header{
    width: 432px;
    margin: 0 auto;
    border: none;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__nav{
    width: 100%;
    border: none;
    border-radius: 0;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item{
    width: 50%;
    height: 42px;
    background-color: #dadcdf;
    line-height: 42px;
    font-size: 16px;
    text-align: center;
    border: none;
    font-weight: normal;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
    background: #f5f5f5;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #f5f5f5;
  }

  .el-tabs__item.is-active{
    position: relative;
    background-color: #f5f5f5;
    color: #ff0404;
  }
  .el-tabs__item.is-active:after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #ff0404;
  }
  .el-tabs__item:hover {
    color: #ff0404;
    cursor: pointer;
  }
  .el-table__body, .el-table__footer, .el-table__header{
    table-layout: inherit;
  }
  .el-table, .el-table__expanded-cell {
    background-color: #f5f5f5;
  }

  /*中间背景图片*/
  .img-bg {
    width: 100%;
    height: 341px;
    background: #8252fe url('../assets/images/index-bg.jpg') no-repeat center 0;
  }

  .img-bg .info {
    width: 1180px;
    margin: 0 auto;
    overflow: hidden;
  }

  .img-bg .info .p-titl {
    margin: 82px 0 0 74px;
    font-size: 30px;
    color: #fcfdff;
  }

  .img-bg .info .activity {
    width: 506px;
    margin: 62px 0 0 74px;
    line-height: 34px;
    font-size: 16px;
    color: #0053a5;
    text-align: center;
  }

  /*中间背景图片*/

  .content {
    width: 100%;
  }

  .mid-cnt {
    width: 1200px;
    margin: 0 auto;
  }

  .mid-cnt .tit {
    position: relative;
    height: 46px;
    border-bottom: 1px solid #d7d7d7;
    font-size: 16px;
    text-align: center;
  }

  .mid-cnt .tit span {
    position: relative;
    display: block;
    width: 82px;
    margin: 0 auto;
    line-height: 46px;
  }

  .mid-cnt .tit span:after {
    position: absolute;
    content: '';
    bottom: -2px;
    left: 13px;
    width: 58px;
    height: 4px;
    background-color: #ff0404;
  }

  .cnt-info {
    width: 1084px;
    margin: 16px auto;
  }

  .cnt-info label {
    display: block;
    line-height: 28px;
    text-indent: 32px;
    font-size: 14px;
  }

  .red {
    color: #ff0404;
  }

  .stores {
    width: 100%;
    min-width: 1200px;
    margin-top: 42px;
  }

  .stores-ui {
    width: 432px;
    margin: 0 auto;
  }

  .stores-ui li {
    float: left;
    width: 50%;
    height: 42px;
    background-color: #dadcdf;
    line-height: 42px;
    font-size: 16px;
    text-align: center;
  }

  .stores-ui li.on {
    position: relative;
    background-color: #f5f5f5;
    color: #ff0404;
  }

  .stores-ui li.on:after {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #ff0404;
  }

  .stores-tab {
    width: 100%;
    padding: 30px 0;
    background-color: #f5f5f5;
  }

  .stores-tab table {
    max-width: 1200px;
    margin: 0 auto;
    border: 1px solid #e3e3e3;
    border-bottom: 0;
    border-right: 0;
    background-color: #fff;
  }

  .stores-tab table tr {
    height: 34px;
  }

  .stores-tab table tr th {
    background-color: #efefef;
    color: #000;
  }

  .stores-tab table tr th, .stores-tab table tr td {
    border: 1px solid #e3e3e3;
    border-top: 0;
    border-left: 0;
    text-align: center;
  }

  .stores-tab table tr td {
    color: #151515;
  }

  .stores-tab table tr:nth-of-type(2n) {
    background-color: #fcfcfc;
  }
</style>
