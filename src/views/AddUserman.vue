<template>
  <div class="vue_add-supplier">
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="新增/修改账号"/>
      </div>
      <div class="terminal-info-box">
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds"><span class="red-star">*</span> 用户类型：</label>
              <Select class="condition-input" :value.sync="usermanData.userType" :options="usermanList" :disabled="modify"/>
              <!--当身份为管理员时-->
              <!--<Select class="condition-input" :value.sync="usermanData.manageUserType" :options="manageUserList" :disabled="modify"/>-->
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds"><span class="red-star">*</span> 用户账号：</label>
              <Input class="condition-input" :value.sync="usermanData.systemUserCode" :disabled="modify"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds"><span class="red-star">*</span> 真实姓名：</label>
              <Input class="condition-input" :value.sync="usermanData.name" :disabled="modify"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds"><span class="red-star">*</span> 手机号码：</label>
              <Input class="condition-input" :value.sync="usermanData.linktelenumber"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <!-- 当为管理人员时，* 存在，表示为必填项 -->
              <label class="label-wrds"><span class="red-star">*</span> 归属省份：</label>
              <AreaSelect :value.sync="usermanData.commonRegionId" :disabled="modify"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- 当为管理人员时，此项不存在 -->
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds"><span class="red-star">*</span> 归属商户：</label>
              <ChooseMerchants :title="merchantsTitle" @selectOptions="selectRetailer" :selectionFor="usermanData" :disabled="modify"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item" v-if="!$route">
              <label class="label-wrds"><span class="red-star">*</span> 密码：</label>
              <Input class="condition-input" type="password" :value.sync="usermanData.password"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18" :offset="2">
            <div class="condition-item">
              <label class="label-wrds">备注：</label>
              <Input type="textarea" :value.sync="usermanData.remark" />
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="foot-btn">
        <div>
          <!--新增-->
          <el-button size="small" type="success" @click="addUsermanSubmit" v-if="!this.$route.query.usermanInfo" :disabled="!usermanData.userType || !usermanData.systemUserCode || !usermanData.name || !usermanData.linktelenumber || !usermanData.commonRegionId || !usermanData.password || !usermanData.relaId">保&nbsp;存</el-button>
          <!--修改-->
          <el-button size="small" type="success" @click="addUsermanSubmit" v-else :disabled="!usermanData.userType || !usermanData.systemUserCode || !usermanData.name || !usermanData.linktelenumber || !usermanData.commonRegionId || !usermanData.relaId">保&nbsp;存</el-button>
          <el-button size="small" type="success" @click="cancel">取&nbsp;消</el-button>
        </div>
        <!--当身份为管理人员时-->
        <!--<div>-->
          <!--<el-button size="small" type="success" @click="addUsermanSubmit" v-if="this.$route.query.usermanInfo" :disabled="!usermanData.userType || !usermanData.systemUserCode || !usermanData.name || !usermanData.linktelenumber || !usermanData.password || !usermanData.commonRegionId">保&nbsp;存</el-button>-->
          <!--<el-button size="small" type="success" @click="addUsermanSubmit" v-else :disabled="!usermanData.userType || !usermanData.systemUserCode || !usermanData.name || !usermanData.linktelenumber || !usermanData.commonRegionId">保&nbsp;存</el-button>-->
          <!--<el-button size="small" type="success" @click="cancel">取&nbsp;消</el-button>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import AreaSelect from '@/components/AreaSelect';

  export default {
    name: 'AddSupplierData',
    created() {
      if(this.$route.query.usermanInfo){
        this.usermanData = this.$route.query.usermanInfo;
        this.modify = true;
      }
    },
    data() {
      return {
        modify: false,
        level: 'province',
        usermanData: {
          userType: 1000,
          manageUserType: 1000,
          password: '',
        },
        usermanSelect:{},
        usermanList: [{
          value: 1000,
          label: '零售商'
        },{
          value: 1001,
          label: '供应商'
        }],
        manageUserList:[{
          value: 1000,
          label: '管理人员'
        }]
      }
    },
    methods: {
      //选择零售商或供应商
      selectRetailer(val){
        this.usermanData.relaId = val;
      },
      addUsermanSubmit(){
        //当身份为零售商或者供应商时，userType取的是userType；当身份为管理员时，userType取的是manageUserType
        if(!this.$route.query.usermanInfo){
          this.$post('/systemUserController/addSystemUser', {
            commonRegionId: this.usermanData.commonRegionId,
            userType: this.usermanData.userType,
            relaId: this.usermanData.relaId,//归属商户
            systemUserCode: this.usermanData.systemUserCode,//用户账号
            password: this.usermanData.password,
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
        }else{
          this.$post('/systemUserController/updateSystemUser', {
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
      },
      cancel(){
        this.$router.push({
          path: '/orderManage/usermanManage'
        });
      }
    },
    computed:{
      merchantsTitle:function() {
        if(this.usermanData.userType == 1000){
          return '零售商';
        }else{
          return '供应商';
        }
      }
    },
    components: {
      TitlePlate,
      Input,
      Select,
      ChooseMerchants,
      AreaSelect
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
    }

  }

</style>
