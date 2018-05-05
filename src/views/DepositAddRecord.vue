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
          <Breadcrumb :list="['定金管理', '定金补录']"/>
        </div>
      </div>

      <!-- 搜索 -->
      <div class="box-1200 search">
        <InputWithSelect :search="search"/>
        <a href="javascript:;" class="category-more fn-left" @click="openMore()" v-show="!openshow">更多条件 <i class="iconfont">&#xe608;</i></a>
        <a href="javascript:;" class="category-more fn-left" @click="openMore()" v-show="openshow">收起条件 <i class="iconfont">&#xe607;</i></a>
      </div>
      
      <!-- 条件搜索 -->
      <div class="condition-search box-1200" v-show="openshow">
        <div class="condition-iterm wid30">
          <label class="label-wrds">零售商名称：</label>
          <input type="text" class="condition-input">
        </div>
        <div class="condition-iterm wid40">
          <label class="label-wrds">订购起止日期：</label>
          <el-date-picker
            v-model="value4"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="condition-iterm wid30">
           <button class="btns">查询</button> 
        </div>
      </div>
      
      <div class="tabs-list box-1200">
        <div class="result-header">
          <TitlePlate title="定金补录结果列表"/>         
          <button class="btns"><i class="iconfont">&#xe6a8;</i> 定金导入</button>         
        </div>
        <Table :stripe="false" :border="false" :tableTitle="tableTitle" :tableData="tableData" v-show="step == 3"/>
        <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
      </div>
    </div>
  </div>
</template>

<script>
  import InputWithSelect from '@/components/InputWithSelect';
  import DeviceInfo from '@/components/DeviceInfo';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Breadcrumb from '@/components/Breadcrumb';
  import Pagination from '@/components/Pagination';

  export default {
    name: 'DepositAddRecord',
    created() {
    },
    data() {
      return {
        openshow: false,
        orderPickupRecordList: [], //查询返回的数据     
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1, //当前页
        tableTitle: [{
          label: '订单号',
          prop: 'opmOrderNo',
          width: 95,
          render: function (h, params) {
            return h({
              template: '<router-link to="orderFormDetail" class="red">{{opmOrderNo}}</router-link>',
              data: function () {
                return {
                  opmOrderNo: params.row.opmOrderNo
                }
              }
            })
          }
        }, {
          label: '零售商',
          prop: 'retailerName',
          width: 107
        }, {
          label: '终端编码',
          prop: 'offerCode',
          width: 83
        }, {
          label: '终端名称',
          prop: 'offerName',
          width: 140
        }, {
          label: '终端品牌',
          prop: 'brandCd', 
          width: 80                   
        }, {
          label: '终端型号',
          prop: 'offerModelName',
          width: 85         
        }, {
          label: '产品类型',
          prop: 'isCentman',
          width: 80         
        }, {
          label: '订购数量',
          prop: 'offerQty',
          width: 70  
        }, {
          label: '供货商',
          prop: 'supplierName',
          width: 120 
        }, {
          label: '货款金额',
          prop: 'totalAmount',
          width: 70                    
        }, {
          label: '定金比例配置',
          prop: 'depositProportion',
          width: 90
        }, {
          label: '已交定金金额',
          prop: 'depositAmount',
          width: 90,
          render: function (h, params) {
            return h({
              template: '<p class="red">{{depositAmount}}</p>',
              data: function () {
                return {
                  depositAmount: params.row.depositAmount
                }
              }
            })
          }
        }, {
          label: '状态',
          prop: 'paymentStatusCdName'
        }],
        tableData: [],
      }
    },
    methods: {
      search(obj) {
        console.log('参数：', obj);
      },
      openMore(){
        this.openshow = !this.openshow;
      }
    },
    components: {
      InputWithSelect,
      DeviceInfo,
      Table,
      TitlePlate,
      Breadcrumb,
      Pagination
    }
  }
</script>

<style lang="less">
  @import "../assets/css/mixin";

  /*中间背景图片*/
  .img-bg {
    width: 100%;
    height: 200px;
    background: #e4273f;
    .info {
      width: 1036px;
      height: 200px;
      margin: 0 auto;
      background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat right bottom;
      overflow: hidden;
      .p-titl {
        margin: 62px 0 0 0;
        font-size: 22px;
        color: #fcfdff;
      }
      .activity {
        width: 306px;
        margin: 10px 0 0 0;
        line-height: 18px;
        font-size: 12px;
        color: #fcfdff;
        text-align: center;
      }
    }
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
    position: relative;
    margin: 10px auto;
    .category-more{
      position: absolute;
      top: 11px;
      left: 500px;
      color: #151515;
      text-decoration: none;
    }
  }
  
  /* 条件搜索 */
  .condition-search{
    display: flex;
    height: 72px;
    margin: 10px auto  14px;
    border: 1px solid #dfdfdf;
    .condition-iterm{
      position: relative;
      margin: 20px 30px 0 0;
      .label-wrds{
        position: absolute;
        top: 0;
        left: 0;
        width: 110px;
        line-height: 32px;
        font-size: 14px;
        text-align: right;
      }
      .condition-input{
        width: calc(100% - 20px - 110px);
        height: 24px;
        padding: 3px 10px;
        margin-left: 110px; 
        border: 1px solid #e5e5e5;
      }
      .btns{
        left: 15px;
        line-height: 31px;
        padding: 0 30px;
      }
    }
  }
  .search-cnt .search[data-v-2eed8ffc]{
    margin-top:0;
  }
  .el-range-editor.el-input__inner{
    margin-left: 110px;
    height: 32px;
    line-height: 30px;
    border-radius: 0;
  }
  .el-date-editor .el-range__icon{
    line-height: 27px;
  }
  .el-date-editor .el-range-separator{
    line-height: 27px;
  }
  .el-date-editor .el-range__close-icon{
    line-height: 27px;
  }
  .wid30{
    width: 30%;
  }
  .wid40{
    width: 40%;
  }

  .tabs-list{
    margin: 0 auto;
    padding: 0 0 20px;
    .result-header {
      position: relative;
      height: 28px;
      margin: 0 0 8px;
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
  }
  
  .btns{
    position: absolute;
    top: 0;
    right:0;
    padding: 0 20px;
    border:0;
    background-color: #fa0000;
    color:#fff;
    font-size: 12px;
    border-radius: 3px;
    line-height: 28px;
    &:hover{
      background-color: #e20606;
    }
  }

  .table{
    border: 1px solid #e3e3e3;
    table-layout:fixed;
    word-break:break-all;
    thead tr{
      height: 32px;
      background-color: #efefef;
      border-bottom: 1px solid #d1d1d1;
      color: #131212;
      th{
        text-align: center;
        border-right: 1px solid #d1d1d1;
      }
    }
    tbody tr{
      height: 34px;
      border-bottom: 1px solid #e3e3e3;
      &:nth-of-type(2n){
        background-color: #fcfcfc;
      }
      td{
        text-align: center;
        border-right: 1px solid #e3e3e3;
        .overflow{
          margin: 0 auto;
          .truncate(90%);
        }
        i.iconfont{
          font-size: 18px;
        }
        input{
          width: 80%;
          height: 20px;
          border: 1px solid #b3b3b3;
          text-align: center;
          color: #f02b2b;
        }
      }
    }
  }
</style>
