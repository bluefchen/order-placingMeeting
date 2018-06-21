<template>
  <div class="prefer-policy-settle">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['首页', '统计查询', '优惠政策结算']"/>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="box-1200 search fn-clear">
      <InputWithSelect class="fn-left" @search="search" :clearable="clearable"/>
      <div class="fn-left category-more" @click="showMoreCondition">更多条件 <i v-show="isShowMoreCondition" class="iconfont">&#xe607;</i><i v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
    </div>

    <!-- 条件搜索 -->
    <div class="box-1200 condition-search" v-show="isShowMoreCondition">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">订单号：</label>
            <Input :value.sync="orderQueryData.opmOrderNo"/>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">零售商名称：</label>
            <ChooseMerchants title="零售商" @selectOptions="selectRetailer" />
          </div>
        </el-col>
        <el-col :span="10">
          <div class="condition-item">
            <label class="label-wrds">订购起止日期：</label>
            <DatePicker :value.sync="orderQueryData.dateValue" :clearable="true"/>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">付款状态：</label>
            <Select :value.sync="orderQueryData.statusCd" :options="paymentStatusList"/>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">供货商名称：</label>
            <ChooseMerchants title="供货商" @selectOptions="selectSupplier" />
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate title="订单列表"/>
      </div>

      <TableList :tableTitle="tab.tableTitle" :tableHeader="tab.tableHeader" :tableData="qryOpmOrderList" />
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>

</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import DatePicker from '@/components/DatePicker';
  import InputWithSelect from '@/components/InputWithSelect';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import DeviceInfo from '@/components/DeviceInfo';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import TableList from '@/components/TableList';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';

  export default {
    name: 'PreferentialPolicySettlement',
    created() {
      this.opMeetingInfo = JSON.parse(sessionStorage.getItem('opMeeting'));
      this.queryOpmOrderSubmit();
    },
    data() {
      return {
        tab: {
          tableHeader: [{
            label: '订单号',
            prop: 'opmOrderNo',
            colSpan: 8,
            render: (h, params) => {
              return h({
                template: '<p class="date-color"><b>订单号：{{data.row.opmOrderNo}}</b>【{{data.row.orderDt}}】</p>',
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          },{
            label: '零售商',
            prop: 'retailerName',
            colSpan: 8,
            render: (h, params) => {
              return h({
                template: `<p class="text-center">零售商：{{data.row.retailerName}}</p>`,
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          },{
            label: '供货商',
            prop: 'supplierName',
            colSpan: 8,
            render: (h, params) => {
              return h({
                template: `<p class="text-right">供货商：{{data.row.supplierName}}</p>`,
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          }],

          tableTitle: [{
            label: '终端名称',
            prop: 'offerName',
            colSpan: 8,
            render: (h, params) => {
              return h(DeviceInfo, {
                props: {
                  data: params.row,
                }
              });
            }
          }, {
            label: '终端价格',
            prop: 'salePrice',
            colSpan: 4,
            render: (h, params) => {
              return h({
                template: `<span><b>¥ {{(data.row.salePrice)}}</b></span>`,
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          }, {
            label: '订购数量',
            prop: 'offerQty',
            colSpan: 2,
            render: (h, params) => {
              return h({
                template: `<span><b>{{(data.row.offerQty)}}</b></span>`,
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          }, {
            label: '总金额',
            prop: 'amount',
            colSpan: 2,
            render: (h, params) => {
              return h({
                template: `<span><b>¥ {{(data.row.salePrice * data.row.offerQty).toFixed(2)}}</b></span>`,
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          }, {
            label: '优惠金额',
            prop: 'discountAmount',
            colSpan: 2,
            render: (h, params) => {
              return h({
                template: `
                <div class="discount red">
                  <p><b>- ¥ {{data.row.discountAmount}}</b></p>
                </div>`,
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          },{
            label: '应付金额',
            prop: 'amountPay',
            colSpan: 2,
            render: (h, params) => {
              return h({
                template: `<span><b>¥ {{(data.row.salePrice * data.row.offerQty - data.row.discountAmount).toFixed(2)}}</b></span>`,
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          }, {
            label: '操作',
            prop: 'operation',
            colSpan: 4,
            render: (h, params) => {
              return h({
                template: `<button class="updown-btn red" @click="orderdetail(data.row)">订单详情</button>`,
                data: function () {
                  return {
                    data: params,
                  }
                },
                methods: {
                  orderdetail: (item) => {
                    this.orderdetail(item)
                  }
                }
              })
            }
          }]
        },
        paymentStatusList: [{ //付款状态列表
          value: '1000',
          label: '未交定金'
        }, {
          value: '1001',
          label: '已交定金'
        }, {
          value: '1002',
          label: '已付款'
        }],

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
        this.queryOpmOrderSubmit();
      },
      showMoreCondition() {
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
      queryOpmOrderSubmit(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmPolicyController/queryOpmPoilcyDepositList', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          isCentman: this.orderQueryData.isCentman,
          offerNameOrCode: this.orderQueryData.offerNameOrCode,
          opmOrderNo: this.orderQueryData.opmOrderNo,
          supplierId: this.orderQueryData.supplierId,
          retailerId: this.orderQueryData.retailerId,
          fromDate: this.orderQueryData.dateValue[0],
          toDate: this.orderQueryData.dateValue[1],
          paymentStatusCd: this.orderQueryData.statusCd,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.qryOpmOrderList = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      orderdetail(item) {
        sessionStorage.setItem(item.opmOrderId, JSON.stringify(item));
        this.$router.push({
          path: '/order/orderdetail',
          query: {
            opmOrderId: item.opmOrderId
          }
        });
      },
      pageChanged(curPage) {
        this.queryOpmOrderSubmit(curPage);
      },
      selectRetailer(val){
        this.orderQueryData.retailerId = val;
      },
      selectSupplier(val){
        this.orderQueryData.supplierId = val;
      }
    },
    components: {
      Breadcrumb,
      Input,
      Select,
      DatePicker,
      InputWithSelect,
      TitlePlate,
      Table,
      DeviceInfo,
      Pagination,
      ChooseMerchants,
      TableList,
      MiddleImgInfoSmall
    }
  }
</script>

<style scoped lang="less">
  .prefer-policy-settle {
      /* 条件搜索 */
      .search {
        margin: 10px auto;
      }
      .category-more {
        height: 22px;
        margin: 5px 0 0 20px;
        padding: 0 5px;
        line-height: 22px;
        background-color: #fff;
        border: 0;
        color: #333;
        text-decoration: none;
        cursor: pointer;
      }
      .category-more:active,
      .category-more:focus,
      .category-more:hover {
        color: #f82134;
      }
      .category-more .iconfont {
        font-size: 12px;
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
      .wid30 {
        width: 30%;
      }
      .wid15 {
        width: 15%;
      }
      .wid8 {
        width: 8%;
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
