<template>
  <div class="order_pickup-goods-confirm">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['订单管理', '订单提货数据维护', '订单提货确认']"/>
      </div>
    </div>

    <div class="orderInfo box-1200">
      <div class="tel-model">订单信息</div>
      <ul class="info-list fn-clear">
        <li class="info-list-li fn-left fn-clear">
          <div class="info-detail fn-left">
            <p class="detail-p"><span>零售商名称：</span>{{retailerInfo.retailerName}}</p>
            <p class="detail-p"><span>零售商类型：</span>{{retailerInfo.retailerTypeName}}</p>
            <p class="detail-p"><span>联系电话：</span>{{retailerInfo.linkNbr}}</p>
          </div>
          <div class="info-detail fn-left">
            <p class="detail-p"></p>
            <p class="detail-p"><span>所属省份：</span>{{retailerInfo.commonRegionName}}</p>
            <p class="detail-p"><span>联系人：</span>{{retailerInfo.linkMan}}</p>
          </div>
        </li>
        <li class="info-list-li fn-right fn-clear">
          <div class="info-detail fn-left">
            <p class="detail-p"><span>供货商名称：</span>{{supplierInfo.supplierName}}</p>
            <p class="detail-p"><span>供货商类型：</span>{{supplierInfo.supplierTypeName}}</p>
            <p class="detail-p"><span>联系电话：</span>{{supplierInfo.linkNbr}}</p>

          </div>
          <div class="info-detail fn-left">
            <p class="detail-p"></p>
            <p class="detail-p"><span>所属省份：</span>{{supplierInfo.commonRegionName}}</p>
            <p class="detail-p"><span>联系人：</span>{{supplierInfo.linkMan}}</p>
          </div>
        </li>
      </ul>
      <div class="info-list">
        <div class="info-table fn-clear">
          <p class="detail-table fn-left"><span>订单编号：</span>{{orderPickGoodsInfo.opmOrderId}}</p>
          <p class="detail-table fn-left"><span>订单时间：</span>{{orderPickGoodsInfo.orderDt}}</p>
          <p class="detail-table fn-left"><span>提货时间：</span>{{orderPickGoodsInfo.pickupDt}}</p>
        </div>
        <table width="100%" cellspacing="0" cellpadding="0" class="table">
          <thead>
          <tr>
            <th width="30%">终端名称</th>
            <th width="18%">终端品牌</th>
            <th width="18%">终端型号</th>
            <th width="15%">终端价格</th>
            <th>订购数量</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <div class="td-device-info">
                <DeviceInfo :data="orderPickGoodsInfo"/>
              </div>
            </td>
            <td>{{orderPickGoodsInfo.brandName}}</td>
            <td>{{orderPickGoodsInfo.offerModelName}}</td>
            <td>￥{{orderPickGoodsInfo.salePrice}}</td>
            <td>{{orderPickGoodsInfo.offerQty}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="order-num box-1200">
      <span class="wrds fn-left">提货数量：</span>
      <input type="number" v-model="pickupGoodsAmount" name="" class="fn-left">
      <button class="button fn-left" :disabled="!pickupGoodsAmount" @click="confirmDelivery">确认提货</button>
      <button @click="countermandDelivery" class="button cancel-btn fn-left">取消提货</button>
    </div>
  </div>

</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb';
  import DeviceInfo from '@/components/DeviceInfo';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';

  export default {
    name: 'OrderPickupGoodsConfirm',
    created() {

      this.orderPickGoodsInfo = JSON.parse(localStorage.getItem(this.$route.query.opmOrderId));

      this.$post('/orderPlacingMeetingController/querySupplierById', {
        supplierId: this.orderPickGoodsInfo.supplierId
      }).then((rsp) => {
        this.supplierInfo = rsp;
      });

      this.$post('/orderPlacingMeetingController/queryRetailerById', {
        retailerId: this.orderPickGoodsInfo.retailerId
      }).then((rsp) => {
        this.retailerInfo = rsp;
      });

    },
    data() {
      return {
        orderPickGoodsInfo: {}, //传入的数据
        supplierInfo: {}, //查询供货商信息
        retailerInfo: {}, //查询零售商信息
        pickupGoodsAmount: null //提货数量
      }
    },
    methods: {
      confirmDelivery() {
        this.$post('/opmOrderController/updateOpmOrderPickupRecord', {
          'opmOrderId': this.orderPickGoodsInfo.opmOrderId,
          'pickupGoodsAmount': this.pickupGoodsAmount
        }).then((rsp) => {
          this.$msgBox({
            type: 'success',
            title: '操作提示',
            content: '确认提货成功'
          }).catch(() => {
            // console.log('cancel');
          });
          this.$router.push({
            path: `/order/orderPickupData`
          });
        });
      },
      countermandDelivery() {
        this.$msgBox({
          type: 'success',
          title: '操作提示',
          content: '取消提货成功'
        }).catch(() => {
          // console.log('cancel');
        });
        this.$router.push({
          path: `/order/orderPickupData`
        });
      }
    },
    components: {
      Breadcrumb,
      DeviceInfo,
      MiddleImgInfoSmall
    }
  }
</script>

<style scoped lang="less">
  .order_pickup-goods-confirm {
    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }
    .my-location label {
      color: #aaa;
    }
    .orderInfo {
      padding: 0 0 20px;
      margin: 16px auto 0;
      border: 1px solid #cecece;
    }
    .tel-model {
      height: 36px;
      line-height: 36px;
      background: url('../assets/images/red-line.png') no-repeat 10px center;
      padding-left: 20px;
      font-size: 18px;
      color: #000;
      font-weight: 800;
      background-color: #f2f1f1;
      border-bottom: 1px solid #d6d6d6;
    }
    .info-list {
      padding: 15px 0 0;
      margin: 0 15px;
      border-bottom: 1px solid #d6d6d6;
    }
    .info-list:last-child {
      border-bottom: 0;
    }
    .info-list-li {
      width: calc(50% - 1px);
      margin-bottom: 15px;
      padding: 8px 0;
      border-right: 1px solid #d6d6d6;
      color: #2b2020;
      font-size: 12px;
    }
    .info-list-li:last-child {
      border-right: 0;
    }
    .info-detail {
      width: 230px;
      margin: 0 20px;
    }
    .detail-p {
      height: 24px;
      line-height: 24px;
    }
    .info-table {
      margin: 0 20px;
      line-height: 18px;
    }
    .detail-table {
      width: 25%;
    }
    .table {
      margin-top: 10px;
      border: 1px solid #e0e0e0;
    }
    .table thead tr {
      height: 36px;
      background-color: #f8f8f8;
      border-bottom: 1px solid #e0e0e0;
      color: #131212;
    }
    .table tbody tr {
      height: 90px;
      border-bottom: 1px solid #dcdcdc;
    }
    .table thead tr th {
      text-align: center;
    }
    .table tbody tr td {
      text-align: center;
    }
    .order-num {
      height: 75px;
      border: 1px solid #ff223d;
      background-color: #fff8ef;
      margin: 23px auto;
    }
    .order-num input[type="number"] {
      width: 153px;
      height: 32px;
      padding: 0 10px;
      margin-top: 22px;
      border: 1px solid #d5d5d5;
    }
    .order-num .wrds {
      width: 102px;
      line-height: 34px;
      margin-top: 22px;
      text-align: right;
    }
    .button {
      height: 34px;
      padding: 0 24px;
      margin: 22px 0 0 22px;
      border: 0;
      font-size: 14px;
      background-color: #f01919;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
    }
    .button:disabled {
      background: #f25555;
      cursor: not-allowed;
    }
    .cancel-btn {
      background-color: #ffd6d6;
      color: #f01919;
      border: 1px solid #f01919;
    }
    .td-device-info {
      margin: 10px;
    }
  }
</style>
