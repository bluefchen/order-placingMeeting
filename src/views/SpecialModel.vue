<template>
  <div class="special-model">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['首页', '机型管理', '特种机型分配']"/>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="box-1200 search">
      <InputWithSelect @search="search"/>
    </div>

    <!-- 更多筛选 -->
    <div class="box-1200 queries-list" :class="{'fold-screen': isFoldScreen}">
      <p class="queries-title">所有分类 >
        <span v-if="item.categoryName" v-for="(item, index) in checkedCategoryList" :key="index">
          <span class="arrows">&gt;</span>
          <span class="checked-query">{{item.name}}：{{item.categoryName}}<i class="iconfont" @click="delCategoryItem(item.name)">&#xe633;</i></span>
        </span>
        <a href="javascript:;" class="category-more fn-right" v-if="isFoldScreen" @click="changeFoldScreen">更多筛选 <i
          class="iconfont">&#xe608;</i></a><a href="javascript:;" v-if="!isFoldScreen" class="category-pick-up fn-right" @click="changeFoldScreen">收起筛选 <i class="iconfont">&#xe607;</i></a>
      </p>
      <div class="queries-category fn-clear">
        <span class="category-label fn-left">终端品牌：</span>
        <div class="category-list fn-left" :class="{fold:isFoldBrand}">
            <span class="category-item" :class="{'hover': checkedBrandIndex===index}" v-for="(item, index) in brandList" :key="index" @click="checkedBrand(item, index)">{{item.brandName}}</span>
        </div>
        <a href="javascript:;" @click="changeFoldBrand" v-show="isFoldBrand" class="category-more fn-right">更多 <i
          class="iconfont">&#xe608;</i></a>
        <a href="javascript:;" @click="changeFoldBrand" v-show="!isFoldBrand" class="category-pick-up fn-right">收起 <i
          class="iconfont">&#xe607;</i></a>
      </div>
      <div class="queries-category fn-clear">
        <span class="category-label fn-left">终端型号：</span>
        <div class="category-list fn-left" :class="{fold: isFoldModel}">
            <span class="category-item" :class="{'hover': checkedModelIndex===index}" v-for="(item, index) in modelList" :key="index" @click="checkedModel(item, index)">{{item.offerModelName}}</span>
        </div>
        <a href="javascript:;" @click="changeFoldModel" v-show="isFoldModel" class="category-more fn-right">更多 <i
          class="iconfont">&#xe608;</i></a>
        <a href="javascript:;" @click="changeFoldModel" v-show="!isFoldModel" class="category-pick-up fn-right">收起 <i
          class="iconfont">&#xe607;</i></a>
      </div>
      <div class="queries-category fn-clear">
        <span class="category-label fn-left">分配省份：</span>
        <div class="category-list fn-left" :class="{fold: isFoldProvince}">
            <span class="category-item" :class="{'hover': checkedProvinceIndex===index}" v-for="(item, index) in provinceList" :key="index" @click="checkedProvince(item, index)">{{item.name}}</span>
        </div>
        <a href="javascript:;" @click="changeProvince" v-show="isFoldProvince" class="category-more fn-right">更多 <i
          class="iconfont">&#xe608;</i></a>
        <a href="javascript:;" @click="changeProvince" v-show="!isFoldProvince" class="category-pick-up fn-right">收起 <i
          class="iconfont">&#xe607;</i></a>
      </div>
      <div class="queries-category fn-clear">
        <span class="category-label fn-left">供货商：</span>
        <div class="selection-supplier">
          <ChooseMerchants title="供货商" @selectOptions="selectSupplier" />
        </div>
      </div>
    </div>

    <div class="box-1200 model-list-table">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="特种机型分配量列表"/>
        <div class="buttons fn-right">
          <router-link class="btns" to="/order/importSpecialModel"><i class="iconfont">&#xe6a8;</i> 导入新增</router-link>
        </div>
      </div>
      <Table :stripe="false" :border="false" :tableTitle="tableTitle" :tableData="tableData"/>
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>
</template>

<script>
  import InputWithSelect from '@/components/InputWithSelect';
  import Breadcrumb from '@/components/Breadcrumb';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import DeviceInfo from '@/components/DeviceInfo';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';

  export default {
    name: 'specialModel',
    created() {
      this.opMeetingInfo = JSON.parse(sessionStorage.getItem('opMeeting'));
      this.$post('/orderPlacingMeetingController/queryOfferBrandList').then((rsp) => {
        this.brandList = rsp;
      });
      this.queryOpmOfferAllotList();
      this.$post('/commonCfgController/getCommonRegionTreeList', {
        commonRegionId: ''
      }).then((rsp) => {
        this.provinceList = rsp;
      });
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
              props: {
                data: params.row,
              }
            });
          }
        }, {
          label: '终端品牌',
          prop: 'brandName'
        }, {
          label: '终端型号',
          prop: 'offerModelName'
        }, {
          label: '供货商',
          prop: 'supplierName'
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
          label: '分配省份',
          prop: 'commonRegionName',
        }, {
          label: '上架数量',
          prop: 'offerQty',
          render: function (h, params) {
            return h({
              template: '<span class="text-tag-stress">{{offerQty}}</span>',
              data: function () {
                return {
                  offerQty: params.row.offerQty
                }
              }
            })
          }
        }, {
          label: '分配量（台）',
          prop: 'assignQty',
          render: function (h, params) {
            return h({
              template: '<span class="text-tag-danger">{{assignQty}}</span>',
              data: function () {
                return {
                  assignQty: params.row.assignQty
                }
              }
            })
          }
        }, {
          label: '操作',
          prop: '',
          render: (h, params) => {
            return h({
              template: '<div><button @click="delOpmOfferAllot(param.row, param.index)" class="updown-btn">删除</button></div>',
              data: function(){
                return {
                  param: params
                }
              },
              methods: {
                delOpmOfferAllot: (val, index) => {
                  this.deleteOpmOfferAllot(val, index);
                }
              }
            })
          }
        }],
        tableData: [],
        //分类选择
        isFoldBrand: true, //是否折叠品牌
        isFoldModel: true, //是否折叠型好
        isFoldScreen: false, //是否折叠更多筛选
        isFoldProvince: true, //是否折叠省份
        //筛选数据
        checkedCategoryList: [{
          name: '品牌',
          categoryName: null,
          categoryCode: null
        }, {
          name: '型号',
          categoryName: null,
          categoryCode: null
        }, {
          name: '省份',
          categoryName: null,
          categoryCode: null
        }],
        categoryItem: {
          'isCentman': '',
          'offerNameOrCode': '',
          'isSpecial': '',
          'brandCd': '',
          'offerModelId': '',
          'commonRegionId': '',
          'supplierId': ''
        },
        brandList: [],
        checkedBrandIndex: null,
        modelList: [],
        checkedModelIndex: null,
        provinceList: [],
        checkedProvinceIndex: null,
        total: 1, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      search(obj) {
        this.categoryItem.isCentman = obj.type;
        this.categoryItem.offerNameOrCode = obj.value;
        this.queryOpmOfferAllotList();
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
      changeProvince(){
        this.isFoldProvince = !this.isFoldProvince;
      },
      checkedBrand(val, index) {
        if (this.checkedBrandIndex !== index) {
          this.checkedBrandIndex = index;
          this.categoryItem.brandCd = val.brandCd;
          this.categoryItem.offerModelId = '';
          this.queryOpmOfferAllotList();
          this.checkedCategoryList.map((item) => {
            if (item.name === '品牌') {
              item.categoryName = val.brandName;
              item.categoryCode = val.brandCode;
              this.delCategoryItem('型号');
            }
          });
          this.$post('/orderPlacingMeetingController/queryOfferModelList', {
            'brandCd': val.brandCd
          }).then((rsp) => {
            this.modelList = rsp;
          });
        } else {
          this.delCategoryItem('品牌');
        }
      },
      checkedModel(val, index) {
        if (this.checkedModelIndex !== index) {
          this.checkedModelIndex = index;
          this.categoryItem.offerModelId = val.offerModelId;
          this.queryOpmOfferAllotList();
          this.checkedCategoryList.map((item) => {
            if (item.name === '型号') {
              item.categoryName = val.offerModelName;
              item.categoryCode = val.offerModelId;
            }
          });
        } else {
          this.delCategoryItem('型号');
        }
      },
      checkedProvince(val, index){
        if(this.checkedProvinceIndex !== index){
          this.checkedProvinceIndex = index;
          this.categoryItem.commonRegionId = val.id;
          this.queryOpmOfferAllotList();
          this.checkedCategoryList.map((item) => {
            if (item.name === '省份') {
              item.categoryName = val.name;
              item.categoryCode = val.id;
            }
          });
        } else {
          this.delCategoryItem('省份');
        }
      },
      addCategoryItem(val) {
        this.checkedCategoryList.push(val);
      },
      delCategoryItem(val) {
        if (val === '品牌') {
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
        } else if(val === '省份') {
          this.checkedProvinceIndex = null;
          this.categoryItem.commonRegionId = '';
        }
        this.checkedCategoryList.map((item) => {
          if (item.name === val) {
            item.categoryName = null;
            item.categoryCode = null;
          }
        });
        this.queryOpmOfferAllotList();
      },
      queryOpmOfferAllotList(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/orderPlacingMeetingController/queryOpmOfferAllotList', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          brandCd: this.categoryItem.brandCd,
          offerModelId: this.categoryItem.offerModelId,
          isCentman: this.categoryItem.isCentman,
          offerNameOrCode: this.categoryItem.offerNameOrCode,
          commonRegionId: this.categoryItem.commonRegionId,
          supplierId: this.categoryItem.supplierId,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.queryOpmOfferAllotList(curPage);
      },
      selectSupplier(val){
        this.categoryItem.supplierId = val;
        this.queryOpmOfferAllotList();
      },
      deleteOpmOfferAllot(val, index){
        this.$msgBox({
          type: 'info',
          title: '操作提示',
          isShowConfimrBtn: true,
          cancelBtnText: '取消',
          content: '确定要删除该机型吗？'
        }).then(() => {
          this.$post('/orderPlacingMeetingController/deleteOpmOfferAllot', {
            opmOaId: val.opmOaId
          }).then((rsp) => {
            if (rsp.resultCode == '0') {
              this.$msgBox({
                type: 'success',
                title: '操作提示',
                content: '机型删除成功'
              }).catch(() => {
                // console.log('cancel');
              });
              this.queryOpmOfferAllotList(this.currentPage);
            } else {
              this.$msgBox({
                type: 'error',
                title: '操作提示',
                content: '机型删除失败'
              }).catch(() => {
                // console.log('cancel');
              });
            }
          })
        }).catch(() => {
          // console.log('cancel');
        });
      }
    },
    components: {
      InputWithSelect,
      Breadcrumb,
      TitlePlate,
      Table,
      DeviceInfo,
      Pagination,
      ChooseMerchants,
      MiddleImgInfoSmall
    }
  }
</script>

<style lang="less">
  .special-model{
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
      i {
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
      }
      .iconfont {
        margin-left: 4px;
        color: #d2d2d2;
        font-size: 12px;
      }
      &:hover {
        border-color: #f82134;
      }
      &:hover .iconfont {
        background-color: #f82134;
        color: #fff;
      }
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
      margin-top: 5px;
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
    .selection-supplier{
        width: 240px;
        padding-top: 3px;
        padding-left: 20px;
        display: flex;
      }
    .model-list-table {
      margin-bottom: 20px;
      .number-stores{
        color: #000;
      }

      .el-table__header{
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
      border: 1px solid #fff;
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

    .queries-title span:first-child .arrows {
      display: none;
    }
  }
</style>
