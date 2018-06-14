<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      【{{postRoleName}}】{{partyName}}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="">个人信息维护</el-dropdown-item>
      <el-dropdown-item command="logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    name: 'Dropdown',
    props: {
      user: {
        type: Object,
        default: function () {
          return {
            commonReginId: '', //当前登录人员的地区ID
            commonReginName: '', //当前登录人员的地区名
            postRoleId: '', //当前登录人员的角色ID
            postRoleName: '', //当前登录人员的角色名称
            partyId: '', //当前登录人员的ID
            partyName: '', //当前登录人员的名称
            token: '' //新的会话令牌
          };
        }
      }
    },
    computed: {
      postRoleName() {
        return _.get(this.user, 'postRoleName') || '角色';
      },
      partyName() {
        return _.get(this.user, 'partyName') || '用户名';
      }
    },
    methods: {
      handleCommand: function (command) {
        if (command === 'logout') {
          this.$post('http://192.168.74.17:9086/psm/systemUserController/loginOut4Http', {
            userId: _.get(this.user, 'partyId'),
            token: _.get(this.user, 'token')
          }).then(() => {
            localStorage.removeItem('user');
            this.$message.success('退出成功，TODO跳转回登录页面');
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .el-dropdown {
    color: #fff;
    font-size: 12px;
  }

  .el-dropdown-menu__item {
    font-size: 12px;
  }

  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
    color: #303133;
  }
</style>
