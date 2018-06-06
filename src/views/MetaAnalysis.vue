<template>
  <div class="order_meta-analysis">
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
    <!-- 中间背景图片 -->

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['首页', '统计查询', '全国汇总分析']"/>
      </div>
    </div>

    <div class="box-1200">
      <el-tabs v-model="activeName">
        <el-tab-pane label="按机型" name="first">
          <div class="condition-search fn-clear">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="condition-item">
                  <label class="label-wrds">终端名称：</label>
                  <Input class="condition-input" :value.sync="orderQueryData.opmOrderNo"/>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="condition-item">
                  <label class="label-wrds">终端品牌：</label>
                  <Select class="condition-input" :value.sync="orderQueryData.userType" :options="usermanList"/>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="condition-item">
                  <label class="label-wrds">终端型号：</label>
                  <Select class="condition-input" :value.sync="orderQueryData.userType" :options="usermanList"/>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="condition-item text-right">
                  <el-button size="small" type="success" @click="onSubmit">查询</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="tabs-list">
            <div class="order-titl fn-clear">
              <TitlePlate class="fn-left" title="全国机型销量统计"/>
              <div class="buttons fn-right">
                <button class="btns"><i class="iconfont">&#xe654;</i> 导出</button>
              </div>
            </div>
            <div class="result-table">
              <Table :border="false" :tableTitle="tableTitle" :tableData="tableData"/>
            </div>
            <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按品牌" name="second">
          <div class="condition-search fn-clear">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="condition-item">
                  <label class="label-wrds">终端名称：</label>
                  <Input class="condition-input" :value.sync="orderQueryData.opmOrderNo"/>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="condition-item">
                  <label class="label-wrds">终端品牌：</label>
                  <Select class="condition-input" :value.sync="orderQueryData.userType" :options="usermanList"/>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="condition-item">
                  <el-button size="small" type="success" @click="onSubmit">查询</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="tabs-list">
            <div class="order-titl fn-clear">
              <TitlePlate class="fn-left" title="全国终端品牌销量统计"/>
              <div class="buttons fn-right">
                <button class="btns"><i class="iconfont">&#xe654;</i> 导出</button>
              </div>
            </div>
            <div class="result-table">
              <Table :border="false" :tableTitle="brandTableTitle" :tableData="brandTableData"/>
            </div>
            <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按商户" name="third">
          <div class="condition-search fn-clear">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="condition-item">
                  <label class="label-wrds">商户类型：</label>
                  <Select class="condition-input" :value.sync="orderQueryData.userType" :options="usermanList"/>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="condition-item">
                  <label class="label-wrds">商户名称：</label>
                  <Input :value.sync="orderQueryData.opmOrderNo"/>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="condition-item">
                  <el-button size="small" type="success" @click="onSubmit">查询</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="tabs-list">
            <div class="order-titl fn-clear">
              <TitlePlate class="fn-left" title="全国商户订购量统计"/>
              <div class="buttons fn-right">
                <button class="btns"><i class="iconfont">&#xe654;</i> 导出</button>
              </div>
            </div>
            <div class="result-table">
              <Table :border="false" :tableTitle="BusinessTableTitle" :tableData="BusinessTableData"/>
            </div>
            <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';

  export default {
    name: 'MetaAnalysis',
    created() {
    },
    data() {
      return {
        activeName: 'first',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        usermanList: [],


        tableTitle: [{
          label: '排名',
          prop: 'rank',
          width: 160,
        }, {
          label: '终端型号',
          prop: 'offerModelName'
        }, {
          label: '终端品牌',
          prop: 'brandName'
        }, {
          label: '订购量',
          prop: 'offerQty'
        }, {
          label: '提货量',
          prop: 'pickupGoodsAmount'
        }],
        tableData: [{
          rank: '1',
          offerModelName: '12',
          brandName: '12341234',
          offerQty: '123',
          pickupGoodsAmount: '123'
        },{
          rank: '1',
          offerModelName: '12',
          brandName: '12341234',
          offerQty: '123',
          pickupGoodsAmount: '123'
        }],

        brandTableTitle: [{
          label: '排名',
          prop: 'rank',
          width: 160,
        }, {
          label: '终端品牌',
          prop: 'brandName'
        }, {
          label: '订购量',
          prop: 'offerQty'
        }, {
          label: '提货量',
          prop: 'pickupGoodsAmount'
        }],
        brandTableData: [{
          rank: '1',
          offerModelName: '12',
          brandName: '12341234',
          offerQty: '123',
          pickupGoodsAmount: '123'
        },{
          rank: '1',
          offerModelName: '12',
          brandName: '12341234',
          offerQty: '123',
          pickupGoodsAmount: '123'
        }],

        BusinessTableTitle: [{
          label: '排名',
          prop: 'rank',
          width: 160,
        }, {
          label: '商户名称',
          prop: 'brandName'
        }, {
          label: '商户类型',
          prop: 'busiType'
        }, {
          label: '订购量',
          prop: 'offerQty'
        }, {
          label: '提货量',
          prop: 'pickupGoodsAmount'
        }],
        BusinessTableData: [{
          rank: '1',
          brandName: '12',
          busiType: '12341234',
          offerQty: '123',
          pickupGoodsAmount: '123'
        },{
          rank: '1',
          brandName: '12',
          busiType: '12341234',
          offerQty: '123',
          pickupGoodsAmount: '123'
        }],

        orderQueryData: {
          isCentman: '',
          offerNameOrCode: '',
          opmOrderNo: '',
          retailerId: '',
          dateValue: [],
          supplierId: '',
          statusCd: ''
        },
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      pageChanged(curPage) {
        // this.queryOpmOrderSubmit(curPage);
      }
    },
    components: {
      Breadcrumb,
      Input,
      Select,
      TitlePlate,
      Table,
      Pagination
    }
  }
</script>

<style lang="less">
  .order_meta-analysis {
    /*中间背景图片*/
    .img-bg {
      width: 100%;
      height: 200px;
      background: #e4273f;
    }
    .img-bg .info {
      width: 1036px;
      height: 200px;
      margin: 0 auto;
      background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat right bottom;
      overflow: hidden;
    }
    .img-bg .info .p-titl {
      margin: 62px 0 0 0;
      font-size: 22px;
      color: #fcfdff;
    }
    .img-bg .info .activity {
      width: 306px;
      margin: 10px 0 0 0;
      line-height: 18px;
      font-size: 12px;
      color: #fcfdff;
      text-align: center;
    }
    /*中间背景图片*/

    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }

    .tabs-list {
      margin: 0 auto 20px;
      .result-table{
        border: 1px solid #ebeef5;
        border-bottom: none;
      }
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
    }

    .buttons .btns {
      padding: 0 16px;
      margin-left: 2px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 28px;
      cursor: pointer;
    }
    .buttons .btns:hover {
      background-color: #e20606;
    }

    .text-right{
      text-align: right;
    }

    .el-tabs__nav-wrap{
      height: 48px;
    }
    .el-tabs__item{
      width: 100px;
      text-align: center;
      font-size: 18px;
      height: 48px;
      line-height: 48px;
      &.is-active {
        color: #fa0000;
      }
      &:hover {
        color: #fa0000;
        cursor: pointer;
      }
      &:nth-child(3){
        position: relative;
        &:after{
          position: absolute;
          content: '';
          left: 0;
          top: 50%;
          height: 17px;
          margin-top: -8px;
          width: 100%;
          border-left: 1px solid #e6e6e6;
          border-right: 1px solid #e6e6e6;
        }
      }
    }
    .el-tabs__active-bar{
      background-color: #fa0000;
    }

  }
</style>
