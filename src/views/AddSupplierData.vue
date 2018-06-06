<template>
  <div class="vue_add-supplier">
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" :title="title"/>
      </div>
      <div class="terminal-info-box">
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 所属省份：</label>
              <AreaSelect class="condition-select" :value.sync="supplierInfo.commonRegionId"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 供货商名称：</label>
              <Input class="condition-input" :value.sync="supplierInfo.supplierName"/>
            </div>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 供货商类型：</label>
              <Select class="condition-input" :value.sync="supplierInfo.supplierType" :options="supplierTypeList"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">联系人：</label>
              <Input class="condition-input" :value.sync="supplierInfo.linkMan"/>
            </div>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">联系人手机：</label>
              <Input class="condition-input" :value.sync="supplierInfo.linkNbr"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">公司电话：</label>
              <Input class="condition-input" :value.sync="supplierInfo.supplierPhone"/>
            </div>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">公司传真：</label>
              <Input class="condition-input" :value.sync="supplierInfo.supplierFax"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">备注：</label>
              <Input type="textarea" v-model="supplierInfo.remarks" />
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="foot-btn">
        <button class="btns" :disabled="!supplierInfo.commonRegionId || !supplierInfo.supplierName || !supplierInfo.supplierType" @click="saveSupplierData">保&nbsp;存</button>
        <button class="btns" @click="cancelSupplierData">取&nbsp;消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import AreaSelect from '@/components/AreaSelect';

  export default {
    name: 'AddSupplierData',
    created() {

      var operation = this.$route.query.operation;
      if(operation === 'add'){
        this.title = '新增供货商';
      }else{
        this.title = '修改供货商';
        this.supplierInfo = JSON.parse(localStorage.getItem('supplierId'));
      };

    },
    data() {
      return {
        title: '',
        supplierInfo: {},
        level: 'province',
        //供货商类型
        supplierTypeList: [{
          value: '1001',
          label: '厂商'
        },{
          value: '1002',
          label: '国代'
        },{
          value: '1003',
          label: '省代'
        },{
          value: '1004',
          label: '其他'
        }],
      }
    },
    methods: {
      handleChange(val){
        this.supplierInfo.commonRegionId = val;
      },
      saveSupplierData(){
        if(this.title === '修改供货商'){
          this.$post('/orderPlacingMeetingController/updateSupplier', {
            'supplierId': this.supplierInfo.supplierId,
            'commonRegionId': this.supplierInfo.commonRegionId,
            'supplierName': this.supplierInfo.supplierName,
            'supplierType': this.supplierInfo.supplierType,
            'linkMan': this.supplierInfo.linkMan,
            'linkNbr': this.supplierInfo.linkNbr,
            'supplierPhone': this.supplierInfo.supplierPhone,
            'supplierFax': this.supplierInfo.supplierFax,
            'remarks': this.supplierInfo.remarks
          }).then((rsp) => {
            this.$alert('修改供货商成功！', '提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.$router.push({
                path: '/orderManage/supplierDataMaintain'
              });
            });
          })
        }else{
          this.$post('/orderPlacingMeetingController/addSupplier', {
            'commonRegionId': this.supplierInfo.commonRegionId,
            'supplierName': this.supplierInfo.supplierName,
            'supplierType': this.supplierInfo.supplierType,
            'linkMan': this.supplierInfo.linkMan,
            'linkNbr': this.supplierInfo.linkNbr,
            'supplierPhone': this.supplierInfo.supplierPhone,
            'supplierFax': this.supplierInfo.supplierFax,
            'remarks': this.supplierInfo.remarks
          }).then((rsp) => {
            this.$alert('新增供货商成功！', '提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.$router.push({
                path: '/orderManage/supplierDataMaintain'
              });
            });
          })
        }
      },
      cancelSupplierData(){
        this.$router.push({
          path: '/orderManage/supplierDataMaintain'
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

  .vue_add-supplier {
    .el-textarea{
      flex: 1;
    }
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

    .condition-item {
      display: flex;
      margin: 10px 0;
      .label-wrds {
        width: 110px;
        line-height: 32px;
        font-size: 14px;
      }
      .condition-input {
        flex: 1 0 0;
      }
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
