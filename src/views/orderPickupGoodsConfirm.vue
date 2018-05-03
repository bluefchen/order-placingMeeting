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
				<Breadcrumb :list="['订单管理', '订单提货数据维护', '订单提货确认']"/>
			</div>
	    </div>

		<div class="orderInfo">
			<div class="tel-model">订单信息</div>
			<ul class="info-list fn-clear">
				<li class="info-list-li fn-left fn-clear">
					<div class="info-detail fn-left">  
						<p class="detail-p"><span>零售商名称：</span>零售商AAAAAAAAA</p>
						<p class="detail-p"><span>零售商类型：</span>散户</p>       				
						<p class="detail-p"><span>联系电话：</span>180123456778</p>				
					</div>
					<div class="info-detail fn-left">
						<p class="detail-p"></p>
						<p class="detail-p"><span>所属省分：</span>江苏</p>
						<p class="detail-p"><span>联系人：</span>XXXX</p>
					</div>
				</li>
				<li class="info-list-li fn-right fn-clear">                                               
					<div class="info-detail fn-left">                                                     
        				<p class="detail-p"><span>供货商名称：</span>零售商CCCCCCC</p>
        				<p class="detail-p"><span>供货商类型：</span>散户</p>
						<p class="detail-p"><span>联系电话：</span>180123411111</p>
								
					</div>
					<div class="info-detail fn-left">
						<p class="detail-p"></p>
						<p class="detail-p"><span>所属省分：</span>江苏</p>
						<p class="detail-p"><span>联系人：</span>XXXX</p>		
					</div>
				</li>				
			</ul>
			<div class="info-list">       
				<div class="info-table fn-clear">                                                     
    				<p class="detail-table fn-left"><span>订单编号：</span>1000000010</p>
					<p class="detail-table fn-left"><span>创建时间：</span>2018-04-06 15:02:46</p>
					<p class="detail-table fn-left"><span>付款时间：</span></p>
					<p class="detail-table fn-left"><span>提货时间：</span></p>				
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
							<td class="td-first">							
								<p class="p-img"><img src="@/assets/images/telephone1.jpg"></p>
								<p class="tel-info">
									<a href="" class="tel-href">VIVO-X20全面屏 美颜拍照手机美颜拍照手机</a>
									<label class="tags">
										<!-- 社采或者集采 -->
										<span class="sc">社采</span>
										<!-- <span class="jc">集采</span> -->
										<span class="mj">满减
											<label class="small-pop">
												<label>满<b class="red">10000</b>减<b class="red">200</b></label>
												<label>满<b class="red">20000</b>减<b class="red">400</b></label>
											</label>
										</span>
										<span class="spec">特</span>									
									</label>		
								</p>						
							</td>
							<td>VIVO</td>
							<td>VIVO-X20</td>
							<td>集采</td>
							<td>￥1890</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="order-num">
			<span class="wrds fn-left">提货数量：</span><input type="text" name="" class="fn-left">
			<button class="button fn-left">确认提货</button>
			<button class="button cancel-btn fn-left">取消提货</button>
		</div>
	</div>

</template>

<script>

	import Breadcrumb from '@/components/Breadcrumb';

	export default {
		name: 'OrderPickupGoodsConfirm',
		created() {
			this.getRouterData()
		},
		data() {
			return {
				getRouterData() {
			     	console.log(this.$route.query)
			    }
			}
		},
		methods: {
		},
		components: {
			Breadcrumb
		}
	}
</script>

<style lang="less">
.red{
	color: #f82134;
}
.green{
	color: #46b02e;
}
.text-center{
	text-align: center;
}
.text-right{
	text-align: right;
}
/*顶部*/
.toper{
	width: 100%;
	border-bottom: 2px solid #ff0404;
}
.top-header{
	width: 1180px;
	height: 36px;
	margin: 0 auto;
	line-height: 36px;
}
.top-header img{
	margin: 5px 130px 0 0;
}
.iterms li{
	float: left;
	padding: 0 25px;
	font-size: 14px;
	color: #000;
}
.user a{
	float: right;
	width: 38px;
	height: 20px;
	line-height: 20px;
	padding-left: 12px;
	margin-top: 9px;
	color: #000;
	border-left: 1px solid #dadada;
	text-decoration: none;
}
.select-info{
	float: left;
	padding: 0 10px;
}
/*顶部*/

/*头部切换*/
	.header{
		width: 1200px;
		height: 80px;
		margin: 0 auto;
	}
	.header img{
		margin-top: 10px;
	}
	.tab-change{
		margin-top: 26px;
	}
	.tab-change .lifor{
		position: relative;
		float: left;
		height: 45px;
		padding: 0 23px;
		line-height: 45px;
		font-size: 14px;
		color: #000;
	}
	.tab-change .lifor.on{
		color: #ff0404;
	}
	.tab-change .lifor.on:after{
		position: absolute;
		content: '';
		left: 0;
		bottom: 0;
		width: 100%;
		height: 3px;
		background: #ff0404;
	}
	.tab-change .lifor:hover .li-list{
		display: block;
	}
	.tab-change .lifor .li-list{
		position: absolute;
		display: none;
		left: -20%;
		top: 46px;
		width: 140%;
		background: #f8f8f8;
		color: #000;
		box-shadow: 0px 0px 10px #bcbcbc;
	}
	.tab-change .lifor .li-list li{
		height: 45px;
		line-height: 45px;
		text-align: center;
		cursor: pointer;
	}
	.tab-change .lifor .li-list li:hover{
		color: #fff;
		background-color: #f13939;
	}
	/*头部切换*/

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
	.location{
		width: 1160px;
		margin: 0 auto;
	}
	.my-location label{
		color: #aaa;
	}
	.location-p{
		display: inline-block;
	}
	.order-titl{
		height: 28px;
		margin: 15px 0;
		line-height: 28px;
	}
	.order-pay-info{
		width: 1200px;
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
	.orderInfo{
		width: 1154px;
		padding: 0 0 20px;
		margin: 16px auto 0;
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
	.table tbody .td-first{
		display: flex;
	}
	.table tbody .td-first .p-img{
		width: 79px;
		height: 67px;
		margin: 10px 15px 0 10px;
		border: 1px solid #e7e7e7;
		text-align: center;
		overflow: hidden;
	}
	.table tbody .td-first .tel-info{
		flex: 1;
		text-align: left;
	}
	.table tbody .td-first .tags{
		position: relative;
		display: flex;
		margin-top: 10px;
	}
	.table tbody .td-first .tags span{
		display: inline-block;
		height: 18px;
		padding: 0 4px;
		line-height: 18px;
		font-size: 12px;
		border-radius: 3px;
	}
	.table tbody .td-first .tags .sc{
		background-color: #00b5b8;
		border: 1px solid #00b5b8;
		color: #fff;
		margin-right: 3px;
	}
	.table tbody .td-first .tags .jc{
		background-color: #e23a3a;
		border: 1px solid #e23a3a;
		color: #fff;
		margin-right: 3px;
	}
	.table tbody .td-first .tags .mj{
		position: relative;
		border: 1px solid #e23a3a;
		color:#e23a3a;
		margin-right: 6px;
	}
	.table tbody .td-first .tags .spec{
		padding: 0 2px;
		border: 1px solid #ff982d;
		background-color: #ff982d;
		color: #fff;
		font-size: 14px;
		border-radius: 2px;
	}
	.table tbody .td-first .small-pop{
		display: none;
		position: absolute;
		top: 14px;
	    left: -158px;
		width: 218px;
		height: 52px;
		padding-top: 26px;
		background: url('../assets/images/smremind-pop.png') no-repeat;
	}
	.table tbody .td-first .mj:hover .small-pop{
		display: block;
	}
	.table tbody .td-first .small-pop label{
		display: block;
		padding: 0 22px;
		margin-bottom: 2px;
		text-align: left;
	}
	.table .tel-href{
		display: block;
	    margin: 16px 0 10px;
	    font-size: 14px;
	    color: #050505;
	    text-decoration: none;
	    line-height: 16px;
	    font-weight: 700;
	}
	.table .tel-href:hover{
		color: #ed0000;
		text-decoration: underline;
	}
	.table .tel-href.overflow-handle{
		width: 96%;
	}
	.table .tel-info label{
		color: #7d7d7d;
	}
	.order-num{
		width: 1160px;
		height: 75px;
		border: 1px solid #ff223d;
		background-color: #fff8ef;
		margin: 23px auto;
	}
	.order-num input[type="text"]{
		width: 153px;
		height: 32px;
		padding: 0 10px;
		margin-top: 22px;
		border: 1px solid #d5d5d5;
	}
	.order-num .wrds{
		width: 102px;
		line-height: 34px;
		margin-top: 22px;
		text-align: right;
	}
	.button{
		height: 34px;
		padding: 0 24px;
		margin: 22px 0 0 22px;
		border: 0;
		font-size: 14px;
		background-color: #f01919;
		border-radius: 3px;
		color: #fff;
	}
	.cancel-btn{
		background-color: #ffd6d6;
		color: #f01919;
		border: 1px solid #f01919;
	}
</style>