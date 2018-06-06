<template>
  <div class="userman-manage">
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info"></div>
    </div>
    <!-- 中间背景图片 -->
    <!-- 搜索 -->
    <div class="search  box-1200 fn-clear">
      <el-input placeholder="输入用户帐号或手机号查询" v-model="usermanData.codeOrPhone" class="input-with-select fn-left"
                size="small">
        <el-button slot="append" @click="usermanSearch()">搜 索</el-button>
      </el-input>
      <div class="fn-left category-more" @click="showMoreCondition">更多条件 <i v-show="isShowMoreCondition"
                                                                            class="iconfont">&#xe607;</i><i
        v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
    </div>
    <!-- 条件搜索 -->
    <div class="box-1200 condition-search" v-show="isShowMoreCondition">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">用户类型：</label>
            <Select :value.sync="usermanData.userType" :options="usermanList"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">所属省份：</label>
            <AreaSelect :value.sync="usermanData.commonRegionId"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">所属商户：</label>
            <ChooseMerchants :title="merchantsTitle" @selectOptions="selectRetailer"/>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">用户状态：</label>
            <Select :value.sync="usermanData.statusCd" :options="statusList"/>
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
          <el-button class="btns" @click="batchActivateUserman()"><i class="iconfont">&#xe6bd;</i> 批量激活</el-button>
          <el-button class="btns" @click="batchFreezeUserman()"><i class="iconfont">&#xe60c;</i> 批量冻结</el-button>
          <el-button class="btns" @click="batchDeleteUserman()"><i class="iconfont">&#xe610;</i> 批量删除</el-button>
        </div>
      </div>
      <Table :isSelection="true" @selectionChange="selectionChange" :tableTitle="tableTitle" :tableData="tableData"/>
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
  import AreaSelect from '@/components/AreaSelect';

  export default {
    name: 'UsermanManage',
    created() {
      this.queryUsermanSubmit();
    },
    data() {
      return {
        usermanList: [{
          value: 1000,
          label: '零售商'
        }, {
          value: 1001,
          label: '供应商'
        }],
        statusList: [{
          value: 1000,
          label: '有效'
        }, {
          value: 1001,
          label: '冻结'
        }, {
          value: 1002,
          label: '无效'
        }],
        usermanData: {
          codeOrPhone: '',
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
          width: 60,
          render: (h, params) => {
            return h({
              template: '<div><span v-if="data.row.stautsCd == 1000">有效</span><span v-else-if="data.row.stautsCd == 1001">冻结</span><span v-else-if="data.row.stautsCd == 1002">无效</span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '操作',
          width: 220,
          render: (h, params) => {
            return h({
              template: '<div><el-button type="text" @click="freezeUserman(usermanInfo)" class="delete-btn" v-if="usermanInfo.stautsCd == 1000">冻结</el-button>' +
              '<el-button type="text" @click="activateUserman(usermanInfo)" class="delete-btn" v-else-if="usermanInfo.stautsCd == 1001">激活</el-button>' +
              '<el-button type="text" @click="modifyUserman(usermanInfo)" class="delete-btn">修改</el-button>' +
              '<el-button type="text" @click="deleteUserman(usermanInfo)" class="delete-btn">删除</el-button>' +
              '<el-button type="text" @click="usermanDetail(usermanInfo)" class="delete-btn">详情</el-button></div>',
              data() {
                return {
                  usermanInfo: params.row
                }
              },
              methods: {
                //修改
                modifyUserman(item) {
                  this.$router.push({
                    path: '/orderManage/addUserman',
                    query: {
                      usermanInfo: item
                    }
                  });
                },
                //冻结
                freezeUserman(item) {
                  this.$post('/systemUserController/freezeSystemUser', {
                    partyIds: [item.partyId],
                  }).then((rsp) => {
                    this.$message.success('冻结成功！');
                    this.queryUsermanSubmit(this.currentPage);
                  })
                },
                //激活
                activateUserman(item) {
                  this.$post('/systemUserController/unfreezeSystemUser', {
                    partyIds: [item.partyId],
                  }).then((rsp) => {
                    this.$message.success('激活成功！');
                    this.queryUsermanSubmit(this.currentPage);
                  })
                },
                //删除
                deleteUserman: (item) => {
                  this.$post('/systemUserController/deleteSystemUser', {
                    partyIds: [item.partyId],
                  }).then((rsp) => {
                    this.$message.success('删除成功！');
                    this.queryUsermanSubmit(this.currentPage);
                  })
                },
                //详情
                usermanDetail(item) {
                  this.$router.push({
                    path: '/orderManage/detailUserman',
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
        selectionChangeList: [],//多选的数据
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
      //展示更多
      showMoreCondition() {
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
      //选择零售商或供应商
      selectRetailer(val) {
        this.usermanData.relaId = val;
      },
      //多选
      selectionChange(val) {
        this.selectionChangeList = val;
      },
      //新增
      addUserman() {
        this.$router.push({
          path: '/orderManage/addUserman',
        });
      },
      //批量激活
      batchActivateUserman() {
        if (!this.selectionChangeList.length) {
          this.$message.warning('请选择需要激活的用户！');
          return;
        }
        let partyIds = [];
        _.map(this.selectionChangeList, function (item) {
          partyIds.push(item.partyId);
        });
        this.$post('/systemUserController/unfreezeSystemUser', {
          partyIds: partyIds,
        }).then((rsp) => {
          this.$message.success('激活成功！');
          this.queryUsermanSubmit();
        })
      },
      //批量冻结
      batchFreezeUserman() {
        if (!this.selectionChangeList.length) {
          this.$message.warning('请选择需要冻结的用户！');
          return;
        }
        let partyIds = [];
        _.map(this.selectionChangeList, function (item) {
          partyIds.push(item.partyId);
        });
        this.$post('/systemUserController/freezeSystemUser', {
          partyIds: partyIds,
        }).then((rsp) => {
          this.$message.success('冻结成功！');
          this.queryUsermanSubmit();
        })
      },
      //批量删除
      batchDeleteUserman() {
        if (!this.selectionChangeList.length) {
          this.$message.warning('请选择需要删除的用户！');
          return;
        }
        let partyIds = [];
        _.map(this.selectionChangeList, function (item) {
          partyIds.push(item.partyId);
        });
        this.$post('/systemUserController/deleteSystemUser', {
          partyIds: partyIds,
        }).then((rsp) => {
          this.$message.success('删除成功！');
          this.queryUsermanSubmit();
        })
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
    computed: {
      merchantsTitle: function () {
        if (this.usermanData.userType == 1000) {
          return '零售商';
        } else {
          return '供应商';
        }
      }
    },
    components: {
      TitlePlate,
      Table,
      Pagination,
      ChooseMerchants,
      Input,
      Select,
      AreaSelect
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
      position: relative;
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
    .query-btns {
      position: relative;
      padding: 0 35px;
      margin: 11px 0 0 2px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 30px;
    }
    .role-man {
      text-align: left;
      .iconfont {
        margin: 0 15px 0 5px;
        color: #f7626f;
        font-size: 18px;
      }
    }
  }

</style>
