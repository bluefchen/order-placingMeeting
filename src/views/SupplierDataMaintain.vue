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
        <InputWithSelect class="fn-left" @search="search" :isHideSelect="true" />
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
          <li class="checked">
            <div class="miantain-item-header">
              <span class="iconfont">&#xe665;</span>【江苏省】<a href="javascript:void(0)">赛格数码科技有限公司</a>
            </div>
            <div class="miantain-item-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">供应商编码：<span>10101</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">类型：<span>直供网</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">联系人：<span>王小二</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">联系电话：<span>18905174326</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">公司电话：<span>025-55555555</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">公司传真：<span>025-55555555</span></p>
                </el-col>
              </el-row>
            </div> 
            <div class="miantain-item-footer">
              <div class="miantain-item-type">状态：<span>有效</span></div>
              <div class="miantain-item-btn">
                <a href="javascript:void(0)"><span class="iconfont">&#xe60c;</span>&nbsp;冻结</a>
                <a href="javascript:void(0)" class="miantain-item-edit"><span class="iconfont">&#xe738;</span>&nbsp;修改</a>
                <a href="javascript:void(0)"><span class="iconfont">&#xe633;</span>&nbsp;删除</a>
              </div>  
            </div>
          </li>
          <li>
            <div class="miantain-item-header">
              <span class="iconfont">&#xe665;</span>【江苏省】<a href="javascript:void(0)">赛格数码科技有限公司</a>
            </div>
            <div class="miantain-item-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">供应商编码：<span>10101</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">类型：<span>直供网</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">联系人：<span>王小二</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">联系电话：<span>18905174326</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">公司电话：<span>025-55555555</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">公司传真：<span>025-55555555</span></p>
                </el-col>
              </el-row>
            </div> 
            <div class="miantain-item-footer">
              <div class="miantain-item-type">状态：<span>有效</span></div>
              <div class="miantain-item-btn">
                <a href="javascript:void(0)"><span class="iconfont">&#xe60c;</span>&nbsp;冻结</a>
                <a href="javascript:void(0)" class="miantain-item-edit"><span class="iconfont">&#xe738;</span>&nbsp;修改</a>
                <a href="javascript:void(0)"><span class="iconfont">&#xe633;</span>&nbsp;删除</a>
              </div>  
            </div>
          </li>
          <li>
            <div class="miantain-item-header">
              <span class="iconfont">&#xe665;</span>【江苏省】<a href="javascript:void(0)">赛格数码科技有限公司</a>
            </div>
            <div class="miantain-item-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">供应商编码：<span>10101</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">类型：<span>直供网</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">联系人：<span>王小二</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">联系电话：<span>18905174326</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">公司电话：<span>025-55555555</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">公司传真：<span>025-55555555</span></p>
                </el-col>
              </el-row>
            </div> 
            <div class="miantain-item-footer">
              <div class="miantain-item-type">状态：<span>有效</span></div>
              <div class="miantain-item-btn">
                <a href="javascript:void(0)"><span class="iconfont">&#xe60c;</span>&nbsp;冻结</a>
                <a href="javascript:void(0)" class="miantain-item-edit"><span class="iconfont">&#xe738;</span>&nbsp;修改</a>
                <a href="javascript:void(0)"><span class="iconfont">&#xe633;</span>&nbsp;删除</a>
              </div>  
            </div>
          </li>
          <li>
            <div class="miantain-item-header">
              <span class="iconfont">&#xe665;</span>【江苏省】<a href="javascript:void(0)">赛格数码科技有限公司</a>
            </div>
            <div class="miantain-item-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">供应商编码：<span>10101</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">类型：<span>直供网</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">联系人：<span>王小二</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">联系电话：<span>18905174326</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">公司电话：<span>025-55555555</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">公司传真：<span>025-55555555</span></p>
                </el-col>
              </el-row>
            </div> 
            <div class="miantain-item-footer">
              <div class="miantain-item-type">状态：<span>有效</span></div>
              <div class="miantain-item-btn">
                <a href="javascript:void(0)"><span class="iconfont">&#xe60c;</span>&nbsp;冻结</a>
                <a href="javascript:void(0)" class="miantain-item-edit"><span class="iconfont">&#xe738;</span>&nbsp;修改</a>
                <a href="javascript:void(0)"><span class="iconfont">&#xe633;</span>&nbsp;删除</a>
              </div>  
            </div>
          </li>
          <li>
            <div class="miantain-item-header">
              <span class="iconfont">&#xe665;</span>【江苏省】<a href="javascript:void(0)">赛格数码科技有限公司</a>
            </div>
            <div class="miantain-item-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">供应商编码：<span>10101</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">类型：<span>直供网</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">联系人：<span>王小二</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">联系电话：<span>18905174326</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">公司电话：<span>025-55555555</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">公司传真：<span>025-55555555</span></p>
                </el-col>
              </el-row>
            </div> 
            <div class="miantain-item-footer">
              <div class="miantain-item-type">状态：<span>有效</span></div>
              <div class="miantain-item-btn">
                <a href="javascript:void(0)"><span class="iconfont">&#xe60c;</span>&nbsp;冻结</a>
                <a href="javascript:void(0)" class="miantain-item-edit"><span class="iconfont">&#xe738;</span>&nbsp;修改</a>
                <a href="javascript:void(0)"><span class="iconfont">&#xe633;</span>&nbsp;删除</a>
              </div>  
            </div>
          </li>
          <li>
            <div class="miantain-item-header">
              <span class="iconfont">&#xe665;</span>【江苏省】<a href="javascript:void(0)">赛格数码科技有限公司</a>
            </div>
            <div class="miantain-item-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">供应商编码：<span>10101</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">类型：<span>直供网</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">联系人：<span>王小二</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">联系电话：<span>18905174326</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">公司电话：<span>025-55555555</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">公司传真：<span>025-55555555</span></p>
                </el-col>
              </el-row>
            </div> 
            <div class="miantain-item-footer">
              <div class="miantain-item-type">状态：<span>有效</span></div>
              <div class="miantain-item-btn">
                <a href="javascript:void(0)"><span class="iconfont">&#xe60c;</span>&nbsp;冻结</a>
                <a href="javascript:void(0)" class="miantain-item-edit"><span class="iconfont">&#xe738;</span>&nbsp;修改</a>
                <a href="javascript:void(0)"><span class="iconfont">&#xe633;</span>&nbsp;删除</a>
              </div>  
            </div>
          </li>
          <li>
            <div class="miantain-item-header">
              <span class="iconfont">&#xe665;</span>【江苏省】<a href="javascript:void(0)">赛格数码科技有限公司</a>
            </div>
            <div class="miantain-item-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">供应商编码：<span>10101</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">类型：<span>直供网</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">联系人：<span>王小二</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">联系电话：<span>18905174326</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">公司电话：<span>025-55555555</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">公司传真：<span>025-55555555</span></p>
                </el-col>
              </el-row>
            </div> 
            <div class="miantain-item-footer">
              <div class="miantain-item-type">状态：<span>有效</span></div>
              <div class="miantain-item-btn">
                <a href="javascript:void(0)"><span class="iconfont">&#xe60c;</span>&nbsp;冻结</a>
                <a href="javascript:void(0)" class="miantain-item-edit"><span class="iconfont">&#xe738;</span>&nbsp;修改</a>
                <a href="javascript:void(0)"><span class="iconfont">&#xe633;</span>&nbsp;删除</a>
              </div>  
            </div>
          </li>
          <li>
            <div class="miantain-item-header">
              <span class="iconfont">&#xe665;</span>【江苏省】<a href="javascript:void(0)">赛格数码科技有限公司</a>
            </div>
            <div class="miantain-item-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">供应商编码：<span>10101</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">类型：<span>直供网</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">联系人：<span>王小二</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">联系电话：<span>18905174326</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">公司电话：<span>025-55555555</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">公司传真：<span>025-55555555</span></p>
                </el-col>
              </el-row>
            </div> 
            <div class="miantain-item-footer">
              <div class="miantain-item-type">状态：<span>有效</span></div>
              <div class="miantain-item-btn">
                <a href="javascript:void(0)"><span class="iconfont">&#xe60c;</span>&nbsp;冻结</a>
                <a href="javascript:void(0)" class="miantain-item-edit"><span class="iconfont">&#xe738;</span>&nbsp;修改</a>
                <a href="javascript:void(0)"><span class="iconfont">&#xe633;</span>&nbsp;删除</a>
              </div>  
            </div>
          </li>
          <li>
            <div class="miantain-item-header">
              <span class="iconfont">&#xe665;</span>【江苏省】<a href="javascript:void(0)">赛格数码科技有限公司</a>
            </div>
            <div class="miantain-item-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">供应商编码：<span>10101</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">类型：<span>直供网</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">联系人：<span>王小二</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">联系电话：<span>18905174326</span></p>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="label-wrds">公司电话：<span>025-55555555</span></p>
                </el-col>
                <el-col :span="12">
                  <p class="label-wrds">公司传真：<span>025-55555555</span></p>
                </el-col>
              </el-row>
            </div> 
            <div class="miantain-item-footer">
              <div class="miantain-item-type">状态：<span>有效</span></div>
              <div class="miantain-item-btn">
                <a href="javascript:void(0)"><span class="iconfont">&#xe60c;</span>&nbsp;冻结</a>
                <a href="javascript:void(0)" class="miantain-item-edit"><span class="iconfont">&#xe738;</span>&nbsp;修改</a>
                <a href="javascript:void(0)"><span class="iconfont">&#xe633;</span>&nbsp;删除</a>
              </div>  
            </div>
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
          .miantain-item-header{
            position: relative;
            display: flex;
            width: 100%;
            height: 39px;
            background: #fafafa;
            color: #b3b3b3;
            border-bottom: 1px solid #edeeee;
            font-size: 14px;
            line-height: 39px;
            .iconfont{
              font-size: 24px;
              color: #f35260;
              margin-left: 8px;
            }
            a{
              color: #f83e4c;
              text-decoration: underline;
            }
            &:after{
              position: absolute;
              right: 0;
              top: 0;
              content: '';
              width: 34px;
              height: 34px;
              color: #d1d1d1;
              background: url('../assets/images/icon-check.png') no-repeat right top;
              text-align: center;
              line-height: 34px;
              cursor: pointer;
            }
          }
          .miantain-item-content{
            padding: 5px 14px 0;
            height: 89px;
            background: #fff;
            line-height: 28px;
          }
          .miantain-item-footer{
            display: flex;
            height: 38px;
            background: #fafafa;
            border-top: 1px solid #edeeee;
            line-height: 38px;
            justify-content: space-between;
            .miantain-item-type{
              height: 28px;
              margin-top: 5px;
              padding-right: 20px;
              margin-left: 14px;
              border-right: 1px solid #d5d5d5;
              line-height: 28px;
              span{
                color: #51be3d;
              }
            }
            .miantain-item-btn{
              a{
                padding: 0 17px;
                color: #848484;
                text-decoration: none;
              }
              .miantain-item-edit{
                border-left: 1px solid #e6e6e6;
                border-right: 1px solid #e6e6e6;
              }
            }
          }
          &.checked{
            border: 1px solid #f82134;
            .miantain-item-header{
              &:after{
                background: url('../assets/images/icon-checked.png') no-repeat right top;
              }
            }
          }
        }
      }
    }

  }
</style>
