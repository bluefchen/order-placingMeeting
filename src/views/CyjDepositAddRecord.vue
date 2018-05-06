<template>
  <div>
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info">
        <p class="p-titl">2018夏季VIVO品牌新品订货会即将开启</p>
        <div class="activity">
          <p>活动日期：2018/04/10-2018/04/11</p>
          <p>活动地址：XXX市XXXXXXXXX街XXX路XX号</p>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['定金管理', '诚意金补录']"/>
        </div>
      </div>

      <!-- 条件搜索 -->
      <div class="condition-search box-1200">
        <div class="condition-iterm wid25">
          <label class="label-wrds">零售商名称：</label>
          <input type="text" class="condition-input" v-model="depositRecord.retailerId">
        </div>
        <div class="condition-iterm wid40">
          <label class="label-wrds">订购起止日期：</label>
          <el-date-picker
            v-model="depositRecord.orderDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div class="condition-iterm wid10">
          <el-button class="btns" @click="queryOpmRetailerDepositList">诚意金付款查询</el-button>
        </div>
      </div>
      
      <div class="tabs-list box-1200">
        <div class="result-header">
          <TitlePlate title="定金补录结果列表"/>         
          <el-button class="btns" @click="cyjImport()"><i class="iconfont">&#xe6a8;</i> 诚意金导入</el-button>
        </div>
        <Table :stripe="false" :border="false" :tableTitle="tableTitle" :tableData="tableData"/>
        <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
      </div>
    </div>
  </div>
</template>

<script>
  import InputWithSelect from '@/components/InputWithSelect';
  import DeviceInfo from '@/components/DeviceInfo';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Breadcrumb from '@/components/Breadcrumb';
  import Pagination from '@/components/Pagination';

  export default {
    name: 'CyjDepositAddRecord',
    created() {

    },
    data() {
      return {
        depositRecord: {
          isCentman: '',
          offerNameOrCode: '',
          opmOrderNo: '',
          retailerId: '',
          orderDate: []
        },
        total: 1, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1, //当前页
        tableTitle: [{
          label: '零售商编码',
          prop: 'retailerCode',
          width: 154
        }, {
          label: '零售商名称',
          prop: 'retailerName',
          width: 320
        }, {
          label: '零售商类型',
          prop: 'retailerTypeName',
          width: 150
        }, {
          label: '日期',
          prop: 'paymentDate', 
          width: 180                   
        }, {
          label: '已交诚意金金额',
          prop: 'payDepositAmount',
          width: 200,
          render: function (h, params) {
            return h({
              template: '<p class="red">{{payDepositAmount}}</p>',
              data: function () {
                return {
                  payDepositAmount: params.row.payDepositAmount
                }
              }
            })
          }    
        }, {
          label: '状态',
          prop: 'paymentStatusCdName'
        }],
        tableData: [],
      }
    },
    methods: {
      search(obj) {
        this.depositRecord.isCentman = obj.type;
        this.depositRecord.offerNameOrCode = obj.value;
        this.queryOpmRetailerDepositList();
      },
      showMoreCondition(){
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
      queryOpmRetailerDepositList(curPage, pageSize){
        this.currentPage = curPage || 1;
        this.$post('/opmDepositController/queryOpmRetailerDepositList', {
          opMeetingId: '订货会ID',
          retailerId: this.depositRecord.retailerId,
          fromDate: this.depositRecord.orderDate[0],
          toDate: this.depositRecord.orderDate[1],
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {   
          this.tableData = rsp.rows;          
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.queryOpmRetailerDepositList(curPage);
      },
      cyjImport(){
        this.$router.push({
          path: '/order/cyjImport'
        });
      }
    },
    components: {
      InputWithSelect,
      DeviceInfo,
      Table,
      TitlePlate,
      Breadcrumb,
      Pagination
    }
  }
</script>

<style lang="less">
  @import "../assets/css/mixin";

  /*中间背景图片*/
  .img-bg {
    width: 100%;
    height: 200px;
    background: #e4273f;
    .info {
      width: 1036px;
      height: 200px;
      margin: 0 auto;
      background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat right bottom;
      overflow: hidden;
      .p-titl {
        margin: 62px 0 0 0;
        font-size: 22px;
        color: #fcfdff;
      }
      .activity {
        width: 306px;
        margin: 10px 0 0 0;
        line-height: 18px;
        font-size: 12px;
        color: #fcfdff;
        text-align: center;
      }
    }
  }

  /*中间背景图片*/
  .my-location {
    height: 30px;
    line-height: 30px;
    background-color: #f6f6f6;
  }

  .my-location label {
    color: #aaa;
  }

  .location-p {
    display: inline-block;
  }

  .red {
    color: #f82134;
  }

  .green {
    color: #46b02e;
  }

  .search {
    position: relative;
    margin: 10px auto;
    .category-more{
      position: absolute;
      top: 0px;
      left: 500px;
      color: #151515;
      text-decoration: none;
    }
  }
  
  /* 条件搜索 */
  .condition-search{
    display: flex;
    height: 72px;
    margin: 10px auto  14px;
    border: 1px solid #dfdfdf;
    .condition-iterm{
      position: relative;
      margin: 20px 30px 0 0;
      .label-wrds{
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        line-height: 32px;
        font-size: 14px;
        text-align: right;
      }
      .condition-input{
        width: calc(100% - 20px - 100px);
        height: 24px;
        padding: 3px 10px;
        margin-left: 100px; 
        border: 1px solid #e5e5e5;
      }
      .btns{
        left: 15px;
        line-height: 31px;
        padding: 0 10px;
        font-size: 14px;
      }
    }
  }
  .search-cnt .search[data-v-2eed8ffc]{
    margin-top:0;
  }
  .el-range-editor.el-input__inner{
    margin-left: 110px;
    height: 32px;
    line-height: 30px;
    border-radius: 0;
  }
  .el-date-editor .el-range__icon{
    line-height: 27px;
  }
  .el-date-editor .el-range-separator{
    line-height: 27px;
  }
  .el-date-editor .el-range__close-icon{
    line-height: 27px;
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
  .wid40{
    width: 40%;
  }
  .wid25{
    width: 25%;
  }
  .wid10{
    width: 10%;
  }

  .tabs-list{
    margin: 0 auto;
    padding: 0 0 20px;
    .result-header {
      position: relative;
      height: 28px;
      margin: 0 0 8px;
      line-height: 28px;
      .result-info {
        position: absolute;
        top: 0;
        right: 0;

        > span {
          color: #f82134;
        }

        > b {
          margin: 0 3px;
          color: #f82134;
          font-size: 14px;
        }
      }      
    }
    .router{
      cursor: pointer;
    }
  }
  
  .btns{
    position: absolute;
    top: 0;
    right:0;
    padding: 0 20px;
    border:0;
    background-color: #fa0000;
    color:#fff;
    font-size: 12px;
    border-radius: 3px;
    line-height: 28px;
    &:hover{
      background-color: #e20606;
    }
  }

  .v_table .el-table, .v_table .el-table__expanded-cell{
    border: 1px solid #e6e6e6;
    border-bottom: 0;
  }
  .v_pagination .el-pagination{
    margin-bottom: 20px;
  }
  .el-table__header{
    th{
      border-right: 1px solid #e6e6e6;
    }
  }
  .el-table--small td, .el-table--small th{
    padding: 4px 0;
  }
  .el-table__body{
    td{
      border-right: 1px solid #e6e6e6;
    }  
  }
</style>
