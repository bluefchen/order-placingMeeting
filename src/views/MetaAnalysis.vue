<template>
  <div class="order_meta-analysis">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>
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
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">终端名称：</label>
                  <Input :value.sync="modelQueryData.offerName"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">终端品牌：</label>
                  <SelectComponents :model="'letter'" :placement="'bottom-start'"
                                    :value.sync="modelQueryData.brandCd" :list="brandOptions" :width="650"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">终端型号：</label>
                  <SelectComponents :model="'letter'" :placement="'bottom-end'"
                                    :value.sync="modelQueryData.offerModelId" :list="modelOptions" :width="650"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <el-button size="small" type="success" @click="qryOpmOrderPickupReportByModel()">查询</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="tabs-list">
            <div class="order-titl fn-clear">
              <TitlePlate class="fn-left" title="全国机型销量统计"/>
              <div class="buttons fn-right">
                <button class="btns" @click="exportOpmOrderPickupReportByModel"><i class="iconfont">&#xe654;</i> 导出
                </button>
              </div>
            </div>
            <div class="result-table">
              <Table :tableTitle="tableTitle" :tableData="tableData"/>
            </div>
            <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按品牌" name="second">
          <div class="condition-search fn-clear">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">终端名称：</label>
                  <Input :value.sync="brandQueryData.offerName"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">终端品牌：</label>
                  <SelectComponents :model="'letter'" :placement="'bottom-start'"
                                    :value.sync="brandQueryData.brandCd" :list="brandOptions" :width="650"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <el-button size="small" type="success" @click="queryOpmOrderPickupReportByBrand()">查询</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="tabs-list">
            <div class="order-titl fn-clear">
              <TitlePlate class="fn-left" title="全国终端品牌销量统计"/>
              <div class="buttons fn-right">
                <button class="btns" @click="exportOpmOrderPickupReportByBrand"><i class="iconfont">&#xe654;</i> 导出
                </button>
              </div>
            </div>
            <div class="result-table">
              <Table :tableTitle="brandTableTitle" :tableData="brandTableData"/>
            </div>
            <Pagination :total="brandTotal" :pageSize="pageSize" :currentPage="brandCurrentPage"
                        @pageChanged="brandPageChanged"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按商户" name="third">
          <div class="condition-search fn-clear">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">商户类型：</label>
                  <Select :value.sync="busiQueryData.busiType" :options="merchantsTypeList"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">商户名称：</label>
                  <Input :value.sync="busiQueryData.busiName"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <el-button size="small" type="success" @click="qryOpmOrderPickupReportByBusi()">查询</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="tabs-list">
            <div class="order-titl fn-clear">
              <TitlePlate class="fn-left" title="全国商户订购量统计"/>
              <div class="buttons fn-right">
                <button class="btns" @click="exportOpmOrderPickupReportByBusi"><i class="iconfont">&#xe654;</i> 导出
                </button>
              </div>
            </div>
            <div class="result-table">
              <Table :tableTitle="BusinessTableTitle" :tableData="BusinessTableData"/>
            </div>
            <Pagination :total="busiTotal" :pageSize="pageSize" :currentPage="busiCurrentPage"
                        @pageChanged="busiPageChanged"/>
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
  import SelectComponents from '@/components/SelectComponents';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';

  export default {
    name: 'MetaAnalysis',
    created() {
      this.opMeetingInfo = JSON.parse(sessionStorage.getItem('opMeeting'));
      this.$post('/orderPlacingMeetingController/queryOfferBrandList').then((rsp) => {
        _.forEach(rsp, (item) => {
          this.brandOptions.push({
            value: item.brandCd,
            label: item.brandName,
            firstLetter: item.firstLetter
          })
        })
      });
      this.qryOpmOrderPickupReportByModel();
      this.queryOpmOrderPickupReportByBrand();
      this.qryOpmOrderPickupReportByBusi();
    },
    data() {
      return {
        opMeetingInfo: null,
        activeName: 'first', //默认按机型显示
        tableTitle: [{
          label: '排名',
          prop: 'rank',
          width: 120
        }, {
          label: '终端型号',
          prop: 'offerModelName'
        }, {
          label: '终端品牌',
          prop: 'brandName'
        }, {
          label: 'A阶段定购总数量',
          prop: 'aOfferQty',
          width: 160
        }, {
          label: 'B阶段定购总数量',
          prop: 'bOfferQty',
          width: 160
        }, {
          label: '订购量',
          prop: 'offerQty',
          width: 160
        }, {
          label: '提货量',
          prop: 'pickupGoodsAmount',
          width: 160
        }],
        tableData: [],
        brandTableTitle: [{
          label: '排名',
          prop: 'rank',
          width: 120,
        }, {
          label: '终端品牌',
          prop: 'brandName'
        }, {
          label: 'A阶段定购总数量',
          prop: 'aOfferQty',
          width: 200
        }, {
          label: 'B阶段定购总数量',
          prop: 'bOfferQty',
          width: 200
        }, {
          label: '订购量',
          prop: 'offerQty',
          width: 200
        }, {
          label: '提货量',
          prop: 'pickupGoodsAmount',
          width: 200
        }],
        brandTableData: [],
        BusinessTableTitle: [{
          label: '排名',
          prop: 'rank',
          width: 120
        }, {
          label: '商户名称',
          prop: 'busiName'
        }, {
          label: '商户类型',
          prop: 'busiType',
          width: 120,
          render: (h, params) => {
            return h({
              template: `<div>
              <span v-if="data.row.busiType === '1001'">自营厅</span>
              <span v-if="data.row.busiType === '1002'">大连锁</span>
              <span v-if="data.row.busiType === '1003'">代理商</span>
              <span v-if="data.row.busiType === '1004'">其他</span>
              </div>`,
              data() {
                return {
                  data: params,
                }
              }
            });
          }
        }, {
          label: 'A阶段定购总数量',
          prop: 'aOfferQty',
          width: 180
        }, {
          label: 'B阶段定购总数量',
          prop: 'bOfferQty',
          width: 180
        }, {
          label: '订购量',
          prop: 'offerQty',
          width: 180
        }, {
          label: '提货量',
          prop: 'pickupGoodsAmount',
          width: 180
        }],
        BusinessTableData: [],
        brandOptions: [],
        modelOptions: [],
        merchantsTypeList: [{
          value: '1001',
          label: '自营厅'
        }, {
          value: '1002',
          label: '大连锁'
        }, {
          value: '1003',
          label: '代理商'
        }, {
          value: '1004',
          label: '其他'
        }],
        modelQueryData: {
          offerName: '',
          brandCd: '',
          offerModelId: ''
        },
        brandQueryData: {
          offerName: '',
          brandCd: ''
        },
        busiQueryData: {
          busiType: '',
          busiName: ''
        },
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1, //当前页
        brandTotal: 0,
        brandCurrentPage: 1,
        busiTotal: 0,
        busiCurrentPage: 1
      }
    },
    methods: {
      //查询型号
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
      //按机型查询
      qryOpmOrderPickupReportByModel(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmOrderController/queryOpmOrderPickupReportByModel', {
          'opMeetingId': this.opMeetingInfo.opMeetingId,
          'offerName': this.modelQueryData.offerName,
          'brandCd': this.modelQueryData.brandCd,
          'offerModelId': this.modelQueryData.offerModelId,
          'pageSize': pageSize || 10,
          'curPage': curPage || 1
        }).then((rsp) => {
          this.total = rsp.totalSize;
          this.tableData = rsp.rows;
        });
      },
      //按机型导出
      exportOpmOrderPickupReportByModel() {
        location.href = this.$global.fileUrl + '/orderPlacingMeeting/opmOrderController/exportOpmOrderPickupReportByModel?opMeetingId=' + this.opMeetingInfo.opMeetingId + '&offerName=' + this.modelQueryData.offerName + '&brandCd=' + this.modelQueryData.brandCd + '&offerModelId=' + this.modelQueryData.offerModelId;
      },
      pageChanged(curPage) {
        this.qryOpmOrderPickupReportByModel(curPage);
      },

      //按品牌查询
      queryOpmOrderPickupReportByBrand(curPage, pageSize) {
        this.brandCurrentPage = curPage || 1;
        this.$post('/opmOrderController/queryOpmOrderPickupReportByBrand', {
          'opMeetingId': this.opMeetingInfo.opMeetingId,
          'offerName': this.brandQueryData.offerName,
          'brandCd': this.brandQueryData.brandCd,
          'pageSize': pageSize || 10,
          'curPage': curPage || 1
        }).then((rsp) => {
          this.brandTotal = rsp.totalSize;
          this.brandTableData = rsp.rows;
        });
      },
      //按品牌导出
      exportOpmOrderPickupReportByBrand() {
        location.href = this.$global.fileUrl + '/orderPlacingMeeting/opmOrderController/exportOpmOrderPickupReportByBrand?opMeetingId=' + this.opMeetingInfo.opMeetingId + '&offerName=' + this.modelQueryData.offerName + '&brandCd=' + this.modelQueryData.brandCd;
      },
      brandPageChanged(curPage) {
        this.queryOpmOrderPickupReportByBrand(curPage);
      },

      //按商户查询
      qryOpmOrderPickupReportByBusi(curPage, pageSize) {
        this.busiCurrentPage = curPage || 1;
        this.$post('/opmOrderController/queryOpmOrderPickupReportByBusi', {
          'opMeetingId': this.opMeetingInfo.opMeetingId,
          'busiName': this.busiQueryData.busiName,
          'busiType': this.busiQueryData.busiType,
          'pageSize': pageSize || 10,
          'curPage': curPage || 1
        }).then((rsp) => {
          this.busiTotal = rsp.totalSize;
          this.BusinessTableData = rsp.rows;
        });
      },
      //按商户导出
      exportOpmOrderPickupReportByBusi() {
        location.href = this.$global.fileUrl + '/orderPlacingMeeting/opmOrderController/exportOpmOrderPickupReportByBusi?opMeetingId=' + this.opMeetingInfo.opMeetingId + '&busiType=' + this.busiQueryData.busiType + '&busiName=' + this.busiQueryData.busiName;
      },
      busiPageChanged(curPage) {
        this.qryOpmOrderPickupReportByBusi(curPage);
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
      Input,
      Select,
      SelectComponents,
      TitlePlate,
      Table,
      Pagination,
      MiddleImgInfoSmall
    }
  }
</script>

<style lang="less">
  .order_meta-analysis {
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

    .text-right {
      text-align: right;
    }

    .el-tabs__nav-wrap {
      height: 48px;
    }
    .el-tabs__item {
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
      &:nth-child(3) {
        position: relative;
        &:after {
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
    .el-tabs__active-bar {
      background-color: #fa0000;
    }

  }
</style>
