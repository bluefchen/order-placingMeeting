<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      【{{role}}】{{name}}<i class="el-icon-arrow-down el-icon--right"></i>
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
      role: {
        type: String
      },
      name: {
        type: String
      }
    },
    created() {
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    data() {
      return {
        user: null
      }
    },
    methods: {
      handleCommand: function (command) {
        if (command === 'logout') {
          this.$post('/systemUserController/loginOut', {
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
