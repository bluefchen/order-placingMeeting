<template>
  <div class="cyj-deposit-addrecord">
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
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="condition-iterm">
              <label class="label-wrds">零售商名称：</label>
              <ChooseMerchants title="零售商" @selectOptions="selectRetailer" />
            </div>
          </el-col>
          <el-col :span="12">
              <div class="condition-iterm">
                <label class="label-wrds">订购起止日期：</label>
                <DatePicker class="condition-input" :value.sync="depositRecord.orderDate"/>
              </div>
          </el-col>
          <el-col :span="4">
            <el-button size="small" type="success" @click="queryOpmRetailerDepositList">诚意金付款查询</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="tabs-list box-1200">
        <div class="result-header">
          <TitlePlate title="定金补录结果列表"/>
          <router-link class="btns" to="/order/cyjImport"><i class="iconfont">&#xe6a8;</i> 诚意金导入</router-link>
        </div>
        <Table :tableTitle="tableTitle" :tableData="tableData"/>
        <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
      </div>
    </div>
  </div>
</template>

<script>
  import InputWithSelect from '@/components/InputWithSelect';
  import DeviceInfo from '@/components/DeviceInfo';
  import TitlePlate from '@/components/TitlePlate';
  import DatePicker from '@/components/DatePicker';
  import Table from '@/components/Table';
  import Breadcrumb from '@/components/Breadcrumb';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';

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
          width: 180
        }, {
          label: '零售商名称',
          prop: 'retailerName'
        }, {
          label: '零售商类型',
          prop: 'retailerTypeName',
          width: 150
        }, {
          label: '日期',
          prop: 'paymentDt',
          width: 180
        }, {
          label: '已交诚意金金额',
          prop: 'payDepositAmount',
          width: 200,
          render: function (h, params) {
            return h({
              template: '<p class="text-tag-danger">{{payDepositAmount}}</p>',
              data: function () {
                return {
                  payDepositAmount: params.row.payDepositAmount
                }
              }
            })
          }
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
      selectRetailer(val){
        this.depositRecord.retailerId = val;
      },
      showMoreCondition() {
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
      queryOpmRetailerDepositList(curPage, pageSize) {
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
      }
    },
    components: {
      InputWithSelect,
      DeviceInfo,
      DatePicker,
      Table,
      TitlePlate,
      Breadcrumb,
      Pagination,
      ChooseMerchants
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/css/mixin";
  .cyj-deposit-addrecord {
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
    .search {
      position: relative;
      margin: 10px auto;
      .category-more {
        position: absolute;
        top: 0px;
        left: 500px;
        color: #151515;
        text-decoration: none;
      }
    }
    .el-row {
      width: 100%;
    }

    /* 条件搜索 */
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
    .tabs-list {
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
    }

    .btns {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 10px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 28px;
      text-decoration: none;
      &:hover {
        background-color: #e20606;
      }
    }
  }
</style>
