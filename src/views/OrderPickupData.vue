<template>
	<div>
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
			<InputWithSelect class="fn-left" :search="search"/>
			<div class="fn-left category-more">更多条件 <i class="iconfont">&#xe607;</i></div>
	    </div>

		<!-- 条件搜索 -->
		<div class="box-1200 condition-search">
			<div class="condition-iterm wid30">
				<label class="label-wrds">机型编码：</label>
				<input type="text" class="condition-input">
			</div>
			<div class="condition-iterm wid30">
				<label class="label-wrds">零售商名称：</label>
				<input type="text" class="condition-input">
			</div>
			<div class="condition-iterm wid40">
				<label class="label-wrds">订购起止日期：</label>
				<el-date-picker class="condition-input" v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
			</div>
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
				<li class="li-list">
					<p class="p-line fn-clear">
						<span class="fn-left"><b>订单号：1000000010</b>【2018-04-06】</span>
						<span class="fn-left text-center">零售商：零售商AAAAAA</span>
						<span class="fn-left text-right">供货商：供货商VCCCCC</span>
					</p>
					<div class="tabs fn-clear">
						<dl class="td-first fn-left wid32">
							<!-- <DeviceInfo /> -->
							<p class="p-img"><img src="@/assets/images/telephone1.jpg"></p>
							<p class="tel-info">
								<a href="" class="tel-href overflow-handle">VIVO-X20全面屏 美颜拍照手机</a>
								<label>编码：11020300001</label>
								<label class="tags">
									<!-- 社采或者集采 -->
									<span class="sc">社采</span>
									<span class="jc">集采</span>
									<span class="mj">满减
										<label class="small-pop">
											<label>满<b class="red">10000</b>减<b class="red">200</b></label>
											<label>满<b class="red">20000</b>减<b class="red">400</b></label>
										</label>
									</span>
									<span class="spec">特</span>									
								</label>		
							</p>
						</dl>
						<dl class="dll wid17 fn-left"><p>VIVO</p></dl>
						<dl class="dll wid17 fn-left"><p>VIVO-X20</p></dl>
						<dl class="dll wid11 fn-left"><b>100</b></dl>
						<dl class="dll wid10 fn-left"><p>--</p></dl>
						<dl class="dll wid13 fn-left"><button class="updown-btn red">编辑</button></dl>
					</div>
				</li>
			</ul>
		</div>
	</div>

</template>

<script>
	import Breadcrumb from '@/components/Breadcrumb';
	import InputWithSelect from '@/components/InputWithSelect';
	import TitlePlate from '@/components/TitlePlate';
	import Table from '@/components/Table';
	import DeviceInfo from '@/components/DeviceInfo';

	export default {
		name: 'OrderPickupData',
		created() {
		},
		data() {
			return {
				value6: ''
			}
		},
		methods: {
			search(obj) {
				console.log(obj)
			}
		},
		components: {
			Breadcrumb,
			InputWithSelect,
			TitlePlate,
			Table
		}
	}
</script>

<style lang="less">

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

	/* 条件搜索 */
	.search {
      margin: 10px auto;
    }
	.condition-search{
		display: flex;
		height: 72px;
		margin: 18px auto 22px;
		border: 1px solid #dfdfdf;
	}
	.condition-iterm{
		position: relative;
		margin: 20px 30px 0 0;
	}
	.condition-iterm .label-wrds{
		position: absolute;
		top: 0;
		left: 0;
		width: 110px;
		line-height: 32px;
		font-size: 14px;
		text-align: right;
	}
	.condition-input{
		width: calc(100% - 20px - 110px);
		height: 24px;
		padding: 3px 10px;
		margin-left: 110px; 
		border: 1px solid #e5e5e5;
	}
	.wid30{
		width: 30%;
	}
	.wid40{
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

	.el-range-editor.el-input__inner{
		height: 32px;
	}
	.el-date-editor .el-range__icon, .el-date-editor .el-range-separator, .el-date-editor .el-range__close-icon{
		line-height: 26px;
	}
	.el-input__inner{
		border-radius: 0;
	}

	.my-location{
		height: 30px;
		line-height: 30px;
		background-color: #f6f6f6;
	}

	.tabs-list{
		margin: 0 auto 70px;
	}
	.order-titl{
		height: 28px;
		margin: 15px 0;
		line-height: 28px;
	}

	.buttons .btns{
		padding: 0 12px;
		margin-left:2px;
		border:0;
		background-color: #fa0000;
		color:#fff;
		font-size: 12px;
		border-radius: 3px;
		line-height: 28px;
	}
	.buttons .btns:hover{
		background-color: #e20606;
	}

	.table thead tr{
		height: 40px;
		background-color: #efefef;
		border: 1px solid #dcdcdc;
		color: #131212;
	}
	.table tbody tr{
		height: 90px;
		border-bottom: 1px solid #dcdcdc;
	}
	.table thead tr th{
		text-align: center;
	}

	.li-list{
		margin-top: 16px;
		border: 1px solid #e0e0e0;
	}
	.p-line{
		height: 35px;	
		line-height: 35px;
		background: #f8f8f8;
		border-bottom: 1px solid #e0e0e0;
	}
	.p-line span{
		width: calc(33% - 20px);
		padding: 0 10px;
	}
	.p-line span b{
		margin-right: 15px;
	}
	.tabs dl{
		height: 90px;
		
	}
	.tabs .dll{
		line-height: 90px;
		text-align: center;
	}
	.td-first{
		display: flex;
	}
	.td-first .p-img{
		width: 79px;
		height: 67px;
		margin: 10px 15px 0 20px;
		border: 1px solid #e7e7e7;
		text-align: center;
		overflow: hidden;
	}
	.td-first .tel-info{
		flex: 1;
		text-align: left;
	}
	.td-first .tags{
		position: relative;
		display: flex;
		margin-top: 10px;
	}
	.td-first .tags span{
		display: inline-block;
		height: 18px;
		padding: 0 4px;
		line-height: 18px;
		font-size: 12px;
		border-radius: 3px;
	}
	.td-first .tags .sc{
		background-color: #00b5b8;
		border: 1px solid #00b5b8;
		color: #fff;
		margin-right: 3px;
	}
	.td-first .tags .jc{
		background-color: #e23a3a;
		border: 1px solid #e23a3a;
		color: #fff;
		margin-right: 3px;
	}
	.td-first .tags .mj{
		position: relative;
		border: 1px solid #e23a3a;
		color:#e23a3a;
		margin-right: 6px;
	}
	.td-first .tags .spec{
		padding: 0 2px;
		border: 1px solid #ff982d;
		background-color: #ff982d;
		color: #fff;
		font-size: 14px;
		border-radius: 2px;
	}
	.td-first .small-pop{
		display: none;
		position: absolute;
		top: 14px;
	    left: -158px;
		width: 218px;
		height: 52px;
		padding-top: 26px;
		background: url('../assets/images/smremind-pop.png') no-repeat;
	}
	.td-first .mj:hover .small-pop{
		display: block;
	}
	.td-first .small-pop label{
		display: block;
		padding: 0 22px;
		margin-bottom: 2px;
		text-align: left;
	}
	.tel-href{
		display: block;
		margin: 15px 0 10px;
		font-size: 14px;
		color: #050505;	
		text-decoration: none;
	}
	.tel-href:hover{
		color: #ed0000;
		text-decoration: underline;
	}
	.tel-href.overflow-handle{
		width: 96%;
	}
	.tel-info label{
		color: #7d7d7d;
	}
	.wid32{
		width: 32%;
	}
	.wid17{
		width: 17%;
	}
	.wid11{
		width: 11%;
	}
	.wid10{
		width: 10%;
	}
	.wid13{
		width: 13%;
	}
	.updown-btn{	
		padding:2px 5px;
		border:0;
		text-decoration: underline;
	}
	.updown-btn:hover{
		border: 1px solid #f82134;
		border-radius: 3px;
		text-decoration: none;
	}
	.updown-btn.green:hover{
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

</style>