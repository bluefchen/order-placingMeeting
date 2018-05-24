<template>
  <div class="order_pickup-data">
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info"></div>
    </div>
    <!-- 中间背景图片 -->


    <!-- 搜索 -->
    <div class="box-1200">
      <div class="title-plate">  
        <TitlePlate title="供应商资料维护列表"/>
      </div>
      <div class="search fn-clear">  
        <InputWithSelect class="fn-left" @search="search"/>
        <div class="fn-left category-more" @click="isShowMoreCondition = !isShowMoreCondition">更多条件 <i v-show="isShowMoreCondition"
                                                                              class="iconfont">&#xe607;</i><i
          v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
        </div>
    </div>

    <!-- 条件搜索 -->
    <div class="box-1200 condition-query" v-show="isShowMoreCondition">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">供应商类型：</label>
            <Select class="condition-input" :value.sync="orderQueryData.statusCd" :options="paymentStatusList"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-iterm">
            <label class="label-wrds">供应商状态：</label>
            <Select class="condition-input" :value.sync="orderQueryData.statusCd" :options="paymentStatusList"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-iterm">
            <el-button type="success" size="small" @click="queryOpmOrderSubmit()">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <div class="fn-left btn-checkbox">
          <input type="checkbox" id="checkAll">
          <label for="checkAll">全选</label>
        </div>    
        <div class="buttons fn-right">
          <button class="btns"><i class="iconfont">&#xe642;</i> 新增终端</button>
          <button class="btns"><i class="iconfont">&#xe6bd;</i> 批量激活</button>
          <button class="btns"><i class="iconfont">&#xe60c;</i> 批量冻结</button>
          <button class="btns"><i class="iconfont">&#xe610;</i> 批量删除</button>
        </div>
      </div>
      <div class="maintain-list fn-clear">
        <ul>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
        </ul>
      </div>
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

  export default {
    name: 'SupplierDataMaintain',
    created() {
      this.queryOpmOrderSubmit();
    },
    data() {
      return {
        paymentStatusList: [{ //付款状态列表
          value: 1000,
          label: '未交定金'
        }, {
          value: 1001,
          label: '已交定金'
        }, {
          value: 1002,
          label: '已付款'
        }],
        paymentCtatusCd: '', //付款状态CD
        qryOpmOrderList: [], //查询返回的数据
        orderQueryData: {
          isCentman: '',
          offerNameOrCode: '',
          opmOrderNo: '',
          retailerId: '',
          dateValue: [],
          supplierId: '',
          statusCd: ''
        },
        isShowMoreCondition: false, //是否显示更多条件
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      search(obj) {
        this.orderQueryData.isCentman = obj.type;
        this.orderQueryData.offerNameOrCode = obj.value;
        this.queryOpmOrderSubmit()
      },
      selectRetailer(val){
          this.orderQueryData.retailerId = val;
      },
      selectSupplier(val){
          this.orderQueryData.supplierId = val;
      },
      queryOpmOrderSubmit(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmOrderController/queryOpmOrderList', {
          opMeetingId: '订货会ID',
          isCentman: this.orderQueryData.isCentman,
          offerNameOrCode: this.orderQueryData.offerNameOrCode,
          opmOrderNo: this.orderQueryData.opmOrderNo,
          supplierId: this.orderQueryData.supplierId,
          retailerId: this.orderQueryData.retailerId,
          fromDate: this.orderQueryData.dateValue[0],
          toDate: this.orderQueryData.dateValue[1],
          statusCd: this.orderQueryData.statusCd,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.qryOpmOrderList = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      orderdetail(item) {
        localStorage.setItem(item.opmOrderId, JSON.stringify(item));
        this.$router.push({
          path: '/order/Orderdetail',
          query: {
            opmOrderId: item.opmOrderId
          }
        });
      },
      exportOpmOrder() {
      },
      pageChanged(curPage) {
        this.queryOpmOrderSubmit(curPage);
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
      ChooseMerchants
    }
  }
</script>

<style scoped lang="less">
  .order_pickup-data {

    /*中间背景图片*/
    .img-bg {
      width: 100%;
      height: 401px;
      background: #fff;
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

    .condition-query {
      display: block;
      margin: 0 auto;
      padding: 10px;
      border: 1px solid #dfdfdf;
      .condition-iterm {
        display: flex;
        margin: 10px 0;
        .label-wrds {
          width: 100px;
          line-height: 32px;
          font-size: 14px;
          text-align: right;
        }
        .condition-input {
          flex: 1 0 0;
        }
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

    .maintain-list{
      width: 100%;
      overflow-x: hidden;
      ul{
        width: 104%;
        li{
          position: relative;
          float: left;
          display: inline-block;
          margin-right: 20px;
          margin-bottom: 20px;
          width: 384px;
          height: 173px;
          border: 1px solid #ededed;
        }
      }
    }

  }
</style>
