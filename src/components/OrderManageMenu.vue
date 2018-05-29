<template>
  <div class="v_order-total-menu">

    <el-menu :default-active="$route.path" mode="horizontal" router>
      <el-menu-item index="">订购会管理</el-menu-item>
      <el-submenu index="/OrderManage/orderModel">
        <template slot="title">基础数据维护</template>
        <el-menu-item index="/OrderManage/orderModel">终端维护</el-menu-item>
        <el-menu-item index="/OrderManage/importModelAdd">供货商资料维护</el-menu-item>
        <el-menu-item index="/OrderManage/importModelAdd">零售商资料维护</el-menu-item>
      </el-submenu>
      <el-submenu index="/OrderManage/orderPickupData">
        <template slot="title">系统维护</template>
        <el-menu-item index="/OrderManage/importPickupAdd">用户管理</el-menu-item>
        <el-menu-item index="/OrderManage/importPickupAdd">角色管理</el-menu-item>
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
  .order-total-menu {

    .el-menu--horizontal {
      margin-top: 10px;
      border-bottom: none;
    }

    .el-menu--horizontal > .el-menu-item {
      color: #000;
    }

    .el-menu--horizontal > .el-submenu .el-submenu__title {
      color: #000;
    }

    .el-menu--horizontal > .el-menu-item.is-active {
      border-bottom: 2px solid #ff0404;
      color: #fe0202;
    }

    .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
      border-bottom: 2px solid #ff0404;
      color: #fe0202;
    }

    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      color: #fe0202;
    }

    .el-menu--horizontal > .el-submenu:focus .el-submenu__title, .el-menu--horizontal > .el-submenu:hover .el-submenu__title {
      color: #fe0202;
    }

  }

  .el-menu--horizontal .el-menu .el-menu-item {
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #f13939;
    }
  }

  .el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu__title.is-active {
    color: #fff;
    background-color: #f13939;
  }
</style>
