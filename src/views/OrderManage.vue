<template>
  <div>
    <!-- 顶部 -->
    <div class="toper">
      <div class="box-1200 top-header fn-clear">
        <img src="@/assets/images/big-logo.png" class="fn-left">
        <ul class="iterms fn-left">
          <li>订货会管理</li>
          <li>基础数据维护</li>
        </ul>
        <div class="user fn-right">
          <div class="select-info"><span class="iconfont">&#xe671;</span>&nbsp;<span class="name">运营商A先生，您好！</span><i class="iconfont">&#xe655;</i></div>
          <a href="javasript:void(0)">退出</a>
        </div>
      </div>
    </div>
    <!-- 顶部 -->
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'OrderManage',
    created() {
    },
    data() {
      return {};
    },
    components: {
    }
  }
</script>

<style scoped lang="less">
  /*顶部*/
  .toper {
    width: 100%;
    background: #f60e0e;
    border-bottom: 2px solid #ee0404;
  }

  .top-header {
    height: 82px;
    line-height: 82px;
  }

  .top-header img {
    margin: 17px 120px 0 3px;
  }

  .iterms li {
    float: left;
    padding: 0 60px;
    font-size: 14px;
    color: #fff;
  }

  .user a {
    float: right;
    width: 38px;
    height: 20px;
    line-height: 20px;
    padding-left: 12px;
    margin-top: 32px;
    color: #ffd4d4;
    border-left: 1px solid #dadada;
    text-decoration: none;
  }

  .select-info {
    float: left;
    padding: 0 10px;
    color: #ffd4d4;
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
