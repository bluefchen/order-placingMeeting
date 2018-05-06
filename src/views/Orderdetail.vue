<template>
	<div class="order_pickup-goods-confirm">
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
				<Breadcrumb :list="['统计查询', '订单综合查询', '订单详情']"/>
			</div>
	    </div>

	    <!-- 订单付款信息 -->
		<div class="order-pay-info box-1200">
			<p class="p1"><label>订单付款状态：</label><span class="payment-status">{{orderPickGoodsInfo.paymentStatusCdName}}</span></p>
			<p class="p2"><label>订单时间：</label>{{orderPickGoodsInfo.orderDt}}</p>
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
						<p class="detail-p"><span>所属省份：</span>{{retailerInfo.province}}</p>
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
						<p class="detail-p"><span>所属省分：</span>{{supplierInfo.province}}</p>
						<p class="detail-p"><span>联系人：</span>{{supplierInfo.linkMan}}</p>		
					</div>
				</li>				
			</ul>
			<div class="info-list">       
				<div class="info-table fn-clear">                                                     
    				<p class="detail-table fn-left"><span>订单编号：</span>{{orderPickGoodsInfo.opmOrderId}}</p>
					<p class="detail-table fn-left"><span>创建时间：</span>{{orderPickGoodsInfo.orderDt}}</p>
					<p class="detail-table fn-left"><span>付款时间：</span>--</p>
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
									<DeviceInfo :data="orderPickGoodsInfo" />
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

	</div>

</template>

<script>

	import Breadcrumb from '@/components/Breadcrumb';
	import DeviceInfo from '@/components/DeviceInfo';

	export default {
		name: 'Orderdetail',
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
				supplierInfo: {}, //查询供应商信息
				retailerInfo: {}, //查询零售商信息
				pickupGoodsAmount: null //提货数量
			}
		},
		methods: {
			confirmDelivery(){
				this.$post('/orderPlacingMeetingController/queryOfferModelList', {
					'opmOrderId': this.orderPickGoodsInfo.opmOrderId,
					'pickupGoodsAmount': this.pickupGoodsAmount
				}).then((rsp) => {
					this.$message.success('确认提货成功！');
					this.$router.push({
						path: `/order/OrderPickupData`
					});
				});
			},
			countermandDelivery(){
				this.$message.warning('取消提货成功！');
				this.$router.push({
					path: `/order/OrderPickupData`
				});
			}
		},
		components: {
			Breadcrumb,
			DeviceInfo
		}
	}
</script>

<style lang="less">
	.order_pickup-goods-confirm{
		/*中间背景图片*/
		.img-bg{
			width: 100%;
			height: 200px;
			background: #e4273f;
		}
		.img-bg .info{
			width: 1036px;
			height: 200px;
			margin: 0 auto;
			background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat right bottom;	
			overflow: hidden;
		}
		.img-bg .info .p-titl{
			margin: 62px 0 0 0;
			font-size: 22px;
			color: #fcfdff;
		}
		.img-bg .info .activity{
			width: 306px;
			margin: 10px 0 0 0;
			line-height: 18px;
			font-size: 12px;
			color: #fcfdff;
			text-align: center;
		}
		/*中间背景图片*/

		.my-location{
			height: 30px;
			line-height: 30px;
			background-color: #f6f6f6;
		}
		.my-location label{
			color: #aaa;
		}
		.orderInfo{
			padding: 0 0 20px;
			margin: 16px auto 20px;
			border: 1px solid #cecece;	
		}
		.tel-model{
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
		.info-list{
			padding: 15px 0 0;
			margin: 0 15px;
			border-bottom: 1px solid #d6d6d6;
		}
		.info-list:last-child{
			border-bottom: 0;
		}
		.info-list-li{
			width: calc(50% - 1px);
			margin-bottom: 15px;
			padding: 8px 0;
			border-right: 1px solid #d6d6d6;
			color: #2b2020;
			font-size: 12px;
		}
		.info-list-li:last-child{
			border-right: 0;
		}
		.info-detail{
			width: 230px;
		    margin: 0 20px;
		}
		.detail-p{
			height: 24px;
			line-height: 24px;
		}
		.info-table{
			margin: 0 20px;
			line-height: 18px;
		}
		.detail-table{
			width: 25%;
		}
		.table{
			margin-top: 10px;
			border: 1px solid #e0e0e0;
		}
		.table thead tr{
			height: 36px;
			background-color: #f8f8f8;
			border-bottom: 1px solid #e0e0e0;
			color: #131212;
		}
		.table tbody tr{
			height: 90px;
			border-bottom: 1px solid #dcdcdc;
		}
		.table thead tr th{
			text-align: center;
		}
		.table tbody tr td{
			text-align: center;
		}
		.td-device-info{
			margin: 10px;
		}
		.order-pay-info{
			height: 76px;
			margin: 25px auto 20px;
			border: 1px solid #fadaaf;
			background-color: #fff4e6
		}
		.order-pay-info .p1{
			font-size: 16px;
			font-weight: 800;
			margin: 15px 0 12px;
		    line-height: 20px;
		    .payment-status{
		    	color: #e62840;
		    }
		}
		.order-pay-info .p2{
			font-size: 12px;
			color: #5b5b5b;
		}
		.order-pay-info p label{
			display: inline-block;
			width: 145px;
			text-align: right;
		}
		.order-pay-info .p2{
			
		}
	}
</style>