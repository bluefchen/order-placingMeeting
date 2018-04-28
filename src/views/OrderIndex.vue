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
        <ul class="stores-ui fn-clear">
          <li class="on">参会供货商</li>
          <li>参会零售商</li>
        </ul>
        <div class="stores-tab">
          <table cellpadding="0" cellspacing="0">
            <thead>
            <tr>
              <th>省份</th>
              <th>地市</th>
              <th>供货商名称</th>
              <th>供货商类型</th>
              <th>联系人</th>
              <th>联系电话</th>
              <th>公司电话</th>
              <th>公司传真</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>江苏省</td>
              <td>南京市</td>
              <td>供货商AAAAA</td>
              <td>省代</td>
              <td>王小明</td>
              <td>180123456789</td>
              <td>025-5800000000</td>
              <td>025-5800000000</td>
            </tr>
            <tr>
              <td>江苏省</td>
              <td>南京市</td>
              <td>供货商AAAAA</td>
              <td>省代</td>
              <td>王小明</td>
              <td>180123456789</td>
              <td>025-5800000000</td>
              <td>025-5800000000</td>
            </tr>
            <tr>
              <td>江苏省</td>
              <td>南京市</td>
              <td>供货商AAAAA</td>
              <td>省代</td>
              <td>王小明</td>
              <td>180123456789</td>
              <td>025-5800000000</td>
              <td>025-5800000000</td>
            </tr>
            </tbody>
          </table>
        </div>
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
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style scoped lang="less">
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
    width: 1028px;
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
