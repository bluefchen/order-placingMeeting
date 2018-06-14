<template>
  <div>
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['首页', '政策投入', '上传政策']"/>
        </div>
      </div>

      <!-- 文件导入 -->
      <div class="box-1200">
        <div class="file-import">
          <UploadFile :url="url" :downloadUrl="downloadUrl" @callback="uploadData"/>
        </div>
        <div class="import-result-box" v-show="data">
          <div class="success">
            <p class="title">上传政策成功，等待集团审批！</p>
            <p class="sub-title">您可到<router-link class="btns" to="/order/policyManage">政策投入</router-link>查看您制定的政策</p>
            <el-button size="small" type="success" @click="jumpLink">政策投入</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import UploadFile from '@/components/UploadFile';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';

  export default {
    name: 'ImportModelAdd',
    created() {
    },
    data() {
      return {
        url: '/opmPolicyController/batchInsertOpmPolicy',
        downloadUrl: 'http://192.168.74.17:9086/orderPlacingMeeting/commonCfgController/downloadModel?modelType=InsertOpmPolicy',
        data: null,
        uploadDone: false
      }
    },
    methods: {
      uploadData(data) {
        this.data = data;
        console.log('导入文件返回的数据：', data);
      },
      jumpLink() {
        this.$router.push({path: '/order/policyManage'});
      }
    },
    components: {
      Breadcrumb,
      UploadFile,
      MiddleImgInfoSmall
    }
  }
</script>

<style scoped lang="less">
  .my-location {
    height: 30px;
    line-height: 30px;
    background-color: #f6f6f6;
  }

  .file-import {
    margin-top: 20px;
    padding: 20px;
    background-color: #fcfcfc;
    border: 1px solid #e8e8e8;
  }

  .import-result-box {
    width: 100%;
    margin-top: 20px;
    padding: 10px 0 20px;
    background: #f5fff8;
    border: 1px solid #e4f0e7;

    .success {
      width: 330px;
      margin: 0 auto;
      padding: 10px 0 0 110px;
      background: url(../assets/images/icon-success.png) no-repeat 0 0;
      .title {
        line-height: 35px;
        color: #000;
        font-size: 16px;
      }
      .sub-title {
        margin-bottom: 15px;
        color: #1e1e1e;
        font-size: 12px;
        a, a:hover, a:active {
          margin: 0 2px;
          color: #f82134;
          font-size: 12px;
          text-decoration: underline;
        }
      }
    }
  }
</style>
