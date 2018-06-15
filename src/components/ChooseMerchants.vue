<template>
  <div class="choose-merchants">
    <div class="choose-input-box" @click="isShow = true" v-show="!disabled">
      <el-input class="choose-input" v-if="title === '零售商'" v-model="checkedOption.retailerName" type="text" readonly></el-input>
      <el-input class="choose-input" v-if="title === '供应商'" v-model="checkedOption.supplierName" type="text" readonly></el-input>
      <div class="choose-input-icon"><span class="iconfont">&#xe65a;</span></div>
    </div>
    <div class="choose-input-box disabled" v-show="disabled">
      <el-input class="choose-input" v-if="title === '零售商'" v-model="checkedOption.retailerName" type="text" readonly></el-input>
      <el-input class="choose-input" v-if="title === '供应商'" v-model="checkedOption.supplierName" type="text" readonly></el-input>
      <div class="choose-input-icon"><span class="iconfont">&#xe65a;</span></div>
    </div>
    <DialogPopup class="dialog-choose-merchants" :visible="isShow" :title="dialogTitle" @visibleChange="visibleChange">
      <div slot="content" class="pop-cnt">
        <el-row :gutter="10">
          <el-col :span="7">
            <div class="form-group">
              <label>所属省市：</label>
              <AreaSelect class="condition-select" :value.sync="orderQueryData.commonRegionId"/>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="form-group">
              <label>{{title}}类型：</label>
              <el-select v-if="isShowSupplierType" class="condition-select" v-model="orderQueryData.supplierType"
                         placeholder="请选择" :clearable="true">
                <el-option v-for="item in supplierTypeList" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
              <el-select v-else class="condition-select" v-model="orderQueryData.retailerType" placeholder="请选择" :clearable="true">
                <el-option v-for="item in retailerTypeList" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="10">
            <el-input placeholder="输入商户名称或编码搜索" v-model="searchInput" size="small">
              <el-button slot="append" @click="handleSearch()">查询</el-button>
            </el-input>
          </el-col>
        </el-row>
        <Table :stripe="false" size="mini" :border="true" :isSelection="false" @currentChange="selectionChange" :highlightCurrentRow="true" :tableTitle="tableTitle" :tableData="tableData"/>
        <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
      </div>
      <div slot="footer">
        <el-button type="success" @click="saveChange">确定</el-button>
        <el-button type="success" @click="visibleChange(false)">关闭</el-button>
      </div>
    </DialogPopup>
  </div>
</template>

<script>
  import DialogPopup from '@/components/DialogPopup';
  import AreaSelect from '@/components/AreaSelect';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';

  export default {
    name: 'ChooseMerchants',
    props: {
      title: {
        type: String,
        require: true
      },
      selectionFor: {
        type: Object
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    created() {
      if (this.title === '供应商') {
        this.tableTitle = this.tableSupplierTitle;
        this.isShowSupplierType = true;
      } else if (this.title === '零售商') {
        this.tableTitle = this.tableRetailerTitle;
        this.isShowSupplierType = false;
      }
      this.handleSearch();
      if (this.selectionFor) {
        if (this.selectionFor.userType == 1000) {
          this.checkedOption.retailerId = this.selectionFor.relaId;
          this.checkedOption.retailerName = this.selectionFor.relaName;
        } else {
          this.checkedOption.supplierId = this.selectionFor.relaId;
          this.checkedOption.supplierName = this.selectionFor.relaName;
        }
      }
      this.selectionChangeList = [];
    },
    data() {
      return {
        dialog: '选择添加',
        isShowSupplierType: true,
        checkedOption: {},
        sdfadf: '',

        supplierTypeList: [{ //供货商类型列表
          value: 1001,
          label: '厂商'
        }, {
          value: 1002,
          label: '国代'
        }, {
          value: 1003,
          label: '省代'
        }, {
          value: 1004,
          label: '其他'
        }],

        retailerTypeList: [{ //零售商类型列表
          value: 1001,
          label: '自营厅'
        }, {
          value: 1002,
          label: '大连锁'
        }, {
          value: 1003,
          label: '代理商'
        }],

        orderQueryData: {
          supplierType: '',
          retailerType: '',
          commonRegionId: ''
        },

        regionsList: [{
          id: '1',
          name: '江苏',
          parentId: '2',
          areaLevel: '1',
        }, {
          id: '5',
          name: '浙江',
          parentId: '6',
          areaLevel: '1',
          children: [{
            id: '7',
            name: '浙江1',
            parentId: '6',
            areaLevel: '2',
            children: [{
              id: '8',
              name: '浙江2',
              parentId: '7',
              areaLevel: '3',
              children: [{
                id: '9',
                name: '浙江3',
                parentId: '8',
                areaLevel: '4',
              }]
            }]
          }]
        }],

        props: {
          value: 'id',
          label: 'name',
          children: 'children',
        },

        searchInput: '',

        //供应商表头
        tableSupplierTitle: [{
          label: '选择',
          prop: '',
          width: '55px',
          render: function (h, params) {
            return h({
              template: '<div class="table-radio"></div>',
            })
          }
        }, {
          label: '省份',
          prop: 'commonRegionName',
        }, {
          label: '供应商编码',
          prop: 'supplierCode',
        }, {
          label: '供应商名称',
          prop: 'supplierName',
        }, {
          label: '供应商类型',
          prop: 'supplierTypeName',
        }, {
          label: '联系人',
          prop: 'linkMan',
        }, {
          label: '联系电话',
          prop: 'linkNbr',
        }, {
          label: '公司电话',
          prop: 'supplierPhone',
        }, {
          label: '公司传真',
          prop: 'supplierFax',
        }],

        //零售商表头
        tableRetailerTitle: [{
          label: '选择',
          prop: '',
          width: '55px',
          render: function (h, params) {
            return h({
              template: '<div class="table-radio"></div>',
            })
          }
        }, {
          label: '省份',
          prop: 'commonRegionName',
        }, {
          label: '零售商编码',
          prop: 'retailerCode',
        }, {
          label: '零售商名称',
          prop: 'retailerName',
        }, {
          label: '零售商类型',
          prop: 'retailerTypeName',
        }, {
          label: '联系人',
          prop: 'linkMan',
        }, {
          label: '联系电话',
          prop: 'linkNbr',
        }, {
          label: '公司电话',
          prop: 'retailerPhone',
        }, {
          label: '公司传真',
          prop: 'retailerFax',
        }],
        tableTitle: [],
        tableData: [],
        selectionChangeList: [],

        isShow: false,

        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页

      }
    },
    methods: {
      selectionChange(val) {
        this.selectionChangeList = val;
      },
      saveChange() {
        this.checkedOption = this.selectionChangeList ? this.selectionChangeList : {};
        if (this.title === '供应商') {
          this.$emit('selectOptions', this.checkedOption.supplierId);
        } else {
          this.$emit('selectOptions', this.checkedOption.retailerId);
        }
        this.isShow = false;
      },
      visibleChange(val) {
        this.isShow = val;
        this.handleSearch();
      },
      handleSearch(curPage, pageSize) {
        if (this.title === '供应商') {
          //查询供应商
          this.$post('/orderPlacingMeetingController/querySupplierList', {
            commonRegionId: this.orderQueryData.commonRegionId,
            supplierNameOrCode: this.searchInput,
            supplierType: this.orderQueryData.supplierType,
            pageSize: pageSize || 10,
            curPage: curPage || 1
          }).then((rsp) => {
            this.tableData = rsp.rows;
            this.total = rsp.totalSize;
          });
        } else if (this.title === '零售商') {
          //查询零售商
          this.$post('/orderPlacingMeetingController/queryRetailerList', {
            commonRegionId: this.orderQueryData.commonRegionId,
            retailerNameorCode: this.searchInput,
            retailerType: this.orderQueryData.retailerType,
            pageSize: pageSize || 10,
            curPage: curPage || 1
          }).then((rsp) => {
            this.tableData = rsp.rows;
            this.total = rsp.totalSize;
          });
        }
      },
      pageChanged(curPage) {
        this.handleSearch(curPage);
      }
    },
    computed: {
      dialogTitle: function () {
        return this.dialog + this.title;
      }
    },
    watch: {
      'title': function () {
        if (this.title === '供应商') {
          this.tableTitle = this.tableSupplierTitle;
          this.isShowSupplierType = true; 
        } else if (this.title === '零售商') {
          this.tableTitle = this.tableRetailerTitle;
          this.isShowSupplierType = false;
        }
        this.handleSearch();
      },
      'disabled': function(){
        this.checkedOption.retailerName = '';
        this.checkedOption.supplierName = '';
      }
    },
    components: {
      DialogPopup,
      AreaSelect,
      Table,
      Pagination
    }
  }
</script>

<style lang="less">

  .choose-merchants {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 0px;
    flex: 1 0 0;
    .choose-input-box {
      position: relative;
      width: 100%;
      border: 1px solid #e5e5e5;
      height: 26px;
      font-size: 14px;
      cursor: pointer;
      .choose-input-icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 24px;
        height: 26px;
        background: #f9f9f9;
        color: #afafaf;
        border-left: 1px solid #e5e5e5;
        font-size: 14px;
        text-align: center;
        line-height: 26px;
        cursor: pointer;
      }
      .choose-input {
        border: none;
        width: calc(100% - 25px);
        height: 22px;
        color: #606266;
        font-size: 14px;
        vertical-align: top;
        cursor: pointer;
        .el-input__inner{
          height: 26px;
          line-height: 26px;
          border:0;
          vertical-align: top;
          cursor: pointer;
        }
        .el-input__suffix{
          top:2px;
        }
      }
      &.disabled{
        background-color: #f5f7fa;
        .choose-input{
          background-color: #f5f7fa;
          border-color: #e4e7ed;
          color: #c0c4cc;
          cursor: not-allowed;
        }
        .el-input__inner{
          background-color: #f5f7fa;
          color: #c0c4cc;
        }
        .choose-input-icon{
          background-color: #f5f7fa;
          border-color: #e4e7ed;
          color: #c0c4cc;
          cursor: not-allowed;
        }
      }
    }
    .dialog-choose-merchants {
      .el-dialog {
        width: 880px;
      }
    }
    .el-row {
      margin-bottom: 10px;
    }
    .form-group {
      border: 1px solid #d0d0d0;
      width: 100%;
      position: relative;
      label {
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
      .condition-select {
        width: calc(100% - 91px);
        height: 27px;
        margin-left: 91px;
        .el-input {
          width: 100%;
        }
        .el-input__inner {
          height: 27px;
          line-height: 27px;
          border-radius: 0;
          border: none;
          vertical-align: top;
          &:focus {
            border-color: #ff7a7a;
          }
          &:hover {
            border-color: #c0c4cc;
          }
        }
      }
    }
    .el-input-group--append .el-input__inner {
      border-radius: 0;
      height: 29px;
      line-height: 29px;
    }
    .v_pagination .el-pagination {
      margin-top: 10px;
    }
    .el-dialog--center .el-dialog__body {
      padding: 10px 20px 5px 20px;
      line-height: 27px;
    }
    .el-icon-arrow-down:before {
      font-family: 'iconfont';
      content: "\e614";
      font-size: 14px;
      color: #aaa;
    }
    .el-icon-arrow-up:before {
      color: #aaa;
    }
    .v_table .el-table th.is-leaf {
      background: #efefef;
    }
    .el-table td, .el-table th.is-leaf {
      border-color: #e6e6e6;
    }
    .el-table--small td, .el-table--small th {
      padding: 0;
    }
  }
</style>
