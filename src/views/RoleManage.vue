<template>
  <div class="role-manage">
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info"></div>
    </div>
    <!-- 中间背景图片 -->
    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="角色管理列表"/>
      </div>
      <Table :tableTitle="tableTitle" :tableData="tableData"/>
    </div>
  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Breadcrumb from '@/components/Breadcrumb';
  import Table from '@/components/Table';

  export default {
    name: 'RoleManage',
    created() {
      this.queryRole();
    },
    data() {
      return {
        tableTitle: [{
          label: '角色名称',
          prop: 'name',
          width: 240,
          render: (h, params) => {
            return h({
              template: '<div class="role-man"><img src="./static/img/roleman-img.png" alt=""><span>{{roleName}}</span></div>',
              data() {
                return {
                  roleName: params.row.name
                }
              }
            });
          }
        },{
          label: '角色说明',
          prop: 'description'
        }, {
          label: '操作',
          width: 230,
          render: function (h, params) {
            return h({
              template: '<div><el-button type="text" @click="modifyRole(roleInfo)" class="delete-btn">角色编辑</el-button>' +
              '<el-button type="text" @click="menuManage(roleInfo)" class="delete-btn">管理菜单</el-button>' +
              '<el-button type="text" @click="userManage(roleInfo)" class="delete-btn">管理人员</el-button></div>',
              data: function () {
                return {
                  roleInfo: params.row
                }
              },
              methods: {
                modifyRole(item) {
                  sessionStorage.setItem('postRoleId', JSON.stringify(item));
                  this.$router.push({path: '/orderManage/modifyRole'});
                },
                menuManage(item) {
                  sessionStorage.setItem('postRoleId', JSON.stringify(item));
                  this.$router.push({path: '/orderManage/menuManage'});
                },
                userManage(item) {
                  sessionStorage.setItem('postRoleId', JSON.stringify(item));
                  this.$router.push({path: '/orderManage/userRoleManage'});
                }
              },
            })
          }
        }],
        tableData: [],//查询返回的数据
      }
    },
    methods: {
      queryRole() {
        this.$post('/systemUserController/queryPostRoleList', {
        }).then((rsp) => {
          this.tableData = rsp;
        })
      }
    },
    components: {
      TitlePlate,
      Table,
      Breadcrumb
    }
  }
</script>

<style lang="less">
  .role-manage {
    /*中间背景图片*/
    .img-bg {
      width: 100%;
      height: 250px;
      background: #fff;
    }
    .img-bg .info {
      height: 250px;
      margin: 0 auto;
      background: #6e42ef url('../assets/images/manage-bg.jpg') no-repeat right bottom;
      overflow: hidden;
    }
    /*中间背景图片*/
    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }
    .tabs-list {
      margin: 0 auto 20px;
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
    }
    .el-table tbody tr{
      height: 74px;
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
    .red {
      color: #f82134;
    }

    .btns {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 20px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 28px;
      &:hover {
        background-color: #e20606;
      }
    }
    .role-man{
      text-align: left;
    }
    .role-man img{
      width: 50px;
      height: 50px;
      margin:0 20px 0 32px;
      vertical-align: middle;
      border-radius:50px;
    }
  }

</style>
