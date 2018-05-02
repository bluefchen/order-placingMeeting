<template>
  <div class="v_order-menu">
    <el-menu :default-active="$route.path" class="fn-right" mode="horizontal" router>
      <el-menu-item index="/order/orderIndex">首页</el-menu-item>
      <el-submenu index="/order/orderModel">
        <template slot="title">机型管理</template>
        <el-menu-item index="/order/orderModel">机型维护</el-menu-item>
        <el-menu-item index="/order/importModelAdd" style="display: none;">机型导入新增</el-menu-item>
        <el-menu-item index="/order/importModelDel" style="display: none;">机型导入删除</el-menu-item>
        <el-menu-item index="/order/specialModel">特种机型分配量维护</el-menu-item>
        <el-menu-item index="/order/importSpecialModel" style="display: none;">特种机型导入新增</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">订单管理</template>
        <el-menu-item index="3-1">订单批量导入</el-menu-item>
        <el-menu-item index="3-2">订单提货数据维护</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">定金管理</template>
        <el-menu-item index="/order/DepositConfigure">定金配置</el-menu-item>
        <el-menu-item index="4-2">定金补录</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">政策管理</template>
        <el-menu-item index="5-1">政策投入</el-menu-item>
        <el-menu-item index="5-2">政策列表</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">统计查询</template>
        <el-menu-item index="6-1">订单综合查询</el-menu-item>
        <el-menu-item index="6-2">优惠政策结算</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'OrderMenu',
    props: {},
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style lang="less">
  .v_order-menu {
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
