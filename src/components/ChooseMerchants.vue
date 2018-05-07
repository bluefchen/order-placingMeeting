<template>
  <div class="choose-merchants">

    <div class="choose-input-box" @click="isShow = true">
      <input class="choose-input" type="text" readonly />
      <div class="choose-input-icon"><span class="iconfont">&#xe65a;</span></div>
    </div>

    <DialogPopup :visible="isShow" :title="dialogTitle" @visibleChange="visibleChange">
      <div slot="content" class="pop-cnt">
        <el-row :gutter="10">
          <el-col :span="3">{{title}}列表：</el-col>
          <el-col :span="6">
            <div class="form-group">
              <label>所属省市：</label>
              <el-cascader :options="regionsList" @change="handleChange" :props="props"></el-cascader>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-group">
              <label>{{title}}类型：</label>
              <el-select v-if="isShowSupplierType" class="condition-select" v-model="orderQueryData.supplierType" placeholder="请选择">
                <el-option v-for="item in supplierTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-if="!isShowSupplierType" class="condition-select" v-model="orderQueryData.retailerType" placeholder="请选择">
                <el-option v-for="item in retailerTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="9">
            <el-input placeholder="输入终端编码或名称搜索" v-model="searchInput" size="small">
              <el-button slot="append" @click="handleSearch()">确定</el-button>
            </el-input>
          </el-col>
        </el-row>
        <Table :stripe="false" :border="true" :isSelection="true" :tableTitle="tableTitle" :tableData="tableData"/>
        <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>

      </div>
      <div slot="footer">
        <el-button type="success" @click="isShow = false">关闭</el-button>
      </div>
    </DialogPopup>
  </div>
</template>

<script>
  import DialogPopup from '@/components/DialogPopup';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';

  export default {
    name: 'ChooseMerchants',
    props: {
      title: {
        type: String,
        require: true
      }
    },
    created() {
      this.dialogTitle = this.dialog + this.title;
      if(this.title === '供应商'){
        this.tableTitle = this.tableSupplierTitle;
        this.isShowSupplierType = true;
      }else if(this.title === '零售商'){
        this.tableTitle = this.tableRetailerTitle;
        this.isShowSupplierType = false;
      };
      this.handleSearch();
    },
    data() {
      return {
        dialog: '选择添加',
        dialogTitle: '',
        isShowSupplierType: true,

        isShow: false,
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
        },{
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
          children: 'children'
        },

        searchInput: '',

        //供应商表头
        tableSupplierTitle: [{
          label: '省份',
          prop: 'province',
        },{
          label: '地市',
          prop: 'city',
        },{
          label: '供应商编码',
          prop: 'supplierCode',
        },{
          label: '供应商名称',
          prop: 'supplierName',
        },{
          label: '供应商类型',
          prop: 'supplierTypeName',
        },{
          label: '联系人',
          prop: 'linkMan',
        },{
          label: '联系电话',
          prop: 'linkNbr',
        },{
          label: '公司电话',
          prop: 'supplierPhone',
        },{
          label: '公司传真',
          prop: 'supplierFax',
        }],

        //零售商表头
        tableRetailerTitle: [{
          label: '省份',
          prop: 'province',
        },{
          label: '地市',
          prop: 'city',
        },{
          label: '零售商编码',
          prop: 'retailerCode',
        },{
          label: '零售商名称',
          prop: 'retailerName',
        },{
          label: '零售商类型',
          prop: 'retailerTypeName',
        },{
          label: '联系人',
          prop: 'linkMan',
        },{
          label: '联系电话',
          prop: 'linkNbr',
        },{
          label: '公司电话',
          prop: 'retailerPhone',
        },{
          label: '公司传真',
          prop: 'retailerFax',
        }],

        tableData: [],

        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页

      }
    },
    methods: {
      visibleChange(val) {
        this.isShow = val;
      },
      handleChange(val){
        this.orderQueryData.commonRegionId = val[val.length - 1];
        console.log(this.orderQueryData.commonRegionId)
      },
      handleSearch(curPage, pageSize){
        if(this.title === '供应商'){
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
        }else if(this.title === '零售商'){
          //查询零售商
          this.$post('/orderPlacingMeetingController/queryRetailerList', {
            commonRegionId: this.orderQueryData.commonRegionId,
            retailerNameorCode:  this.searchInput,
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
    components: {
      DialogPopup,
      Table,
      Pagination
    }
  }
</script>

<style lang="less">
  .choose-merchants{
    .choose-input-box{
      margin-left:300px;
      position: relative;
      width: 200px;
      border: 1px solid #e5e5e5;
      .choose-input-icon{
        position: absolute;
        right: 0;
        top: 0;
        width: 24px;
        height: 30px;
        background: #f9f9f9;
        color: #afafaf;
        border-left: 1px solid #e5e5e5;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
      }
      .choose-input{
        border: none;
        width: calc(100% - 45px);
        height: 24px;
        padding: 3px 10px;
        cursor: pointer;
      }
    }
    .el-row{
      margin-bottom: 10px;
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
      .el-cascader{
        line-height: 27px;
        .el-input__icon{
          line-height: 27px;
        }
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
  }
  .el-cascader-menu__item.is-active, .el-cascader-menu__item:focus:not(:active){
    color: #fff;
    font-weight: normal;
    background-color: #f13939;
  }
</style>
