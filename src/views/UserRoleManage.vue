<template>
  <div class="add-role">
    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['系统维护', '角色管理', '管理人员']"/>
      </div>
    </div>
    <div class="box-1200">
      <div class="top-titl fn-clear">
        <label class="p-titl"><i class="iconfont">&#xe609;</i>当前角色：<span>{{roleData.name}}</span></label>
      </div>
      <!--管理人员-->
      <div class="role-setup-info">
        <div class="order-titl fn-clear">
          <p class="p-titl fn-left">已有角色人员管理列表 </p>
          <div class="buttons fn-right">
            <el-button class="btns" @click="addRelevantPerson"><i class="iconfont">&#xe642;</i> 添加角色人员</el-button>
          </div>
        </div>
        <Table :tableTitle="tableTitle1" :tableData="tableData" v-if="roleData.roleTypeCd != 1"/>
        <Table :tableTitle="tableTitle2" :tableData="tableData" v-if="roleData.roleTypeCd == 1"/>
        <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
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
    name: 'userRoleManage',
    created() {
      if(this.$route.query.postRoleId){
        this.roleData.postRoleId = this.$route.query.postRoleId;
      }
      if(this.$route.query.roleName){
        this.roleData.name = this.$route.query.roleName;
      }
      if(this.$route.query.roleTypeCd){
        this.roleData.roleTypeCd = this.$route.query.roleTypeCd;
      }
      this.queryPostRoleRelaUserList();
    },
    data() {
      return {
        roleData: {
          postRoleId: ''
        },
        tableTitle1: [{
          label: '真实姓名',
          prop: 'name',
          width: 176,
          render: (h, params) => {
            return h({
              template: '<div class="role-man"><i class="iconfont">&#xe604;</i><span>{{roleName}}</span></div>',
              data() {
                return {
                  roleName: params.row.name,
                }
              }
            });
          }
        },{
          label: '用户帐号',
          prop: 'systemUserCode',
          width: 145
        },{
          label: '用户类型',
          prop: 'userType',
          width: 145,
          render: (h, params) => {
            return h({
              template: '<div><span v-if="data.row.userType == 1">运营商</span><span v-else-if="data.row.userType == 2">供应商</span><span v-else>零售商</span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        },{
          label: '手机号码',
          prop: 'linktelenumber',
          width: 145
        },{
          label: '归属省份',
          prop: 'commonRegionName',
          width: 128
        },{
          label: '归属商户',
          prop: 'relaName'
        }, {
          label: '操作',
          width: 128,
          render: (h, params) => {
            return h({
              template: '<div><el-button type="text" @click="deleteRelativeRole(roleInfo)" class="delete-btn">删除</el-button></div>',
              data: function () {
                return {
                  roleInfo: params.row
                }
              },
              methods: {
                deleteRelativeRole: (item) => {
                  this.$post('/systemUserController/deletePostRoleRelaUser', {
                    postRoleId: item.postRoleId,
                    partyId: item.partyId
                  }).then((rsp) => {
                    this.$msgBox({
                      type: 'success',
                      title: '操作提示',
                      content: '删除成功'
                    }).catch(() => {
                      // console.log('cancel');
                    });
                    this.queryPostRoleRelaUserList();
                  });
                }
              },
            })
          }
        }],
        tableTitle2: [{
          label: '真实姓名',
          prop: 'name',
          width: 200,
          render: (h, params) => {
            return h({
              template: '<div class="role-man"><i class="iconfont">&#xe604;</i><span>{{roleName}}</span></div>',
              data() {
                return {
                  roleName: params.row.name,
                }
              }
            });
          }
        },{
          label: '用户帐号',
          prop: 'systemUserCode',
          width: 200
        },{
          label: '用户类型',
          prop: 'userType',
          width: 200,
          render: (h, params) => {
            return h({
              template: '<div><span v-if="data.row.userType == 1">运营商</span><span v-else-if="data.row.userType == 2">供应商</span><span v-else>零售商</span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        },{
          label: '手机号码',
          prop: 'linktelenumber',
          width: 200
        },{
          label: '归属省份',
          prop: 'commonRegionName',
        }, {
          label: '操作',
          width: 200,
          render: function (h, params) {
            return h({
              template: '<div><el-button type="text" @click="deleteRelativeRole(roleInfo)" class="delete-btn">删除</el-button></div>',
              data: function () {
                return {
                  roleInfo: params.row
                }
              },
              methods: {
                deleteRelativeRole(item) {
                  this.$post('/systemUserController/deletePostRoleRelaUser', {
                    postRoleId: item.postRoleId,
                    partyId: item.partyId
                  }).then((rsp) => {
                    this.$msgBox({
                      type: 'success',
                      title: '操作提示',
                      content: '删除成功'
                    }).catch(() => {
                      // console.log('cancel');
                    });
                  });
                }
              },
            })
          }
        }],
        tableData: [],//查询返回的数据
        total: 1, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1, //当前页
      }
    },
    methods: {
      //查询角色关联用户接口
      queryPostRoleRelaUserList(curPage, pageSize){
        this.$post('/systemUserController/queryPostRoleRelaUserList', {
          postRoleId: this.roleData.postRoleId,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
          this.total = rsp.totalSize;
        });
      },
      //添加相关人员
      addRelevantPerson() {
        this.$router.push({
          path: '/orderManage/addRelevantPerson',
          query: {
            postRoleId: this.roleData.postRoleId,
            roleName: this.roleData.name,
            userType: this.roleData.roleTypeCd
          }
        });
      },
      pageChanged(curPage) {
        this.queryPostRoleRelaUserList(curPage);
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
  .add-role {
    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }
    .top-titl {
      height: 36px;
      margin: 15px 0 8px;
      line-height: 36px;
      .p-titl{
        font-size: 18px;
        padding: 7px 30px 7px 0;
        color: #9a9a9a;
        border: 1px solid #d1d1d1;
        background: #fafafa;
        .iconfont{
          font-size: 18px;
          color: #f60e0e;
          margin: 0 8px;
        }
        span{
          color: #000;
        }
      }
    }
    .role-setup-info{
      .order-titl{
        height: 42px;
        line-height: 42px;
        padding: 0 12px;
        border: 1px solid #dfdfdf;
        border-bottom: 0;
        font-size: 14px;
        color: #000;
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
    .buttons .btns {
      position:relative;
      padding: 0 12px;
      margin-left: 2px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 28px;
    }
    .buttons .btns:hover {
      background-color: #e20606;
    }
    .foot-btn{
      width: 100%;
      padding: 24px 0;
      border-top: none;
      text-align: center;
    }
  }

</style>
