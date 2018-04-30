<template>
  <div class="v_upload-file">
    <label>上传文件：</label>
    <!--<span class="file-name">{{fileList[0].name}}</span>-->
    <el-upload
      class="file-upload"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="fileList"
      :multiple="false"
      :on-change="handleChange"
      :auto-upload="false">
      <el-button slot="trigger" size="small">选取文件</el-button>
    </el-upload>
    <el-button size="small" type="success" @click="submitUpload">导入</el-button>
    <el-button size="small" type="success">模板下载</el-button>
  </div>
</template>

<script>
  export default {
    name: 'UploadFile',
    props: {},
    data() {
      return {
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      };
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-1);
      },
      submitUpload() {
        console.log('导入文件到数据库', this.fileList);
        this.$refs.upload.submit();
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/css/mixin";

  .v_upload-file {
    >label {
      padding-left: 10px;
      color: #595959;
      font-size: 14px;
    }

    .el-upload-list {
      float: left;
    }

    .el-upload-list__item {
      width: 300px;
      height: 32px;
      line-height: 32px;
      &:first-child {
        margin-top: 0;
        /*border: 1px solid #d5d5d5;*/
        /*border-radius: 0;*/
      }
    }

    .el-upload-list__item .el-icon-close, .el-upload-list__item .el-icon-close-tip {
      top: 10px;
    }

    .file-name {
      display: inline-block;
      width: 400px;
      height: 30px;
      padding: 0 10px;
      border: 1px solid #d5d5d5;
      background-color: #fff;
      line-height: 32px;
      color: #000;
      font-size: 14px;
      vertical-align: top;
      .truncate();
    }
    .file-upload {
      display: inline-block;
      font-size: 14px;
    }
  }
</style>
