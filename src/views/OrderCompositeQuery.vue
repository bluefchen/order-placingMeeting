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
      <InputWithSelect class="fn-left" :search="search"/>
      <div class="fn-left category-more" @click="showMoreCondition">更多条件 <i v-show="isShowMoreCondition"
                                                                            class="iconfont">&#xe607;</i><i
        v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
    </div>

    <!-- 条件搜索 -->
    <div class="box-1200 condition-query" v-show="isShowMoreCondition">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">订单号：</label>
            <Input class="condition-input" :value.sync="orderQueryData.opmOrderNo"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">零售商名称：</label>
            <Input class="condition-input" :value.sync="orderQueryData.retailerId"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">订购起止日期：</label>
            <el-date-picker class="condition-input" v-model="orderQueryData.dateValue" type="daterange"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">付款状态：</label>
            <el-select class="condition-select" v-model="orderQueryData.statusCd" placeholder="请选择">
              <el-option v-for="item in paymentStatusList" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">供应商名称：</label>
            <Input class="condition-input" :value.sync="orderQueryData.supplierId"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-iterm">
            <el-button @click="queryOpmOrderSubmit">查询</el-button>
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
      <table width="100%" cellspacing="0" cellpadding="0" class="table">
        <thead>
        <tr>
          <th width="32%">终端名称</th>
          <th width="17%">终端品牌</th>
          <th width="17%">终端型号</th>
          <th width="11%">订购数量</th>
          <th width="10%">付款状态</th>
          <th width="13%">操作</th>
        </tr>
        </thead>
      </table>
      <ul class="ul-tab">
        <li class="li-list" v-for="(item, index) in qryOpmOrderList" :key="index">
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
            <dl class="dll wid10 fn-left" :class="{red: item.paymentStatusCd === 1000}"><p>
              {{item.paymentStatusCdName}}</p></dl>
            <dl class="dll wid13 fn-left">
              <button class="updown-btn red" @click="orderdetail(item)">订单详情</button>
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
  import Input from '@/components/Input';
  import InputWithSelect from '@/components/InputWithSelect';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import DeviceInfo from '@/components/DeviceInfo';
  import Pagination from '@/components/Pagination';

  export default {
    name: 'OrderCompositeQuery',
    created() {
      this.queryOpmOrderSubmit();
    },
    data() {
      return {

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
        this.queryOpmOrderSubmit()
      },
      showMoreCondition() {
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
      queryOpmOrderSubmit(curPage, pageSize) {
        this.$post('/opmOrderController/queryOpmOrderList', {
          opMeetingId: '订货会ID',
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
        window.open('/opmOrderController/exportOpmOrderList?' + encodeURI(JSON.stringify({
          isCentman: this.orderQueryData.isCentman,
          offerNameOrCode: this.orderQueryData.offerNameOrCode,
          opmOrderNo: this.orderQueryData.opmOrderNo,
          supplierId: this.orderQueryData.supplierId,
          retailerId: this.orderQueryData.retailerId,
          fromDate: this.orderQueryData.dateValue[0],
          toDate: this.orderQueryData.dateValue[1],
          statusCd: this.orderQueryData.statusCd,
        })));
      },
      pageChanged(curPage) {
        this.queryOpmOrderSubmit(curPage);
      }
    },
    components: {
      Breadcrumb,
      Input,
      InputWithSelect,
      TitlePlate,
      Table,
      DeviceInfo,
      Pagination
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
    .condition-query {
      display: block;
      height: 114px;
      margin: 18px auto 22px;
      border: 1px solid #dfdfdf;
      .condition-iterm {
        position: relative;
        margin: 8px 0;
        /*margin: 16px 30px 0 0;*/
      }
      .condition-iterm .label-wrds {
        position: absolute;
        top: 0;
        left: 0;
        width: 110px;
        line-height: 32px;
        font-size: 14px;
        text-align: right;
      }
      .condition-input {
        margin-left: 110px;
      }
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
      margin: 15px 0;
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

    .condition-iterm {
      .el-button {
        margin-left: 110px;
        background-color: #f82134;
        border-color: #f82134;
        color: #fff;
        border-radius: 0;
        padding: 6px 40px;
        cursor: pointer;
      }
    }

    .condition-select {
      width: calc(100% - 110px);
      height: 30px;
      margin-left: 110px;
      .el-input {
        width: 100%;
        border: 1px solid #e5e5e5;
        .el-input__inner {
          border: none;
          height: 28px;
          font-size: 12px;
          padding: 0 10px;
        }
        &:hover {
          border-color: #c0c4cc;
        }
        &.is-focus {
          border-color: #ff7a7a;
        }
      }

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
