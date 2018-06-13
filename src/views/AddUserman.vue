<template>
  <div class="add-userman">
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
                  <el-button class="pwd-edit" @click="pwdEdit = true" v-if="modify">更改密码</el-button>
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
              <el-form-item prop="commonRegionId" v-if="usermanData.userType == 1">
                <div class="condition-item">
                  <!-- 当为管理人员时，* 存在，表示为必填项 -->
                  <label class="label-wrds"><span class="red-star">*</span> 归属省份：</label>
                  <AreaSelect :value.sync="usermanData.commonRegionId" :disabled="modify"/>
                </div>
              </el-form-item>
              <div class="condition-item" v-else>
                <label class="label-wrds">归属省份：</label>
                <AreaSelect :value.sync="usermanData.commonRegionId" :disabled="modify"/>
              </div>
            </el-col>
          </el-row>
          <!-- 当为管理人员时，此项不存在 -->
          <el-row :gutter="20" v-show="usermanData.userType != 1">
            <el-col :span="8" :offset="2">
              <el-form-item prop="relaId">
                <div class="condition-item">
                  <label class="label-wrds"><span class="red-star">*</span> 归属商户：</label>
                  <ChooseMerchants :title="merchantsTitle" @selectOptions="selectRetailer" :selectionFor="usermanData" :disabled="modify"/>
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
      var checkTel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        } else {
          let reg = /^(\+86)?1[345789]\d{9}$/;
          if (!(reg.test(value))) {
            callback(new Error('请输入正确的电话号码'));
          }
          callback();
        }
        ;
      };
      var passwordValid = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/;
          if (!(reg.test(value))) {
            callback(new Error('请输入正确的密码'));
          }else{
            if (this.usermanData.checkPassword !== '') {
              this.$refs.usermanData.validateField('checkPassword');
            }
            callback();
          }
        }
      };
      var checkPasswordValid = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.usermanData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        modify: false,
        level: 'province',
        usermanData: {
          userType: 1
        },
        pwdEdit: false,
        rules: {
          userType: [
            {required: true, message: '请选择用户类型', trigger: 'blur'},
          ],
          systemUserCode: [
            {required: true, message: '请输入用户账号', trigger: 'blur'},
            {min: 1, max: 40, message: '长度不能超过40个字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入用户名称', trigger: 'blur'},
            {min: 1, max: 200, message: '长度在不能超过200个字符', trigger: 'blur'}
          ],
          linktelenumber: [
            {validator: checkTel, trigger: 'blur'},
          ],
          commonRegionId: [
            {required: true, message: '请选择省市', trigger: 'blur'},
          ],
          relaId: [
            {required: true, message: '请选择商户', trigger: 'blur'},
          ],
          password: [
            {validator: passwordValid, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: checkPasswordValid, trigger: 'blur'}
          ],
          remark: [
            {min: 0, max: 400, message: '长度在不能超过400个字符', trigger: 'blur'}
          ],
        },
        usermanSelect: {},
        usermanList: [{
          value: 1,
          label: '运营商'
        }, {
          value: 2,
          label: '供应商'
        }, {
          value: 3,
          label: '零售商'
        }],
        merchantsTitle: '',
      }
    },
    methods: {
      //选择零售商或供应商
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
                this.$alert('添加成功！', '提示', {
                  confirmButtonText: '确定',
                  type: 'success'
                }).then(() => {
                  this.$router.push({
                    path: '/orderManage/usermanManage'
                  });
                });
              })
            } else {
              this.$post('/systemUserController/updateSystemUser', {
                commonRegionId: this.usermanData.commonRegionId,
                userType: this.usermanData.userType,
                relaId: this.usermanData.relaId,//归属商户
                systemUserCode: this.usermanData.systemUserCode,//用户账号
                name: this.usermanData.name,
                linktelenumber: this.usermanData.linktelenumber,
                remark: this.usermanData.remark,
              }).then((rsp) => {
                this.$alert('修改成功！', '提示', {
                  confirmButtonText: '确定',
                  type: 'success'
                }).then(() => {
                  this.$router.push({
                    path: '/orderManage/usermanManage'
                  });
                });
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
      "usermanData.userType": function () {
        if (this.usermanData.userType == 3) {
          this.merchantsTitle = '零售商';
        } else if (this.usermanData.userType == 2) {
          this.merchantsTitle = '供应商';
        };
      },
    },
    components: {
      TitlePlate,
      Input,
      Select,
      ChooseMerchants,
      AreaSelect,
      md5
    }
  }
</script>

<style lang="less">
  .add-userman {
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
    .pwd-edit{
      position: absolute;
      top: 6px;
      right: -100px;
      width: 90px;
      padding: 0;
      border: 0;
      font-size: 14px;
      color: #168fe4;
      text-align: left;
      &:hover,&:active,&:focus{
        background:none;
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
    .el-form-item{
      &.textarea{
        .el-form-item__error{
          top: 62px;
        }
      }
    }
  }

</style>
