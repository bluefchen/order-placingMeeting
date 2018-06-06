<template>
  <div class="order_pickup-data">
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info"></div>
    </div>
    <!-- 中间背景图片 -->


    <!-- 搜索 -->
    <div class="box-1200">
      <div class="search fn-clear">
        <InputWithSelect class="fn-left" @search="search" :isHideSelect="true" />
        <div class="fn-left category-more" @click="isShowMoreCondition = !isShowMoreCondition">更多条件 <i v-show="isShowMoreCondition"
                                                                              class="iconfont">&#xe607;</i><i
          v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
        </div>
    </div>

    <!-- 条件搜索 -->
    <div class="box-1200 condition-search" v-show="isShowMoreCondition">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="condition-iterm">
            <label class="label-wrds">省份：</label>
            <AreaSelect class="condition-select" :value.sync="orderQueryData.commonRegionId"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="condition-iterm">
            <label class="label-wrds">零售商类型：</label>
            <Select class="condition-input" :value.sync="orderQueryData.type" :options="retailerTypeList"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="condition-iterm">
            <label class="label-wrds">零售商状态：</label>
            <Select class="condition-input" :value.sync="orderQueryData.statusCd" :options="retailerStatusList"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="condition-iterm">
            <el-button type="success" size="small" @click="qryRetailerList()">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <div class="fn-left btn-checkbox">
          <TitlePlate title="零售商资料维护列表"/>
        </div>
        <div class="buttons fn-right">
          <button class="btns" @click="addRetailer('新增')"><i class="iconfont">&#xe642;</i> 新增零售商</button>
          <button class="btns" @click="batchUnfreezeRetailer"><i class="iconfont">&#xe6bd;</i> 批量激活</button>
          <button class="btns" @click="batchFreezeRetailer"><i class="iconfont">&#xe60c;</i> 批量冻结</button>
          <button class="btns" @click="batchDeleteRetailer"><i class="iconfont">&#xe610;</i> 批量删除</button>
        </div>
      </div>
      <Table :isSelection="true" :table-title="tableTitle" :table-data="tableData" @selectionChange="selectionChange" />
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import DatePicker from '@/components/DatePicker';
  import InputWithSelect from '@/components/InputWithSelect';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import DeviceInfo from '@/components/DeviceInfo';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import AreaSelect from '@/components/AreaSelect';

  export default {
    name: 'SetailerDataMaintain',
    created() {
      this.qryRetailerList();
    },
    data() {
      return {
        //零售商类型
        retailerTypeList: [{
          value: '1001',
          label: '自营厅'
        },{
          value: '1002',
          label: '大连锁'
        },{
          value: '1003',
          label: '代理商'
        }],
        //零售商状态
        retailerStatusList: [{
          value: '1000',
          label: '有效'
        },{
          value: '1001',
          label: '停用'
        }],

        tableTitle: [{
          label: '省份',
          prop: 'commonRegionName'
        }, {
          label: '零售商名称',
          prop: 'retailerName',
          width: 150
        }, {
          label: '零售商编码',
          prop: 'retailerCode'
        }, {
          label: '零售商类型',
          prop: 'retailerTypeName'
        }, {
          label: '联系人',
          prop: 'linkMan',
          width: 80
        }, {
          label: '联系电话',
          prop: 'linkNbr'
        }, {
          label: '公司电话',
          prop: 'retailerPhone'
        }, {
          label: '公司传真',
          prop: 'retailerFax'
        }, {
          label: '状态',
          prop: 'statusCdName',
          width: 80
        }, {
          label: '操作',
          prop: 'remarks',
          width: 180,
          render: (h, params) => {
            return h({
              template: `<div>
                <button class="updown-btn" v-if="data.row.statusCd === '1001'" @click="unfreezeRetailer([data.row.retailerId])">激活</button>
                <button class="updown-btn" v-if="data.row.statusCd === '1000'" @click="freezeRetailer([data.row.retailerId])">冻结</button>
                <button class="updown-btn" @click="addRetailer('修改', data.row)">修改</button>
                <button class="updown-btn" @click="deleteRetailer([data.row.retailerId])">删除</button>
                <button class="updown-btn" @click="detailRetailer(data.row)">详情</button>
              </div>`,
              data() {
                return {
                  data: params
                }
              },
              methods: {
                freezeRetailer: (val) => {
                  this.freezeRetailer(val);
                },
                unfreezeRetailer: (val) => {
                  this.unfreezeRetailer(val);
                },
                deleteRetailer: (val) => {
                  this.deleteRetailer(val);
                },
                addRetailer: (title, val) => {
                  this.addRetailer(title, val);
                },
                detailRetailer: (val) => {
                  this.detailRetailer(val);
                },
              }
            });
          }
        }],
        tableData: [],
        level: 'province',
        paymentCtatusCd: '', //付款状态CD
        qryOpmOrderList: [], //查询返回的数据
        orderQueryData: {
          offerNameOrCode: '',
          commonRegionId: '',
          type: '',
          statusCd: ''
        },
        isShowMoreCondition: false, //是否显示更多条件
        selectList: [],
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      search(obj) {
        this.orderQueryData.isCentman = obj.type;
        this.orderQueryData.offerNameOrCode = obj.value;
        this.qryRetailerList()
      },
      selectAddress(code, name){
        this.orderQueryData.commonRegionId = code;
        this.orderQueryData.commonRegionName = name;
      },
      qryRetailerList(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/orderPlacingMeetingController/queryRetailerList', {
          commonRegionId: this.orderQueryData.commonRegionId,
          retailerNameorCode: this.orderQueryData.offerNameOrCode,
          retailerType: this.orderQueryData.type,
          statusCd: this.orderQueryData.statusCd,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      selectionChange(val){
        this.selectList = val;
      },
      batchFreezeRetailer(){
        var retailerList = [];
        this.selectList.forEach((item, index) => {
          if (item.statusCd === '1000') {
            retailerList.push(item.retailerId)
          }
        });
        if(retailerList.length){
          this.freezeRetailer(retailerList);
        }else{
          this.$message({
            message: '请选择需要冻结的零售商！',
            type: 'warning'
          });
        }
      },
      batchUnfreezeRetailer(){
        var retailerList = [];
        this.selectList.forEach((item, index) => {
          if (item.statusCd === '1001') {
            retailerList.push(item.retailerId)
          }
        });
        if(retailerList.length){
          this.unfreezeRetailer(retailerList);
        }else{
          this.$message({
            message: '请选择需要激活的零售商！',
            type: 'warning'
          });
        }
      },
      batchDeleteRetailer(){
        var retailerList = [];
        this.selectList.forEach((item, index) => {
          retailerList.push(item.retailerId);
        });
        if(retailerList.length){
          this.deleteRetailer(retailerList);
        }else{
          this.$message({
            message: '请选择需要删除的零售商！',
            type: 'warning'
          });
        }
      },
      freezeRetailer(val){
        this.$post('/orderPlacingMeetingController/freezeRetailer', {
          retailerIds: val
        }).then((rsp) => {
          this.$message({
            message: '冻结成功！',
            type: 'success'
          });
          this.qryRetailerList(this.currentPage);
        })
      },
      unfreezeRetailer(val){
        this.$post('/orderPlacingMeetingController/unfreezeRetailer', {
          retailerIds: val
        }).then((rsp) => {
          this.$message({
            message: '激活成功！',
            type: 'success'
          });
          this.qryRetailerList(this.currentPage);
        })
      },
      deleteRetailer(val){
        this.$post('/orderPlacingMeetingController/deleteRetailer', {
          retailerIds: val
        }).then((rsp) => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.qryRetailerList(this.currentPage);
        })
      },
      addRetailer(title, val){
        if(title === '新增'){
          this.$router.push({
            path: '/orderManage/AddSetailerData'
          });
        }else{
          localStorage.setItem(val.retailerId, JSON.stringify(val));
          this.$router.push({
            path: '/orderManage/AddSetailerData',
            query: {
              retailerId: val.retailerId
            }
          });
        }

      },
      detailRetailer(val){
        localStorage.setItem(val.retailerId, JSON.stringify(val));
        this.$router.push({
          path: '/orderManage/detailsSetailerData',
          query: {
            retailerId: val.retailerId
          }
        });
      },
      pageChanged(curPage) {
        this.qryRetailerList(curPage);
      }
    },
    components: {
      Breadcrumb,
      Input,
      Select,
      DatePicker,
      InputWithSelect,
      TitlePlate,
      Table,
      DeviceInfo,
      Pagination,
      ChooseMerchants,
      AreaSelect
    }
  }
</script>

<style lang="less">
  .order_pickup-data {

    /*中间背景图片*/
    .img-bg {
      width: 100%;
      height: 401px;
      background: #6e42ef;
    }
    .img-bg .info {
      width: 1200px;
      height: 401px;
      margin: 0 auto;
      background: #6e42ef url('../assets/images/manage-bg.jpg') no-repeat center bottom;
      overflow: hidden;
    }
    /*中间背景图片*/

    /* 条件搜索 */
    .title-plate{
      margin-top: 13px;
      padding: 8px 0;
      border-bottom: 2px solid #e5e5e5;
    }

    .btn-checkbox{
      input{
        display: none;
      }
      input + label{
        padding-left: 22px;
        background: url('../assets/images/checkbox.png') no-repeat left center;
        font-size: 14px;
        cursor: pointer;
      }
      input:checked + label{
        background: url('../assets/images/checkedbox.png') no-repeat left center;
      }
    }

    .search {
      margin: 17px auto;
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
      &:active, &:focus, &:hover {
        color: #f82134;
      }
      .iconfont {
        font-size: 12px;
      }
    }
    /* 条件搜索 */
    .tabs-list {
      margin: 0 auto 20px;
    }
    .order-titl {
      height: 28px;
      margin: 15px 0;
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
  }
</style>
