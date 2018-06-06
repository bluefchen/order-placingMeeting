<template>
  <div class="add-relevant box-1200">
    <!-- 搜索 -->
    <div class="search fn-clear">
      <el-input placeholder="输入用户帐号或手机号查询" class="input-with-select fn-left" size="small" v-model="relevantData.codeOrPhone">
        <el-button slot="append" @click="usermanSearch()">搜 索</el-button>
      </el-input>
      <div class="fn-left category-more" @click="showMoreCondition">更多条件 <i v-show="isShowMoreCondition" class="iconfont">&#xe607;</i><i v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
    </div>
    <!-- 条件搜索 -->
    <div class="condition-search" v-show="isShowMoreCondition">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">用户类型：</label>
            <Select class="condition-input" :value.sync="relevantData.userType" :options="usermanList"/>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">所属省份：</label>
            <!--<Cascader :value.sync="relevantData.commonRegionId"/>-->
            <AreaSelect :value.sync="relevantData.commonRegionId"/>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">所属商户：</label>
            <ChooseMerchants :title="merchantsTitle" @selectOptions="selectRetailer" />
          </div>
        </el-col>
        <el-col :span="3">
          <el-button class="query-btns" @click="usermanSearch()">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <p class="p-title"><i class="iconfont">&#xe609;</i> 选择添加角色人员列表</p>
    <Table :isSelection="true" @selectionChange="selectionChange" :highlightCurrentRow="true" :tableTitle="tableTitle" :tableData="tableData"/>
    <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    <div class="foot-btn">
      <button class="btns" @click="addRelevantRoleSubmit">保&nbsp;存</button>
      <button class="btns">取&nbsp;消</button>
    </div>
  </div>
</template>

<script>
  import AreaSelect from '@/components/AreaSelect';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import Select from '@/components/Select';

  export default {
    name: 'AddRelevantPerson',
    created() {
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
        relevantData: {
          codeOrPhone:'',
          userType: 1000,
          retailerId: '',
        },
        tableTitle: [{
          label: '真实姓名',
          prop: 'name',
          width: 160,
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
          width: 170
        }, {
          label: '用户类型',
          prop: 'userType',
          width: 160,
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
          width: 160
        }, {
          label: '归属省份',
          prop: 'commonRegionName',
          width: 160
        }, {
          label: '归属商户',
          prop: 'relaName',
        }],
        tableData: [],//查询返回的数据
        isShowMoreCondition: false, //是否显示更多条件
        selectionChangeList: [],
        total: 1, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      //查询
      usermanSearch() {
        this.queryUsermanSubmit();
      },
      //多选
      selectionChange(val){
        this.selectionChangeList = val;
      },
      //展示更多
      showMoreCondition() {
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
      //选择零售商或供应商
      selectRetailer(val){
        this.relevantData.relaId = val;
      },
      //调用查询接口
      queryUsermanSubmit(curPage, pageSize) {
        this.$post('/systemUserController/querySystemUserList', {
          codeOrPhone: this.relevantData.opmOrderNo,
          commonRegionId: this.relevantData.commonRegionId,
          userType: this.relevantData.userType,
          relaId: this.relevantData.relaId,
          statusCd: '',
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      //保存
      addRelevantRoleSubmit(){
        if(!this.selectionChangeList.length){
          this.$message.warning('请至少选择一项进行操作！');
          return;
        }
        let partyIds = [];
        _.map(this.selectionChangeList, function (item) {
          partyIds.push(item.partyId);
        });
        this.$post('/systemUserController/unfreezeSystemUser', {
          postRoleId: this.$route.query.postRoleId,
          partyIds: partyIds,
        }).then((rsp) => {
          this.$alert('添加成功！', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.$router.push({
              path: '/orderManage/userRoleManage',
              query: {
                postRoleId: item
              }
            });
          });
        })
      },
      pageChanged(curPage) {
        this.queryOpmOrderSubmit(curPage);
      }
    },
    computed:{
      merchantsTitle:function() {
        if(this.relevantData.userType == 1000){
          return '零售商';
        }else{
          return '供应商';
        }
      }
    },
    components: {
      AreaSelect,
      Table,
      Pagination,
      ChooseMerchants,
      Select
    }
  }
</script>

<style lang="less">

  .add-relevant{
    /*-webkit-box-flex: 1;*/
    /*-ms-flex: 1 0 0px;*/
    /*flex: 1 0 0;*/
    .p-title{
      margin: 20px 0 10px;
      font-size: 18px;
      font-weight: 800;
    }
    .p-title i{
      font-size: 18px;
      color: #ea2525;
    }
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
      margin: 7px 0 0 20px;
      padding: 0 5px;
      line-height: 16px;
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

    /*搜索条件输入框*/
    .el-range-editor.el-input__inner {
      height: 32px;
    }
    .el-date-editor .el-range__icon, .el-date-editor .el-range-separator, .el-date-editor .el-range__close-icon {
      line-height: 26px;
    }
    .el-input__inner {
      border-radius: 0;
    }

    .role-man{
      text-align: left;
      .iconfont{
        margin: 0 15px 0 5px;
        color: #f7626f;
        font-size: 18px;
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
    .foot-btn{
      width: 100%;
      padding: 24px 0;
      border-top: none;
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
