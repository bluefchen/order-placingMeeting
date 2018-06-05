<template>
  <div class="order_summary-statistical-analysis">
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
        <Breadcrumb :list="['首页', '订单管理', '订单提货数据维护']"/>
      </div>
    </div>

    <!-- 条件搜索 -->
    <div class="box-1200 condition-search">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">订单号：</label>
            <Input class="condition-input" :value.sync="orderDeliveryData.opmOrderNo"/>
          </div>
        </el-col>
      </el-row>
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

  export default {
    name: 'summaryStatisticalAnalysis',
    data() {
      return {
        orderPickupRecordList: [], //查询返回的数据
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      qryOpmOrderPickupRecordList(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmOrderController/queryOpmOrderPickupRecordList', {
          opMeetingId: '订货会ID',
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
      pageChanged(curPage) {
        this.qryOpmOrderPickupRecordList(curPage);
      }
    },
    components: {
      Breadcrumb,
      TitlePlate,
      Table,
      Pagination,
      Input
    }
  }
</script>

<style scoped lang="less">
  .order_summary-statistical-analysis {
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
  }
</style>
