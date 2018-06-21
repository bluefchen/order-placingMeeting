<template>
  <div class="vue_details-supplier">
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="供货商详情"/>
      </div>
      <div class="supplier-info-box fn-clear">
        <div class="supplier-img fn-left">
          <img src="@/assets/images/supplier.jpg" alt="供货商">
        </div>
        <div class="supplier-info fn-right">
          <div class="supplier-info-list">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">供货商名称：</label>
                  <p class="item-detail"><b>{{supplierInfo.supplierName}}</b></p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">所属省份：</label>
                  <p class="item-detail">{{supplierInfo.commonRegionName}}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">供货商类型：</label>
                  <p class="item-detail">{{supplierInfo.supplierTypeName}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">联系人：</label>
                  <p class="item-detail">{{supplierInfo.linkMan}}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">联系人手机：</label>
                  <p class="item-detail">{{supplierInfo.linkNbr}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">公司电话：</label>
                  <p class="item-detail">{{supplierInfo.supplierPhone}}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">公司传真：</label>
                  <p class="item-detail">{{supplierInfo.supplierFax}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds text-right">备注：</label>
                  <p class="item-detail">{{supplierInfo.remarks}}</p>
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
    name: 'DetailsSupplierData',
    created() {
      this.supplierInfo = JSON.parse(sessionStorage.getItem('supplierId'));
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
