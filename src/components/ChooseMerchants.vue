<template>
  <div class="choose-merchants">
    
    <el-button type="text" @click="isShow = true" class="hover-btn">按钮</el-button>

    <DialogPopup :visible="isShow" :title="dialogTitle" @visibleChange="visibleChange">
      <div slot="content" class="pop-cnt">
        <el-row>
          <el-col :span="3">{{title}}列表：</el-col>
          <el-col :span="6">
            <div class="form-group">
              <label>所属省市：</label>
              <el-cascader v-model="orderQueryData.commonRegionId" :options="regionsList" @change="handleChange" :props="props"></el-cascader>
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
          retailerType: ''
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
        console.log(val[val.length - 1])
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
    .el-row{
      margin-bottom: 10px;
    }
    .form-group{
      width: 100%;
      position: relative;
      label{
        position: absolute;
        left: 0;
        top: 0;
        width: 90px;
        height: 29px;
        line-height: 29px;
      }
      .el-cascader{
        line-height: 27px;
      }
      .condition-select{
        width: calc(100% - 90px);
        height: 27px;
        margin-left: 80px;
        .el-input__inner{
          height: 27px;
          line-height: 27px;
        }
      }
      .el-cascader{
        margin: 0 0 0 80px;
        width: calc(100% - 90px);
        height: 27px;
        .el-input__inner{
          height: 27px;
          line-height: 27px;
          vertical-align: top;
        }
      }
    }
  }
</style>
