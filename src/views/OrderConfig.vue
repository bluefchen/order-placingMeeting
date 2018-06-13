<template>
  <div class="vue_order-config">
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
      <el-form :model="orderPlacingMeeting" ref="orderPlacingMeeting" label-width="135px" class="demo-ruleForm">
        <div class="box-1200">
          <div class="roder-config-info-box">
            <el-row :gutter="0">
              <el-col :span="8" :offset="2">
                <el-form-item label="订货会编码：" prop="opMeetingNo"
                              :rules="[{ min: 0, max: 30, message: '长度不能超过30个字符', trigger: 'blur'}]">
                  <Input :value.sync="orderPlacingMeeting.opMeetingNo"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :span="16" :offset="2">
                <el-form-item label="订货会名称：" prop="opmName"
                              :rules="[{ required: true, message: '订购会名称不能为空', trigger: 'blur'},{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'change'}]">
                  <Input :value.sync="orderPlacingMeeting.opmName"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :span="6" :offset="2">
                <el-form-item label="订货会地址：" prop="commonRegionId"
                              :rules="[{ required: true, message: '订购会地址不能为空', trigger: 'change'}]">
                  <AreaSelect :value.sync="orderPlacingMeeting.commonRegionId"/>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <div class="condition-item-address">
                  <label class="label-address">--</label>
                  <el-form-item label-width="0" prop="opmAddr"
                                :rules="[{ required: true, message: '订购会地址不能为空', trigger: 'blur'},{ min: 0, max: 300, message: '长度不能超过300个字符', trigger: 'change'}]">
                    <Input :value.sync="orderPlacingMeeting.opmAddr"/>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :span="24" :offset="2" class="fn-clear">
                <el-form-item class="fn-left" label="活动起止日期：" prop="startDt"
                              :rules="[{ required: true, message: '活动起止日期不能为空'}]">
                  <el-date-picker
                    class="fn-left"
                    v-model="orderPlacingMeeting.startDt"
                    type="date"
                    size="small"
                    :picker-options="pickerBeginDateBefore"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :editable="false">
                  </el-date-picker>
                </el-form-item>
                <div class="date-text fn-left">至</div>
                <el-form-item label-width="0" class="fn-left" prop="endDt"
                              :rules="[{ required: true, message: '活动起止日期不能为空'}]">
                  <el-date-picker
                    class="fn-left"
                    v-model="orderPlacingMeeting.endDt"
                    type="date"
                    size="small"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerBeginDateAfter"
                    placeholder="选择日期"
                    :editable="false">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :span="8" :offset="2">
                <el-form-item label="定金补录截止日期：" class="fn-left" prop="depositRecordEnddt"
                              :rules="[{ required: true, message: '定金补录截止日期不能为空'}]">
                  <el-date-picker
                    v-model="orderPlacingMeeting.depositRecordEnddt"
                    type="date"
                    size="small"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="beginDate"
                    :editable="false">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="2">
                <el-form-item label="提货上报截止日期：" class="fn-left" prop="pickupRecordEnddt"
                              :rules="[{ required: true, message: '提货上报截止日期不能为空'}]">
                  <el-date-picker
                    v-model="orderPlacingMeeting.pickupRecordEnddt"
                    type="date"
                    size="small"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="beginDate"
                    :editable="false">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :span="18" :offset="2">
                <el-form-item label="订购会logo上传：" class="fn-left" prop="logoUrl"
                              :rules="[{ required: true, message: '订购会logo不能为空', trigger: 'change'}]">
                  <el-upload
                    class="condition-upload fn-left"
                    action="/orderPlacingMeeting/commonCfgController/upload"
                    :show-file-list="false"
                    :data="upLoadData"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="orderPlacingMeeting.logoUrl" :src="orderPlacingMeeting.logoUrl">
                    <span v-if="!orderPlacingMeeting.logoUrl"><img src="@/assets/images/icon-add.png"></span>
                  </el-upload>
                  <div class="fn-left logo-notice">logo尺寸大小：高宽200*200PX</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :span="18" :offset="2">
                <el-form-item label="订购会描述：" prop="discription">
                  <div class="editor editor-box">
                    <quill-editor ref="orderPlacingMeeting" v-model="orderPlacingMeeting.discription"></quill-editor>
                    <div class="editor-error" v-if="nullError">订购会描述不能为空</div>
                    <div class="editor-error" v-if="overError">长度不能超过1000个字符</div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="footer-btn">
          <el-button type="primary" class="btns" @click="submitForm('orderPlacingMeeting', '下一步')">下一步</el-button>
        </div>
      </el-form>
    </div>
    <div v-show="active === 2">
      <div class="box-1200">
        <div class="roder-config-info-box">
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
        <div class="roder-config-info-box">
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
    <div class="footer-btn" v-show="active !== 4 && active !== 1">
      <button v-show="active !== 1" class="btns" @click="previous">上一步</button>
      <button v-show="active === 3" class="btns" @click="finish">完成</button>
      <button v-show="active !== 3" class="btns" @click="next">下一步</button>
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
  import moment from 'moment';

  import '@/assets/css/quill.snow.css'; //富文本框样式

  export default {
    name: 'OrderConfig',
    created() {
      let operation = this.$route.query.operation;
      if (operation === 'add') {
        this.title = '新增订购会';
      } else {
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
              return moment(time).format('YYYY-MM-DD') > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.orderPlacingMeeting.startDt;
            if (beginDateVal) {
              return moment(time).format('YYYY-MM-DD') < beginDateVal;
            }
          }
        },
        beginDate: {
          disabledDate: (time) => {
            let beginDateVal = new Date();
            if (beginDateVal) {
              return moment(time).format('YYYY-MM-DD') < moment(beginDateVal).format('YYYY-MM-DD');
            }
          }
        },
        labelPosition: 'right',
        upLoadData: {
          fileType: '1'
        },
        dialogVisible: false,
        dislogTitle: '保存',
        nullError: null,
        overError: null,
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
      submitForm(formName, title) {
        if (this.orderPlacingMeeting.discription) {
          this.nullError = false;
          if (this.orderPlacingMeeting.discription.length < 1000) {
            this.overError = false;
          } else {
            this.overError = true;
          }
        } else {
          this.nullError = true;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.nullError && !this.overError) {
              if (title === '保存') {
                this.orderSave();
              } else {
                this.next();
              }
            }
          } else {
            return false;
          }
        });
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
        this.orderPlacingMeeting.logoUrl = res.data.url;
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
      },
      finish() {
        let supplierIdList = [];
        let retailerIdList = [];
        _.forEach(this.supplierList.tableData, (item, index) => {
          supplierIdList.push(item.supplierId);
        });

        _.forEach(this.retailerList.tableData, (item, index) => {
          retailerIdList.push(item.retailerId);
        });
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
            'supplierArr': supplierIdList,
            'retailerArr': retailerIdList
          }).then((rsp) => {
            if (rsp.resultCode === '0') {
              this.next();
            }
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
            'supplierArr': supplierIdList,
            'retailerArr': retailerIdList
          }).then((rsp) => {
            if (rsp.resultCode === '0') {
              this.next();
            }
          });
        }
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
    },
    watch: {
      'orderPlacingMeeting.discription': function (newVal, oldVal) {
        if (!newVal) {
          this.nullError = true;
        } else if (!!newVal) {
          this.nullError = false;
        }
        if (newVal && newVal.length > 1000) {
          this.overError = true;
        } else {
          this.overError = false;
        }
      }
    }
  }
</script>

<style lang="less">

  .vue_order-config {
    .text-right {
      text-align: right;
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
    }
    .roder-config-info-box {
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
    .condition-item-address {
      position: relative;
      margin: 5px 0;
      padding-left: 20px;
      .label-address {
        position: absolute;
        left: 0;
        width: 20px;
        line-height: 30px;
        text-align: center;
      }
    }
    .date-text {
      width: 30px;
      margin-top: 10px;
      text-align: center;
      line-height: 30px;
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
      .el-upload {
        vertical-align: middle;
        img {
          vertical-align: middle;
        }
      }
    }
    .logo-notice {
      margin-left: 5px;
      color: #ffa132;
      line-height: 88px;
    }
    .condition-item {
      margin: 5px 0;
      padding-left: 135px;
      .label-wrds {
        width: 135px;
        line-height: 30px;
      }
    }
    .editor-box {
      height: 270px;
      .quill-editor {
        height: 200px;
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

    .footer-btn {
      width: 100%;
      padding: 35px 0;
      border: none;
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

    //表单提示样式
    .el-form-item {
      margin: 10px 0;
    }

    .editor-error {
      position: absolute;
      left: 0;
      bottom: -30px;
      padding: 5px;
      z-index: 999;
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
    }
    .el-form-item__error {
      padding: 5px;
      z-index: 999;
    }

    .el-form-item__label {
      height: 30px;
      line-height: 30px;
      padding: 0;
      color: #333;
    }
    .el-form-item__content {
      line-height: 30px;
    }
    //表单提示样式
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

  .el-date-picker__header-label.active, .el-date-picker__header-label:hover, .el-month-table td .cell:hover, .el-month-table td.current:not(.disabled) .cell {
    color: #ff7a7a;
  }

  .el-form-item.is-success .el-input__inner {
    border-color: #dcdfe6;
  }

  .el-form-item.is-success .el-input__inner:hover {
    border-color: #c0c4cc;
  }

  .el-form-item.is-success .el-input__inner:focus {
    border-color: #ff7a7a;
  }

  .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus {
    border-color: #f00;
  }
</style>
