<template>
  <div class="add-relevant box-1200">
    <!-- 搜索 -->
    <div class="search fn-clear">
      <el-input placeholder="输入用户帐号或手机号查询" class="input-with-select fn-left" size="small">
        <el-button slot="append" @click="Search()">搜 索</el-button>
      </el-input>
      <div class="fn-left category-more" @click="showMoreCondition">更多条件 <i v-show="isShowMoreCondition" class="iconfont">&#xe607;</i><i v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
    </div>
    <!-- 条件搜索 -->
    <div class="condition-search" v-show="isShowMoreCondition">
          <el-row :gutter="20">
            <el-col :span="7">
              <div class="condition-iterm">
                <label class="label-wrds">用户类型：</label>
                <Select class="condition-input" :value.sync="relevantData.userId" :options="usermanList"/>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="condition-iterm">
                <label class="label-wrds">所属省份：</label>
                <Cascader @change="handleChange"/>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="condition-iterm">
                <label class="label-wrds">所属商户：</label>
                <ChooseMerchants title="供应商" @selectOptions="selectRetailer" />
              </div>
            </el-col>
            <el-col :span="3">
              <el-button class="query-btns" @click="search()">查询</el-button>
            </el-col>
          </el-row>
        </div>
    <p class="p-title"><i class="iconfont">&#xe609;</i> 选择添加角色人员列表</p>
    <Table :isSelection="true" @currentChange="selectionChange" :highlightCurrentRow="true" :tableTitle="tableTitle" :tableData="tableData"/>
    <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    <div class="foot-btn">
      <button class="btns">保&nbsp;持</button>
      <button class="btns">取&nbsp;消</button>
    </div>
  </div>
</template>

<script>
  import Cascader from '@/components/Cascader';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import Select from '@/components/Select';

  export default {
    name: 'AddRelevantPerson',
    props: {
      title: {
        type: String,
        require: true
      }
    },
    created() {

      // this.handleSearch();
    },
    data() {
      return {
        isShow: false,
        checkedOption: {},
        usermanList: [{ //用户类型
          value: 1001,
          label: '零售商'
        }, {
          value: 1002,
          label: '供货商'
        }],
        relevantData: {
          userId: '',
        },
        tableTitle: [{
          label: '真实姓名',
          prop: 'roleName',
          width: 160,
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
        }, {
          label: '用户账号',
          prop: 'offerCode',
          width: 170
        }, {
          label: '用户类型',
          prop: 'isCentman',
          width: 160,
          render: (h, params) => {
            return h({
              template: '<div><span v-if="data.row.isCentman === \'Y\'">集采</span><span v-else>社采</span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '手机号码',
          prop: 'supplierName',
          width: 160
        }, {
          label: '归属省份',
          prop: '',
          width: 160
        }, {
          label: '归属商户',
          prop: 'offerQty',
        }],
        tableData: [{
          roleName:'wwe',
          supplierName:'111',
        }],//查询返回的数据
        usermanData: [],
        isShowMoreCondition: false, //是否显示更多条件
        total: 1, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      selectionChange(val){
        this.selectionChangeList = val;
      },
      saveChange(){
        this.checkedOption = this.selectionChangeList ? this.selectionChangeList : {};
        if(this.title === '供货商'){
          this.$emit('selectOptions', this.checkedOption.supplierId);
        }else{
          this.$emit('selectOptions', this.checkedOption.retailerId);
        }
        this.isShow = false;
      },
      search(obj) {
        // this.orderQueryData.isCentman = obj.type;
        // this.orderQueryData.offerNameOrCode = obj.value;
        // this.queryOpmOrderSubmit();
      },
      showMoreCondition() {
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
      visibleChange(val) {
        this.isShow = val;
      },
      handleChange(val){
        // this.orderQueryData.commonRegionId = val;
      },
      selectRetailer(val){
        this.orderQueryData.retailerId = val;
      },
      queryOpmOrderSubmit(curPage, pageSize) {
        this.$post('/opmOrderController/queryOpmOrderList', {
          // opMeetingId: '订货会ID',
          // isCentman: this.orderQueryData.isCentman,
          // offerNameOrCode: this.orderQueryData.offerNameOrCode,
          // opmOrderNo: this.orderQueryData.opmOrderNo,
          // supplierId: this.orderQueryData.supplierId,
          // retailerId: this.orderQueryData.retailerId,
          // fromDate: this.orderQueryData.dateValue[0],
          // toDate: this.orderQueryData.dateValue[1],
          // statusCd: this.orderQueryData.statusCd,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.qryOpmOrderList = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.queryOpmOrderSubmit(curPage);
      }
    },
    components: {
      Cascader,
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
    .condition-search {
      display: block;
      margin: 0 auto 10px;
      padding: 10px 0;
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
