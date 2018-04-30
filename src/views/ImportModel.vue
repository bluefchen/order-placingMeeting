<template>
  <div>
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info">
        <p class="p-titl">2018夏季VIVO品牌新品订货会即将开启</p>
        <div class="activity">
          <p>活动日期：2018/04/10-2018/04/11</p>
          <p>活动地址：XXX市XXXXXXXXX街XXX路XX号</p>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['首页', '机型管理', '导入新增']"/>
        </div>
      </div>

      <!-- 文件导入 -->
      <div class="box-1200">
        <Import/>
      </div>

      <div class="tabs-list">
        <div class="order-titl fn-clear">
          <div class="tel-model fn-left">导入结果</div>
          <div class="result-wrds fn-right"><span class="red">校验结果：</span>Excel中共有<b class="red">100</b>条数据，其中<b
            class="red">98</b>条校验通过有效，<b class="red">2</b>条校验不通过无效，点击提交可以导入正确信息。
          </div>
        </div>
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
            <td><p class="overflow-handle">VIVO-X20全面屏 美颜拍照手机</p></td>
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
            <td><p class="overflow-handle">VIVO-X20全面屏 美颜拍照手机</p></td>
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

      <div class="bottom-btns">
        <button class="confirm-btn">确定</button>
        <button class="reset-btn">重置</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Import from '@/components/Import';

  export default {
    name: 'InportModel',
    created() {
    },
    data() {
      return {}
    },
    methods: {
      search(obj) {
        console.log('参数：', obj);
      }
    },
    components: {
      Breadcrumb,
      Import
    }
  }
</script>

<style scoped lang="less">
  /*中间背景图片*/
  .img-bg {
    width: 100%;
    height: 200px;
    background: #e4273f;
  }

  .img-bg .info {
    width: 1036px;
    height: 200px;
    margin: 0 auto;
    background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat right bottom;
    overflow: hidden;
  }

  .img-bg .info .p-titl {
    margin: 62px 0 0 0;
    font-size: 22px;
    color: #fcfdff;
  }

  .img-bg .info .activity {
    width: 306px;
    margin: 10px 0 0 0;
    line-height: 18px;
    font-size: 12px;
    color: #fcfdff;
    text-align: center;
  }

  /*中间背景图片*/

  .my-location {
    height: 30px;
    line-height: 30px;
    background-color: #f6f6f6;
  }

  .v_import {
    /*height: 70px;*/
    /*margin: 20px auto;*/
    background-color: #fcfcfc;
    border: 1px solid #e8e8e8;
    /*line-height: 70px;*/
  }

  .tabs-list {
    width: 1160px;
    margin: 0 auto;
  }

  .order-titl {
    height: 28px;
    margin: 15px 0 8px;
    line-height: 28px;
  }

  .order-titl .tel-model {
    min-width: 5px;
    min-height: 20px;
    background: url('../assets/images/red-line.png') no-repeat 0 center;
    padding-left: 10px;
    font-size: 18px;
    color: #000;
    font-weight: 800;
  }

  .order-titl .result-wrds b {
    font-size: 14px;
    margin: 0 3px;
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

  /*底部按钮*/
  .bottom-btns {
    margin-top: 40px;
    text-align: center;
  }

  .bottom-btns button {
    height: 34px;
    padding: 0 32px;
    margin-right: 32px;
    background-color: #f01919;
    line-height: 34px;
    border: 0;
    font-size: 14px;
    color: #fff;
    border-radius: 3px;
  }

  .bottom-btns .reset-btn {
    margin-right: 0;
  }

  .bottom-btns button.grey {
    background-color: #cecece;
    color: #9d9d9d;
  }
</style>
