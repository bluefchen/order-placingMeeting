<template>
  <div>
    <!-- 顶部 -->
    <div class="toper">
      <div class="box-1200 top-header fn-clear">
        <img src="@/assets/images/small-logo.png" class="fn-left">
        <ul class="iterms fn-left">
          <li>订货会管理</li>
          <li>基础数据维护</li>
        </ul>
        <div class="user fn-right">
          <div class="select-info"><span class="name">运营商A先生，您好！</span><i class="iconfont">&#xe655;</i></div>
          <a href="javasript:void(0)">退出</a>
        </div>
      </div>
    </div>
    <!-- 顶部 -->
    <!-- 头部切换 -->
    <div class="header fn-clear">
      <img src="@/assets/images/vivo-logo.png" class="fn-left">
      <OrderMenu />
    </div>
    <!-- 头部切换 -->
    <router-view/>
  </div>
</template>

<script>
  import OrderMenu from '@/components/OrderMenu';

  export default {
    name: 'Order',
    created() {
      this.$axios({
        method: 'get',
        url: '/api/data',
      }).then(rsp => {
        console.log('返回数据：', rsp.data);
      })
    },
    data() {
      return {};
    },
    components: {
      OrderMenu
    }
  }
</script>

<style lang="less">
  /*顶部*/
  .toper {
    width: 100%;
    border-bottom: 2px solid #ff0404;
  }

  .top-header {
    height: 36px;
    line-height: 36px;
  }

  .top-header img {
    margin: 5px 130px 0 0;
  }

  .iterms li {
    float: left;
    padding: 0 25px;
    font-size: 14px;
    color: #000;
  }

  .user a {
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

  .select-info {
    float: left;
    padding: 0 10px;
  }

  /*头部切换*/
  .header {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    img {
      margin-top: 10px;
    }
  }
</style>
