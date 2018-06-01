<template>
  <div class="v_order-manage-menu">
    <el-menu :default-active="$route.path" mode="horizontal" router>
      <el-menu-item index="/orderManage/orderManageIndex">订购会管理</el-menu-item>
      <el-submenu index="/orderManage/terminalMaintain">
        <template slot="title">基础数据维护</template>
        <el-menu-item index="/orderManage/terminalMaintain">终端维护</el-menu-item>
        <el-menu-item index="/orderManage/supplierDataMaintain">供货商资料维护</el-menu-item>
        <el-menu-item index="/orderManage/setailerDataMaintain">零售商资料维护</el-menu-item>
      </el-submenu>
      <el-submenu index="/orderManage/usermanManage">
        <template slot="title">系统维护</template>
        <el-menu-item index="/orderManage/usermanManage">用户管理</el-menu-item>
        <el-menu-item index="/orderManage/roleManage">角色管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'OrderManageMenu',
    props: {},
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style lang="less">
  .v_order-manage-menu {

    .el-menu{
      background: none;
      li{
        margin-right: 30px;
      }
    }
    .el-menu--horizontal{
      .el-menu-item{
        height: 28px;
        border: none;
        line-height: 28px;
        border-radius: 50px;
        &:hover, &.is-active{
          background: #fff;
          color: #000;
          border-radius: 50px;
        }
      }
      .el-submenu{
        .el-submenu__title{
          height: 28px;
          line-height: 28px;
          border: none;
          border-radius: 50px;
        }
        &.is-opened, &:hover, &.is-active{
          background: #fff;
          border-radius: 50px;
          color: #000;
          border: none;
          .el-submenu__title{
            color: #000;
            border: none;
            border-radius: 50px;
          }
        }
      }
    }

    .el-menu--horizontal {
      margin-top: 10px;
      border-bottom: none;
    }

    .el-menu--horizontal > .el-menu-item {
      color: #fff;
    }

    .el-menu--horizontal > .el-submenu .el-submenu__title {
      color: #fff;
      .el-icon-arrow-down{
        display: none;
      }
    }

    .el-menu--horizontal > .el-menu-item.is-active {
      border-bottom: none;
    }

    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      color: #000;
    }

    .el-menu--horizontal > .el-submenu:focus .el-submenu__title, .el-menu--horizontal > .el-submenu:hover .el-submenu__title {
      color: #000;
    }

    .el-menu--horizontal>.el-submenu .el-submenu__title:hover, .el-submenu__title:focus, .el-submenu__title:hover{
      border-radius: 50px;
    }

  }
</style>
