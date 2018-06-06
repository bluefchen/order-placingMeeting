<template>
  <div class="add-relevant box-1200">
    <div class="top-titl fn-clear">
      <label class="p-titl"><i class="iconfont">&#xe609;</i>当前角色：<span>零售商</span></label>
    </div>
    <!-- 条件搜索 -->
    <div class="condition-search">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">用户账号/手机号：</label>
            <Input :value.sync="relevantData.codeOrPhone"/>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">所属商户：</label>
            <ChooseMerchants :title="merchantsTitle" @selectOptions="selectRetailer" />
          </div>
        </el-col>
        <el-col :span="3">
          <div class="condition-item">
            <el-button size="small" type="success" @click="usermanSearch">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="order-titl fn-clear">
      <TitlePlate class="fn-left" title="选择添加角色人员列表"/>
    </div>
    <Table :isSelection="true" @selectionChange="selectionChange" :highlightCurrentRow="true" :tableTitle="tableTitle" :tableData="tableData"/>
    <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    <div class="foot-btn">
      <el-button size="small" type="success" @click="addRelevantRoleSubmit">确 定</el-button>
      <el-button size="small" type="success" @click="cancel">取&nbsp;消</el-button>
    </div>
  </div>
</template>

<script>
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import Input from '@/components/Input';
  import TitlePlate from '@/components/TitlePlate';

  export default {
    name: 'AddRelevantPerson',
    created() {
    },
    data() {
      return {
        relevantData: {
          codeOrPhone:'',
          relaId: '',
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
      //选择零售商或供应商
      selectRetailer(val){
        this.relevantData.relaId = val;
      },
      //调用查询接口
      queryUsermanSubmit(curPage, pageSize) {
        this.$post('/systemUserController/querySystemUserList', {
          codeOrPhone: this.relevantData.codeOrPhone,
          relaId: this.relevantData.relaId,
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
                postRoleId: this.$route.query.postRoleId
              }
            });
          });
        })
      },
      cancel(){

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
      Table,
      Pagination,
      ChooseMerchants,
      Input,
      TitlePlate
    }
  }
</script>

<style lang="less">
  .add-relevant{
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
    .condition-item{
      padding-left: 120px;
      .label-wrds{
        width: 120px;
      }
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
      .title{
        font-size: 18px;
      }
    }
    .role-title{
      margin: 20px 0 10px;
      font-size: 18px;
      font-weight: 800;
    }
    .role-title i{
      font-size: 18px;
      color: #ea2525;
    }
    /* 条件搜索 */
    .condition-search {
      display: block;
      margin: 0 auto 10px;
      padding: 5px 10px;
      border: 1px solid #dfdfdf;
    }
    /* 条件搜索 */
    .role-man{
      text-align: left;
      .iconfont{
        margin: 0 15px 0 5px;
        color: #f7626f;
        font-size: 18px;
      }
    }
    .foot-btn{
      width: 100%;
      padding: 24px 0;
      border-top: none;
      text-align: center;
    }
  }
</style>
