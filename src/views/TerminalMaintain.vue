<template>
  <div class="vue_terminal-maintain">
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info"></div>
    </div>
    <!-- 中间背景图片 -->

    <!-- 搜索 -->
    <div class="box-1200 search">
      <InputWithSelect @search="search"/>
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
        <span class="category-label fn-left">终端状态：</span>
        <div class="category-list fn-left">
            <span class="category-item" :class="{'hover': checkedStatusCdIndex===index}"
                  v-for="(opt, index) in statusCdList" :key="index" @click="checkedStatusCdType(opt, index)">{{opt.statusCdName}}</span>
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
        <TitlePlate class="fn-left" title="终端产品列表"/>
        <div class="buttons fn-right">
          <router-link class="btns" :to="{path: '/orderManage/addTerminalMaintain', query: {operation: 'add'}}"><i class="iconfont">&#xe6a8;</i> 新增终端</router-link>
          <button @click="batchUpdateOffer" class="btns"><i class="iconfont">&#xe679;</i> 批量上架</button>
          <button @click="batchUnUpdateOffer" class="btns"><i class="iconfont">&#xe678;</i> 批量下架</button>
        </div>
      </div>
      <Table :isSelection="true" :stripe="false" :border="false" :tableTitle="tableTitle" :tableData="tableData" @selectionChange="selectionChange"/>
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>
</template>

<script>
  import InputWithSelect from '@/components/InputWithSelect';
  import DeviceInfo from '@/components/DeviceInfo';
  import Breadcrumb from '@/components/Breadcrumb';
  import TitlePlate from '@/components/TitlePlate';
  import Pagination from '@/components/Pagination';
  import Table from '@/components/Table';

  export default {
    name: 'TerminalMaintain',
    created() {
      this.$post('/orderPlacingMeetingController/queryOfferBrandList').then((rsp) => {
        this.brandList = rsp;
      });
      this.queryOfferList();
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
                data: {
                  offerName: params.row.offerName,
                  offerCode: params.row.offerCode,
                  isCentman: params.row.isCentman,
                  offerPic: params.row.offerHardwardParam.offerPic
                }
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
            label: '终端状态',
            prop: 'statusCd',
            render: function(h, params){
              return h({
                template: `<div>{{param.row.statusCd ==='1001' ? '上架' : '下架'}}</div>`,
                data: function(){
                  return {
                    param: params
                  }
                }
              })
            }
        }, {
          label: '操作',
          prop: 'operation',
          render: (h, params) => {
            return h({
              template: `<div>
              <button @click="updateOffer(param.row)" v-if="param.row.statusCd === '1002'" class="updown-btn green">上架</button>
              <button @click="unUpdateOffer(param.row)" v-if="param.row.statusCd === '1001'" class="updown-btn">下架</button>
              <button @click="editTerminal(param.row)" class="updown-btn">修改</button>
              <button @click="deleteOffer(param.row)" class="updown-btn">删除</button>
              </div>`,
              data: function(){
                return {
                  param: params
                }
              },
              methods: {
                editTerminal: (val) => {
                  this.editTerminalMaintain(val);
                },
                updateOffer: (val) => {
                  this.updateOffer([val.offerId]);
                },
                unUpdateOffer: (val) => {
                  this.unUpdateOffer([val.offerId]);
                },
                deleteOffer: (val) => {
                  this.deleteOffer(val.offerId);
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
        //筛选数据
        checkedCategoryList: [{
          name: '状态',
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
          'brandCd': '',
          'offerModelId': '',
          'statusCd': ''
        },
        statusCdList: [{
          statusCdName: '上架',
          statusCd: '1001'
        }, {
          statusCdName: '下架',
          statusCd: '1002'
        }],
        checkedStatusCdIndex: null,
        brandList: [],
        checkedBrandIndex: null,
        modelList: [],
        checkedModelIndex: null,
        total: 1, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      search(obj) {
        this.categoryItem.isCentman = obj.type;
        this.categoryItem.offerNameOrCode = obj.value;
        this.queryOfferList();
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
      checkedStatusCdType(val, index) {
        if(this.checkedStatusCdIndex != index){
          this.checkedStatusCdIndex = index;
          this.checkedCategoryList.map((item) => {
            if (item.name === '状态') {
              item.categoryName = val.statusCdName;
              item.categoryCode = val.statusCd;
            }
          });
          this.categoryItem.statusCd = val.statusCd;
          this.queryOfferList();
        }else{
          this.delCategoryItem('状态');
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
          this.$post('/orderPlacingMeetingController/queryOfferModelList', {
            'brandCd': val.brandCd
          }).then((rsp) => {
            this.modelList = rsp;
          });
          this.categoryItem.brandCd = val.brandCd;
          this.categoryItem.offerModelId = '';
          this.queryOfferList();
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
          this.queryOfferList();
        } else {
          this.delCategoryItem('型号');
        }
      },
      delCategoryItem(val) {
        if (val === '状态') {
          this.checkedStatusCdIndex = null;
          this.categoryItem.statusCd = '';
        } else  if (val === '品牌') {
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
        this.queryOfferList();
      },
      queryOfferList(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/orderPlacingMeetingController/queryOfferList', {
          offerNameOrCode: this.categoryItem.offerNameOrCode,
          isCentman: this.categoryItem.isCentman,
          statusCd: this.categoryItem.statusCd,
          brandCd: this.categoryItem.brandCd,
          offerModelId: this.categoryItem.offerModelId,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.queryOfferList(curPage);
      },
      editTerminalMaintain(val){
        localStorage.setItem('offerId', JSON.stringify(val));
        this.$router.push({
          path: '/orderManage/addTerminalMaintain',
          query: {
            operation: 'modify'
          }
        });
      },
      selectionChange(val){
        this.selectTerminalList = val;
      },
      batchUpdateOffer(){
        let selectUpdateList = [];
        _.forEach(this.selectTerminalList, (item, index) => {
          if(item.statusCd === '1002'){
            selectUpdateList.push(item.offerId);
          }
        });
        if(selectUpdateList.length){
          this.updateOffer(selectUpdateList);
        }else{
          this.$message.warning('请至少选择一项进行操作！');
        }
      },
      batchUnUpdateOffer(){
        let selectUnUpdateList = [];
        _.forEach(this.selectTerminalList, (item, index) => {
          if(item.statusCd === '1001'){
            selectUnUpdateList.push(item.offerId);
          }
        });
        if(selectUnUpdateList.length){
          this.unUpdateOffer(selectUnUpdateList);
        }else{
          this.$message.warning('请至少选择一项进行操作！');
        }
      },
      updateOffer(val){
        this.$post('/orderPlacingMeetingController/updateOfferGround', {
          offerIds: val
        }).then((rsp) => {
          this.$message.success('终端上架成功!');
          this.queryOfferList(this.currentPage);
        })
      },
      unUpdateOffer(val){
        this.$post('/orderPlacingMeetingController/updateOfferUnground', {
          offerIds: val
        }).then((rsp) => {
          this.$message.success('终端下架成功!');
          this.queryOfferList(this.currentPage);
        })
      },
      deleteOffer(val){
        this.$post('/orderPlacingMeetingController/deleteOffer', {
          offerId: val
        }).then((rsp) => {
          this.$message.success('终端删除成功!');
          this.queryOfferList(this.currentPage);
        })
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
  .vue_terminal-maintain {
    /*中间背景图片*/
    .img-bg {
      width: 100%;
      height: 250px;
      background: #6e42ef;
    }
    .img-bg .info {
      width: 1200px;
      height: 250px;
      margin: 0 auto;
      background: #6e42ef url('../assets/images/manage-bg.jpg') no-repeat center bottom;
      overflow: hidden;
    }
    /*中间背景图片*/

    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }

    .search {
      margin: 20px auto 10px;
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
      cursor: pointer;
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
      .updown-btn {
        margin: 0 3px;
        padding: 2px 5px;
        border: 1px solid #fff;
        text-decoration: underline;
        &.green{
          color: #46b02e;
        }
        &:hover{
          border: 1px solid #f82134;
          border-radius: 3px;
          text-decoration: none;
        }
      }
      .updown-btn{
        &.green{
          &:hover {
            border: 1px solid #46b02e;
          }
        }
      }
    }

    .queries-title span:first-child .arrows {
      display: none;
    }
  }
</style>
