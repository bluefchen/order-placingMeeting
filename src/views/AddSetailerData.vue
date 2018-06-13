<template>
  <div class="v_supplier">
    <div class="box-1200">
      <el-form :model="retailerInfo"  :rules="rules" ref="retailerInfo" label-width="110px" class="demo-ruleForm">
        <div class="order-titl fn-clear">
          <TitlePlate class="fn-left" :title="title"/>
        </div>
        <div class="terminal-info-box">
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item label="所属省份：" prop="commonRegionId">
                <AreaSelect :value.sync="retailerInfo.commonRegionId"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item label="零售商名称：" prop="retailerName">
                <Input :value.sync="retailerInfo.retailerName"/>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="零售商类型：" prop="retailerType">
                <Select :value.sync="retailerInfo.retailerType" :options="retailerTypeList"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item label="联系人：" prop="linkMan">
                <Input :value.sync="retailerInfo.linkMan"/>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="联系人手机：" prop="linkNbr">
                <Input :value.sync="retailerInfo.linkNbr"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item label="公司电话：" prop="retailerPhone">
                <Input :value.sync="retailerInfo.retailerPhone"/>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="公司传真：" prop="retailerFax">
                <Input :value.sync="retailerInfo.retailerFax"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18" :offset="2">
              <el-form-item label="备注：" prop="remarks">
                <Input type="textarea" :value.sync="retailerInfo.remarks" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="foot-btn">
          <button type="button" class="btns" @click="submitForm('retailerInfo')">保&nbsp;存</button>
          <button type="button" class="btns" @click="cancelSetailerData">取&nbsp;消</button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import AreaSelect from '@/components/AreaSelect';

  export default {
    name: 'AddSetailerData',
    created() {
      var operation = this.$route.query.operation;
      if(operation === 'add'){
        this.title = '新增零售商';
      }else{
        this.title = '修改零售商';
        this.retailerInfo = JSON.parse(localStorage.getItem('retailerId'));
      };
    },
    data() {
      var checkPhone = (rule, value, callback) => {
        if (value) {
          let reg = /^(\+86)?1[345789]\d{9}$/;
          if (!(reg.test(value))) {
            callback(new Error('请输入正确的手机号码'));
          }
          callback();
        }else{
          callback();
        }
      };
      var checkTel = (rule, value, callback) => {
        if (value) {
          let reg = /^0\d{2,3}-?\d{7,8}$/;
          if (!(reg.test(value))) {
            callback(new Error('请输入正确的电话号码'));
          }
          callback();
        }else{
          callback();
        }
      };
      return {
        title: '',
        level: 'province',
        retailerInfo: {},
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

        rules: {
          commonRegionId: [
            {required: true, message: '请选择所属省份', trigger: 'change'}
          ],
          retailerName: [
            {required: true, message: '零售商名称不能为空', trigger: 'blur'},
            {min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'change'}
          ],
          retailerType: [
            {required: true, message: '零售商名称不能为空', trigger: 'change'}
          ],
          linkMan: [
            {min: 0, max: 20, message: '长度不能超过20个字符', trigger: 'blur'}
          ],
          linkNbr: [
            {validator: checkPhone, message: '请输入正确手机号码', trigger: 'blur'}
          ],
          retailerPhone: [
            {validator: checkTel, message: '请输入正确的公司号码', trigger: 'blur'}
          ],
          retailerFax: [
            {validator: checkTel, message: '请输入正确的公司传真', trigger: 'blur'}
          ],
          remarks: [
            {min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      handleChange(val){
        this.retailerInfo.commonRegionId = val;
      },
      submitForm(formName, title) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveSetailerData();
          } else {
            return false;
          }
        });
      },
      saveSetailerData(){
        if(this.title === '修改零售商'){
          this.$post('/orderPlacingMeetingController/updateRetailer', {
            'retailerId': this.retailerInfo.retailerId,
            'commonRegionId': this.retailerInfo.commonRegionId,
            'retailerName': this.retailerInfo.retailerName,
            'retailerType': this.retailerInfo.retailerType,
            'linkMan': this.retailerInfo.linkMan,
            'linkNbr': this.retailerInfo.linkNbr,
            'retailerPhone': this.retailerInfo.retailerPhone,
            'retailerFax': this.retailerInfo.retailerFax,
            'remarks': this.retailerInfo.remarks
          }).then((rsp) => {
            this.$alert('修改零售商成功！', '提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.$router.push({
                path: '/orderManage/setailerDataMaintain'
              });
            });
          })
        }else{
          this.$post('/orderPlacingMeetingController/addRetailer', {
            'commonRegionId': this.retailerInfo.commonRegionId,
            'retailerName': this.retailerInfo.retailerName,
            'retailerType': this.retailerInfo.retailerType,
            'linkMan': this.retailerInfo.linkMan,
            'linkNbr': this.retailerInfo.linkNbr,
            'retailerPhone': this.retailerInfo.retailerPhone,
            'retailerFax': this.retailerInfo.retailerFax,
            'remarks': this.retailerInfo.remarks
          }).then((rsp) => {
            this.$alert('新增零售商成功！', '提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.$router.push({
                path: '/orderManage/setailerDataMaintain'
              });
            });
          })
        }
      },
      cancelSetailerData(){
        this.$router.push({
          path: '/orderManage/setailerDataMaintain'
        });
      }
    },
    components: {
      TitlePlate,
      Input,
      Select,
      AreaSelect
    }
  }
</script>

<style lang="less">
  .v_supplier {
    .el-textarea{
      flex: 1;
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
    .terminal-info-box{
      width: 100%;
      padding: 10px 0;
      border: 1px solid #dfdfdf;
    }
    .red-star{
      color: #f00;
    }
    .foot-btn{
      width: 100%;
      padding: 24px 0;
      background: #fafafa;
      border: 1px solid #dcdcdc;
      border-top: none;
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
        &:disabled{
          color: #fff;
          background-color: #f25555;
          cursor: default;
        }
      }
    }
    //表单提示样式
    .el-form-item{
      margin: 10px 0;
    }

    .editor-error{
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
    .el-form-item__error{
      padding: 5px;
      z-index: 999;
    }

    .el-form-item__label{
      height: 30px;
      line-height: 30px;
      padding: 0;
      color: #333;
    }
    .el-form-item__content{
      line-height: 30px;
    }
    //表单提示样式
  }
  .el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #ff7a7a;
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
