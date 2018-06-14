<template>
  <div class="order_compositeQuery-data">
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info">
        <p class="p-titl">2018夏季VIVO品牌新品订货会即将开启</p>
        <div class="activity">
          <p>活动日期：2018/04/10-2018/04/11</p>
          <p>活动地址：江苏省南京市玄武区龙蟠路88号-南京国展中心</p>
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
      <InputWithSelect class="fn-left" @search="search" :clearable="true"/>
      <div class="fn-left category-more" @click="isShowMoreCondition = !isShowMoreCondition">更多条件 <i v-show="isShowMoreCondition"
                                                                            class="iconfont">&#xe607;</i><i
        v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
    </div>

    <!-- 条件搜索 -->
    <div class="box-1200 condition-search" v-show="isShowMoreCondition">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">订单号：</label>
            <Input :value.sync="orderQueryData.opmOrderNo" :clearable="true"/>
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
            <label class="label-wrds">订购起止日期：</label>
            <DatePicker :value.sync="orderQueryData.dateValue" :clearable="true"/>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">付款状态：</label>
            <Select :value.sync="orderQueryData.statusCd" :options="paymentStatusList" :clearable="true"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">供应商名称：</label>
            <ChooseMerchants title="供应商" @selectOptions="selectSupplier" />
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="订单列表"/>
        <div class="buttons fn-right">
          <button class="btns" @click="exportOpmOrder"><i class="iconfont">&#xe654;</i> 导出</button>
        </div>
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

  export default {
    name: 'OrderCompositeQuery',
    created() {
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
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
                template: `<p class="text-center">订单号：{{data.row.retailerName}}</p>`,
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
            label: '终端品牌',
            prop: 'brandName',
            colSpan: 4
          }, {
            label: '终端型号',
            prop: 'offerModelName',
            colSpan: 4
          }, {
            label: '订购数量',
            prop: 'offerQty',
            colSpan: 2
          }, {
            label: '提货数量',
            prop: 'pickupGoodsAmount',
            colSpan: 2
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
          value: 1000,
          label: '未交定金'
        }, {
          value: 1001,
          label: '已交定金'
        }, {
          value: 1002,
          label: '已付款'
        }],
        paymentCtatusCd: '', //付款状态CD
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
      selectRetailer(val){
          this.orderQueryData.retailerId = val;
      },
      selectSupplier(val){
          this.orderQueryData.supplierId = val;
      },
      queryOpmOrderSubmit(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmOrderController/queryOpmOrderList', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          isCentman: this.orderQueryData.isCentman,
          offerNameOrCode: this.orderQueryData.offerNameOrCode,
          opmOrderNo: this.orderQueryData.opmOrderNo,
          supplierId: this.orderQueryData.supplierId,
          retailerId: this.orderQueryData.retailerId,
          fromDate: this.orderQueryData.dateValue[0],
          toDate: this.orderQueryData.dateValue[1],
          statusCd: this.orderQueryData.statusCd,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.qryOpmOrderList = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      orderdetail(item) {
        localStorage.setItem(item.opmOrderId, JSON.stringify(item));
        this.$router.push({
          path: '/order/Orderdetail',
          query: {
            opmOrderId: item.opmOrderId
          }
        });
      },
      exportOpmOrder() {
        location.href = 'http://127.0.0.1/opmOrderController/exportOpmOrderList?isCentman=' + this.orderQueryData.isCentman + '&offerNameOrCode=' + this.orderQueryData.offerNameOrCode + '&opmOrderNo=' + this.orderQueryData.opmOrderNo + '&supplierId=' + this.orderQueryData.supplierId + '&retailerId=' + this.orderQueryData.retailerId + '&fromDate=' + this.orderQueryData.dateValue[0] + '&toDate=' + this.orderQueryData.dateValue[1] + '&statusCd=' + this.orderQueryData.statusCd;
      },
      pageChanged(curPage) {
        this.queryOpmOrderSubmit(curPage);
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
      TableList
    }
  }
</script>

<style scoped lang="less">
  .order_compositeQuery-data {
    /*中间背景图片*/
    .img-bg {
      width: 100%;
      height: 170px;
      background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat center center;
    }
    .img-bg .info {
      width: 1036px;
      height: 170px;
      margin: 0 auto;
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
      margin: 5px 0 0 20px;
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
  }
</style>
