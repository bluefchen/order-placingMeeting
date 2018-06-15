<template>
  <div class="v_order-menu">
    <el-menu :default-active="$route.path" class="fn-right" mode="horizontal" router>
      <el-menu-item index="/order/orderIndex">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">机型管理</template>
        <el-menu-item index="/order/orderModel"
                      :disabled="this.opMeetingInfo.statusCd === '1001' || this.opMeetingInfo.statusCd === '1002'">机型维护
        </el-menu-item>
        <el-menu-item index="/order/importModelAdd" style="display: none;">机型导入新增</el-menu-item>
        <el-menu-item index="/order/importModelDel" style="display: none;">机型导入删除</el-menu-item>
        <el-menu-item index="/order/specialModel"
                      :disabled="this.opMeetingInfo.statusCd === '1001' || this.opMeetingInfo.statusCd === '1002'">
          特种机型分配量维护
        </el-menu-item>
        <el-menu-item index="/order/importSpecialModel" style="display: none;">特种机型导入新增</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">订单管理</template>
        <el-menu-item index="/order/importPickupAdd"
                      :disabled="this.opMeetingInfo.statusCd === '1001' || this.opMeetingInfo.statusCd === '1002'">
          订单批量导入
        </el-menu-item>
        <el-menu-item index="/order/orderPickupData" :disabled="this.opMeetingInfo.statusCd === '1000'">订单提货数据维护
        </el-menu-item>
        <el-menu-item index="/order/importPickupData" style="display: none;">订单提货数据导入</el-menu-item>
        <el-menu-item index="/order/orderPickupGoodsConfirm" style="display: none;">订单提货确认</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">定金管理</template>
        <el-menu-item index="/order/depositConfigure"
                      :disabled="this.opMeetingInfo.statusCd === '1001' || this.opMeetingInfo.statusCd === '1002'">定金配置
        </el-menu-item>
        <div v-show="this.opMeetingInfo.statusCd != '1000'">
          <el-menu-item index="/order/depositAddRecord" v-show="this.opmDepositInfo.depositType == '2'">定金补录
          </el-menu-item>
          <el-menu-item index="/order/CyjDepositAddRecord" v-show="this.opmDepositInfo.depositType == '3'">诚意金补录
          </el-menu-item>
        </div>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">政策管理</template>
        <el-menu-item index="/order/policyManage"
                      :disabled="this.opMeetingInfo.statusCd === '1001' || this.opMeetingInfo.statusCd === '1002'">政策投入
        </el-menu-item>
        <el-menu-item index="/order/importPolicyAdd" style="display: none;">上传政策</el-menu-item>
        <el-menu-item index="/order/policyList"
                      :disabled="this.opMeetingInfo.statusCd === '1001' || this.opMeetingInfo.statusCd === '1002'">政策列表
        </el-menu-item>
        <el-menu-item index="/order/policyExamine"
                      :disabled="this.opMeetingInfo.statusCd === '1001' || this.opMeetingInfo.statusCd === '1002'">政策审核
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/order/orderCompositeQuery">
        <template slot="title">统计查询</template>
        <el-menu-item index="/order/orderCompositeQuery">订单综合查询</el-menu-item>
        <el-menu-item index="/order/orderdetail" style="display: none;">订单详情</el-menu-item>
        <el-menu-item index="/order/preferentialPolicySettlement" :disabled="this.opMeetingInfo.statusCd === '1000'">
          优惠政策结算
        </el-menu-item>
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
    created() {
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
      this.systemMenuAllList = JSON.parse(localStorage.getItem('systemMenuAllList'));
      let systemMenu = _.find(this.systemMenuAllList, (item) => {
        return item.operationSpecDisptypeCd === 1;
      });
      this.menus = _.filter(systemMenu.menus, (item) => {
        return item.isHold === 'Y';
      });
      console.log(this.menus, '已有权限的菜单');
      this.handleSelect();
    },
    data() {
      return {
        opmDepositInfo: {
          depositType: ''
        },
        systemMenuAllList: null,
        menus: []
      }
    },
    methods: {
      handleSelect() {
        this.$post('/opmDepositController/queryOpmDepositInfo', {
          opMeetingId: this.opMeetingInfo.opMeetingId
        }).then((rsp) => {
          this.opmDepositInfo = rsp;
          if (!this.opmDepositInfo) {
            this.opmDepositInfo = {
              depositType: ''
            }
          }
        });
      },
      isHold(val) {
        _.some(this.menus, (item) => {
          return item === val;
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

  .el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title {
    color: #000;
  }

  .el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu__title.is-active {
    color: #fff;
    background-color: #f13939;
  }

  .el-menu--horizontal .el-menu .el-menu-item.is-disabled:hover {
    color: #000;
    background-color: #f13939;
  }
</style>
