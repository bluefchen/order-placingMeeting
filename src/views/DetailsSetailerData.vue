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
                  <p class="item-detail"><b>{{retailerInfo.retailerName}}</b></p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">所属省份：</label>
                  <p class="item-detail">{{retailerInfo.commonRegionName}}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">零售商类型：</label>
                  <p class="item-detail">{{retailerInfo.retailerTypeName}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">联系人：</label>
                  <p class="item-detail">{{retailerInfo.linkMan}}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">联系人手机：</label>
                  <p class="item-detail">{{retailerInfo.linkNbr}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">公司电话：</label>
                  <p class="item-detail">{{retailerInfo.retailerPhone}}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">公司传真：</label>
                  <p class="item-detail">{{retailerInfo.retailerFax}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds text-right">备注：</label>
                  <p class="item-detail">{{retailerInfo.remarks}}</p>
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

  export default {
    name: 'DetailsSetailerData',
    created() {
      this.retailerInfo = JSON.parse(sessionStorage.getItem('retailerId'));
    },
    data() {
      return {
      }
    },
    methods: {
    },
    components: {
      TitlePlate
    }
  }
</script>

<style lang="less">

  .vue_details-supplier {
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
      }
    }
    .item-detail{
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }
  }

</style>
