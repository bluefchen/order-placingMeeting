<template>
  <div class="order_pickup-data">
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
    <!-- 中间背景图片 -->

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['首页', '统计查询', '订单查询']"/>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="box-1200 search fn-clear">
      <InputWithSelect class="fn-left" @search="search"/>
      <div class="fn-left category-more" @click="isShowMoreCondition = !isShowMoreCondition">更多条件 <i v-show="isShowMoreCondition"
                                                                            class="iconfont">&#xe607;</i><i
        v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
    </div>

    <!-- 条件搜索 -->
    <div class="box-1200 condition-search" v-show="isShowMoreCondition">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">订单号：</label>
            <Input :value.sync="orderQueryData.opmOrderNo"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">零售商名称：</label>
            <ChooseMerchants title="零售商" @selectOptions="selectRetailer" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">供应商名称：</label>
            <ChooseMerchants title="供应商" @selectOptions="selectSupplier" />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" :offset="16">
          <div class="condition-item">
            <el-button type="success" size="small" @click="qryOpmOrderPickupInfo()">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="订单列表"/>
      </div>
      <div class="result-table">
        <Table :border="false" :tableTitle="tableTitle" :tableData="tableData"/>
      </div>
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import InputWithSelect from '@/components/InputWithSelect';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import DeviceInfo from '@/components/DeviceInfo';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';

  export default {
    name: 'OrderPickingDetail',
    created() {
      this.qryOpmOrderPickupInfo();
    },
    data() {
      return {
        tableTitle: [{
          label: '省份',
          prop: 'commonRegionName'
        }, {
          label: '订单数量',
          prop: 'offerQty'
        }, {
          label: '订单提货上报量',
          prop: 'pickupGoodsAmount',
          render: (h, params) => {
            return h({
              template: '<div class="link-btn" @click="qryOrderPickupInfo(data.row)"><a>{{data.row.pickupGoodsAmount}}</a></div>',
              data() {
                return {
                  data: params
                }
              },
              methods: {
                qryOrderPickupInfo(item) {
                  // this.$router.push({
                  //   path: '/order/orderFormDetail',
                  //   query: {
                  //   }
                  // });
                },
              }
            });
          }
        }, {
          label: '未提货量',
          prop: 'notPickupGoodsAmount'
        }],
        tableData: [], //查询返回的数据


        qryOpmOrderList: [], //查询返回的数据
        orderQueryData: {
          isCentman: '',
          offerNameOrCode: '',
          opmOrderNo: '',
          retailerId: '',
          dateValue: [],
          supplierId: '',
          statusCd: ''
        },
        isShowMoreCondition: false, //是否显示更多条件
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      search(obj) {
        this.orderQueryData.isCentman = obj.type;
        this.orderQueryData.offerNameOrCode = obj.value;
        this.qryOpmOrderPickupInfo()
      },
      selectRetailer(val){
          this.orderQueryData.retailerId = val;
      },
      selectSupplier(val){
          this.orderQueryData.supplierId = val;
      },
      qryOpmOrderPickupInfo(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmOrderController/queryOpmOrderPickupInfo', {
          opMeetingId: '',
          offerNameOrCode: '',
          opmOrderNo: '',
          retailerId: '',
          supplierId: '',
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.qryOpmOrderList = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.qryOpmOrderPickupInfo(curPage);
      }
    },
    components: {
      Breadcrumb,
      Input,
      Select,
      InputWithSelect,
      TitlePlate,
      Table,
      DeviceInfo,
      Pagination,
      ChooseMerchants
    }
  }
</script>

<style scoped lang="less">
  .order_pickup-data {
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

    /* 条件搜索 */
    .search {
      margin: 10px auto;
    }

    .category-more {
      height: 22px;
      margin: 7px 0 0 20px;
      padding: 0 5px;
      line-height: 22px;
      background-color: #fff;
      border: 0;
      color: #333;
      text-decoration: none;
      cursor: pointer;
      &:active, &:focus, &:hover {
        color: #f82134;
      }
      .iconfont {
        font-size: 12px;
      }
    }
    /* 条件搜索 */

    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }

    .tabs-list {
      margin: 0 auto 20px;
      .result-table{
        border: 1px solid #ebeef5;
        border-bottom: none;
      }
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
    }

    .buttons .btns {
      padding: 0 16px;
      margin-left: 2px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 28px;
      cursor: pointer;
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
      span {
        width: calc(33% - 20px);
        padding: 0 10px;
        b {
          margin-right: 15px;
        }
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
</style>
