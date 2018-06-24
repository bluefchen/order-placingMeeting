<template>
  <div class="prefer-policy-settle">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['首页', '统计查询', '优惠政策结算']"/>
      </div>
    </div>

    <div class="box-1200">
      <el-tabs v-model="activeName">
        <el-tab-pane label="省份+机型" name="first">
          <div class="condition-search fn-clear">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">省份：</label>
                  <AreaSelect :clearable="true" :value.sync="commonRegionId"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">终端品牌：</label>
                  <SelectComponents :model="'letter'" :placement="'bottom-start'"
                                    :value.sync="provinceQuery.brandCd" :list="brandOptions" :width="650"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">终端型号：</label>
                  <SelectComponents :model="'letter'"
                                    :placement="'bottom-end'"
                                    :value.sync="provinceQuery.offerModelId" :list="modelOptionsForProvince"
                                    :width="650"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <el-button size="small" type="success" @click="queryOpmPoilcyDepositListByProvince()">查询</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="tabs-list">
            <div class="order-titl fn-clear">
              <TitlePlate class="fn-left" title="优惠政策返利信息"/>
            </div>
            <div class="result-table">
              <Table :tableTitle="tableTitle" :tableData="tableData"/>
            </div>
            <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="供货商+机型" name="second">
          <div class="condition-search fn-clear">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">供货商名称：</label>
                  <ChooseMerchants title="供货商" @selectOptions="selectSupplier"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">终端品牌：</label>
                  <SelectComponents :model="'letter'" :placement="'bottom-start'"
                                    :value.sync="supplierQuery.brandCd" :list="brandOptions" :width="650"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">终端型号：</label>
                  <SelectComponents :model="'letter'"
                                    :placement="'bottom-end'"
                                    :value.sync="supplierQuery.offerModelId" :list="modelOptionsForSupplier"
                                    :width="650"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <el-button size="small" type="success" @click="queryOpmPoilcyDepositListBySupplier()">查询</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="tabs-list">
            <div class="order-titl fn-clear">
              <TitlePlate class="fn-left" title="优惠政策返利信息"/>
            </div>
            <div class="result-table">
              <Table :tableTitle="brandTableTitle" :tableData="brandTableData"/>
            </div>
            <Pagination :total="brandTotal" :pageSize="pageSize" :currentPage="brandCurrentPage"
                        @pageChanged="brandPageChanged"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="零售商+机型" name="third">
          <div class="condition-search fn-clear">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">零售商名称：</label>
                  <ChooseMerchants title="零售商" @selectOptions="selectRetailer"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">终端品牌：</label>
                  <SelectComponents :model="'letter'" :placement="'bottom-start'"
                                    :value.sync="retailerQuery.brandCd" :list="brandOptions" :width="650"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <label class="label-wrds">终端型号：</label>
                  <SelectComponents :model="'letter'"
                                    :placement="'bottom-end'"
                                    :value.sync="retailerQuery.offerModelId" :list="modelOptionsForRetailer"
                                    :width="650"/>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="condition-item">
                  <el-button size="small" type="success" @click="queryOpmPoilcyDepositListByRetailer()">查询</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="tabs-list">
            <div class="order-titl fn-clear">
              <TitlePlate class="fn-left" title="优惠政策返利信息"/>
            </div>
            <div class="result-table">
              <Table :tableTitle="businessTableTitle" :tableData="businessTableData"/>
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
  import AreaSelect from '@/components/AreaSelect';
  import ChooseMerchants from '@/components/ChooseMerchants';

  export default {
    name: 'PreferentialPolicySettlement',
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
      this.queryOpmPoilcyDepositListByProvince();
      this.queryOpmPoilcyDepositListBySupplier();
      this.queryOpmPoilcyDepositListByRetailer();
    },
    data() {
      return {
        opMeetingInfo: null,
        activeName: 'first',
        tableTitle: [{
          label: '省份',
          prop: 'provinceName',
          width: 160
        }, {
          label: '终端品牌',
          prop: 'brandName'
        }, {
          label: '终端型号',
          prop: 'offerModelName'
        }, {
          label: 'B阶段定购总数量',
          prop: 'bOfferQty',
          width: 160
        }, {
          label: 'B阶段优惠总金额',
          prop: 'bDiscountAmount',
          width: 160
        }, {
          label: '订购总数量',
          prop: 'offerQty',
          width: 160
        }, {
          label: '优惠总金额',
          prop: 'discountAmount',
          width: 160
        }],
        tableData: [],
        brandTableTitle: [{
          label: '供货商',
          prop: 'supplierName',
          width: 160
        }, {
          label: '终端品牌',
          prop: 'brandName'
        }, {
          label: '终端型号',
          prop: 'offerModelName'
        }, {
          label: 'B阶段定购总数量',
          prop: 'bOfferQty',
          width: 160
        }, {
          label: 'B阶段优惠总金额',
          prop: 'bDiscountAmount',
          width: 160
        }, {
          label: '订购总数量',
          prop: 'offerQty',
          width: 160
        }, {
          label: '优惠总金额',
          prop: 'discountAmount',
          width: 160
        }],
        brandTableData: [],
        businessTableTitle: [{
          label: '零售商',
          prop: 'retailerName',
          width: 160
        }, {
          label: '终端品牌',
          prop: 'brandName'
        }, {
          label: '终端型号',
          prop: 'offerModelName'
        }, {
          label: 'B阶段定购总数量',
          prop: 'bOfferQty',
          width: 160
        }, {
          label: 'B阶段优惠总金额',
          prop: 'bDiscountAmount',
          width: 160
        }, {
          label: '订购总数量',
          prop: 'offerQty',
          width: 160
        }, {
          label: '优惠总金额',
          prop: 'discountAmount',
          width: 160
        }],
        businessTableData: [],
        brandOptions: [],
        modelOptionsForProvince: [],
        modelOptionsForSupplier: [],
        modelOptionsForRetailer: [],
        provinceQuery: {
          brandCd: '',
          offerModelId: ''
        },
        supplierQuery: {
          brandCd: '',
          offerModelId: ''
        },
        retailerQuery: {
          brandCd: '',
          offerModelId: ''
        },
        commonRegionId: '',
        retailerId: '',
        supplierId: '',
        pageSize: 10, //每页展示条数
        total: 0, //列表总数
        currentPage: 1, //当前页
        brandTotal: 0,
        brandCurrentPage: 1,
        busiTotal: 0,
        busiCurrentPage: 1
      }
    },
    methods: {
      selectSupplier(val) {
        this.supplierId = val;
      },
      selectRetailer(val) {
        this.retailerId = val;
      },
      //按省份+机型查询
      queryOpmPoilcyDepositListByProvince(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmPolicyController/queryOpmPoilcyDepositList', {
          'queryType': 1,
          'opMeetingId': this.opMeetingInfo.opMeetingId,
          'provinceCommonRegionId': this.commonRegionId, //省份ID
          'supplierId': '', //供货商ID
          'retailerId': '', //零售商ID
          'offerBrandCd': this.provinceQuery.brandCd, //终端品牌
          'offerModelId': this.provinceQuery.offerModelId, //终端型号
          'pageSize': pageSize || 10,
          'curPage': curPage || 1
        }).then((rsp) => {
          this.total = rsp.totalSize;
          this.tableData = rsp.rows;
        });
      },
      pageChanged(curPage) {
        this.queryOpmPoilcyDepositListByProvince(curPage);
      },
      //按购货商+机型查询
      queryOpmPoilcyDepositListBySupplier(curPage, pageSize) {
        this.brandCurrentPage = curPage || 1;
        this.$post('/opmPolicyController/queryOpmPoilcyDepositList', {
          'queryType': 2,
          'opMeetingId': this.opMeetingInfo.opMeetingId,
          'provinceCommonRegionId': '', //省份ID
          'supplierId': this.supplierId, //供货商ID
          'retailerId': '', //零售商ID
          'offerBrandCd': this.supplierQuery.brandCd, //终端品牌
          'offerModelId': this.supplierQuery.offerModelId, //终端型号
          'pageSize': pageSize || 10,
          'curPage': curPage || 1
        }).then((rsp) => {
          this.brandTotal = rsp.totalSize;
          this.brandTableData = rsp.rows;
        });
      },
      brandPageChanged(curPage) {
        this.queryOpmPoilcyDepositListBySupplier(curPage);
      },
      //按零售商+机型查询
      queryOpmPoilcyDepositListByRetailer(curPage, pageSize) {
        this.busiCurrentPage = curPage || 1;
        this.$post('/opmPolicyController/queryOpmPoilcyDepositList', {
          'queryType': 3,
          'opMeetingId': this.opMeetingInfo.opMeetingId,
          'provinceCommonRegionId': '', //省份ID
          'supplierId': '', //供货商ID
          'retailerId': this.retailerId, //零售商ID
          'offerBrandCd': this.retailerQuery.brandCd, //终端品牌
          'offerModelId': this.retailerQuery.offerModelId, //终端型号
          'pageSize': pageSize || 10,
          'curPage': curPage || 1
        }).then((rsp) => {
          this.busiTotal = rsp.totalSize;
          this.businessTableData = rsp.rows;
        });
      },
      busiPageChanged(curPage) {
        this.queryOpmPoilcyDepositListByRetailer(curPage);
      }
    },
    watch: {
      'provinceQuery.brandCd': function (newVal) {
        this.modelOptionsForProvince = [];
        this.provinceQuery.offerModelId = '';
        this.$post('/orderPlacingMeetingController/queryOfferModelList', {
          'brandCd': newVal
        }).then((rsp) => {
          _.forEach(rsp, (item) => {
            this.modelOptionsForProvince.push({
              value: item.offerModelId,
              label: item.offerModelName,
              firstLetter: item.firstLetter
            })
          });
        });
      },
      'supplierQuery.brandCd': function (newVal) {
        this.modelOptionsForSupplier = [];
        this.supplierQuery.offerModelId = '';
        this.$post('/orderPlacingMeetingController/queryOfferModelList', {
          'brandCd': newVal
        }).then((rsp) => {
          _.forEach(rsp, (item) => {
            this.modelOptionsForSupplier.push({
              value: item.offerModelId,
              label: item.offerModelName,
              firstLetter: item.firstLetter
            })
          });
        });
      },
      'retailerQuery.brandCd': function (newVal) {
        this.modelOptionsForRetailer = [];
        this.retailerQuery.offerModelId = '';
        this.$post('/orderPlacingMeetingController/queryOfferModelList', {
          'brandCd': newVal
        }).then((rsp) => {
          _.forEach(rsp, (item) => {
            this.modelOptionsForRetailer.push({
              value: item.offerModelId,
              label: item.offerModelName,
              firstLetter: item.firstLetter
            })
          });
        });
      },
    },
    components: {
      Breadcrumb,
      Input,
      Select,
      SelectComponents,
      TitlePlate,
      Table,
      Pagination,
      MiddleImgInfoSmall,
      AreaSelect,
      ChooseMerchants
    }
  }
</script>

<style lang="less">
  .prefer-policy-settle {
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
