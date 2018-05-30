<template>
  <div class="vue_add-supplier">
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="新增/修改零售商"/>
      </div>
      <div class="terminal-info-box">
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 所属省份：</label>
              <Select class="condition-input" :value.sync="orderQueryData.brandCd" :options="brandList"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 零售商名称：</label>
              <Input class="condition-input" :value.sync="orderQueryData.opmOrderNo"/>
            </div>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 零售商类型：</label>
              <Select class="condition-input" :value.sync="orderQueryData.brandCd" :options="brandList"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">联系人：</label>
              <Input class="condition-input" :value.sync="orderQueryData.opmOrderNo"/>
            </div>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">联系人手机：</label>
              <Select class="condition-input" :value.sync="orderQueryData.brandCd" :options="brandList"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">公司电话：</label>
              <Input class="condition-input" :value.sync="orderQueryData.opmOrderNo"/>
            </div>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">公司传真：</label>
              <Input class="condition-input" :value.sync="orderQueryData.opmOrderNo"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right">备注：</label>
              <el-input type="textarea" v-model="orderQueryData.opmOrderNo"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="foot-btn">
        <button class="btns">保&nbsp;存</button>
        <button class="btns">取&nbsp;消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Select from '@/components/Select';

  export default {
    name: 'AddSetailerData',
    created() {
    },
    data() {
      return {
        orderQueryData: {},
        brandList: [{
          value: '1001',
          label: '苹果'
        },{
          value: '1002',
          label: 'oppo'
        }],
        dialogVisible: false,
        dislogTitle: '导入',
        totalCnt: 0,
        successCnt: 0,
        failCnt: 0,
        tableData: [],

        url: '/orderPlacingMeetingController/analyzeInsertOpmOfferAllotList',
      }
    },
    methods: {
      visibleChange(val) {
        this.dialogVisible = val;
      },
      uploadData(data) {
        this.totalCnt = data.totalCnt;
        this.successCnt = data.successCnt;
        this.failCnt = data.failCnt;
        this.tableData = data.rows;
        console.log('导入文件返回的数据：', data);
      }
    },
    components: {
      TitlePlate,
      Input,
      Select
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
      }
    }

  }

</style>
