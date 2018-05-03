<template>
  <div class="vue_roder-model">
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
    <div class="box-1200 queries-list" :class="{'fold-screen': isFoldScreen}">
      <p class="queries-title">所有分类 >
        <span v-if="item.categoryName" v-for="(item, index) in checkedCategoryList"
              :key="index">
          <span class="arrows">&gt;</span>
          <span class="checked-query">{{item.name}}：{{item.categoryName}}<i class="iconfont"
                                                                            @click="delCategoryItem(item.name)">&#xe633;</i></span>
        </span>

        <a href="javascript:;" class="category-more fn-right" v-if="isFoldScreen" @click="changeFoldScreen">更多筛选 <i
          class="iconfont">&#xe608;</i></a><a href="javascript:;" v-if="!isFoldScreen"
                                              class="category-pick-up fn-right" @click="changeFoldScreen">收起筛选 <i
          class="iconfont">&#xe607;</i></a></p>

      <div class="queries-category fn-clear">
        <span class="category-label fn-left">是否特种机型：</span>
        <div class="category-list fn-left">
            <span class="category-item" :class="{'hover': checkedSpecialIndex===index}"
                  v-for="(opt, index) in isSpecialList" :key="index" @click="checkedSpecialModel(opt, index)">{{opt.isSpecialName}}</span>
        </div>
      </div>
      <div class="queries-category fn-clear">
        <span class="category-label fn-left">终端品牌：</span>
        <div class="category-list fn-left" :class="{fold:isFoldBrand}">
            <span class="category-item" :class="{'hover': checkedBrandIndex===index}"
                  v-for="(item, index) in brandList" :key="index"
                  @click="checkedBrand(item, index)">{{item.brandName}}</span>
        </div>
        <a href="javascript:;" @click="changeFoldBrand" v-show="isFoldBrand" class="category-more fn-right">更多 <i
          class="iconfont">&#xe608;</i></a>
        <a href="javascript:;" @click="changeFoldBrand" v-show="!isFoldBrand" class="category-pick-up fn-right">收起 <i
          class="iconfont">&#xe607;</i></a>
      </div>
      <div class="queries-category fn-clear">
        <span class="category-label fn-left">终端型号：</span>
        <div class="category-list fn-left" :class="{fold: isFoldModel}">
            <span class="category-item" :class="{'hover': checkedModelIndex===index}"
                  v-for="(item, index) in modelList" :key="index" @click="checkedModel(item, index)">{{item.offerModelName}}</span>
        </div>
        <a href="javascript:;" @click="changeFoldModel" v-show="isFoldModel" class="category-more fn-right">更多 <i
          class="iconfont">&#xe608;</i></a>
        <a href="javascript:;" @click="changeFoldModel" v-show="!isFoldModel" class="category-pick-up fn-right">收起 <i
          class="iconfont">&#xe607;</i></a>
      </div>
    </div>

    <div class="box-1200 model-list-table">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="订货会机型列表"/>
        <div class="buttons fn-right">
          <router-link class="btns" to="/order/importModelAdd"><i class="iconfont">&#xe6a8;</i> 导入新增</router-link>
          <router-link class="btns" to="/order/importModelDel"><i class="iconfont">&#xe610;</i> 导入删除</router-link>
        </div>
      </div>
      <Table :stripe="false" :border="false" :tableTitle="tableTitle" :tableData="tableData" />
      <Pagination :pageSize="pageSize" :currentPage="currentPage" :total="total" @pageChanged="pageChanged" />
    </div>
  </div>
</template>

<script>
  import InputWithSelect from '@/components/InputWithSelect';
  import DeviceInfo from '@/components/DeviceInfo';
  import Table from '@/components/Table';
  import Breadcrumb from '@/components/Breadcrumb';
  import TitlePlate from '@/components/TitlePlate';
  import Pagination from '@/components/Pagination';


  export default {
    name: 'OrderModel',
    created() {
      this.$axios.post('/orderPlacingMeetingController/queryOfferBrandList', {}).then((response) => {
        this.brandList = response.data;
      });
      this.qryOpMeetingOfferList(this.currentPage);
    },
    data() {
      return {
        //表格的数据
        tableTitle: [{
          label: '终端名称',
          prop: 'offerName',
          width: 400,
          render: (h, params) => {
            return h(DeviceInfo, {
              props: {data: params.row}
            });
          }
        }, {
          label: '终端品牌',
          prop: 'brandName'
        }, {
          label: '终端型号',
          prop: 'offerModelName'
        }, {
          label: '终端价格',
          prop: 'salePrice',
          render: function (h, params) {
            return h({
              template: '<p>¥ {{salePrice}}</p>',
              data: function () {
                return {
                  salePrice: params.row.salePrice
                }
              }
            })
          }
        }, {
          label: '上架数量',
          prop: 'offerQty',
        }],
        tableData: [],
        //分类选择
        isFoldBrand: true, //是否折叠品牌
        isFoldModel: true, //是否折叠型好
        isFoldScreen: false, //是否折叠更多筛选
        //筛选数据
        checkedCategoryList: [{
          name: '是否特种机型',
          categoryName: null,
          categoryCode: null
        }, {
          name: '品牌',
          categoryName: null,
          categoryCode: null
        }, {
          name: '型号',
          categoryName: null,
          categoryCode: null
        }],
        categoryItem: {
          'opMeetingId': '',
          'isCentman': '',
          'offerNameOrCode': '',
          'isSpecial': '',
          'brandCd': '',
          'offerModelId': ''
        },
        isSpecialList: [{
          isSpecialName: '是',
          isSpecial: 'Y'
        }, {
          isSpecialName: '否',
          isSpecial: 'N'
        }],
        checkedSpecialIndex: null,
        brandList: [],
        checkedBrandIndex: null,
        modelList: [],
        checkedModelIndex: null,
        opMeetingOfferList: [],
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      search(obj) {
        this.categoryItem.isCentman = obj.type;
        this.categoryItem.offerNameOrCode = obj.value;
        this.qryOpMeetingOfferList(this.currentPage);
      },
      changeFoldBrand() {
        this.isFoldBrand = !this.isFoldBrand;
      },
      changeFoldModel() {
        this.isFoldModel = !this.isFoldModel;
      },
      changeFoldScreen() {
        this.isFoldScreen = !this.isFoldScreen;
      },
      checkedSpecialModel(val, index) {
        if (this.checkedSpecialIndex !== index) {
          this.checkedSpecialIndex = index;
          this.checkedCategoryList.map((item) => {
            if (item.name === '是否特种机型') {
              item.categoryName = val.isSpecialName;
              item.categoryCode = val.isSpecial;
            }
          });
          this.categoryItem.isSpecial = val.isSpecial;
          this.qryOpMeetingOfferList(this.currentPage);
        } else {
          this.delCategoryItem('是否特种机型');
          this.categoryItem.isSpecial = '';
        }
      },
      checkedBrand(val, index) {
        if (this.checkedBrandIndex !== index) {
          this.checkedBrandIndex = index;
          this.checkedCategoryList.map((item) => {
            if (item.name === '品牌') {
              item.categoryName = val.brandName;
              item.categoryCode = val.brandCode;
              this.delCategoryItem('型号');
            }
          });
          this.$axios.post('/orderPlacingMeetingController/queryOfferModelList', {
            param: {
              'brandCd': val.brandCd
            }
          }).then((response) => {
            this.modelList = response.data;
          });
          this.categoryItem.brandCd = val.brandCd;
          this.categoryItem.offerModelId = '';
          this.qryOpMeetingOfferList(this.currentPage);
        } else {
          this.delCategoryItem('品牌');
        }
      },
      checkedModel(val, index) {
        if (this.checkedModelIndex !== index) {
          this.checkedModelIndex = index;
          this.checkedCategoryList.map((item) => {
            if (item.name === '型号') {
              item.categoryName = val.offerModelName;
              item.categoryCode = val.offerModelId;
            }
          });
          this.categoryItem.offerModelId = val.offerModelId;
          this.qryOpMeetingOfferList(this.currentPage);
        } else {
          this.delCategoryItem('型号');
        }
      },
      addCategoryItem(val) {
        this.checkedCategoryList.push(val);
      },
      delCategoryItem(val) {
        if (val === '是否特种机型') {
          this.checkedSpecialIndex = null;
          this.categoryItem.isSpecial = '';
        } else if (val === '品牌') {
          this.checkedBrandIndex = null;
          this.checkedModelIndex = null;
          this.modelList = [];
          this.checkedCategoryList.map((item) => {
            if (item.name === '型号') {
              item.categoryName = null;
              item.categoryCode = null;
            }
          });
          this.categoryItem.brandCd = '';
          this.categoryItem.offerModelId = '';
        } else if (val === '型号') {
          this.checkedModelIndex = null;
          this.categoryItem.offerModelId = '';
        }
        this.checkedCategoryList.map((item) => {
          if (item.name === val) {
            item.categoryName = null;
            item.categoryCode = null;
          }
        });
        this.qryOpMeetingOfferList(this.currentPage);
      },
      qryOpMeetingOfferList(currentPage, pageSize) {
        let curPage = currentPage ? currentPage : this.currentPage;
        let pageNum = pageSize ? pageSize : this.pageSize;
        let params = {
          'opMeetingId': this.categoryItem.opMeetingId,
          'isCentman': this.categoryItem.isCentman,
          'offerNameOrCode': this.categoryItem.offerNameOrCode,
          'isSpecial': this.categoryItem.isSpecial,
          'brandCd': this.categoryItem.brandCd,
          'offerModelId': this.categoryItem.offerModelId,
          'pageSize': pageNum,
          'curPage': curPage
        };
        this.$axios.post('/orderPlacingMeetingController/queryOpMeetingOfferList', {
          param: params
        }).then((response) => {
          this.opMeetingOfferList = response.data.rows;
          this.total = response.data.total;
          this.tableData = [];
          this.opMeetingOfferList.map((item, index) => {
            this.tableData.push(item);
          })
        });
      },
      pageChanged(currentPage) {
        this.qryOpMeetingOfferList(currentPage)
        console.log('当前页：', currentPage);
      }
    },
    components: {
      InputWithSelect,
      DeviceInfo,
      Table,
      Breadcrumb,
      TitlePlate,
      Pagination
    }
  }
</script>

<style lang="less">
  .vue_roder-model {
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

    .search {
      margin: 10px auto;
    }

    .queries-list {
      margin: 10px auto;
      border: 1px solid #dfdfdf;
      overflow: hidden;
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
      margin: 0 9px 0 5px;
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
      height: 38px;
    }

    .fold-screen {
      height: 42px;
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

    .category-more, .category-pick-up {
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
    .category-more:hover,
    .category-pick-up:active,
    .category-pick-up:focus,
    .category-pick-up:hover {
      color: #f82134;
    }

    .category-pick-up {
      color: #979797;
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
      display: inline-block;
      padding: 0 12px;
      margin-left: 2px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 28px;
      text-decoration: none;
    }

    .buttons .btns:hover {
      background-color: #e20606;
    }
    .model-list-table {
      margin-bottom: 20px;
      .el-table__header {
        border: 1px solid #dcdcdc;
        table-layout: inherit;
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

    .queries-title span:first-child .arrows{
      display: none;
    }
  }
</style>
