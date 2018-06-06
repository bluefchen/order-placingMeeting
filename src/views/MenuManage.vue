<template>
  <div class="menu-manage">
    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['系统维护', '角色管理', '管理菜单']"/>
      </div>
    </div>
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="管理菜单"/>
      </div>
      <div class="role-setup-info">
        <p class="p-titl">一、订货会管理</p>
        <ul class="menu-list fn-clear">
          <li class="fn-left selected">机型维护</li>
          <li class="fn-left selected">特种机型分配维护</li>
          <li class="fn-left">订单批量导入</li>
          <li class="fn-left">订单提货数据维护</li>
          <li class="fn-left">定金配置</li>
          <li class="fn-left">定金补录</li>
          <li class="fn-left selected">机型维护</li>
          <li class="fn-left selected">特种机型分配维护</li>
          <li class="fn-left">订单批量导入</li>
          <li class="fn-left">订单提货数据维护</li>
          <li class="fn-left">定金配置</li>
          <li class="fn-left">定金补录</li>
        </ul>
        <p class="p-titl">二、基础数据维护</p>
        <ul class="menu-list fn-clear">
          <li class="fn-left selected">机型维护</li>
          <li class="fn-left selected">特种机型分配维护</li>
          <li class="fn-left">订单批量导入</li>
          <li class="fn-left">订单提货数据维护</li>
          <li class="fn-left">定金配置</li>
          <li class="fn-left">定金补录</li>
        </ul>
        <p class="p-titl">三、系统维护</p>
        <ul class="menu-list fn-clear">
          <li class="fn-left selected">机型维护</li>
          <li class="fn-left selected">特种机型分配维护</li>
          <li class="fn-left">订单批量导入</li>
          <li class="fn-left">订单提货数据维护</li>
          <li class="fn-left">定金配置</li>
          <li class="fn-left">定金补录</li>
        </ul>
      </div>
      <div class="foot-btn">
        <el-button size="small" type="success" @click="menuSave">保&nbsp;存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Table from '@/components/Table';
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Pagination from '@/components/Pagination';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    name: 'MenuManage',
    created() {
      if(this.$route.query.roleInfo){
        this.roleData = this.$route.query.roleInfo;
      }
    },
    data() {
      return {
        systemMenuAllList: [],//所有菜单列表
        systemMenuHadList: [],//已关联菜单
      }
    },
    methods: {
      //查询所有菜单
      querySystemMenuList(){
        this.$post('/systemUserController/querySystemMenuList', {
        }).then((rsp) => {
          this.systemMenuAllList = rsp;
          _.map()

        });
      },
      //查询已关联菜单
      queryRoleShortuctMenu(){
        this.$post('/systemUserController/queryRoleShortuctMenu', {
          postRoleId: this.roleData.postRoleId,
        }).then((rsp) => {
          this.systemMenuHadList = rsp;
        });
      },
      menuSave(){

      }
    },
    components: {
      Table,
      TitlePlate,
      Input,
      Pagination,
      Breadcrumb
    }
  }
</script>

<style scoped lang="less">
  .menu-manage {
    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
      .title{
        font-size: 18px;
      }
    }
    .role-man{
      text-align: left;
      .iconfont{
        margin: 0 15px;
        color: #f7626f;
        font-size: 18px;
      }
    }
    .role-setup-info{
      padding: 12px 15px 60px;
      border: 1px solid #dfdfdf;
      .p-titl{
        font-size:16px;
        line-height: 50px;
      }
      .menu-list{
        padding-bottom: 5px;
        border-bottom: 1px solid #dfdfdf;
        &:last-child{
          border-bottom: 0;
        }
        li{
          min-width: 70px;
          height:30px;
          line-height: 30px;
          padding: 0 20px;
          margin:0 18px 16px 0;
          border:1px solid #dfdfdf;
          border-radius: 3px;
          background: #fafafa;
          text-align: center;
          &.selected{
            position: relative;
            border: 1px solid #f01919;
            overflow: hidden;
            &::after{
              position: absolute;
              content: '';
              bottom: -1px;
              right:0;
              width: 32px;
              height: 31px;
              background: url("../assets/images/icon-menuchecked.png") no-repeat;
            }
          }
        }
      }
    }
    .foot-btn{
      width: 100%;
      padding: 24px 0;
      background: #fafafa;
      border: 1px solid #dcdcdc;
      border-top: none;
      text-align: center;
    }
  }

</style>
