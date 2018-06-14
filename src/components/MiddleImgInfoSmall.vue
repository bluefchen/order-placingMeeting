<template>
	<div class="middle-imginfo-small">
	  <div class="info">
	    <p class="p-titl">2018夏季VIVO品牌新品订货会即将开启</p>
	    <div class="activity">
	      <p>活动日期：2018/04/10-2018/04/11</p>
	      <p>活动地址：江苏省南京市玄武区龙蟠路88号-南京国展中心</p>
	    </div>
	  </div>
	</div>
</template>
<script>
  export default {
    name: 'MiddleImgInfoSmall',
    props: {
      
    },
    data() {
      return {}
    },
    methods: {},
  }
</script>
<style lang="less">
.middle-imginfo-small {
    width: 100%;
    height: 170px;
    background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat center center;
    .info {
      width: 1036px;
      height: 170px;
      margin: 0 auto;
      overflow: hidden;
      .p-titl {
        margin: 62px 0 0 0;
        font-size: 22px;
        color: #fcfdff;
      }
      .activity {
        width: 306px;
        margin: 10px 0 0 0;
        line-height: 18px;
        font-size: 12px;
        color: #fcfdff;
        text-align: center;
      }
    }
  }
</style>
