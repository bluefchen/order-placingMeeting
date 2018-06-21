<template>
  <div>
    <!-- 顶部 -->
    <div class="toper">
      <div class="box-1200 top-header fn-clear">
        <!-- <img src="@/assets/images/small-logo.png" class="fn-left"> -->
        <el-menu class="iterms fn-left" :default-active="$route.path" mode="horizontal" router>
          <el-menu-item index="/orderManage/orderManageIndex">订购会管理</el-menu-item>
          <el-menu-item index="/orderManage/terminalMaintain">基础数据维护</el-menu-item>
          <el-menu-item index="/orderManage/usermanManage">系统维护</el-menu-item>
        </el-menu>
        <div class="user fn-right">
          <span class="area">{{commonReginName}}</span>
          <Dropdown :user="user"/>
        </div>
      </div>
    </div>
    <!-- 顶部 -->
    <!-- 头部切换 -->
    <div class="header fn-clear">
      <img src="@/assets/images/some-logo.png" class="fn-left">
      <p class="dot fn-left"></p>
      <p class="name fn-left">{{opMeeting.opmName}}</p>
      <OrderMenu/>
    </div>
    <!-- 头部切换 -->
    <router-view/>
  </div>
</template>

<script>
  import OrderMenu from '@/components/OrderMenu';
  import Dropdown from '@/components/Dropdown';

  export default {
    name: 'Order',
    created() {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.opMeeting = JSON.parse(sessionStorage.getItem('opMeeting'));
    },
    data() {
      return {
        user: null,
        opMeeting: null
      };
    },
    computed: {
      commonReginName() {
        return _.get(this.user, 'commonReginName');
      }
    },
    components: {
      OrderMenu,
      Dropdown
    }
  }
</script>

<style scoped lang="less">
  .toper {
    width: 100%;
    border-bottom: 2px solid #ff0404;
    .top-header {
      height: 36px;
      line-height: 36px;
      img {
        margin: 5px 130px 0 0;
      }
      .user {
        height: 22px;
        margin-top: 6px;
        line-height: 22px;
        .area {
          display: inline-block;
          height: 22px;
          padding: 0 10px;
          background-color: #f60e0e;
          border-radius: 12px;
          color: #fff;
        }
        .el-dropdown {
          color: #000;
        }
      }
    }
  }

  .iterms li {
    float: left;
    height: 35px;
    line-height: 35px;
    padding: 0 40px 0 10px;
    font-size: 14px;
    color: #000;
    text-align: left;
    font-weight: bold;
  }

  .header {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    img {
      margin-top: 18px;
    }
    .dot {
      width: 5px;
      height: 5px;
      margin: 34px 8px 0;
      background: rgb(51, 51, 51);
      border-radius: 100%;
    }
    .name {
      height: 48px;
      margin-top: 12px;
      line-height: 48px;
      color: rgb(0, 0, 0);
      font-size: 24px;
      font-weight: bold;
    }
  }
</style>
