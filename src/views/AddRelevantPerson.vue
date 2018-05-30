<template>
  <div class="add-relevant">

    <button class="btn-add" type="success" @click="isShow = true"><span class="iconfont">&#xe6a8;</span> 添加{{title}}</button>

    <DialogPopup class="dialog-choose-merchants" :visible="isShow" :title="dialogTitle" @visibleChange="visibleChange">
      <div slot="content" class="pop-cnt">
        <!-- 搜索 -->
        <div class="box-1200 search fn-clear">
          <InputWithSelect class="fn-left" @search="search"/>
          <div class="fn-left category-more" @click="showMoreCondition">更多条件 <i v-show="isShowMoreCondition" class="iconfont">&#xe607;</i><i
            v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
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
              <el-button class="btns" @click="search()">查询</el-button>
            </el-col>
          </el-row>
        </div>
        <Table :isSelection="true" @currentChange="selectionChange" :highlightCurrentRow="true" :tableTitle="tableTitle" :tableData="tableData"/>
        <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
      </div>
      <div slot="footer">
        <el-button type="success" @click="saveChange">保存</el-button>
        <el-button type="success" @click="visibleChange(false)">关闭</el-button>
      </div>
    </DialogPopup>
  </div>
</template>

<script>
  import DialogPopup from '@/components/DialogPopup';
  import Cascader from '@/components/Cascader';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import InputWithSelect from '@/components/InputWithSelect';
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
      this.dialogTitle = this.dialog + this.title;
      // if(this.title === '供货商'){
      //   this.tableTitle = this.tableSupplierTitle;
      //   this.isShowSupplierType = true;
      // }else if(this.title === '零售商'){
      //   this.tableTitle = this.tableRetailerTitle;
      //   this.isShowSupplierType = false;
      // }
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
          prop: 'retailerName',
          width: 130,
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
          width: 120
        }, {
          label: '用户类型',
          prop: 'isCentman',
          width: 120,
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
          width: 120
        }, {
          label: '归属省份',
          prop: '',
          width: 120
        }, {
          label: '归属商户',
          prop: 'offerQty',
        }],
        tableData: [{

        }],//查询返回的数据
        usermanData: [],
        isShowMoreCondition: false, //是否显示更多条件
        total: 0, //列表总数
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
      DialogPopup,
      Cascader,
      Table,
      Pagination,
      ChooseMerchants,
      InputWithSelect,
      Select
    }
  }
</script>

<style lang="less">

  .add-relevant{
    -webkit-box-flex: 1;
    -ms-flex: 1 0 0px;
    flex: 1 0 0;
    .btn-add{
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
    .dialog-choose-merchants {
      .el-dialog {
        width: 880px;
      }
    }
    /* 条件搜索 */
    .search {
      margin: 10px auto;
    }
    .condition-search {
      display: block;
      margin: 0 auto 10px;
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
    .form-group{
      border: 1px solid #d0d0d0;
      width: 100%;
      position: relative;
      label{
        position: absolute;
        left: 0;
        top: 0;
        width: 90px;
        height: 27px;
        line-height: 27px;
        text-align: center;
        background: #f8f8f8;
        border-right: 1px solid #d0d0d0;
      }
      .condition-select{
        width: calc(100% - 91px);
        height: 27px;
        margin-left: 91px;
        .el-input{
          width: 100%;
        }
        .el-input__inner{
          height: 27px;
          line-height: 27px;
          border-radius: 0;
          border: none;
          vertical-align: top;
          &:focus{
            border-color: #ff7a7a;
          }
          &:hover{
            border-color: #c0c4cc;
          }
        }
      }
      .el-cascader{
        margin-left: 91px;
        width: calc(100% - 91px);
        height: 27px;
        .el-input__inner{
          height: 27px;
          line-height: 27px;
          vertical-align: top;
          border-radius: 0;
          border: none;
        }
      }
    }
    .el-input-group--append .el-input__inner{
      border-radius: 0;
      height: 29px;
      line-height: 29px;
    }
    .el-cascader-menu__item:focus:not(:active), .el-cascader-menu__item:hover {
      background-color: #f5f7fa;
    }
    .v_pagination .el-pagination{
      margin-top: 10px;
    }
    .el-dialog--center .el-dialog__body{
      padding: 10px 20px 5px 20px;
      line-height: 27px;
    }
    .el-icon-arrow-down:before{
      font-family: 'iconfont';
      content: "\e614";
      font-size: 14px;
      color: #aaa;
    }
    .el-icon-arrow-up:before{
      color: #aaa;
    }
    .v_table .el-table th.is-leaf{
      background: #efefef;
    }
    .el-table td, .el-table th.is-leaf{
      border-color: #e6e6e6;
      height: 33px;
    }
    .el-table--small td, .el-table--small th{
      padding: 0;
    }
    .el-cascader-menu__item.is-active, .el-cascader-menu__item:focus:not(:active){
      color: #fff;
      font-weight: normal;
      background-color: #f13939;
    }
    .role-man{
      text-align: left;
      .iconfont{
        margin: 0 15px 0 5px;
        color: #f7626f;
        font-size: 18px;
      }
    }
    .btns{
      position: relative;
      padding: 0 12px;
      margin:  11px 0 0 2px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 28px;
    }
  }

</style>
