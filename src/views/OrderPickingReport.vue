<template>
  <div class="order_summary-statistical-analysis">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['首页', '统计查询', '订单提货上报']"/>
      </div>
    </div>

    <!-- 条件搜索 -->
    <div class="box-1200 condition-search">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">省份：</label>
            <AreaSelect :clearable="true" :value.sync="commonRegionId"/>
          </div>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="condition-item">
            <el-button size="small" type="success" @click="queryOpmOrderPickupAnal()">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="各省订单提货上报分析"/>
      </div>
      <div class="result-table">
        <Table :tableTitle="tableTitle" :tableData="tableData"/>
      </div>
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';
  import Input from '@/components/Input';
  import AreaSelect from '@/components/AreaSelect';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';
  
  export default {
    name: 'OrderPickingReport',
    created() {
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
      this.queryOpmOrderPickupAnal();
    },
    data() {
      return {
        opMeetingInfo: null, //订货会基本信息
        commonRegionId: '',
        tableTitle: [{
          label: '省份',
          prop: 'commonRegionName'
        }, {
          label: '订单总量',
          prop: 'offerQty'
        }, {
          label: '订单提货上报量',
          prop: 'pickupGoodsAmount',
          render: (h, params) => {
            return h({
              template: '<div class="link-btn" @click="qryOrderPickupInfo(data.row)"><a>{{data.row.pickupGoodsAmount}}</a></div>',
              data() {
                return {
                  data: params
                }
              },
              methods: {
                qryOrderPickupInfo(item) {
                  this.$router.push({
                    path: '/order/orderPickingDetail',
                    query: {
                    }
                  });
                },
              }
            });
          }
        }, {
          label: '未提货量',
          prop: 'notPickupGoodsAmount'
        }],
        tableData: [], //查询返回的数据
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      queryOpmOrderPickupAnal(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmOrderController/queryOpmOrderPickupAnal', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          commonRegionId: this.commonRegionId,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.queryOpmOrderPickupAnal(curPage);
      }
    },
    components: {
      Breadcrumb,
      TitlePlate,
      Table,
      Pagination,
      Input,
      AreaSelect,
      MiddleImgInfoSmall
    }
  }
</script>

<style scoped lang="less">
  .order_summary-statistical-analysis {
    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
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
      display: inline-block;
      padding: 0 12px;
      margin-left: 2px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 28px;
      text-decoration: none;
    }

    .buttons .btns:hover {
      background-color: #e20606;
    }
  }
</style>
