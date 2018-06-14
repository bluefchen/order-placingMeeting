<template>
  <div>
    <!-- 顶部 -->
    <div class="toper">
      <div class="box-1200 top-header fn-clear">
        <img class="fn-left" src="@/assets/images/big-logo.png">
        <OrderManageMenu class="fn-left mange-menu"/>
        <div class="user fn-right">
          <span class="area">{{user.commonReginName}}</span>
          <Dropdown :user="user"/>
        </div>
      </div>
    </div>
    <!-- 顶部 -->
    <router-view/>
  </div>
</template>

<script>
  import OrderManageMenu from '@/components/OrderManageMenu';
  import Dropdown from '@/components/Dropdown';

  export default {
    name: 'OrderManage',
    created() {
      this.user = JSON.parse(localStorage.getItem('user')) || {
        commonReginId: '', //当前登录人员的地区ID
        commonReginName: '', //当前登录人员的地区名
        postRoleId: '', //当前登录人员的角色ID
        postRoleName: '', //当前登录人员的角色名称
        partyId: '', //当前登录人员的ID
        partyName: '', //当前登录人员的名称
        token: '' //新的会话令牌
      };
      if (!this.user.token) {
        this.$post('http://192.168.74.17:9086/psm/systemUserController/loginInitialize', {
          userId: this.$route.query.userId,
          token: this.$route.query.token
        }).then((rsp) => {
          this.user = rsp;
          localStorage.setItem('user', JSON.stringify(rsp));
        });
      }
    },
    data() {
      return {
        user: null
      };
    },
    components: {
      OrderManageMenu,
      Dropdown
    }
  }
</script>

<style scoped lang="less">
  .toper {
    width: 100%;
    background: #f60e0e;
    border-bottom: 2px solid #ee0404;

    .top-header {
      height: 82px;
    }

    .top-header img {
      display: block;
      width: 102px;
      height: 53px;
      margin-top: 18px;
    }

    .mange-menu {
      margin-top: 18px;
      margin-left: 120px;
    }

    .user {
      height: 22px;
      margin-top: 30px;
      line-height: 22px;
      .area {
        display: inline-block;
        height: 22px;
        padding: 0 10px;
        background-color: #fff;
        border-radius: 12px;
      }
    }
  }
</style>
