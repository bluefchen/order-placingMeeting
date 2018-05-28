<template>
  <div class="order_manage-index">
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info"></div>
    </div>
    <!-- 中间背景图片 -->

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="订购会列表"/>
        <div class="order-type">
          <div class="order-type-text">订购会状态：</div>
          <div class="condition-input">
            <el-select v-model="orderQueryData.orderType" placeholder="请选择">
              <el-option
                v-for="item in orderTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div class="search fn-clear">
        <div class="fn-left search-input">
          <input type="text" placeholder="输入订货会名称搜索"><button class="search-btn fn-right">确定</button>
        </div>
        <div class="fn-right search-query">
          <button><span class="iconfont">&#xe6a8;</span>&nbsp;新增订购会</button>
        </div>
      </div>

      <table width="100%" cellspacing="0" cellpadding="0" class="table">
        <thead>
        <tr>
          <th width="40%">订购会名称</th>
          <th width="11%">省份</th>
          <th width="11%">参与供货商</th>
          <th width="11%">参与零售商</th>
          <th width="11%">订购会状态</th>
          <th width="16%">操作</th>
        </tr>
        </thead>
      </table>
      <ul class="ul-tab">
        <li class="li-list">
          <p class="p-line fn-clear">
            <span class="fn-left date-color">订购会编码：100092830</span>
            <span class="fn-right text-right">
              <button class="btn-del"><span class="iconfont">&#xe610;</span></button>
            </span>
          </p>
          <div class="tabs fn-clear">
            <dl class="dll wid40 fn-left">
              <div class="device-wrap fn-clear">
                <div class="device-pic fn-left">
                  <img src="@/assets/images/brand-img.jpg" alt="">
                </div>
                <div class="device-info fn-right">
                  <p class="name">2018夏季VIVO品牌新品订购会</p>
                  <p class="date">2018/04/10-2018/04/11</p>
                </div>
              </div>
            </dl>
            <dl class="dll wid11 fn-left"><p>江苏省</p></dl>
            <dl class="dll wid11 fn-left"><p>210家</p></dl>
            <dl class="dll wid11 fn-left"><p>189家</p></dl>
            <dl class="dll wid11 fn-left"><p class="device-type not-start">未开始</p></dl>
            <dl class="dll wid16 fn-left">
              <button class="updown-btn">编辑订购会</button>
            </dl>
          </div>
        </li>
        <li class="li-list">
          <p class="p-line fn-clear">
            <span class="fn-left date-color">订购会编码：100092831</span>
            <span class="fn-right text-right">
              <button class="btn-del"><span class="iconfont">&#xe610;</span></button>
            </span>
          </p>
          <div class="tabs fn-clear">
            <dl class="dll wid40 fn-left">
              <div class="device-wrap fn-clear">
                <div class="device-pic fn-left">
                  <img src="@/assets/images/brand-img.jpg" alt="">
                </div>
                <div class="device-info fn-right">
                  <p class="name">2018夏季VIVO品牌新品订购会</p>
                  <p class="date">2018/04/10-2018/04/11</p>
                </div>
              </div>
            </dl>
            <dl class="dll wid11 fn-left"><p>江苏省</p></dl>
            <dl class="dll wid11 fn-left"><p>210家</p></dl>
            <dl class="dll wid11 fn-left"><p>189家</p></dl>
            <dl class="dll wid11 fn-left"><p class="device-type underway">进行中</p></dl>
          </div>
        </li>
        <li class="li-list">
          <p class="p-line fn-clear">
            <span class="fn-left date-color">订购会编码：100092832</span>
            <span class="fn-right text-right">
              <button class="btn-del"><span class="iconfont">&#xe610;</span></button>
            </span>
          </p>
          <div class="tabs fn-clear">
            <dl class="dll wid40 fn-left">
              <div class="device-wrap fn-clear">
                <div class="device-pic fn-left">
                  <img src="@/assets/images/brand-img.jpg" alt="">
                </div>
                <div class="device-info fn-right">
                  <p class="name">2018夏季VIVO品牌新品订购会</p>
                  <p class="date">2018/04/10-2018/04/11</p>
                </div>
              </div>
            </dl>
            <dl class="dll wid11 fn-left"><p>江苏省</p></dl>
            <dl class="dll wid11 fn-left"><p>210家</p></dl>
            <dl class="dll wid11 fn-left"><p>189家</p></dl>
            <dl class="dll wid11 fn-left"><p class="device-type done">已结束</p></dl>
          </div>
        </li>
      </ul>
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
    name: 'OrderManageIndex',
    created() {
      this.queryOpmOrderSubmit();
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',


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

        orderTypeList: [{
          value: 1000,
          label: '未开始'
        },{
          value: 1001,
          label: '进行中'
        },{
          value: 1002,
          label: '已结束'
        }],
        
        qryOpmOrderList: [], //查询返回的数据
        orderQueryData: {
          isCentman: '',
          offerNameOrCode: '',
          opmOrderNo: '',
          retailerId: '',
          dateValue: [],
          supplierId: '',
          statusCd: '',
          orderType: '',
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
        this.queryOpmOrderSubmit();
      },
      showMoreCondition() {
        this.isShowMoreCondition = !this.isShowMoreCondition;
      },
      queryOpmOrderSubmit(curPage, pageSize) {
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
      pageChanged(curPage) {
        this.queryOpmOrderSubmit(curPage);
      },
      selectRetailer(val){
        this.orderQueryData.retailerId = val;
      },
      selectSupplier(val){
        this.orderQueryData.supplierId = val;
      },
      exportOpmOrder(){
        window.open('/opmOrderController/exportOpmOrderList?' + encodeURI(JSON.stringify({
          isCentman: this.orderQueryData.isCentman,
          offerNameOrCode: this.orderQueryData.offerNameOrCode,
          opmOrderNo: this.orderQueryData.opmOrderNo,
          supplierId: this.orderQueryData.supplierId,
          retailerId: this.orderQueryData.retailerId,
          fromDate: this.orderQueryData.dateValue[0],
          toDate: this.orderQueryData.dateValue[1],
          statusCd: this.orderQueryData.statusCd,
        })));
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

<style lang="less">
  .order_manage-index {
      /*中间背景图片*/
      .img-bg {
        width: 100%;
        height: 401px;
        background: #6e42ef;
      }
      .img-bg .info {
        height: 401px;
        margin: 0 auto;
        background: #6e42ef url('../assets/images/manage-bg.jpg') no-repeat right bottom;
        overflow: hidden;
      }
      /*中间背景图片*/

      /* 条件搜索 */
      .search {
        margin: 10px auto;
        height: 28px;
        .search-input{
          width: 310px;
          height: 26px;
          input{
            width: 238px;
            height: 26px;
            padding: 0 5px;
            line-height: 26px;
            border: 1px solid #d0d0d0;
            &:hover {
              border-color: #c0c4cc;
              & + .search-btn{
                width: 60px;
                height: 28px;
                background: #f8f8f8;
                border: none;
                border: 1px solid #c0c4cc;
                border-left: none;
                cursor: pointer;
              }
            }
            &:focus {
              border-color: #ff7a7a;
              & + .search-btn{
                width: 60px;
                height: 28px;
                background: #f8f8f8;
                border: none;
                border: 1px solid #ff7a7a;
                border-left: none;
                cursor: pointer;
              }
            }
            & + .search-btn{
              width: 60px;
              height: 28px;
              background: #f8f8f8;
              border: none;
              border: 1px solid #d5d5d5;
              border-left: none;
              cursor: pointer;
            }
          }
        }
        
        .search-query{
          button{
            width: 92px;
            height: 28px;
            background: #fa0000;
            color: #fff;
            border: none;
            cursor: pointer;
            span{
              vertical-align: middle;
            }
          }
        }
      }
      /* 条件搜索 */

      .el-range-editor.el-input__inner {
        height: 32px;
      }
      .el-date-editor .el-range__icon, .el-date-editor .el-range-separator, .el-date-editor .el-range__close-icon {
        line-height: 26px;
      }
      .el-input__inner {
        border-radius: 0;
      }

      .my-location {
        height: 30px;
        line-height: 30px;
        background-color: #f6f6f6;
      }

      .tabs-list {
        margin: 0 auto 20px;
      }
      .order-titl {
        position: relative;
        height: 28px;
        margin: 15px 0;
        line-height: 28px;
        padding-bottom: 3px;
        border-bottom: 2px solid #e5e5e5;
        .order-type{
          position: absolute;
          right: 0;
          bottom: 0;
          width: 162px;
          height: 21px;
          border: 1px solid #e5e5e5;
          border-bottom: none;
          display: flex;
          .order-type-text{
            width: 83px;
            height: 21px;
            background: #f5f5f5;
            border-right: 1px solid #e5e5e5;
            text-align: right;
            line-height: 22px;
          }
          .condition-input {
            flex: 1 0 0;
            height: 21px;
            line-height: 21px;
            .el-input__inner{
              height: 21px;
              padding-right: 15px;
              border: none;
              line-height: 21px;
              font-size: 12px;
            }
            .el-input__suffix{
              right: 0;
            }
          }
        }
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

      .table thead tr {
        height: 40px;
        background-color: #efefef;
        border: 1px solid #dcdcdc;
        color: #131212;
      }
      .table tbody tr {
        height: 90px;
        border-bottom: 1px solid #dcdcdc;
      }
      .table thead tr th {
        text-align: center;
      }

      .li-list {
        margin-top: 16px;
        border: 1px solid #e0e0e0;
        &:hover{
          border: 1px solid #f00;
        }
      }
      .p-line {
        height: 35px;
        line-height: 35px;
        background: #f8f8f8;
        border-bottom: 1px solid #e0e0e0;
        .date-color {
          color: #807e7e;
        }
        .btn-del{
          background: none;
          border: none;
          cursor: pointer;
          .iconfont{
            color: #8f8f8f;
            font-size: 16px;
            padding: 0;
          }
          &:hover{
            .iconfont{
              color: #f82134;
              font-size: 16px;
              padding: 0;
            }
          }
        }
        span {
          width: calc(33% - 20px);
          padding: 0 10px;
          b {
            margin-right: 15px;
          }
        ;
        }
      }
      .tabs dl {
        height: 90px;

      }
      .tabs .dll {
        line-height: 90px;
        text-align: center;
      }
      .wid40 {
        width: 40%;
      }
      .wid16 {
        width: 16%;
      }
      .wid11 {
        width: 11%;
      }

      .device-type{
        margin: 21px auto 0;
        width: 44px;
        height: 44px;
        line-height: 44px;
        border: 2px solid;
        border-radius: 50%;
        &.not-start{
          background: #ffecec;
          border-color: #f00;
          color: #f00;
        }
        &.underway{
          background: #eeffec;
          border-color: #47c044;
          color: #47c044;
        }
        &.done{
          background: #f8f8f8;
          border-color: #bcbcbc;
          color: #bcbcbc;
        }
      }

      .updown-btn {
        padding: 2px 5px;
        background: #ffffff;
        border: 1px solid #d9d9d9;
        border-radius: 3px;
      }
      .updown-btn:hover {
        color: #f82134;
        border: 1px solid #f82134;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      .red {
        color: #f82134;
      }
      .text-center {
        text-align: center;
      }
      .text-right {
        text-align: right;
      }
      .pd5 {
        padding: 5px;
      }
      .p-line span {
        color: #aaa;
      }
      .p-line span b {
        color: #333;
      }

      .device-wrap {
        padding: 10px;
        text-align: left;
        .device-pic {
          width: 85px;
          height: 71px;
          box-sizing: border-box;
          border: 1px solid #e5e5e5;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .device-info {
          box-sizing: border-box;
          width: calc(100% - 85px);
          padding-top: 6px;
          padding-left: 15px;
          line-height: 30px;
          color: #333;
          .name{
            height: 26px;
            line-height: 26px;
            color: #050505;
            font-size: 14px;
            &:hover {
              color: #ed0000;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }

  }

  .el-input__inner {
    height: 20px;
    line-height: 20px;
}

.el-input-group__prepend {
  background-color: #f8f8f8;
}

.el-input-group__append {
  background-color: #f82134;
  border-color: #f82134;
  color: #fff;
}

.el-input.is-active{
  .el-input__inner{
    border-color: #ff7a7a;
    &:focus {
      border-color: #ff7a7a;
    }
  }
}

.el-select-dropdown {
  border: none;
}

.el-select-dropdown__item.selected {
  color: #fff;
  font-weight: normal;
  background-color: #f13939;
}
</style>
