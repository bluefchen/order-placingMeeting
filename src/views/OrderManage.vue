<template>
  <div>
    <!-- 顶部 -->
    <div class="toper">
      <div class="box-1200 top-header fn-clear">
        <img class="fn-left" src="@/assets/images/big-logo.png">
        <OrderManageMenu class="fn-left mange-menu"/>
        <div class="user fn-right">
          <span class="area">{{commonReginName}}</span>
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
      this.user = JSON.parse(sessionStorage.getItem('user'));
      if (!this.user) {
        //默认只有当第一次用户登录跳转才会执行
        this.$post(this.$global.fileUrl + '/orderPlacingMeeting/auth/loginInitialize', {
          userId: this.$route.query.userId,
          token: this.$route.query.token
        }).then((rsp) => {
          this.user = rsp;
          sessionStorage.setItem('user', JSON.stringify(rsp));
          if (!_.get(this.user, 'postRoleId')) {
            this.$msgBox({
              type: 'info',
              title: '操作提示',
              content: '该用户还没有分配权限角色，请联系管理员'
            }).catch(() => {
              sessionStorage.removeItem('user');
              location.href = this.$global.jumpOut;
            });
          }
        });
      } else {
        if (!_.get(this.user, 'postRoleId')) {
          this.$msgBox({
            type: 'info',
            title: '操作提示',
            content: '该用户还没有分配权限角色，请联系管理员'
          }).catch(() => {
            sessionStorage.removeItem('user');
            location.href = this.$global.jumpOut;
          });
        }
      }
    },
    data() {
      return {
        user: null,
        systemMenuAllList: null
      };
    },
    watch: {
      'user.postRoleId': function (newValue) {
        if (newValue) {
          //获取用户菜单权限，保存本地
          this.$post('/systemUserController/querySystemMenuList', {
            postRoleId: newValue,
            roleTypeCd: '3'//固定的运营商roleTypeCd
          }).then((rsp) => {
            sessionStorage.setItem('systemMenuAllList', JSON.stringify(rsp));
          });
        }
      }
    },
    computed: {
      commonReginName() {
        return _.get(this.user, 'commonReginName');
      }
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
      img {
        display: block;
        width: 102px;
        height: 53px;
        margin-top: 18px;
      }
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
