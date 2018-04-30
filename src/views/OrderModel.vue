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
          <Breadcrumb :list="['首页', '机型管理', '机型维护']"/>
        </div>
      </div>

      <!-- 搜索 -->
      <div class="box-1200 search">
        <InputWithSelect :search="search"/>
      </div>

      <!-- 更多筛选 -->
      <div class="box-1200 queries-list">
        <p class="queries-title">所有分类 > <span class="checked-query">类别：手机<i class="iconfont">&#xe633;</i></span><span
          class="checked-query">品牌：中兴<i class="iconfont">&#xe633;</i></span><a href="javascript:;"
                                                                               class="category-more fn-right">更多筛选 <i
          class="iconfont">&#xe608;</i></a></p>
        <div class="queries-category fn-clear">
          <span class="category-label fn-left">终端状态：</span>
          <div class="category-list fn-left">
            <span class="category-item">上架</span>
            <span class="category-item">下架</span>
          </div>
        </div>
        <div class="queries-category fn-clear">
          <span class="category-label fn-left">是否特种机型：</span>
          <div class="category-list fn-left">
            <span class="category-item">是</span>
            <span class="category-item">否</span>
          </div>
        </div>
        <div class="queries-category fn-clear">
          <span class="category-label fn-left">终端品牌：</span>
          <div class="category-list fn-left" ng-class="{fold: $ctrl.isFoldBrand}">
            <span class="category-item hover">苹果</span>
            <span class="category-item">三星</span>
            <span class="category-item">华为</span>
            <span class="category-item">酷派</span>
            <span class="category-item">中兴</span>
            <span class="category-item">黑莓</span>
            <span class="category-item">苹果</span>
            <span class="category-item">三星</span>
            <span class="category-item">华为</span>
            <span class="category-item">酷派</span>
            <span class="category-item">中兴</span>
            <span class="category-item">黑莓</span>
            <span class="category-item">苹果</span>
            <span class="category-item">三星</span>
            <span class="category-item">华为</span>
            <span class="category-item">酷派</span>
            <span class="category-item">中兴</span>
            <span class="category-item">黑莓</span>
          </div>
          <a href="javascript:;" class="category-more fn-right">更多 <i class="iconfont">&#xe608;</i></a>
          <a href="javascript:;" class="category-more fn-right">收起 <i class="iconfont">&#xe607;</i></a>
        </div>
        <div class="queries-category fn-clear">
          <span class="category-label fn-left">终端型号：</span>
          <div class="category-list fn-left" ng-class="{fold: $ctrl.isFoldModel}">
            <span class="category-item">Iphone 5s</span>
            <span class="category-item">Iphone 6</span>
            <span class="category-item">Iphone 6s</span>
            <span class="category-item">Iphone 6plus</span>
            <span class="category-item">Iphone 7s</span>
          </div>
          <a href="javascript:;" class="category-more fn-right">更多 <i class="iconfont">&#xe608;</i></a>
          <a href="javascript:;" class="category-more fn-right">收起 <i class="iconfont">&#xe607;</i></a>
        </div>
      </div>
      <div class="box-1200">
        <div class="order-titl fn-clear">
          <div class="tel-model fn-left">订货会机型</div>
          <div class="buttons fn-right">
            <button class="btns"><i class="iconfont">&#xe6a8;</i> 导入新增</button>
            <button class="btns"><i class="iconfont">&#xe610;</i> 导入删除</button>
            <button class="btns"><i class="iconfont">&#xe679;</i> 批量上架</button>
            <button class="btns"><i class="iconfont">&#xe678;</i> 批量下架</button>
          </div>
        </div>

        <table width="100%" cellspacing="0" cellpadding="0" class="table">
          <thead>
          <tr>
            <th width="5%"><input type="checkbox"></th>
            <th width="25%">终端名称</th>
            <th width="10%">终端品牌</th>
            <th width="10%">终端型号</th>
            <th width="9%">产品类型</th>
            <th width="9%">终端价格</th>
            <th width="10%">是否特种机型</th>
            <th width="8%">上架数量</th>
            <th width="8%">状态</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><input type="checkbox"></td>
            <td>
              <DeviceInfo/>
            </td>
            <td>VIVO</td>
            <td>VIVO-X20</td>
            <td>集采</td>
            <td>￥1890</td>
            <td><i class="iconfont red">&#xe63f;</i></td>
            <td>300</td>
            <td>上架</td>
            <td>
              <button class="updown-btn red">下架</button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox"></td>
            <td class="td-first">
              <p class="p-img"><img src="@/assets/images/telephone2.jpg"></p>
              <p class="tel-info">
                <a href="" class="tel-href overflow-handle">VIVO-X20全面屏 美颜拍照手机</a>
                <label>编码：11020300001</label>
              </p>
            </td>
            <td>VIVO</td>
            <td>VIVO-X20</td>
            <td>集采</td>
            <td>￥1890</td>
            <td><i class="iconfont red">&#xe63f;</i></td>
            <td>300</td>
            <td>上架</td>
            <td>
              <button class="updown-btn green">上架</button>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox"></td>
            <td class="td-first">
              <p class="p-img"><img src="@/assets/images/telephone3.jpg"></p>
              <p class="tel-info">
                <a href="" class="tel-href overflow-handle">VIVO-X20全面屏 美颜拍照手机</a>
                <label>编码：11020300001</label>
              </p>
            </td>
            <td>VIVO</td>
            <td>VIVO-X20</td>
            <td>集采</td>
            <td>￥1890</td>
            <td><i class="iconfont red">&#xe63f;</i></td>
            <td>300</td>
            <td>上架</td>
            <td>
              <button class="updown-btn red">下架</button>
            </td>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox"></td>
            <td class="td-first">
              <p class="p-img"><img src="@/assets/images/telephone4.jpg"></p>
              <p class="tel-info">
                <a href="" class="tel-href overflow-handle">VIVO-X20全面屏 美颜拍照手机</a>
                <label>编码：11020300001</label>
              </p>
            </td>
            <td>VIVO</td>
            <td>VIVO-X20</td>
            <td>集采</td>
            <td>￥1890</td>
            <td><i class="iconfont red">&#xe63f;</i></td>
            <td>300</td>
            <td>上架</td>
            <td>
              <button class="updown-btn red">下架</button>
            </td>
          </tr>
          </tbody>
        </table>

        <br/>
        <Table :is-selection="isSelection" :table-title="tableTitle" :table-data="tableData"/>

      </div>
    </div>
  </div>
</template>

<script>
  import InputWithSelect from '@/components/InputWithSelect';
  import DeviceInfo from '@/components/DeviceInfo';
  import Table from '@/components/Table';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    name: 'OrderModel',
    created() {
    },
    data() {
      return {
        isSelection: true,
        tableTitle: [{
          label: '终端品牌',
          prop: 'terminalBrand'
        }, {
          label: '终端型号',
          prop: 'terminalModel'
        }, {
          label: '产品类型',
          prop: 'prodType'
        }, {
          label: '终端价格',
          prop: 'terminalPrice'
        }, {
          label: '是否特种机型',
          prop: 'isSpecial'
        }, {
          label: '上架数量',
          prop: 'count'
        }, {
          label: '状态',
          prop: 'type'
        }],
        tableData: [{
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'Y',
          count: 300,
          type: '上架'
        }, {
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'N',
          count: 300,
          type: '下架',
        }, {
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'Y',
          count: 300,
          type: '上架',
        }, {
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'N',
          count: 300,
          type: '下架',
        }, {
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'Y',
          count: 300,
          type: '上架',
        }, {
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'N',
          count: 300,
          type: '下架',
        }],
      }
    },
    methods: {
      search(obj) {
        console.log('参数：', obj);
      }
    },
    components: {
      InputWithSelect,
      DeviceInfo,
      Table,
      Breadcrumb
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

  .my-location label {
    color: #aaa;
  }

  .location-p {
    display: inline-block;
  }

  .red {
    color: #f82134;
  }

  .green {
    color: #46b02e;
  }

  .search {
    margin: 10px auto;
  }

  .queries-list {
    margin: 10px auto;
    border: 1px solid #dfdfdf;
  }

  .queries-title {
    height: 40px;
    padding: 0 12px;
    line-height: 40px;
    color: #6b6b6b;
    border-bottom: 1px solid #dfdfdf;
  }

  .checked-query {
    position: relative;
    display: inline-block;
    height: 20px;
    margin-left: 10px;
    padding: 0 25px 0 5px;
    line-height: 20px;
    border: 1px solid #d2d2d2;
    color: #333;
    cursor: pointer;
  }

  .checked-query i {
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
  }

  .checked-query .iconfont {
    margin-left: 4px;
    color: #d2d2d2;
    font-size: 12px;
  }

  .checked-query:hover {
    border-color: #f82134;
  }

  .checked-query:hover .iconfont {
    background-color: #f82134;
    color: #fff;
  }

  .queries-category {
    margin: 0 12px;
    line-height: 38px;
    border-bottom: 1px dashed #ccc;
  }

  .queries-category:last-of-type {
    border-bottom: none;
  }

  .category-label {
    width: 90px;
    color: #999;
    text-align: right;
  }

  .category-list {
    display: inline-block;
    width: 80%;
    margin-left: 20px;
    color: #000;
    overflow: hidden;
  }

  .fold {
    height: 28px;
  }

  .category-item {
    display: inline-block;
    margin-right: 10px;
    padding: 0 4px;
    border: 1px solid #fff;
    line-height: 18px;
    white-space: nowrap;
    cursor: pointer;
  }

  .category-item.hover {
    border: 1px solid #f82134;
    background-color: #f82134;
    color: #fff;
  }

  .category-item:hover {
    border: 1px solid #f82134;
    color: #f82134;
  }

  .category-item.hover:hover {
    background-color: #f82134;
    color: #fff;
  }

  .category-more {
    display: inline-block;
    height: 22px;
    margin-top: 7px;
    padding: 0 5px;
    line-height: 22px;
    background-color: #fff;
    border: 1px solid #ccc;
    color: #333;
    text-decoration: none;
  }

  .category-more:active,
  .category-more:focus,
  .category-more:hover {
    color: #f82134;
  }

  .category-more .iconfont {
    font-size: 12px;
  }

  .order-titl {
    height: 28px;
    margin: 15px 0;
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

  .buttons .btns {
    padding: 0 12px;
    margin-left: 2px;
    border: 0;
    background-color: #fa0000;
    color: #fff;
    font-size: 12px;
    border-radius: 3px;
    line-height: 28px;
  }

  .buttons .btns:hover {
    background-color: #e20606;
  }

  .table thead tr {
    height: 40px;
    background-color: #efefef;
    border: 1px solid #dcdcdc;
    color: #131212;
  }

  .table tbody tr {
    height: 90px;
    border-bottom: 1px solid #dcdcdc;
  }

  .table thead tr th {
    text-align: center;
  }

  .table tbody tr td {
    text-align: center;
  }

  .table input[type=checkbox] {
    width: 16px;
    height: 16px;
    background: url('../assets/images/checkbox.png') no-repeat;
  }

  .table input[type=checkbox]:checked {
    background: url('../assets/images/checkedbox.png') no-repeat;
  }

  .table tbody .td-first {
    display: flex;
  }

  .table tbody .td-first .p-img {
    width: 79px;
    height: 67px;
    margin: 10px 15px 0 0;
    border: 1px solid #e7e7e7;
    text-align: center;
    overflow: hidden;
  }

  .table tbody .td-first .tel-info {
    flex: 1;
    text-align: left;
  }

  .table .tel-href {
    display: block;
    margin: 22px 0 16px;
    font-size: 14px;
    color: #050505;
    text-decoration: none;
  }

  .table .tel-href:hover {
    color: #ed0000;
    text-decoration: underline;
  }

  .table .tel-href.overflow-handle {
    width: 96%;
  }

  .table .tel-info label {
    color: #7d7d7d;
  }

  .table td i.iconfont {
    font-size: 18px;
  }

  .table tbody tr:hover {
    background-color: #f9f9f9;
  }

  .updown-btn {
    padding: 2px 5px;
    border: 0;
    text-decoration: underline;
  }

  .updown-btn:hover {
    border: 1px solid #f82134;
    border-radius: 3px;
    text-decoration: none;
  }

  .updown-btn.green:hover {
    border: 1px solid #46b02e;
  }
</style>
