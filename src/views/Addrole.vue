<template>
  <div class="add-role">
    <div class="box-1200">
      <p class="p-title"><i class="iconfont">&#xe609;</i> 新增角色</p>
      <div class="role-setup">
        <ul class="role-change fn-clear">
          <li class="fn-left" :class="{'on': showEdit === 1}" @click="changeEdit(1)">角色编辑</li>
          <li class="fn-left disabled" v-show="!roleMan">管理菜单</li>
          <li class="fn-left" :class="{'on': showEdit === 2}" v-show="roleMan"  @click="changeEdit(2)">管理菜单</li>
          <li class="fn-left disabled" v-show="!roleMan">管理人员</li>
          <li class="fn-left" :class="{'on': showEdit === 3}" v-show="roleMan" @click="changeEdit(3)">管理人员</li>
        </ul>
        <!-- 角色编辑 -->
        <div class="role-setup-info"  v-show="showEdit === 1">
          <div class="terminal-info-box">
            <el-row :gutter="20">
              <el-col :span="8" :offset="2">
                <div class="condition-item">
                  <label class="label-wrds text-right"><span class="red-star">*</span> 角色名称：</label>
                  <Input class="condition-input" :value.sync="roleData.roleName"/>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18" :offset="2">
                <div class="condition-item">
                  <label class="label-wrds text-right"><span class="red-star">*</span> 角色说明：</label>
                  <el-input class="condition-input" type="textarea" v-model="roleData.roleInstrd"></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="foot-btn">
            <button class="btns">保&nbsp;存</button>
            <button class="btns">重 置</button>
          </div>
        </div>
        <!-- 管理菜单 -->
        <div class="role-setup-info" v-show="showEdit === 2">
          <div class="role-list">
              <div class="tree-left">
                <TitlePlate title="菜单列表"/>
                <div class="tree-info">
                  <el-tree
                    :data="data2"
                    show-checkbox
                    node-key="id"
                    :default-expanded-keys="[2, 3]"
                    :default-checked-keys="[5]"
                    :props="defaultProps">
                  </el-tree>
                </div>
              </div>
              <div class="tree-left">
                <TitlePlate title="已有菜单权限"/>
                <div class="tree-info">
                  <el-tree :data="data" :props="defaultProps"></el-tree>
                </div>
              </div>
          </div>

          <div class="foot-btn">
            <button class="btns">保&nbsp;存</button>
            <button class="btns">重 置</button>
          </div>
        </div>
        <!-- 管理人员 -->
        <div class="role-setup-info" v-show="showEdit === 3">
          <div class="order-titl fn-clear">
            <TitlePlate class="fn-left" title="已有角色人员管理列表"/>
            <div class="buttons fn-right">
              <el-button class="btns" @click="addRelevantPerson"><i class="iconfont">&#xe642;</i> 添加角色人员</el-button>
            </div>
          </div>
          <Table :tableTitle="tableTitle" :tableData="tableData"/>
          <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
          <div class="foot-btn">
            <button class="btns">保&nbsp;存</button>
            <button class="btns">重 置</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Table from '@/components/Table';
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Pagination from '@/components/Pagination';


  export default {
    name: 'AddRole',
    created() {
    },
    data() {
      return {
        roleData:{
          roleName:'',
          roleInstrd: '',
        },
        roleMan:'111',
        showEdit: 1,
        tableTitle: [{
          label: '真实姓名',
          prop: 'roleName',
          width: 176,
          render: (h, params) => {
            return h({
              template: '<div class="role-man"><i class="iconfont">&#xe604;</i><span>{{roleName}}</span></div>',
              data() {
                return {
                  roleName: params.row.roleName,
                  imgSrc: params.row.imgSrc
                }
              }
            });
          }
        },{
          label: '用户帐号',
          prop: 'roleInstrd',
          width: 145
        },{
          label: '用户类型',
          prop: 'roleInstrd',
          width: 145
        },{
          label: '手机号码',
          prop: 'roleInstrd',
          width: 145
        },{
          label: '归属省份',
          prop: 'roleInstrd',
          width: 128
        },{
          label: '归属商户',
          prop: 'roleInstrd'
        }, {
          label: '操作',
          width: 128,
          render: function (h, params) {
            return h({
              template: '<div><el-button type="text" @click="modifyRole(roleInfo)" class="delete-btn">删除</el-button></div>',
              data: function () {
                return {
                  roleInfo: params.row
                }
              },
              methods: {
                modifyRole(item) {
                  this.$router.push({
                    path: '/orderManage/addRole',
                    query: {
                      usermanInfo: item
                    }
                  });
                }
              },
            })
          }
        }],
        tableData: [{
          roleName: '供货商',
          roleInstrd: '供货商有部分配置管理及订单查询功能政策投入XXXXXXXXXXXXXXXXXXXXXXXX'
        }],//查询返回的数据
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        total: 1, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1, //当前页
      }
    },
    methods: {
      addRelevantPerson() {
        this.$router.push({
          path: '/orderManage/addRelevantPerson',
        });
      },
      changeEdit(val){
        this.showEdit = val;
      },
      pageChanged(curPage) {
        this.queryOpmDepositList(curPage);
      }
    },
    components: {
      Table,
      TitlePlate,
      Input,
      Pagination
    }
  }
</script>

<style scoped lang="less">
  .add-role {
    .p-title{
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      font-weight: 800;
    }
    .p-title i{
      font-size: 18px;
      color: #ea2525;
    }
    .role-setup{
      border: 1px solid #dfdfdf;
    }
    .role-change{
      height: 50px;
      line-height: 50px;
      background: #f6f6f6;
      border-bottom: 1px solid #dfdfdf;
    }
    .role-change li{
      width: 166px;
      border-right: 1px solid #dfdfdf;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
    }
    .role-change li.on{
      position: relative;
      color: #f01919;
    }
    .role-change li.on::after{
      position: absolute;
      content: '';
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 2px;
      background: #f01919;
    }
    .role-change li.disabled{
      color: #bbb;
      cursor: none;
    }
    .terminal-info-box{
      margin-top: 32px;
    }
    .red-star{
      color: #f00;
    }
    .condition-item {
      display: flex;
      margin: 10px 0;
      .label-wrds {
        width: 110px;
        line-height: 32px;
        font-size: 14px;
      }
      .condition-input {
        flex: 1 0 0;
      }
      .el-input__inner{
        border-radius: 0;
      }
      .el-textarea__inner{
        height: 80px;
        resize: none;
        border-radius: 0;
      }
    }
    .text-right{
      text-align: right;
    }
    .role-list{
      display: flex;
      margin: 22px 12px;
      border: 1px solid #e3e3e3;
      background: #f9f9f9;
      .tree-left{
        width: 50%;
        border-right: 1px solid #e3e3e3;
        &:last-child{
          border-right: 0;
        }
        .title{
          height:40px;
          line-height: 40px;
          padding-left: 25px;
          margin-left:0;
          border-bottom: 1px solid #e3e3e3;
          background-position: 15px 10px;
          font-size: 14px;
        }
        .tree-info{
          height: 336px;
          margin: 22px 30px;
          overflow-y: auto;
          .el-tree{
            background: #f9f9f9;
            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
              background-color: #f01919;
              border-color: #f01919;
            }
          }
        }
      }
    }
    .order-titl {
      height: 28px;
      margin: 15px 40px 8px;
      line-height: 28px;
      .title{
        font-size: 14px;
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
    .v_table{
      margin: 0 40px;
    }
    .foot-btn{
      width: 100%;
      padding: 24px 0;
      text-align: center;
      .btns {
        display: inline-block;
        padding: 3px 30px;
        margin: 0 10px;
        border: 0;
        background-color: #fa0000;
        color: #fff;
        font-size: 14px;
        border-radius: 3px;
        line-height: 28px;
        cursor: pointer;
        text-decoration: none;
        &:hover {
          background-color: #e20606;
        }
      }
    }

  }

</style>
