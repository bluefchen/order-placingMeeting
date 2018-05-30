<template>
  <div>
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info">
        <p class="p-titl">2018夏季VIVO品牌新品订货会即将开启</p>
        <div class="activity">
          <p>活动日期：2018/04/10-2018/04/11</p>
          <p>活动地址：XXX市XXXXXXXXX街XXX路XX号</p>
        </div>
      </div>
    </div>
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
          <UploadFile :url="url" @callback="uploadData"/>
        </div>
        <div class="import-result-box">
          <div class="success">
            <p class="title">上传政策成功，等待集团审批！</p>
            <p class="sub-title">您可到 <router-link class="btns" to="/order/policyManage">政策投入</router-link> 查看您制定的政策</p>
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

  export default {
    name: 'ImportModelAdd',
    created() {
    },
    data() {
      return {
        url: '/orderPlacingMeetingController/analyzeInsertOpMeetingOfferList',
        tableData: []
      }
    },
    methods: {
      uploadData(data) {
        this.tableData = data.rows;
        console.log('导入文件返回的数据：', data);
      },
      jumpLink() {
        this.$router.push({path: '/order/policyManage'});
      }
    },
    components: {
      Breadcrumb,
      UploadFile
    }
  }
</script>

<style scoped lang="less">
  /*中间背景图片*/
  .img-bg {
    width: 100%;
    height: 200px;
    background: #e4273f;
  }

  .img-bg .info {
    width: 1036px;
    height: 200px;
    margin: 0 auto;
    background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat right bottom;
    overflow: hidden;
  }

  .img-bg .info .p-titl {
    margin: 62px 0 0 0;
    font-size: 22px;
    color: #fcfdff;
  }

  .img-bg .info .activity {
    width: 306px;
    margin: 10px 0 0 0;
    line-height: 18px;
    font-size: 12px;
    color: #fcfdff;
    text-align: center;
  }

  /*中间背景图片*/

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
    margin: 20px auto 0;
    background: #f5fff8;
    border: 1px solid #e4f0e7;

    .success {
      width: 330px;
      min-height: 110px;
      margin: 0 auto;
      padding-left: 110px;
      background: url(../assets/images/icon-success.png) no-repeat 0 0;
      .import-text {
        color: #000;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>
