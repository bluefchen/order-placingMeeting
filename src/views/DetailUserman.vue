<template>
  <div class="detail-userman">
    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['系统维护', '用户管理', '用户详情']"/>
      </div>
    </div>
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="用户管理详情"/>
      </div>
      <div class="supplier-info-box fn-clear">
        <div class="supplier-img fn-left">
          <img src="@/assets/images/userman.png" alt="零售商/零售商">
        </div>
        <div class="supplier-info fn-right">
          <div class="supplier-info-list">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">用户类型：</label>
                  <p><b v-if="usermanData.userType == 1">运营商</b><b v-else-if="usermanData.userType == 2">供货商</b><b v-else>零售商</b></p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">用户账号：</label>
                  <p>{{usermanData.systemUserCode}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">真实姓名：</label>
                  <p>{{usermanData.name}}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">手机号码：</label>
                  <p>{{usermanData.linktelenumber}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">所属省份：</label>
                  <p>{{usermanData.commonRegionName}}</p>
                </div>
              </el-col>
              <!-- 当为管理人员时，此项不存在 -->
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds">归属商户：</label>
                  <p>{{usermanData.relaName}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="condition-item">
                  <label class="label-wrds text-right">备注：</label>
                  <p>{{usermanData.remark}}</p>
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
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    name: 'DetailUserman',
    created() {
      this.usermanData = this.$route.query.usermanInfo;
    },
    data() {
      return {
      }
    },
    methods: {
    },
    components: {
      TitlePlate,
      Breadcrumb
    }
  }
</script>

<style lang="less">
  .detail-userman {
    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
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
    .condition-item{
      line-height: 28px;
      font-size: 14px;
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
        text-align: center;
        img{
          padding: 74px 0 0 0;
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

  }

</style>
