<template>
  <div class="terminal-query">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['首页', '统计查询', '终端查询']"/>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="box-1200 search fn-clear">
      <InputWithSelect class="fn-left" @search="search"/>
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

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="终端列表"/>
      </div>
      <TableList :tableTitle="tab.tableTitle" :tableHeader="tab.tableHeader" :tableData="tab.tableData" />
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import InputWithSelect from '@/components/InputWithSelect';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import DeviceInfo from '@/components/DeviceInfo';
  import Pagination from '@/components/Pagination';
  import DatePicker from '@/components/DatePicker';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import Input from '@/components/Input';
  import TableList from '@/components/TableList';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';
  
  export default {
    name: 'TerminalQuery',
    created() {
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
      this.$post('/orderPlacingMeetingController/queryOfferBrandList').then((rsp) => {
        this.brandList = rsp;
      });
      this.queryOpMeetingOfferList();
    },
    data() {
      return {
        tab: {
          tableTitle: [{
            label: '终端名称',
            prop: 'opmName',
            colSpan: 8,
            render: (h, params) => {
              return h(DeviceInfo, {
                props: {
                  data: params.row,
                }
              });
            }
          }, {
            label: '终端型号',
            prop: 'offerModelName',
            colSpan: 4
          }, {
            label: '终端品牌',
            prop: 'brandName',
            colSpan: 4
          }, {
            label: '终端价格',
            prop: 'salePrice',
            colSpan: 2,
            render: (h, params) => {
              return h({
                template: `<span>¥ {{data.row.salePrice}}</span>`,
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          }, {
            label: '上级数量',
            prop: 'offerQty',
            colSpan: 2
          }, {
            label: '操作',
            prop: 'operation',
            colSpan: 4,
            render: (h, params) => {
              return h({
                template: `<button class="updown-btn red" @click="editDeliveryData(data.row)">商品详情</button>`,
                data: function () {
                  return {
                    data: params,
                  }
                },
                methods: {
                  editDeliveryData: (item) => {
                    this.editDeliveryData(item)
                  }
                }
              })
            }
          }],
          tableHeader: [{
            label: '供货商',
            prop: 'supplierName',
            colSpan: 24,
            render: (h, params) => {
              return h({
                template: '<p class="text-right">供货商名称：{{data.row.supplierName}}</p>',
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          }],
          tableData: [],
        },

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
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      search(obj) {
        this.categoryItem.isCentman = obj.type;
        this.categoryItem.offerNameOrCode = obj.value;
        this.queryOpMeetingOfferList();
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
          this.categoryItem.isSpecial = val.isSpecial;
          this.queryOpMeetingOfferList();
          this.checkedCategoryList.map((item) => {
            if (item.name === '是否特种机型') {
              item.categoryName = val.isSpecialName;
              item.categoryCode = val.isSpecial;
            }
          });
        } else {
          this.delCategoryItem('是否特种机型');
          this.categoryItem.isSpecial = '';
        }
      },
      checkedBrand(val, index) {
        if (this.checkedBrandIndex !== index) {
          this.checkedBrandIndex = index;
          this.categoryItem.brandCd = val.brandCd;
          this.categoryItem.offerModelId = '';
          this.queryOpMeetingOfferList();
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
          this.queryOpMeetingOfferList();
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
        this.queryOpMeetingOfferList();
      },
      queryOpMeetingOfferList(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/orderPlacingMeetingController/queryOpMeetingOfferList', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          isCentman: this.categoryItem.isCentman,
          offerNameOrCode: this.categoryItem.offerNameOrCode,
          isSpecial: this.categoryItem.isSpecial,
          brandCd: this.categoryItem.brandCd,
          offerModelId: this.categoryItem.offerModelId,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tab.tableData = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.queryOpMeetingOfferList(curPage);
      },
      editDeliveryData(item) {
        localStorage.setItem(item.opmOrderId, JSON.stringify(item));
        this.$router.push({
          path: '/orderManage/detailTerminalMaintain',
          query: {
            opmOrderId: item.opmOrderId
          }
        });
      }
    },
    components: {
      Breadcrumb,
      InputWithSelect,
      TitlePlate,
      Table,
      DeviceInfo,
      Pagination,
      DatePicker,
      ChooseMerchants,
      Input,
      TableList,
      MiddleImgInfoSmall
    }
  }
</script>

<style scoped lang="less">
  .terminal-query {
    /* 条件搜索 */
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
    .queries-title span:first-child .arrows {
      display: none;
    }
    /* 条件搜索 */

    .el-range-editor.el-input__inner {
      height: 32px;
    }
    .el-date-editor .el-range__icon, .el-date-editor .el-range-separator, .el-date-editor .el-range__close-icon {
      line-height: 26px;
    }
    .el-input__inner {
      border-radius: 0;
    }

    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }

    .tabs-list {
      margin: 0 auto 20px;
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
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

    .li-list {
      margin-top: 16px;
      border: 1px solid #e0e0e0;
    }
    .p-line {
      height: 35px;
      line-height: 35px;
      background: #f8f8f8;
      border-bottom: 1px solid #e0e0e0;
      .date-color {
        color: #807e7e;
      }
    ;
      span {
        width: calc(33% - 20px);
        padding: 0 10px;
        b {
          margin-right: 15px;
        }
      ;
      }
    }
    .tabs dl {
      height: 90px;

    }
    .tabs .dll {
      line-height: 90px;
      text-align: center;
    }
    .wid32 {
      width: 32%;
    }
    .wid17 {
      width: 17%;
    }
    .wid11 {
      width: 11%;
    }
    .wid10 {
      width: 10%;
    }
    .wid13 {
      width: 13%;
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
      cursor: pointer;
    }
    .updown-btn.green:hover {
      border: 1px solid #46b02e;
    }
    .red {
      color: #f82134;
    }
    .text-center {
      text-align: center;
    }
    .text-right {
      text-align: right;
    }
    .pd5 {
      padding: 5px;
    }
    .p-line span {
      color: #aaa;
    }
    .p-line span b {
      color: #333;
    }
  }

  .el-range-editor.is-active, .el-range-editor.is-active:hover {
    border-color: #ff7a7a;
  }

  .el-date-table td.end-date span, .el-date-table td.start-date span {
    background-color: #ff7a7a;
  }

  .el-date-table td.today span, .el-date-table td.available:hover {
    color: #ff7a7a;
  }
</style>
