<template>
  <div class="deposit-add-record">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['定金管理', '定金补录']"/>
        </div>
      </div>

      <!-- 搜索 -->
      <div class="box-1200 search">
        <InputWithSelect @search="search" :clearable="true"/>
        <div class="category-more" @click="showMoreCondition">更多条件 <i v-show="isShowMoreCondition" class="iconfont">&#xe607;</i><i
          v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
      </div>

      <!-- 条件搜索 -->
      <div class="condition-search box-1200" v-show="isShowMoreCondition">
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="condition-item">
              <label class="label-wrds">订单号：</label>
              <Input :value.sync="depositRecord.opmOrderNo"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="condition-item">
              <label class="label-wrds">零售商名称：</label>
              <ChooseMerchants title="零售商" @selectOptions="selectRetailer" :clearable="true"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="condition-item">
              <label class="label-wrds">订购起止日期：</label>
              <DatePicker :value.sync="depositRecord.orderDate" :clearable="true"/>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="tabs-list box-1200">
        <div class="result-header">
          <TitlePlate title="定金补录结果列表"/>
          <el-button class="btns" @click="depositImport()"><i class="iconfont">&#xe6a8;</i> 定金导入</el-button>
        </div>
        <Table :tableTitle="tableTitle" :tableData="tableData"/>
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
  import DatePicker from '@/components/DatePicker';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import Input from '@/components/Input';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';

  export default {
    name: 'DepositAddRecord',
    created() {
      this.opMeetingInfo = JSON.parse(sessionStorage.getItem('opMeeting'));
      this.queryOpmDepositList();
    },
    data() {
      return {
        depositRecord: {
          isCentman: '',
          offerNameOrCode: '',
          opmOrderNo: '',
          retailerId: '',
          orderDate: [],
        },
        opMeetingInfo: null, //订货会数据
        isShowMoreCondition: false, //是否显示更多条件
        total: 1, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1, //当前页
        tableTitle: [{
          label: '订单号',
          prop: 'opmOrderNo',
          width: 140,
          render: function (h, params) {
            return h({
              template: '<span class="text-link" @click="orderDetail(opmOrderList)">{{opmOrderNo}}</span>',
              data: function () {
                return {
                  opmOrderNo: params.row.opmOrderNo,
                  opmOrderList: params.row
                }
              },
              methods: {
                orderDetail(item) {
                  this.$router.push({
                    path: '/order/orderFormDetail',
                    query: {
                      opmOrderList: item
                    }
                  });
                },
              }
            })
          }
        }, {
          label: '零售商',
          prop: 'retailerName',
          width: 95
        }, {
          label: '终端编码',
          prop: 'offerCode',
          width: 80
        }, {
          label: '终端名称',
          prop: 'offerName'
        }, {
          label: '产品类型',
          prop: 'isCentman',
          width: 80,
          render: (h, params) => {
            return h({
              template: '<div><span v-if="data.row.isCentman === \'Y\'">集采</span><span v-else>社采</span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '供货商',
          prop: 'supplierName',
          width: 110
        }, {
          label: '日期',
          prop: 'orderDt',
          width: 90
        }, {
          label: '订购数量',
          prop: 'offerQty',
          width: 70
        }, {
          label: '货款金额',
          prop: 'totalAmount',
          width: 80
        }, {
          label: '定金比例配置',
          prop: 'depositProportion',
          width: 100,
          render: function (h, params) {
            return h({
              template: '<span>{{depositProportion}}%</span>',
              data: function () {
                return {
                  depositProportion: params.row.depositProportion
                }
              }
            })
          }
        }, {
          label: '应付定金',
          prop: 'receivableDeposit',
          width: 90
        }, {
          label: '已付定金',
          prop: 'depositAmount',
          width: 90,
          render: function (h, params) {
            return h({
              template: '<p class="text-tag-danger">{{depositAmount}}</p>',
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
        this.depositRecord.isCentman = obj.type;
        this.depositRecord.offerNameOrCode = obj.value;
        this.queryOpmDepositList();
      },
      selectRetailer(val) {
        this.depositRecord.retailerId = val;
      },
      showMoreCondition() {
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
      queryOpmDepositList(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmDepositController/queryOpmDepositList', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          isCentman: this.depositRecord.isCentman,
          offerNameOrCode: this.depositRecord.offerNameOrCode,
          opmOrderNo: this.depositRecord.opmOrderNo,
          retailerId: this.depositRecord.retailerId,
          fromDate: this.depositRecord.orderDate[0],
          toDate: this.depositRecord.orderDate[1],
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.queryOpmDepositList(curPage);
      },
      depositImport() {
        this.$router.push({
          path: '/order/depositImport'
        });
      }
    },
    components: {
      InputWithSelect,
      DeviceInfo,
      Table,
      TitlePlate,
      Breadcrumb,
      Pagination,
      DatePicker,
      ChooseMerchants,
      Input,
      MiddleImgInfoSmall
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/css/mixin";
  .deposit-add-record{
    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }
    .condition-item{
      &.btn{
        padding-left:0;
      }
    }
    .red {
      color: #f82134;
    }

    .search {
      position: relative;
      margin: 10px auto;
      .category-more {
        position: absolute;
        top: 0px;
        left: 500px;
        color: #151515;
        text-decoration: none;
      }
    }

    /* 条件搜索 */
    .category-more {
      height: 22px;
      margin: 5px 0 0 20px;
      padding: 0 5px;
      line-height: 22px;
      background-color: #fff;
      border: 0;
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

    .tabs-list {
      margin: 0 auto;
      padding: 0 0 20px;
      .result-header {
        position: relative;
        height: 28px;
        margin: 0 0 8px;
        line-height: 28px;
      }
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
      width: 100%;
    }
    .btns {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 20px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 28px;
      &:hover {
        background-color: #e20606;
      }
    }
  }
</style>
