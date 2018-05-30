<template>
  <div class="vue_add-supplier">
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" :title="title"/>
      </div>

      <div class="step-box">
        <el-steps :active="active" align-center>
          <el-step title="填写基本资料" description=""></el-step>
          <el-step title="选择供应商" description=""></el-step>
          <el-step title="选择零售商" description=""></el-step>
          <el-step title="完成" description=""></el-step>
        </el-steps>
      </div>
    </div>
    <div v-show="active === 1">
      <div class="box-1200">
        <div class="terminal-info-box">
          <el-row :gutter="0">
            <el-col :span="8" :offset="2">
              <div class="condition-item">
                <label class="label-wrds text-right">订货会编码：</label>
                <Input class="condition-input" :value.sync="orderPlacingMeeting.opMeetingNo"/>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="16" :offset="2">
              <div class="condition-item">
                <label class="label-wrds text-right"><span class="red-star">*</span> 订货会名称：</label>
                <Input class="condition-input" :value.sync="orderPlacingMeeting.opmName"/>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="6" :offset="2">
              <div class="condition-item">
                <label class="label-wrds text-right"><span class="red-star">*</span> 订货会地址：</label>
                <Cascader @change="selectAddress"/>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="condition-item">
                <label class="label-address">--</label>
                <Input class="condition-input" :value.sync="orderPlacingMeeting.opmAddr"/>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="10" :offset="2">
              <div class="condition-item">
                <label class="label-wrds text-right"><span class="red-star">*</span> 活动起止日期：</label>
                <DatePicker class="condition-input" :value.sync="orderPlacingMeeting.dateValue" :change="onChange" />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="8" :offset="2">
              <div class="condition-item">
                <label class="label-wrds text-right"><span class="red-star">*</span> 定金补录截止日期：</label>
                <el-date-picker
                  v-model="orderPlacingMeeting.depositRecordEnddt"
                  type="date"
                  size="small"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="8" :offset="2">
              <div class="condition-item">
                <label class="label-wrds text-right"><span class="red-star">*</span> 提货上报截止日期：</label>
                <el-date-picker
                  v-model="orderPlacingMeeting.pickupRecordEnddt"
                  type="date"
                  size="small"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="18" :offset="2">
              <div class="condition-item">
                <label class="label-wrds text-right"><span class="red-star">*</span> 订购会logo上传：</label>
                <div class="condition-upload"><img :src="orderPlacingMeeting.logoUrl" alt=""></div>
                <div class="condition-upload"><img src="@/assets/images/icon-add.png" alt=""></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="18" :offset="2">
              <div class="condition-item editor-box">
                <label class="label-wrds text-right"><span class="red-star">*</span> 订购会描述：</label>
                <div class="editor">
                  <quill-editor ref="textEditor"
                    v-model="orderPlacingMeeting.discription">
                  </quill-editor>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div v-show="active === 2">
      <div class="box-1200">
        <div class="terminal-info-box">
          <div class="order-info fn-clear">
            <div class="order-info-left fn-left">
              <img src="@/assets/images/icon-order.png" alt="">
              <p>订购会信息</p>
            </div>
            <div class="order-info-right fn-right">
              <el-row :gutter="0">
                <el-col :span="8" :offset="2">
                  <div class="order-info-item">
                    <label class="label-info-title text-right">订货会名称：</label>
                    <p><b>{{orderPlacingMeeting.opmName}}</b></p>
                  </div>
                </el-col>
                <el-col :span="8" :offset="2">
                  <div class="order-info-item">
                    <label class="label-info-title text-right">订货会编码：</label>
                    <p>{{orderPlacingMeeting.opMeetingNo}}</p>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="8" :offset="2">
                  <div class="order-info-item">
                    <label class="label-info-title text-right">活动起止日期：</label>
                    <p>{{orderPlacingMeeting.dateValue[0]}} 至 {{orderPlacingMeeting.dateValue[1]}}</p>
                  </div>
                </el-col>
                <el-col :span="8" :offset="2">
                  <div class="order-info-item">
                    <label class="label-info-title text-right">订货会地址：</label>
                    <p>{{orderPlacingMeeting.opmAddr}}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="add-supplier">
            <AddMerchants title="供货商" @selectOptions="selectSupplier" />
          </div>
          <div class="add-order-title">
            <div class="title fn-left">已添加供货商：</div>
            <div class="remark fn-right"><span>备注：</span>可先提交，事后到订货会管理再去补充完整信息资料</div>
          </div>
          <div class="add-roder-table">
            <Table :table-title="supplierList.tableTitle" :table-data="supplierList.tableData"/>
          </div>
        </div>
      </div>
    </div>
    <div v-show="active === 3">
      <div class="box-1200">
        <div class="terminal-info-box">
          <div class="order-info fn-clear">
            <div class="order-info-left fn-left">
              <img src="@/assets/images/icon-order.png" alt="">
              <p>订购会信息</p>
            </div>
            <div class="order-info-right fn-right">
              <el-row :gutter="0">
                <el-col :span="8" :offset="2">
                  <div class="order-info-item">
                    <label class="label-info-title text-right">订货会名称：</label>
                    <p><b>2018夏季VIVO品牌新品发布会</b></p>
                  </div>
                </el-col>
                <el-col :span="8" :offset="2">
                  <div class="order-info-item">
                    <label class="label-info-title text-right">订货会编码：</label>
                    <p>DHH000001</p>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="8" :offset="2">
                  <div class="order-info-item">
                    <label class="label-info-title text-right">活动起止日期：</label>
                    <p>2018-04-17 至 2018-04-18</p>
                  </div>
                </el-col>
                <el-col :span="8" :offset="2">
                  <div class="order-info-item">
                    <label class="label-info-title text-right">订货会地址：</label>
                    <p>XX市XXXXXXXXXXX街XXX路XX号</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="add-supplier">
            <AddMerchants title="零售商" @selectOptions="selectSupplier" />
          </div>
          <div class="add-order-title">
            <div class="title fn-left">已添加零售商：</div>
            <div class="remark fn-right"><span>备注：</span>可先提交，事后到订货会管理再去补充完整信息资料</div>
          </div>
          <div class="add-roder-table">
            <Table :table-title="supplierList.tableTitle" :table-data="supplierList.tableData"/>
          </div>
        </div>
      </div>
    </div>
    <div v-show="active === 4">
      <div class="box-1200">
        <div class="terminal-info-box">
          <div class="finish-info-box">
            <div class="finish-info">
              <div class="finish-info-left fn-left">
                <img src="@/assets/images/icon-success.png" alt="">
              </div>
              <div class="finish-info-right fn-left">
                <p class="finish-info-title">订货会资料信息填写完成！</p>
                <p class="finish-info-text">可到<span>订货会管理</span>查看或补充完整信息资料。</p>
                <p class="finish-info-btn"><button>订购会管理</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot-btn" v-show="active !== 4">
      <button v-show="active === 1" class="btns" @click="orderSave">保&nbsp;存</button>
      <button v-show="active !== 1" class="btns" @click="previous">上一步</button>
      <button class="btns" @click="next">下一步</button>
    </div>
  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import DatePicker from '@/components/DatePicker';
  import AddMerchants from '@/components/AddMerchants';
  import Table from '@/components/Table';
  import Cascader from '@/components/Cascader';
  import { quillEditor } from 'vue-quill-editor';


  export default {
    name: 'OrderConfig',
    created() {

      this.opMeetingInfo = JSON.parse(localStorage.getItem(this.$route.query.opMeetingId));
      if(this.opMeetingInfo.opMeetingId){
        this.title = '编辑订购会';
        this.orderPlacingMeeting = this.opMeetingInfo;
        this.orderPlacingMeeting.dateValue = [this.opMeetingInfo.startDt, this.opMeetingInfo.endDt];
        this.qryOpmSupplierList();
        this.qryOpmRetailerList();
      }else{
        this.title = '新增订购会'
      };

    },
    data() {
      return {
        active: 1,
        title: '',

        orderPlacingMeeting: {
          dateValue: []
        },

        opmSupplierList: [],
        opmRetailerList: [],

        supplierList: {
          tableTitle: [{
            label: '省份',
            prop: 'province',
          },{
            label: '供货商编码',
            prop: 'supplierCode',
          },{
            label: '供货商名称',
            prop: 'supplierName',
          },{
            label: '供货商类型',
            prop: 'supplierTypeName',
          },{
            label: '联系人',
            prop: 'linkMan',
          },{
            label: '联系电话',
            prop: 'linkNbr',
          },{
            label: '公司电话',
            prop: 'supplierPhone',
          },{
            label: '公司传真',
            prop: 'supplierFax',
          },{
            label: '操作',
            render: (h, params) => {
              return h({
                template: '<div><button @click="delItem(param.row, param.index)" class="del-btn"><span class="iconfont">&#xe60a;</span></button></div>',
                data: function(){
                  return {
                    param: params
                  }
                },
                methods: {
                  delItem: (val, index) => {
                    console.log(params);
                    // this.delSupplier(val, index);
                  }
                }
              })
            }
          }],
          tableData: []
        }
      }
    },
    methods: {
      next() {
        this.active ++;
        console.log(this.content);
      },
      previous() {
        this.active --;
      },
      orderSave() {
        console.log(this.orderPlacingMeeting)
      },
      selectAddress(val){
        this.orderPlacingMeeting.commonRegionId = val;
      },
      qryOpmSupplierList (){
        this.$post('/orderPlacingMeetingController/queryOpmSupplierList', {
            'opMeetingId': this.orderPlacingMeeting.opMeetingId,
            'pageSize': 10,
            'curPage': 1
        }).then((rsp) => {
          this.supplierList.tableData = rsp.rows;
        });
      },
      qryOpmRetailerList(){
        this.$post('/orderPlacingMeetingController/queryOpmRetailerList', {
            'opMeetingId': this.orderPlacingMeeting.opMeetingId,
            'pageSize': 10,
            'curPage': 1
        }).then((rsp) => {
          this.opmRetailerList = rsp.rows;
        });
      },

      selectRetailer(val){
          this.orderQueryData.retailerId = val;
      },
      selectSupplier(val){
          this.orderQueryData.supplierId = val;
      },
      delSupplier(val, index){
        this.supplierList.tableData.splice(index, 1);
      },

      onChange(){

      }

    },
    filters: {
      dateFilter: function (value) {
        // return FormatDate.FormatDate(value, 'yyyy-MM-dd')
      }
    },
    components: {
      TitlePlate,
      Input,
      Select,
      DatePicker,
      AddMerchants,
      Table,
      Cascader,
      quillEditor
    }
  }
</script>

<style lang="less">

  .vue_add-supplier {
    .text-right {
      text-align: right;
    }
    .order-titl {
      height: 28px;
      margin: 15px 0;
      line-height: 28px;
    }
    .terminal-info-box{
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
      .add-order-title{
        height: 28px;
        margin: 15px 0;
        line-height: 28px;
        .title{
          font-size: 14px;
        }
        .remark{
          color: #6c6c6c;
          font-size: 12px;
          span{
            color: #f60e0e;
          }
        }
      }
      .add-supplier{
        margin-top: 20px;
      }
      .order-info{
        width: 100%;
        height: 81px;
        border: 1px solid #ebebeb;
        .order-info-left{
          position: relative;
          width: 108px;
          height: 100%;
          background: #f8f8f8;
          border-right: 1px solid #ebebeb;
          text-align: center;
          &:after{
            position: absolute;
            right: -10px;
            top: 50%;
            margin-top: -5px;
            display: block;
            content: '';
            width: 10px;
            height: 15px;
            background: url('../assets/images/arrow-right.png') no-repeat 0 center;
          }
          img{
            padding-top: 9px;
          }
          p{
            line-height: 22px;
          }
        }
        .order-info-right{
          width: calc(100% - 109px);
          padding-top: 10px;
          .order-info-item {
            display: flex;
            margin: 3px 0;
            color: #151515;
            font-size: 14px;
            line-height: 24px;
            .label-info-title {
              width: 100px;
            }
            .condition-input {
              flex: 1 0 0;
            }
          }
        }
      }
    }
    .red-star{
      color: #f00;
    }

    .condition-item {
      display: flex;
      margin: 10px 0;
      color: #151515;
      .label-wrds {
        width: 135px;
        line-height: 32px;
        font-size: 14px;
      }
      .condition-input {
        flex: 1 0 0;
      }
      .label-address{
        width: 20px;
        line-height: 32px;
        text-align: center;
      }
      .condition-upload{
        width: 163px;
        height: 86px;
        margin-right: 10px;
        background: #fcfcfc;
        border: 1px solid #dedede;
        text-align: center;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .el-cascader{
        flex: 1;
        line-height: 32px;
        .el-input__inner{
          height: 32px;
          line-height: 32px;
        }
        .el-input__icon{
          line-height: 32px;
        }
      }
      .editor{
        flex: 1;
        .quill-editor{
          height: 200px;
        }
      }
      &.editor-box{
        height: 270px;
      }
    }

    .add-roder-table{
      .del-btn{
        background: none;
        border: none;
        color: #6f6f6f;
        font-size: 16px;
        cursor: pointer;
        &:hover{
          color: #f01d1d;
        }
      }
    }

    .foot-btn{
      width: 100%;
      padding: 35px 0;
      border-top: 1px solid #dcdcdc;
      text-align: center;
      .btns {
        display: inline-block;
        padding: 3px 30px;
        margin: 0 10px;
        border: 0;
        background-color: #fa0000;
        color: #fff;
        font-size: 14px;
        border-radius: 3px;
        line-height: 28px;
        cursor: pointer;
        text-decoration: none;
        &:hover {
          background-color: #e20606;
        }
      }
    }

    .finish-info-box{
      width: 100%;
      height: 168px;
      background: #f5fff8;
      border: 1px solid #e4f0e7;
      .finish-info{
        width: 500px;
        margin: auto;
        padding-top: 15px;
        .finish-info-left{
          width: 99px;
          height: 99px;
          margin-right: 5px;
        }
        .finish-info-right{
          .finish-info-title{
            margin-top: 20px;
            color: #000;
            font-size: 16px;
            font-weight: bold;
          }
          .finish-info-text{
            margin-top: 20px;
            color: #1e1e1e;
            font-size: 12px;
            span{
              margin: 0 5px;
              color: #f60e0e;
              text-decoration: underline;
            }
          }
          .finish-info-btn{
            button{
              margin-top: 20px;
              padding: 5px 10px;
              background: #f01919;
              color: #fff;
              border: none;
              border-radius: 3px;
              cursor: pointer;
            }
          }
        }
      }
    }

    //步骤条
    .step-box{
      padding: 0 20px;
      .el-step__title{
        line-height: 30px;
        font-size: 12px;
        &.is-wait, &.is-process{
          color: #727272;
          font-weight: normal;
          .el-step__icon-inner{
            color: #818181;
            font-weight: normal;
          }
        }
        &.is-finish{
          color: #f01d1d;
        }
      }
      .el-step__icon{
        background: #dcdcdc;
        border: none;
      }
      .el-step__line-inner{
        border-width: 0;
      }
      .el-step__line{
        background: none;
        border-top-width: 1px;
        border-style: dotted;
      }
      .el-step__head{
        &.is-finish{
          color: #fff;
          .el-step__icon{
            background: #f01d1d;
            border: none;
          }
          .el-step__line{
            border-color: #f00;
          }
        }
        &.is-process, &.is-wait{
          .el-step__icon-inner{
            color: #818181;
            font-weight: normal;
          }
        }
        .el-step__line-inner{
          border: none;
        }
      }
    }
    //步骤条

  }
  .el-date-table td.current:not(.disabled) span {
      color: #fff;
      background-color: #ff7a7a;
  }

</style>
