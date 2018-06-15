<template>
  <div class="order_pickup-data">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['首页', '统计查询', '订单提货上报', '江苏省订单提货清单明细']"/>
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
        <el-col :span="7">
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
            <label class="label-wrds">供货商名称：</label>
            <ChooseMerchants title="供货商" @selectOptions="selectSupplier" />
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="订单提货清单明细"/>
      </div>
      <div class="result-table">
        <Table :tableTitle="tableTitle" :tableData="tableData"/>
      </div>
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Input from '@/components/Input';
  import InputWithSelect from '@/components/InputWithSelect';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';

  export default {
    name: 'OrderPickingDetail',
    created() {
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
      this.qryOpmOrderPickupInfo();
    },
    data() {
      return {
        tableTitle: [{
          label: '订单号',
          prop: 'opmOrderNo',
          width: 120,
        }, {
          label: '零售商',
          prop: 'retailerName',
          width: 120,
        }, {
          label: '终端编码',
          prop: 'offerCode',
          width: 120,
        }, {
          label: '终端名称',
          prop: 'offerName'
        }, {
          label: '终端品牌',
          prop: 'brandName',
          width: 100
        }, {
          label: '终端型号',
          prop: 'offerModelName',
          width: 100
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
          width: 100
        }, {
          label: '定购数量',
          prop: 'offerQty',
          width: 80
        }, {
          label: '提货数量',
          prop: 'pickupGoodsAmount',
          width: 80,
          render: (h, params) => {
            return h({
              template: '<div class="link-btn">{{data.row.pickupGoodsAmount}}</div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }],
        tableData: [], //查询返回的数据


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
          opMeetingId: this.opMeetingInfo.opMeetingId,
          isCentman: this.orderQueryData.isCentman,
          offerNameOrCode: this.orderQueryData.offerNameOrCode,
          opmOrderNo: this.orderQueryData.opmOrderNo,
          retailerId: this.orderQueryData.retailerId,
          supplierId: this.orderQueryData.supplierId,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
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
      InputWithSelect,
      TitlePlate,
      Table,
      Pagination,
      ChooseMerchants,
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
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
    }

  }
</style>
