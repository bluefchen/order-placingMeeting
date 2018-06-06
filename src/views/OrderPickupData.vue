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
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">订单号：</label>
            <Input :value.sync="orderDeliveryData.opmOrderNo"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">零售商名称：</label>
            <ChooseMerchants title="零售商" @selectOptions="selectRetailer" />
            <!-- <input type="text" v-model="orderDeliveryData.retailerId"> -->
          </div>
        </el-col>
      <el-col :span="8">
        <div class="condition-item">
          <label class="label-wrds">订购起止日期：</label>
          <DatePicker :value.sync="orderDeliveryData.dateValue"/>
          <!--<el-date-picker v-model="orderDeliveryData.dateValue" type="daterange"-->
                          <!--range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>-->
        </div>
      </el-col>
      </el-row>

    </div>

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="提货数据列表"/>
        <div class="buttons fn-right">
          <button class="btns"><i class="iconfont">&#xe6a8;</i> 导入</button>
        </div>
      </div>
      <table width="100%" cellspacing="0" cellpadding="0" class="table">
        <thead>
        <tr>
          <th width="32%">终端名称</th>
          <th width="17%">终端品牌</th>
          <th width="17%">终端型号</th>
          <th width="11%">订购数量</th>
          <th width="10%">提货数量</th>
          <th width="13%">操作</th>
        </tr>
        </thead>
      </table>
      <ul class="ul-tab">
        <li class="li-list" v-for="(item, index) in orderPickupRecordList" :key="index">
          <p class="p-line fn-clear">
            <span class="fn-left date-color"><b>订单号：{{item.opmOrderNo}}</b>【{{item.orderDt}}】</span>
            <span class="fn-left text-center">零售商：{{item.retailerName}}</span>
            <span class="fn-left text-right">供货商：{{item.supplierName}}</span>
          </p>
          <div class="tabs fn-clear">
            <dl class="fn-left wid32">
              <div class="pd5">
                <DeviceInfo :data="item"/>
              </div>
            </dl>
            <dl class="dll wid17 fn-left"><p>{{item.brandName}}</p></dl>
            <dl class="dll wid17 fn-left"><p>{{item.offerModelName}}</p></dl>
            <dl class="dll wid11 fn-left"><b>{{item.offerQty}}</b></dl>
            <dl class="dll wid10 fn-left"><p>{{item.pickupGoodsAmount}}</p></dl>
            <dl class="dll wid13 fn-left">
              <button @click="editDeliveryData(item)" class="updown-btn red">编辑</button>
            </dl>

          </div>
        </li>
      </ul>
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

  export default {
    name: 'OrderPickupData',
    created() {
      this.qryOpmOrderPickupRecordList();
    },
    data() {
      return {
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
      selectRetailer(val){
          this.orderDeliveryData.retailerId = val;
      },
      showMoreCondition() {
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
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
      editDeliveryData(item) {

        localStorage.setItem(item.opmOrderId, JSON.stringify(item));

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
      Input
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
    .wid30 {
      width: 30%;
    }
    .wid40 {
      width: 40%;
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
      padding: 0 12px;
      margin-left: 2px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 28px;
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
