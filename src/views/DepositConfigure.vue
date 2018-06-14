<template>
  <div class="deposit-configure">
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
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['定金管理', '定金配置']"/>
        </div>
      </div>

      <div class="provin box-1200">
        <p class="pro-left">当前省份： <span>{{opMeetingInfo.commonRegionName}}</span></p>
        <div class="provin-edit">
          <!-- 默认模式 -->
          <div class="default" v-if="editshow">
            <ul class="selections fn-clear">
              <label class="select-wrds fn-left">定金模式：</label>
              <div class="fn-left">
                <p class="fir-wrds fn-left">{{depositInfoList.depositTypeName || '--' }}</p>
                <el-button class="edit-btn fn-left" @click="edit()"><i class="iconfont">&#xe738;</i> 修改</el-button>
              </div>
            </ul>
            <div class="steps">
              <!-- 定金 -->
              <div class="second-step fn-clear" v-show="depositType == 2">
                <label class="select-wrds fn-left">定金比例配置：</label>
                <p class="sec-done fn-left">{{depositInfoList.depositProportion || '--'}}%</p>
                <label class="warn-wrds fn-left">( 注：订单的定金比例在1%-100%之间。)</label>
              </div>
              <!-- 诚意金 -->
              <div class="third-step" v-show="depositType == 3">
                <div class="model-list-table">
                  <div class="order-titl fn-clear">
                    <TitlePlate class="fn-left" title="配置诚意金的订单列表"/>
                    <p class="warn-wrds fn-right">( 注：每个订单的诚意金金额至少为10000元 )</p>
                  </div>
                  <Table :tableTitle="tableTitleDone" :tableData="tableData"/>
                </div>
              </div>
            </div>
          </div>
          <!-- 修改模式 -->
          <div class="first-step" v-else>
            <ul class="selections fn-clear">
              <label class="select-wrds fn-left">定金模式：</label>
              <div class="fn-left">
                <li class="select-sp fn-left" :class="depositType === 1?'on':''" @click="selectMode(1)">全额付款</li>
                <li class="select-sp fn-left" :class="depositType === 2?'on':''" @click="selectMode(2)">定金</li>
                <li class="select-sp fn-left" :class="depositType === 3?'on':''" @click="selectMode(3)">诚意金</li>
              </div>
            </ul>
            <el-form :model="depositInfoList" :rules="rules" ref="depositInfoList" label-width="100px"
                     class="demo-ruleForm">
              <div class="steps">
                <!-- 定金 -->
                <el-form-item prop="depositProportion" v-show="depositType == 2">
                  <div class="second-step fn-clear">
                    <label class="select-wrds fn-left">定金比例配置：</label>
                    <Input class="fn-left" type="number" :value.sync="depositInfoList.depositProportion"
                           suffixIcon="el-icon-percent"/>
                    <label class="warn-wrds fn-left">( 注：订单的定金比例在1%-100%之间。)</label>
                  </div>
                </el-form-item>
                <!-- 诚意金 -->
                <div class="third-step" v-show="depositType == 3">
                  <div class="model-list-table">
                    <div class="order-titl fn-clear">
                      <TitlePlate class="fn-left" title="配置诚意金的订单列表"/>
                      <p class="warn-wrds fn-right">( 注：每个订单的诚意金金额至少为10000元 )</p>
                    </div>
                    <Table :tableTitle="tableTitle" :tableData="tableData"/>
                  </div>
                </div>
              </div>
              <el-form-item>
                <div class="confirm-btn">
                  <el-button type="primary" class="confirm" @click="confirm(depositType, 'depositInfoList')">确定
                  </el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Input from '@/components/Input';

  export default {
    name: 'DepositConfigure',
    created() {
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
      this.queryOpmDepositInfo();
    },
    data() {
      let checkProportion = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        if (value < 1 || value > 100) {
          callback(new Error('请输入1-100之间的数字'));
        } else {
          callback();
        }
      };
      return {
        editshow: true,
        depositType: '',
        opMeetingInfo: [],//订货会数据
        depositInfoList: {
          depositTypeName: '',
          depositProportion: '',
          opmRetailerDepositList: []
        }, //查询返回的数据
        rules: {
          depositProportion: [
            {validator: checkProportion, trigger: 'blur'},
          ]
        },
        opmRetailerUpate: [], //诚意金修改后要提交的数据
        tableTitle: [{
          label: '零售商编码',
          prop: 'retailerCode',
          width: 200
        }, {
          label: '零售商名称',
          prop: 'retailerName',
          width: 450,
        }, {
          label: '零售商类型',
          prop: 'retailerTypeName',
          width: 234,
        }, {
          label: '诚意金金额',
          prop: 'depositAmount',
          render: (h, params) => {
            return h({
              template: '<el-input v-model="row.depositAmount" placeholder="请输入内容" size="mini" prefix-icon="el-icon-money" @change="onChange"></el-input>',
              data: function () {
                return {
                  index: params.index,
                  row: params.row
                }
              },
              methods: {
                onChange: () => {
                  this.handleEdit(params.index, params.row);
                }
              }
            })
          }
        }],
        tableData: [],
        tableTitleDone: [{
          label: '零售商编码',
          prop: 'retailerCode',
          width: 200
        }, {
          label: '零售商名称',
          prop: 'retailerName',
          width: 450,
        }, {
          label: '零售商类型',
          prop: 'retailerTypeName',
          width: 234,
        }, {
          label: '诚意金金额',
          prop: 'depositAmount',
          render: function (h, params) {
            return h({
              template: '<p class="red">¥{{depositAmount}}</p>',
              data: function () {
                return {
                  depositAmount: params.row.depositAmount
                }
              }
            })
          }
        }],
      }
    },
    methods: {
      handleEdit(index, row) {
        this.tableData[index] = row;
      },
      edit() {
        this.editshow = false;
      },
      selectMode(index) {
        this.depositType = index;
      },
      confirm(type, formName) {
        if(type == 1){
          this.$post('/opmDepositController/updateOpmDepositInfo', {
            opMeetingId: this.opMeetingInfo.opMeetingId,
            provinceCommonRegionId: this.opMeetingInfo.commonRegionId,
            depositType: type,
          }).then((rsp) => {
            this.$message.success('修改配置成功！');
            this.queryOpmDepositInfo();
            this.editshow = true;
          })
        }else if(type == 2) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$post('/opmDepositController/updateOpmDepositInfo', {
                opMeetingId: this.opMeetingInfo.opMeetingId,
                provinceCommonRegionId: this.opMeetingInfo.commonRegionId,
                depositType: type,
                depositProportion: this.depositInfoList.depositProportion,
              }).then((rsp) => {
                this.$message.success('修改配置成功！');
                this.queryOpmDepositInfo();
                this.editshow = true;
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }else{
          let opmRetailerDepositList = this.depositInfoList.opmRetailerDepositList;
          if (opmRetailerDepositList) {
            opmRetailerDepositList.map((item) => {
              let obj = {
                'retailerId': item.retailerId,
                'depositAmount': item.depositAmount
              };
              this.opmRetailerUpate.push(obj);
            });
          };
          this.$post('/opmDepositController/updateOpmDepositInfo', {
            opMeetingId: this.opMeetingInfo.opMeetingId,
            provinceCommonRegionId: this.opMeetingInfo.commonRegionId,
            depositType: type,
            opmRetailerDepositList: this.opmRetailerUpate
          }).then((rsp) => {
            this.$message.success('修改配置成功！');
            this.queryOpmDepositInfo();
            this.editshow = true;
          })
        }
      },
      queryOpmDepositInfo() {
        this.$post('/opmDepositController/queryOpmDepositInfo', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
        }).then((rsp) => {
          if (rsp) {
            this.depositInfoList = rsp;
            localStorage.setItem('opmDeposit', JSON.stringify(rsp));
          } else {
            this.depositInfoList = {};
          }
          this.depositType = this.depositInfoList.depositType;
          this.tableData = this.depositInfoList.opmRetailerDepositList;
        })
      }
    },
    components: {
      Breadcrumb,
      TitlePlate,
      Table,
      Input
    }
  }
</script>

<style lang="less">
  @import "../assets/css/mixin";

  .deposit-configure {
    /*中间背景图片*/
    .img-bg {
      width: 100%;
      height: 170px;
      background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat center center;
      .info {
        width: 1036px;
        height: 170px;
        margin: 0 auto;
        overflow: hidden;
        .p-titl {
          margin: 62px 0 0 0;
          font-size: 22px;
          color: #fcfdff;
        }
        .activity {
          width: 306px;
          margin: 10px 0 0 0;
          line-height: 18px;
          font-size: 12px;
          color: #fcfdff;
          text-align: center;
        }
      }
    }
    /*中间背景图片*/
    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }
    .provin {
      margin: 28px auto;
      font-size: 14px;
      .pro-left {
        position: relative;
        width: 215px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background-color: #e4263e;
        color: #fff;
      }
    }
    .provin-edit {
      width: 100%;
      border: 1px solid #e8e8e8;
      .pro-mid {
        width: 354px;
        height: 70px;
        line-height: 70px;
        margin-left: 109px;
        span {
          margin-left: 42px;
        }
      }
      .edit-btn {
        height: 25px;
        padding: 0 12px;
        margin: 5px 0 0 0;
        line-height: 24px;
        color: #e52840;
        border: 1px solid #e52840;
        border-radius: 3px;
        &:hover {
          background-color: #fff;
        }
      }
    }
    .first-step {
      .confirm-btn {
        width: 100%;
        height: 54px;
        background-color: #fafafa;
        border-top: 1px solid #e8e8e8;
        text-align: center;
        .confirm {
          height: 34px;
          padding: 0 35px;
          line-height: 34px;
          color: #fff;
          margin-top: 10px;
          background-color: #e52840;
          border: 0;
        }
      }
    }
    .steps {
      min-height: 100px;
      padding: 0 15px;
    }
    .select-wrds {
      width: 180px;
      line-height: 34px;
      text-align: right;
    }
    .selections {
      margin: 20px 0 0 15px;
      font-size: 14px;
      color: #151515;
      .select-sp {
        width: 114px;
        height: 32px;
        margin-left: 14px;
        line-height: 32px;
        border: 1px solid #dcdfe6;
        text-align: center;
        border-radius: 3px;
        cursor: pointer;
        &.on {
          border: 1px solid #f01d1d;
          background: url('../assets/images/selected-icon.png') right bottom no-repeat;
          color: #f01d1d;
        }
      }
      .fir-wrds {
        width: 250px;
        line-height: 34px;
        margin-left: 40px;
      }
    }
    .second-step {
      border-top: 1px dashed #e1e1e1;
      padding-top: 20px;
      margin-top: 20px;
      .el-input {
        width: 374px;
      }
      .sec-done {
        width: 108px;
        color: #e52941;
        line-height: 34px;
        margin-left: 40px;
        font-weight: 700;
      }
      .el-icon-percent::before {
        color: #151515;
        font-weight: bold;
      }
      .el-input--small .el-input__inner {
        text-align: center;
        color: #f01919;
        font-weight: bold;
      }
      .el-input--mini{
        margin-left: 13px;
      }
    }
    .warn-wrds {
      line-height: 34px;
      color: #fa0000;
      margin-left: 20px;
      font-size: 12px;
    }
    /* 第三步 */
    .third-step {
      border-top: 1px dashed #e1e1e1;
      padding-top: 20px;
      margin-top: 10px;
      .model-list-table {
        margin-bottom: 20px;
      }
      .order-titl {
        margin-bottom: 5px;
        .title {
          font-size: 14px;
          line-height: 20px;
        }
      }
      .warn-wrds {
        line-height: 20px;
      }
      .el-icon-money::before {
        color: #f01919;
      }
      .el-input--mini .el-input__inner {
        text-align: center;
        color: #f01919;
      }
    }

    /*表单验证*/
    .el-form-item {
      margin-bottom: 0;
      margin-left: -100px;
    }
    .el-form-item__content {
      line-height: 32px;
    }
    .el-form-item__error {
      position: absolute;
      padding-top: 0;
      top: 78px;
      left: 194px;
    }
  }
</style>
