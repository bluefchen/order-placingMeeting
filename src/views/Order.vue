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
      <el-menu :default-active="$route.path" class="fn-right" mode="horizontal" router>
        <el-menu-item index="/order/orderIndex">首页</el-menu-item>
        <el-submenu index="/order/orderModel">
          <template slot="title">机型管理</template>
          <el-menu-item index="/order/orderModel">机型维护</el-menu-item>
          <el-menu-item index="/order/specialModel">特种机型分配量维护</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">订单管理</template>
          <el-menu-item index="3-1">订单批量导入</el-menu-item>
          <el-menu-item index="3-2">订单提货数据维护</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">定金管理</template>
          <el-menu-item index="4-1">定金配置</el-menu-item>
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
    <!-- 头部切换 -->
    <router-view/>
  </div>
</template>

<script>
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
      border-bottom: 3px solid #ff0404;
      color: #fe0202;
    }

    .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
      border-bottom: 3px solid #ff0404;
      color: #fe0202;
    }

    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      color: #fe0202;
    }

    .el-menu--horizontal > .el-submenu:focus .el-submenu__title, .el-menu--horizontal > .el-submenu:hover .el-submenu__title {
      color: #fe0202;
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
  }
</style>
