<template>
  <div class="v_order-menu">
    <el-menu :default-active="$route.path" class="fn-right" mode="horizontal" router>
      <el-menu-item index="/order/orderIndex">首页</el-menu-item>
      <el-submenu index="2" :disabled="this.opMeetingInfo.statusCd === '1002'">
        <template slot="title">机型管理</template>
        <el-menu-item index="/order/orderModel">机型维护</el-menu-item>
        <el-menu-item index="/order/importModelAdd" style="display: none;">机型导入新增</el-menu-item>
        <el-menu-item index="/order/importModelDel" style="display: none;">机型导入删除</el-menu-item>
        <el-menu-item index="/order/specialModel">特种机型分配量维护</el-menu-item>
        <el-menu-item index="/order/importSpecialModel" style="display: none;">特种机型导入新增</el-menu-item>
      </el-submenu>
      <el-submenu index="3" :disabled="this.opMeetingInfo.statusCd === '1002'">
        <template slot="title">订单管理</template>
        <el-menu-item index="/order/importPickupAdd">订单批量导入</el-menu-item>
        <el-menu-item index="/order/orderPickupData">订单提货数据维护</el-menu-item>
        <el-menu-item index="/order/importPickupData" style="display: none;">订单提货数据导入</el-menu-item>
        <el-menu-item index="/order/orderPickupGoodsConfirm" style="display: none;">订单提货确认</el-menu-item>
      </el-submenu>
      <el-submenu index="4" :disabled="this.opMeetingInfo.statusCd === '1002'">
        <template slot="title">定金管理</template>
        <el-menu-item index="/order/depositConfigure">定金配置</el-menu-item>
        <el-menu-item index="/order/depositAddRecord">定金补录</el-menu-item>
      </el-submenu>
      <el-submenu index="5" :disabled="this.opMeetingInfo.statusCd === '1002'">
        <template slot="title">政策管理</template>
        <el-menu-item index="/order/policyManage">政策投入</el-menu-item>
        <el-menu-item index="/order/importPolicyAdd" style="display: none;">上传政策</el-menu-item>
        <el-menu-item index="/order/policyList">政策列表</el-menu-item>
        <el-menu-item index="/order/policyExamine">政策审核</el-menu-item>
      </el-submenu>
      <el-submenu index="/order/orderCompositeQuery">
        <template slot="title">统计查询</template>
        <el-menu-item index="/order/orderCompositeQuery">订单综合查询</el-menu-item>
        <el-menu-item index="/order/orderdetail" style="display: none;">订单详情</el-menu-item>
        <el-menu-item index="/order/preferentialPolicySettlement">优惠政策结算</el-menu-item>
        <el-menu-item index="/order/terminalQuery">终端查询</el-menu-item>
        <el-menu-item index="/order/summaryStatisticalAnalysis">全国汇总统计分析</el-menu-item>
        <el-menu-item index="/order/summaryAnalysis">汇总统计</el-menu-item>
        <el-menu-item index="/order/metaAnalysis">全国汇总分析</el-menu-item>
        <el-menu-item index="/order/orderPickingReport">订单提货上报</el-menu-item>
        <el-menu-item index="/order/orderPickingDetail" style="display: none;">提货清单明细</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'OrderMenu',
    props: {},
    created() {
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
      this.handleSelect();
    },
    data() {
      return {
        opmDepositInfo: {},
      }
    },
    methods: {
      handleSelect(){
        this.$post('/opmDepositController/queryOpmDepositInfo', {
          opMeetingId: this.opMeetingInfo.opMeetingId
        }).then((rsp) => {
          localStorage.setItem('opmDeposit', JSON.stringify(rsp));
        });
      }
    },
    computed: {
      statusCd() {
        return this.opMeetingInfo.statusCd
      }
    }
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
