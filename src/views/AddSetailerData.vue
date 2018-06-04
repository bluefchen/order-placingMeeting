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
              <Cascader @change="handleChange" :regionId="retailerInfo.commonRegionId" :level="level"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 零售商名称：</label>
              <Input class="condition-input" :value.sync="retailerInfo.retailerName"/>
            </div>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 零售商类型：</label>
              <Select class="condition-input" :value.sync="retailerInfo.retailerType" :options="retailerTypeList"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">联系人：</label>
              <Input class="condition-input" :value.sync="retailerInfo.linkMan"/>
            </div>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">联系人手机：</label>
              <Input class="condition-input" :value.sync="retailerInfo.linkNbr"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">公司电话：</label>
              <Input class="condition-input" :value.sync="retailerInfo.retailerPhone"/>
            </div>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">公司传真：</label>
              <Input class="condition-input" :value.sync="retailerInfo.retailerFax"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">备注：</label>
              <el-input type="textarea" v-model="retailerInfo.remarks"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="foot-btn">
        <button class="btns" :disabled="!retailerInfo.commonRegionId || !retailerInfo.retailerName || !retailerInfo.retailerType" @click="saveSetailerData">保&nbsp;存</button>
        <button class="btns" @click="cancelSetailerData">取&nbsp;消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import Cascader from '@/components/Cascader';

  export default {
    name: 'AddSetailerData',
    created() {
      this.retailerInfo = JSON.parse(localStorage.getItem(this.$route.query.retailerId));
      if(this.retailerInfo.retailerId){
        this.title = '修改零售商';
        this.retailerInfo.commonRegionId = '1000003'; //测试地区用，最后需要删除
      }else{
        this.title = '新增零售商';
      };

    },
    data() {
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
        }]
      }
    },
    methods: {
      handleChange(val){
        this.retailerInfo.commonRegionId = val;
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
      Cascader
    }
  }
</script>

<style lang="less">

  .vue_add-supplier {
    .el-textarea{
      flex: 1;
      .el-textarea__inner{
        &:hover {
          border-color: #c0c4cc;
        }
        &:focus {
          border-color: #ff7a7a;
        }
      }
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
  .el-cascader-menu__item.is-active, .el-cascader-menu__item:focus:not(:active){
    color: #fff;
    font-weight: normal;
    background-color: #f13939;
  }

</style>
