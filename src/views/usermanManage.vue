<template>
  <div class="userman-manage">
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info"></div>
    </div>
    <!-- 中间背景图片 -->
    <!-- 搜索 -->
    <div class="search  box-1200 fn-clear">
      <el-input placeholder="输入用户帐号或手机号查询" v-model="usermanData.codeOrPhone" class="input-with-select fn-left" size="small">
        <el-button slot="append" @click="usermanSearch()">搜 索</el-button>
      </el-input>
      <div class="fn-left category-more" @click="showMoreCondition">更多条件 <i v-show="isShowMoreCondition" class="iconfont">&#xe607;</i><i v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
    </div>
    <!-- 条件搜索 -->
    <div class=" box-1200 condition-search" v-show="isShowMoreCondition">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">用户类型：</label>
            <Select class="condition-input" :value.sync="usermanData.userTypeName" :options="usermanList"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">所属省份：</label>
            <Cascader @change="handleChange"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">所属商户：</label>
            <ChooseMerchants title="零售商" @selectOptions="selectRetailer" v-if="usermanData.userType === 1000" />
            <ChooseMerchants title="供应商" @selectOptions="selectRetailer" v-else-if="usermanData.userType === 1001"/>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">用户状态：</label>
            <Select class="condition-input" :value.sync="usermanData.statusCd" :options="statusList"/>
          </div>
        </el-col>
        <el-col :span="16">
          <el-button class="query-btns fn-right" @click="usermanSearch()">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="用户管理列表"/>
        <div class="buttons fn-right">
          <el-button class="btns" @click="addUserman()"><i class="iconfont">&#xe642;</i> 新增账号</el-button>
          <el-button class="btns"><i class="iconfont">&#xe6bd;</i> 批量激活</el-button>
          <el-button class="btns"><i class="iconfont">&#xe60c;</i> 批量冻结</el-button>
          <el-button class="btns"><i class="iconfont">&#xe610;</i> 批量删除</el-button>
        </div>
      </div>
      <Table :isSelection="true" @currentChange="selectionChange" :tableTitle="tableTitle" :tableData="tableData"/>
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import Cascader from '@/components/Cascader';

  export default {
    name: 'UsermanManage',
    created() {
      this.queryUsermanSubmit();
    },
    data() {
      return {
        usermanList: [{
          userType: 1000,
          userTypeName: '零售商'
        }, {
          userType: 1001,
          userTypeName: '供应商'
        }],
        statusList:[{
          statusCd: 1000,
          statusName: '有效'
        },{
          statusCd: 1001,
          statusName: '冻结'
        },{
          statusCd: 1002,
          statusName: '无效'
        }],
        usermanData: {
          codeOrPhone:'',
          userType: 1000,
          statusCd: 1000,
          retailerId: '',
        },
        tableTitle: [{
          label: '真实姓名',
          prop: 'name',
          width: 126,
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
        }, {
          label: '用户账号',
          prop: 'systemUserCode',
          width: 120
        }, {
          label: '用户类型',
          prop: 'userType',
          width: 120,
          render: (h, params) => {
            return h({
              template: '<div><span v-if="data.row.userType === 1000">零售商</span><span v-else>供应商</span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '手机号码',
          prop: 'linktelenumber',
          width: 120
        }, {
          label: '归属省份',
          prop: 'commonRegionName',
          width: 120
        }, {
          label: '归属商户',
          prop: 'relaName',
        }, {
          label: '状态',
          prop: 'stautsCd',
          width: 54,
          render: (h, params) => {
            return h({
              template: '<div><span v-if="data.row.stautsCd === 1000">有效</span><span v-else-if="data.row.stautsCd === 1001">冻结</span><span v-else-if="data.row.stautsCd === 1002">无效</span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '操作',
          width: 190,
          render: function (h, params) {
            return h({
              template: '<div><el-button type="text" @click="freezeUserman(usermanList)" class="delete-btn">冻结</el-button>' +
              '<el-button type="text" @click="modifyUserman(usermanList)" class="delete-btn">修改</el-button>' +
              '<el-button type="text" @click="deleteOpmPolicy(usermanList)" class="delete-btn">删除</el-button>'+
              '<el-button type="text" @click="usermanDetail(usermanList)" class="delete-btn">详情</el-button></div>',
              data: function () {
                return {
                  usermanList: params.row
                }
              },
              methods: {
                modifyUserman(item) {
                  this.$router.push({
                    path: '/orderManage/modifyUserman',
                    query: {
                      usermanInfo: item
                    }
                  });
                },
                usermanDetail(item) {
                  this.$router.push({
                    path: '/orderManage/DetailUserman',
                    query: {
                      usermanInfo: item
                    }
                  });
                }
              },
            })
          }
        }],
        tableData: [],//查询返回的数据

        isShowMoreCondition: false, //是否显示更多条件
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      usermanSearch() {
        this.queryUsermanSubmit();
      },
      selectionChange(val){
        this.selectionChangeList = val;
      },
      showMoreCondition() {
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
      handleChange(val){
        this.usermanData.commonRegionId = val;
      },
      addUserman(){
        this.$router.push({
          path: '/orderManage/addUserman',
        });
      },
      selectRetailer(val){
          this.usermanData.retailerId = val;
      },
      queryUsermanSubmit(curPage, pageSize) {
        this.$post('/systemUserController/querySystemUserList', {
          codeOrPhone: this.usermanData.opmOrderNo,
          commonRegionId: this.usermanData.commonRegionId,
          userType: this.usermanData.userType,
          relaId: this.usermanData.relaId,
          statusCd: this.usermanData.statusCd,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.queryUsermanSubmit(curPage);
      }
    },
    components: {
      TitlePlate,
      Table,
      Pagination,
      ChooseMerchants,
      Input,
      Select,
      Cascader
    }
  }
</script>

<style lang="less">
  .userman-manage {
    /*中间背景图片*/
    .img-bg {
      width: 100%;
      height: 401px;
      background: #fff;
    }
    .img-bg .info {
      /*width: 1200px;*/
      height: 401px;
      margin: 0 auto;
      background: #6e42ef url('../assets/images/manage-bg.jpg') no-repeat right bottom;
      overflow: hidden;
    }
    /*中间背景图片*/

    /* 条件搜索 */
    .search {
      margin: 10px auto;
    }
    .condition-search {
      display: block;
      margin: 18px auto 22px;
      padding: 10px;
      border: 1px solid #dfdfdf;
    }
    .condition-iterm {
      display: flex;
      margin: 10px 0;
      .label-wrds {
        width: 100px;
        line-height: 32px;
        font-size: 14px;
        text-align: right;
      }
      .condition-input {
        flex: 1 0 0;
      }
    }
    /*搜索框*/
    .input-with-select {
      width: 480px;
    }
    .el-input-group__append, .el-input-group__prepend {
      border-radius: 0;
    }

    .input-with-select .el-input-group__prepend {
      background-color: #f8f8f8;
    }

    .input-with-select .el-input-group__append {
      background-color: #f82134;
      border-color: #f82134;
      color: #fff;
    }
    .el-input.is-active .el-input__inner, .el-input__inner:focus {
      border-color: #ff7a7a;
    }

    .category-more {
      height: 22px;
      margin: 7px 0 0 20px;
      padding: 0 5px;
      line-height: 22px;
      background-color: #fff;
      border: 0;
      color: #333;
      text-decoration: none;
      cursor: pointer;
    }
    .category-more:active,
    .category-more:focus,
    .category-more:hover {
      color: #f82134;
    }
    .category-more .iconfont {
      font-size: 12px;
    }
    /* 条件搜索 */
    /* 选择省市 */
    .el-cascader .el-input, .el-cascader .el-input__inner{
      height: 32px;
      line-height: 32px;
    }
    .el-cascader{
      -webkit-box-flex: 1;
      -ms-flex: 1 0 0px;
      flex: 1 0 0;
      line-height: 32px;
    }
    .el-input__icon{
      line-height: 32px;
    }
    /*输入框*/
    .el-range-editor.el-input__inner {
      height: 32px;
    }
    .el-date-editor .el-range__icon, .el-date-editor .el-range-separator, .el-date-editor .el-range__close-icon {
      line-height: 26px;
    }
    .el-input__inner {
      border-radius: 0;
    }
    .tabs-list {
      margin: 0 auto 20px;
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
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
    .query-btns{
      position: relative;
      padding: 0 35px;
      margin:  11px 0 0 2px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 30px;
    }
    .role-man{
      text-align: left;
      .iconfont{
        margin: 0 15px 0 5px;
        color: #f7626f;
        font-size: 18px;
      }
    }
  }

</style>
