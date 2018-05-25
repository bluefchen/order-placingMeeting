<template>
  <div class="vue_details-supplier">
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="零售商详情"/>
      </div>
      <div class="supplier-info-box fn-clear">
        <div class="supplier-img fn-left">
          <img src="@/assets/images/retailer.jpg" alt="零售商">
        </div>
        <div class="supplier-info fn-right">
          <div class="supplier-info-list">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">零售商名称：</label>
                  <p class="condition-input"><b>赛格数码科技有限公司</b></p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">所属省份：</label>
                  <p class="condition-input">江苏</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">零售商类型：</label>
                  <p class="condition-input">省代</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">联系人：</label>
                  <p class="condition-input">王小二</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">联系人手机：</label>
                  <p class="condition-input">18905174326</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">公司电话：</label>
                  <p class="condition-input">025-55555555</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">公司传真：</label>
                  <p class="condition-input">025-55555555</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds text-right">备注：</label>
                  <p class="condition-input">XXXXXXXXXX</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Select from '@/components/Select';

  export default {
    name: 'DetailsSetailerData',
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

  .vue_details-supplier {
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
    .supplier-info-box{
      width: 100%;
      border: 1px solid #dfdfdf;
      .supplier-img{
        position: relative;
        background: #fbfbfb;
        min-height: 370px;
        height: 100%;
        width: 296px;
        border-right: 1px solid #eaeaea;
        img{
          padding: 74px 0 0 73px;
        }
        &:after{
          position: absolute;
          right: -14px;
          top: 50%;
          content: '';
          width: 14px;
          height: 16px;
          margin-top: -8px;
          background: url('../assets/images/icon-angle.png') no-repeat 0 center;
          
        }
      }
      .supplier-info{
        width: calc(100% - 297px);
        .supplier-info-list{
          padding: 0 25px;
          .el-row{
            border-bottom: 1px dashed #f0f0f0;
          }
        }
        .condition-item {
          display: flex;
          margin: 10px 0;
          color: #151515;
          font-size: 14px;
          .label-wrds {
            width: 110px;
            text-align: right;
            line-height: 32px;
          }
          .condition-input {
            flex: 1 0 0;
            line-height: 32px;
          }
        }
      }
    }
  }

</style>