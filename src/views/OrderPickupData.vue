<template>
  <div class="order_pickup-data">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['首页', '订单管理', '订单提货数据维护']"/>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="box-1200 search fn-clear">
      <InputWithSelect class="fn-left" @search="search"/>
      <div class="fn-left category-more" @click="showMoreCondition">更多条件 <i v-show="isShowMoreCondition"
                                                                            class="iconfont">&#xe607;</i><i
        v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
    </div>

    <!-- 条件搜索 -->
    <div class="box-1200 condition-search" v-show="isShowMoreCondition">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">订单号：</label>
            <Input :value.sync="orderDeliveryData.opmOrderNo"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">零售商名称：</label>
            <ChooseMerchants title="零售商" @selectOptions="selectRetailer"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">订购起止日期：</label>
            <DatePicker :value.sync="orderDeliveryData.dateValue" :clearable="true"/>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="提货数据列表"/>
        <div class="buttons fn-right">
          <router-link class="btns" to="/order/importPickupData"><i class="iconfont">&#xe6a8;</i> 导入</router-link>
        </div>
      </div>

      <TableList :tableTitle="tab.tableTitle" :tableHeader="tab.tableHeader" :tableData="orderPickupRecordList"/>
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
    name: 'OrderPickupData',
    created() {
      this.opMeetingInfo = JSON.parse(sessionStorage.getItem('opMeeting'));
      this.qryOpmOrderPickupRecordList();
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
          }, {
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
          }, {
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
                template: `<button @click="editDeliveryData(data.row)" class="updown-btn red">编辑</button>`,
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
          }]
        },
        orderPickupRecordList: [], //查询返回的数据
        orderDeliveryData: {
          isCentman: '',
          offerNameOrCode: '',
          opmOrderNo: '',
          retailerId: '',
          dateValue: []
        },
        isShowMoreCondition: false, //是否显示更多条件
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      search(obj) {
        this.orderDeliveryData.isCentman = obj.type;
        this.orderDeliveryData.offerNameOrCode = obj.value;
        this.qryOpmOrderPickupRecordList()
      },
      selectRetailer(val) {
        this.orderDeliveryData.retailerId = val;
      },
      showMoreCondition() {
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
      qryOpmOrderPickupRecordList(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmOrderController/queryOpmOrderPickupRecordList', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          isCentman: this.orderDeliveryData.isCentman,
          offerNameOrCode: this.orderDeliveryData.offerNameOrCode,
          opmOrderNo: this.orderDeliveryData.opmOrderNo,
          retailerId: this.orderDeliveryData.retailerId,
          fromDate: this.orderDeliveryData.dateValue[0],
          toDate: this.orderDeliveryData.dateValue[1],
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.orderPickupRecordList = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      editDeliveryData(item) {
        sessionStorage.setItem(item.opmOrderId, JSON.stringify(item));
        this.$router.push({
          path: '/order/orderPickupGoodsConfirm',
          query: {
            opmOrderId: item.opmOrderId
          }
        });
      },
      pageChanged(curPage) {
        this.qryOpmOrderPickupRecordList(curPage);
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
  .order_pickup-data {
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
