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
                <Input :value.sync="orderPlacingMeeting.opMeetingNo"/>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="16" :offset="2">
              <div class="condition-item">
                <label class="label-wrds text-right"><span class="red-star">*</span> 订货会名称：</label>
                <Input :value.sync="orderPlacingMeeting.opmName"/>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="6" :offset="2">
              <div class="condition-item">
                <label class="label-wrds text-right"><span class="red-star">*</span> 订货会地址：</label>
                <AreaSelect :value.sync="orderPlacingMeeting.commonRegionId"/>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="condition-item-address">
                <label class="label-address">--</label>
                <Input :value.sync="orderPlacingMeeting.opmAddr"/>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="24" :offset="2">
              <div class="condition-item">
                <label class="label-wrds text-right"><span class="red-star">*</span> 活动起止日期：</label>
                <el-date-picker
                  class="fn-left"
                  v-model="orderPlacingMeeting.startDt"
                  type="date"
                  size="small"
                  :picker-options="pickerBeginDateBefore"
                  format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :editable="false">
                </el-date-picker>
                <div class="date-text fn-left">至</div>
                <el-date-picker
                  class="fn-left"
                  v-model="orderPlacingMeeting.endDt"
                  type="date"
                  size="small"
                  format="yyyy-MM-dd"
                  :picker-options="pickerBeginDateAfter"
                  placeholder="选择日期"
                  :editable="false">
                </el-date-picker>
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
                  placeholder="选择日期"
                  :editable="false">
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
                  placeholder="选择日期"
                  :editable="false">
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="18" :offset="2">
              <div class="condition-item">
                <label class="label-wrds text-right"><span class="red-star">*</span> 订购会logo上传：</label>
                <el-upload
                  class="condition-upload"
                  action="/commonCfgController/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="orderPlacingMeeting.logoUrl" :src="orderPlacingMeeting.logoUrl">
                  <div v-if="!orderPlacingMeeting.logoUrl"><img src="@/assets/images/icon-add.png"></div>
                </el-upload>
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
                    <p>{{orderPlacingMeeting.startDt}} 至 {{orderPlacingMeeting.endDt}}</p>
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
            <AddMerchants title="供货商" @selectOptions="selectSupplier"/>
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
                    <p>{{orderPlacingMeeting.startDt}} 至 {{orderPlacingMeeting.endDt}}</p>
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
            <AddMerchants title="零售商" @selectOptions="selectRetailer"/>
          </div>
          <div class="add-order-title">
            <div class="title fn-left">已添加零售商：</div>
            <div class="remark fn-right"><span>备注：</span>可先提交，事后到订货会管理再去补充完整信息资料</div>
          </div>
          <div class="add-roder-table">
            <Table :table-title="retailerList.tableTitle" :table-data="retailerList.tableData"/>
          </div>
        </div>
      </div>
    </div>
    <div v-show="active === 4">
      <div class="box-1200">
        <div class="import-result-box">
          <div class="success">
            <p class="title">订货会资料信息填写完成！</p>
            <p class="sub-title">您可到
              <router-link class="btns" to="/orderManage/orderManageIndex">订货会管理</router-link>
              查看或补充完整信息资料
            </p>
            <el-button size="small" type="success" @click="jumpLink">订购会管理</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="foot-btn" v-show="active !== 4">
      <button
        :disabled="!this.orderPlacingMeeting.opmName || !this.orderPlacingMeeting.opmAddr || !this.orderPlacingMeeting.commonRegionId || !this.orderPlacingMeeting.startDt || !this.orderPlacingMeeting.endDt || !this.orderPlacingMeeting.discription || !this.orderPlacingMeeting.logoUrl || !this.orderPlacingMeeting.depositRecordEnddt || !this.orderPlacingMeeting.pickupRecordEnddt"
        v-show="active === 1" class="btns" @click="orderSave">保&nbsp;存
      </button>
      <button v-show="active !== 1" class="btns" @click="previous">上一步</button>
      <button v-show="active === 3" class="btns" @click="finish">完成</button>
      <button v-show="active !== 3" :disabled="!this.orderPlacingMeeting.opmName || !this.orderPlacingMeeting.opmAddr || !this.orderPlacingMeeting.commonRegionId || !this.orderPlacingMeeting.startDt || !this.orderPlacingMeeting.endDt || !this.orderPlacingMeeting.discription || !this.orderPlacingMeeting.logoUrl || !this.orderPlacingMeeting.depositRecordEnddt || !this.orderPlacingMeeting.pickupRecordEnddt" class="btns" @click="next">下一步</button>
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
  import AreaSelect from '@/components/AreaSelect';
  import DialogPopup from '@/components/DialogPopup';
  import {quillEditor} from 'vue-quill-editor';

  export default {
    name: 'OrderConfig',
    created() {
      let operation = this.$route.query.operation;
      if(operation === 'add'){
        this.title = '新增订购会';
      }else{
        this.title = '编辑订购会';
        this.orderPlacingMeeting = JSON.parse(localStorage.getItem('opMeeting'));
        this.qryOpmSupplierList();
        this.qryOpmRetailerList();
      }

    },
    data() {
      return {
        pickerBeginDateBefore: {
          disabledDate: (time) => {
            let beginDateVal = this.orderPlacingMeeting.endDt;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.orderPlacingMeeting.startDt;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        dialogVisible: false,
        dislogTitle: '保存',

        active: 1,
        title: '',
        opMeetingInfo: {},

        orderPlacingMeeting: {
          logoUrl: ''
        },
        opmSupplierList: [],
        opmRetailerList: [],
        //供货商列表
        supplierList: {
          tableTitle: [{
            label: '省份',
            prop: 'commonRegionName',
          }, {
            label: '供货商编码',
            prop: 'supplierCode',
          }, {
            label: '供货商名称',
            prop: 'supplierName',
          }, {
            label: '供货商类型',
            prop: 'supplierTypeName',
          }, {
            label: '联系人',
            prop: 'linkMan',
          }, {
            label: '联系电话',
            prop: 'linkNbr',
          }, {
            label: '公司电话',
            prop: 'supplierPhone',
          }, {
            label: '公司传真',
            prop: 'supplierFax',
          }, {
            label: '操作',
            render: (h, params) => {
              return h({
                template: '<div><button @click="delItem(param.row, param.index)" class="del-btn"><span class="iconfont">&#xe60a;</span></button></div>',
                data: function () {
                  return {
                    param: params
                  }
                },
                methods: {
                  delItem: (val, index) => {
                    this.delSupplier(val, index);
                  }
                }
              })
            }
          }],
          tableData: []
        },
        //零售商列表
        retailerList: {
          tableTitle: [{
            label: '省份',
            prop: 'commonRegionName',
          }, {
            label: '零售商编码',
            prop: 'retailerCode',
          }, {
            label: '零售商名称',
            prop: 'retailerName',
          }, {
            label: '零售商类型',
            prop: 'retailerTypeName',
          }, {
            label: '联系人',
            prop: 'linkMan',
          }, {
            label: '联系电话',
            prop: 'linkNbr',
          }, {
            label: '公司电话',
            prop: 'retailerPhone',
          }, {
            label: '公司传真',
            prop: 'retailerFax',
          }, {
            label: '操作',
            render: (h, params) => {
              return h({
                template: '<div><button @click="delItem(param.row, param.index)" class="del-btn"><span class="iconfont">&#xe60a;</span></button></div>',
                data: function () {
                  return {
                    param: params
                  }
                },
                methods: {
                  delItem: (val, index) => {
                    this.delRetailer(val, index);
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
        this.active++;
      },
      previous() {
        this.active--;
      },
      qryOpmSupplierList() {
        this.$post('/orderPlacingMeetingController/queryOpmSupplierList', {
          'opMeetingId': this.orderPlacingMeeting.opMeetingId,
          'pageSize': 10,
          'curPage': 1
        }).then((rsp) => {
          this.supplierList.tableData = rsp.rows;
        });
      },
      qryOpmRetailerList() {
        this.$post('/orderPlacingMeetingController/queryOpmRetailerList', {
          'opMeetingId': this.orderPlacingMeeting.opMeetingId,
          'pageSize': 10,
          'curPage': 1
        }).then((rsp) => {
          this.retailerList.tableData = rsp.rows;
        });
      },
      selectRetailer(val) {
        val.forEach((item, index) => {
          let flag = this.retailerList.tableData.some((opt, index) => {
            return item.retailerId === opt.retailerId;
          });
          if (!flag) {
            this.retailerList.tableData.push(item);
          }
        })
      },
      selectSupplier(val) {
        val.forEach((item, index) => {
          let flag = this.supplierList.tableData.some((opt, index) => {
            return item.supplierId === opt.supplierId;
          });
          if (!flag) {
            this.supplierList.tableData.push(item);
          }
        })
      },
      delSupplier(val, index) {
        this.supplierList.tableData.splice(index, 1);
      },
      delRetailer(val, index) {
        this.retailerList.tableData.splice(index, 1);
      },
      //图片上传
      handleAvatarSuccess(res, file) {
        this.orderPlacingMeeting.logoUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        let isImg;
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/bmp' || file.type === 'image/jpg') {
          isImg = true;
        } else {
          isImg = false;
        }
        if (!isImg) {
          this.$message.error('订购会logo只能是图片格式!');
        }
        return isImg;
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
      orderSubmit() {
        if (this.title === '新增订购会') {
          //新增
          this.$post('/orderPlacingMeetingController/insertOrderPlacingMeeting', {
            'opMeetingNo': this.orderPlacingMeeting.opMeetingNo,
            'opmName': this.orderPlacingMeeting.opmName,
            'opmAddr': this.orderPlacingMeeting.opmAddr,
            'startDt': this.orderPlacingMeeting.startDt,
            'endDt': this.orderPlacingMeeting.endDt,
            'commonRegionId': this.orderPlacingMeeting.commonRegionId,
            'discription': this.orderPlacingMeeting.discription,
            'logoUrl': this.orderPlacingMeeting.logoUrl,
            'depositRecordEnddt': this.orderPlacingMeeting.depositRecordEnddt,
            'pickupRecordEnddt': this.orderPlacingMeeting.pickupRecordEnddt,
            'supplierArr': this.supplierList.tableData,
            'retailerArr': this.retailerList.tableData
          }).then((rsp) => {
            console.log('新增成功！');
          });
        } else {
          //修改
          this.$post('/orderPlacingMeetingController/updateOrderPlacingMeeting', {
            'opMeetingId': this.orderPlacingMeeting.opMeetingId,
            'opMeetingNo': this.orderPlacingMeeting.opMeetingNo,
            'opmName': this.orderPlacingMeeting.opmName,
            'opmAddr': this.orderPlacingMeeting.opmAddr,
            'startDt': this.orderPlacingMeeting.startDt,
            'endDt': this.orderPlacingMeeting.endDt,
            'commonRegionId': this.orderPlacingMeeting.commonRegionId,
            'discription': this.orderPlacingMeeting.discription,
            'logoUrl': this.orderPlacingMeeting.logoUrl,
            'depositRecordEnddt': this.orderPlacingMeeting.depositRecordEnddt,
            'pickupRecordEnddt': this.orderPlacingMeeting.pickupRecordEnddt,
            'supplierArr': this.supplierList.tableData,
            'retailerArr': this.retailerList.tableData
          }).then((rsp) => {
            console.log('修改成功！');
          });
        }
      },
      orderSave() {
        this.orderSubmit();
        this.$message.success('订货会基本信息保存成功');
      },
      finish() {
        this.orderSubmit();
        this.next();
      },
      jumpLink() {
        this.$router.push({path: '/orderManage/orderManageIndex'});
      }
    },
    components: {
      TitlePlate,
      Input,
      Select,
      DatePicker,
      AddMerchants,
      Table,
      AreaSelect,
      quillEditor,
      DialogPopup
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
      margin: 15px 0 8px;
      line-height: 28px;
    }
    .terminal-info-box {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
      border: none;
      .add-order-title {
        height: 28px;
        margin: 15px 0;
        line-height: 28px;
        .title {
          font-size: 14px;
        }
        .remark {
          color: #6c6c6c;
          font-size: 12px;
          span {
            color: #f60e0e;
          }
        }
      }
      .add-supplier {
        margin-top: 20px;
      }
      .order-info {
        width: 100%;
        height: 81px;
        border: 1px solid #ebebeb;
        .order-info-left {
          position: relative;
          width: 108px;
          height: 100%;
          background: #f8f8f8;
          border-right: 1px solid #ebebeb;
          text-align: center;
          &:after {
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
          img {
            padding-top: 9px;
          }
          p {
            line-height: 22px;
          }
        }
        .order-info-right {
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
          }
        }
      }
    }
    .red-star {
      color: #f00;
    }
    .condition-item-address{
      position: relative;
      margin: 10px 0;
      padding-left: 20px;
      .label-address {
        position: absolute;
        left: 0;
        width: 20px;
        line-height: 32px;
        text-align: center;
      }
    }
    .condition-item {
      padding-left: 135px;
      .label-wrds {
        width: 135px;
      }
      .date-text {
        width: 50px;
        text-align: center;
        line-height: 32px;
      }

      .condition-upload {
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
        border-radius: 5px;
        img {
          max-width: 161px;
          max-height: 84px;
        }
      }
      .editor {
        flex: 1;
        .quill-editor {
          height: 200px;
        }
      }
      &.editor-box {
        height: 270px;
      }
    }

    .add-roder-table {
      .del-btn {
        background: none;
        border: none;
        color: #6f6f6f;
        font-size: 16px;
        cursor: pointer;
        &:hover {
          color: #f01d1d;
        }
      }
    }

    .foot-btn {
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
        &:disabled {
          opacity: 0.7;
          &:hover {
            background-color: #fa0000;
          }
        }
      }
    }

    .import-result-box {
      width: 100%;
      margin-top: 20px;
      padding: 10px 0 20px;
      background: #f5fff8;
      border: 1px solid #e4f0e7;

      .success {
        width: 330px;
        margin: 0 auto;
        padding: 10px 0 0 110px;
        background: url(../assets/images/icon-success.png) no-repeat 0 0;
        .title {
          line-height: 35px;
          color: #000;
          font-size: 16px;
        }
        .sub-title {
          margin-bottom: 15px;
          color: #1e1e1e;
          font-size: 12px;
          a, a:hover, a:active {
            margin: 0 2px;
            color: #f82134;
            font-size: 12px;
            text-decoration: underline;
          }
        }
      }
    }

    //步骤条
    .step-box {
      padding: 0 20px;
      .el-step__title {
        line-height: 30px;
        font-size: 12px;
        &.is-wait, &.is-process {
          color: #727272;
          font-weight: normal;
          .el-step__icon-inner {
            color: #818181;
            font-weight: normal;
          }
        }
        &.is-finish {
          color: #f01d1d;
        }
      }
      .el-step__icon {
        background: #dcdcdc;
        border: none;
      }
      .el-step__line-inner {
        border-width: 0;
      }
      .el-step__line {
        background: none;
        border-top-width: 1px;
        border-style: dotted;
      }
      .el-step__head {
        &.is-finish {
          color: #fff;
          .el-step__icon {
            background: #f01d1d;
            border: none;
          }
          .el-step__line {
            border-color: #f00;
          }
        }
        &.is-process, &.is-wait {
          .el-step__icon-inner {
            color: #818181;
            font-weight: normal;
          }
        }
        .el-step__line-inner {
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

  .el-date-table td.available:hover {
    color: #ff7a7a;
  }

  .el-date-table td.today span {
    color: #ff7a7a;
    font-weight: 700;
  }

</style>
