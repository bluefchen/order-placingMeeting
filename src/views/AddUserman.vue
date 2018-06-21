<template>
  <div class="add-userman">
    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['系统维护', '用户管理', '修改密码']"/>
      </div>
    </div>
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="新增/修改账号"/>
      </div>
      <el-form :model="usermanData" :rules="rules" ref="usermanData" label-width="100px" class="demo-ruleForm">
        <div class="terminal-info-box">
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item prop="userType">
                <div class="condition-item">
                  <label class="label-wrds"><span class="red-star">*</span> 用户类型：</label>
                  <Select :value.sync="usermanData.userType" :options="usermanList" :disabled="modify"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item prop="systemUserCode">
                <div class="condition-item">
                  <label class="label-wrds"><span class="red-star">*</span> 用户账号：</label>
                  <Input :value.sync="usermanData.systemUserCode" :disabled="modify"/>
                  <el-button class="pwd-edit" @click="pwdEdit = true" v-if="!pwdEdit && modify">更改密码</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item prop="password" v-if="!modify">
                <div class="condition-item">
                  <label class="label-wrds"><span class="red-star">*</span> 密码：</label>
                  <Input type="password" :value.sync="usermanData.password"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item prop="checkPassword" v-if="!modify">
                <div class="condition-item">
                  <label class="label-wrds"><span class="red-star">*</span> 确认密码：</label>
                  <Input type="password" :value.sync="usermanData.checkPassword"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item prop="password" v-if="pwdEdit">
                <div class="condition-item">
                  <label class="label-wrds"><span class="red-star">*</span> 密码：</label>
                  <Input type="password" :value.sync="usermanData.password"/>
                  <el-button class="pwd-edit" @click="pwdEdit = false" v-if="pwdEdit">取消更改密码</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item prop="checkPassword" v-if="pwdEdit">
                <div class="condition-item">
                  <label class="label-wrds"><span class="red-star">*</span> 确认密码：</label>
                  <Input type="password" :value.sync="usermanData.checkPassword"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item prop="name">
                <div class="condition-item">
                  <label class="label-wrds"><span class="red-star">*</span> 真实姓名：</label>
                  <Input :value.sync="usermanData.name" :disabled="modify"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item prop="linktelenumber">
                <div class="condition-item">
                  <label class="label-wrds"><span class="red-star">*</span> 手机号码：</label>
                  <Input :value.sync="usermanData.linktelenumber"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item prop="commonRegionId" v-if="usermanData.userType == $global.operator">
                <div class="condition-item">
                  <!-- 当为管理人员时，* 存在，表示为必填项 -->
                  <label class="label-wrds"><span class="red-star">*</span> 归属省份：</label>
                  <AreaSelect :value.sync="usermanData.commonRegionId" :disabled="modify" :withoutPostRole="false"/>
                </div>
              </el-form-item>
              <div class="condition-item" v-else>
                <label class="label-wrds">归属省份：</label>
                <AreaSelect :value.sync="usermanData.commonRegionId" :disabled="modify" :withoutPostRole="false"/>
              </div>
            </el-col>
          </el-row>
          <!-- 当为管理人员时，此项不存在 -->
          <el-row :gutter="20" v-show="usermanData.userType != $global.operator">
            <el-col :span="8" :offset="2">
              <el-form-item prop="relaId">
                <div class="condition-item">
                  <label class="label-wrds"><span class="red-star">*</span> 归属商户：</label>
                  <ChooseMerchants :title="merchantsTitle" @selectOptions="selectRetailer" :selectionFor="usermanData"
                                   :disabled="modify"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18" :offset="2">
              <el-form-item prop="remark" class="textarea">
                <div class="condition-item">
                  <label class="label-wrds">备注：</label>
                  <Input type="textarea" :value.sync="usermanData.remark"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 密码规则 -->
          <div class="password-rule">
            <p class="p-titl"><img src="../assets/images/icon-remind.png">提示</p>
            <p class="p1">新密码需要满足如下<span class="org">2个条件：</span></p>
            <p class="p2">1、密码长度8位以上（含8位）</p>
            <p class="p2">2、密码包含以下3种组成部分</p>
            <p class="p3">（1）小写英文字母（从a到z）</p>
            <p class="p3">（2）大写英文字母（从A到Z）</p>
            <p class="p3">（3）10个基本数字（从0到9）</p>
            <p class="p4">注意：请勿在新密码中包含特殊字符！请牢记修改后的密码，然后使用新的密码进行登录</p>
          </div>
        </div>
        <div class="foot-btn">
          <el-form-item>
            <!--新增-->
            <el-button size="small" type="primary" @click="addUsermanSubmit('usermanData')"
                       v-if="!this.$route.query.usermanInfo">保&nbsp;存
            </el-button>
            <!--修改-->
            <el-button size="small" type="primary" @click="addUsermanSubmit('usermanData')" v-else>保&nbsp;存</el-button>
            <el-button size="small" type="success" @click="cancel">取&nbsp;消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import AreaSelect from '@/components/AreaSelect';
  import Breadcrumb from '@/components/Breadcrumb';
  import {md5} from 'md5js';

  export default {
    name: 'AddSupplierData',
    created() {
      if (this.$route.query.usermanInfo) {
        this.usermanData = this.$route.query.usermanInfo;
        this.modify = true;
      }
    },
    data() {
      let checkTel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        } else {
          let reg = /^(\+86)?1[345789]\d{9}$/;
          if (!(reg.test(value))) {
            callback(new Error('请输入正确的电话号码'));
          }
          callback();
        }
      };
      let passwordValid = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/;
          if (!(reg.test(value))) {
            callback(new Error('请输入正确的密码'));
          } else {
            if (this.usermanData.checkPassword !== '') {
              this.$refs.usermanData.validateField('checkPassword');
            }
            callback();
          }
          callback();
        }
      };
      let checkPasswordValid = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.usermanData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let checkCommonRegionId = (rule, value, callback) => {
        if (this.usermanData.userType == this.$global.operator) {
          if (!value) {
            return callback(new Error('请选择归属省份'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      let checkRelaId = (rule, value, callback) => {
        if (this.usermanData.userType != this.$global.operator) {
          if (!value) {
            return callback(new Error('请选择归属商户'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        modify: false,
        level: 'province',
        usermanData: {
          userType: '1'
        },
        pwdEdit: false,
        rules: {
          userType: [
            {required: true, message: '请选择用户类型', trigger: 'blur'},
          ],
          systemUserCode: [
            {required: true, message: '请输入用户账号', trigger: 'blur'},
            {min: 1, max: 40, message: '长度不能超过40个字符', trigger: 'change'}
          ],
          name: [
            {required: true, message: '请输入用户名称', trigger: 'blur'},
            {min: 1, max: 200, message: '长度在不能超过200个字符', trigger: 'change'}
          ],
          linktelenumber: [
            {validator: checkTel, trigger: 'blur'},
            {trigger: 'change'}
          ],
          commonRegionId: [
            {validator: checkCommonRegionId, trigger: 'blur'},
          ],
          relaId: [
            {validator: checkRelaId, trigger: 'blur'},
          ],
          password: [
            {validator: passwordValid, trigger: 'blur'},
            {min: 0, trigger: 'change'}
          ],
          checkPassword: [
            {validator: checkPasswordValid, trigger: 'blur'},
            {min: 0, trigger: 'change'}
          ],
          remark: [
            {min: 0, max: 400, message: '长度在不能超过400个字符', trigger: 'blur'}
          ],
        },
        usermanSelect: {},
        usermanList: [{
          value: '1',
          label: '供货商'
        }, {
          value: '2',
          label: '零售商'
        }, {
          value: '3',
          label: '运营商'
        }],
        merchantsTitle: '供货商',
      }
    },
    methods: {
      //选择零售商或供货商
      selectRetailer(val) {
        this.usermanData.relaId = val;
      },
      addUsermanSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.$route.query.usermanInfo) {
              this.$post('/systemUserController/addSystemUser', {
                commonRegionId: this.usermanData.commonRegionId,
                userType: this.usermanData.userType,
                relaId: this.usermanData.relaId,//归属商户
                systemUserCode: this.usermanData.systemUserCode,//用户账号
                password: md5(this.usermanData.password, 32),
                name: this.usermanData.name,
                linktelenumber: this.usermanData.linktelenumber,
                remark: this.usermanData.remark,
              }).then((rsp) => {
                if (rsp.resultCode == '0') {
                  this.$msgBox({
                    type: 'success',
                    title: '操作提示',
                    content: '添加成功'
                  }).catch(() => {
                    this.$router.push({
                      path: '/orderManage/usermanManage'
                    });
                  });
                } else {
                  this.$msgBox({
                    type: 'error',
                    title: '操作提示',
                    content: rsp.resultMsg
                  }).catch(() => {
                    // console.log('cancel');
                  });
                }
              })
            } else {
              this.$post('/systemUserController/updateSystemUser', {
                partyId: _.get(this.usermanData, 'partyId') || '',
                commonRegionId: _.get(this.usermanData, 'commonRegionId') || '',
                userType: _.get(this.usermanData, 'userType') || '',
                relaId: _.get(this.usermanData, 'relaId') || '',//归属商户
                systemUserCode: _.get(this.usermanData, 'systemUserCode') || '',//用户账号
                password: md5(_.get(this.usermanData, 'password') || '', 32),
                name: _.get(this.usermanData, 'name') || '',
                linktelenumber: _.get(this.usermanData, 'linktelenumber') || '',
                remark: this.usermanData.remark,
              }).then((rsp) => {
                if (rsp.resultCode == '0') {
                  this.$msgBox({
                    type: 'success',
                    title: '操作提示',
                    content: '修改成功'
                  }).catch(() => {
                    this.$router.push({
                      path: '/orderManage/usermanManage'
                    });
                  });
                } else {
                  this.$msgBox({
                    type: 'error',
                    title: '操作提示',
                    content: rsp.resultMsg
                  }).catch(() => {
                    // console.log('cancel');
                  });
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancel() {
        this.$router.push({
          path: '/orderManage/usermanManage'
        });
      }
    },
    watch: {
      'usermanData': {
        handler: function (newValue) {
          if (newValue.userType == this.$global.retailer) {
            this.merchantsTitle = '零售商';
          } else if (newValue.userType == this.$global.supplier) {
            this.merchantsTitle = '供货商';
          }
        },
        deep: true
      },
    },
    components: {
      TitlePlate,
      Input,
      Select,
      ChooseMerchants,
      AreaSelect,
      Breadcrumb,
      md5
    }
  }
</script>

<style lang="less">
  .add-userman {
    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }
    .text-right {
      text-align: right;
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
      &.tel-model {
        min-width: 5px;
        min-height: 20px;
        background: url('../assets/images/red-line.png') no-repeat 0 center;
        padding-left: 10px;
        font-size: 18px;
        color: #000;
        font-weight: 800;
      }
    }
    .terminal-info-box {
      position: relative;
      width: 100%;
      padding: 10px 0;
      border: 1px solid #dfdfdf;
    }
    .red-star {
      color: #f00;
    }
    .foot-btn {
      width: 100%;
      padding: 24px 0;
      background: #fafafa;
      border: 1px solid #dcdcdc;
      border-top: none;
      text-align: center;
    }
    .pwd-edit {
      position: absolute;
      top: 6px;
      right: -100px;
      width: 90px;
      padding: 0;
      border: 0;
      font-size: 14px;
      color: #168fe4;
      text-align: left;
      &:hover, &:active, &:focus {
        background: none;
      }
    }
    .password-rule {
      position: absolute;
      top: 16px;
      right: 20px;
      width: 180px;
      padding: 5px 10px;
      border: 1px solid #f8e3ce;
      background: #fffaf5;
      color: #242424;
      font-size: 12px;
      border-radius: 8px;
      .p-titl {
        text-align: center;
        font-size: 16px;
        margin-bottom: 8px;
        img {
          margin-right: 8px;
          vertical-align: middle;
        }
      }
      .p1 {
        margin-bottom: 8px;
        span {
          color: #ff6d0b;
        }
      }
      .p2 {
        margin-bottom: 8px;
        color: #9a9a9a;
        span {
          color: #ff6d0b;
        }
      }
      .p3 {
        margin-bottom: 8px;
        color: #9a9a9a;
        text-indent: 14px;
      }
      .p4 {
        line-height: 18px;
        color: #ff6d0b;
      }
    }

    /*表单验证*/
    .el-form-item {
      margin-bottom: 0;
      margin-left: -100px;
    }
    .el-form-item__content {
      line-height: 24px;
    }
    .el-form-item__error {
      position: absolute;
      padding-top: 0;
      top: 42px;
      left: 114px;
    }
    .el-form-item {
      &.textarea {
        .el-form-item__error {
          top: 62px;
        }
      }
    }
  }

</style>
