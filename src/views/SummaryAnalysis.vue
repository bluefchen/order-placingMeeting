<template>
  <div class="order_summary-statistical-analysis">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['首页', '统计查询', '机型汇总统计']"/>
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
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">产品类型：</label>
            <Select :clearable="true" :value.sync="isCentman" :options="isCentmanList"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">终端品牌：</label>
            <SelectComponents :model="'letter'" :placement="'bottom-start'"
                              :value.sync="modelQueryData.brandCd" :list="brandOptions" :width="650"/>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">终端型号：</label>
            <SelectComponents :disabled="!modelOptions.length" :model="'letter'" :placement="'bottom-end'"
                              :value.sync="modelQueryData.offerModelId" :list="modelOptions" :width="650"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">终端名称：</label>
            <Input :value.sync="offerName"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <el-button size="small" type="success" @click="queryOpmOrderOfferPickupReport()">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="机型汇总统计"/>
      </div>
      <Table :tableTitle="tableTitle" :tableData="tableData"/>
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import SelectComponents from '@/components/SelectComponents';
  import AreaSelect from '@/components/AreaSelect';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';

  export default {
    name: 'summaryAnalysis',
    created() {
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
      this.$post('/orderPlacingMeetingController/queryOfferBrandList').then((rsp) => {
        _.forEach(rsp, (item) => {
          this.brandOptions.push({
            value: item.brandCd,
            label: item.brandName,
            firstLetter: item.firstLetter
          })
        })
      });
      this.queryOpmOrderOfferPickupReport();
    },
    data() {
      return {
        opMeetingInfo: null, //订货会基本信息
        commonRegionId: '',
        isCentman: '',
        isCentmanList: [{ //产品类型列表
          value: 'Y',
          label: '集采'
        }, {
          value: 'N',
          label: '社采'
        }],
        modelQueryData: {
          brandCd: '',
          offerModelId: ''
        },
        brandOptions: [],
        modelOptions: [],
        offerName: '',
        tableTitle: [{
          label: '省份',
          prop: 'commonRegionName',
          width: 160
        }, {
          label: '终端名称',
          prop: 'offerName',
          width: 160
        }, {
          label: '终端品牌',
          prop: 'brandName',
          width: 160
        }, {
          label: '终端型号',
          prop: 'offerModelName'
        }, {
          label: '产品类型',
          prop: 'isCentman',
          width: 80,
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
          label: '定购总数量',
          prop: 'offerQty',
          width: 160
        }, {
          label: '提货总数量',
          prop: 'pickupGoodsAmount',
          width: 160
        }],
        tableData: [], //查询返回的数据
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      qryOfferModelList(val) {
        this.$post('/orderPlacingMeetingController/queryOfferModelList', {
          'brandCd': val
        }).then((rsp) => {
          _.forEach(rsp, (item) => {
            this.modelOptions.push({
              value: item.offerModelId,
              label: item.offerModelName,
              firstLetter: item.firstLetter
            })
          });
        });
      },
      queryOpmOrderOfferPickupReport(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmOrderController/queryOpmOrderOfferPickupReport', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          commonRegionId: this.commonRegionId,
          isCentman: this.isCentman,
          offerName: this.offerName,
          brandCd: this.modelQueryData.brandCd,
          offerModelId: this.modelQueryData.offerModelId,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.queryOpmOrderOfferPickupReport(curPage);
      }
    },
    watch: {
      'modelQueryData.brandCd': function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.modelOptions = [];
          if (newVal) {
            this.qryOfferModelList(newVal);
          }
          this.modelQueryData.offerModelId = '';
        }
      }
    },
    components: {
      Breadcrumb,
      TitlePlate,
      Input,
      AreaSelect,
      Select,
      SelectComponents,
      Table,
      Pagination,
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
  }
</style>
