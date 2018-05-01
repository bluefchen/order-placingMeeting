<template>
  <div class="v_upload-file">
    <label>上传文件：</label>
    <div class="file-upload">
      <p class="file-name">{{uploadFileName}}</p>
      <el-upload
        class="file-check"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="fileList"
        :show-file-list="false"
        :multiple="false"
        :on-change="handleChange"
        :auto-upload="false">
        <el-button slot="trigger" size="small">浏览</el-button>
      </el-upload>
    </div>
    <el-button class="btn-upload" size="small" type="success" @click="submitUpload">导入</el-button>
    <el-button class="btn-download fn-right" size="small" type="success"><i class="iconfont">&#xe794;</i> 模板下载</el-button>
  </div>
</template>

<script>
  export default {
    name: 'UploadFile',
    props: {},
    data() {
      return {
        fileList: [{
          name: '',
          url: ''
        }]
      };
    },
    computed: {
      uploadFileName() {
        return this.fileList[0].name;
      }
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
      color: #595959;
      font-size: 14px;
    }

    .file-upload {
      position: relative;
      display: inline-block;
      width: 400px;
      height: 30px;
      padding: 0 10px;
      border: 1px solid #d5d5d5;
      background-color: #fff;
      line-height: 30px;
      vertical-align: top;

      .file-name {
        color: #000;
        font-size: 14px;
        vertical-align: top;
        .truncate();
      }

      .file-check {
        position: absolute;
        top: -1px;
        right: -1px;

        .el-button {
          width: 58px;
          background-color: #f8f8f8;
          &:focus, &:hover {
            background-color: #efebeb;
            color: #606266;
          }
        }
      }
    }

    .btn-upload {
      margin-left: 15px;
      padding-left: 25px;
      padding-right: 25px;
    }

    .btn-download {
      padding-left: 25px;
      padding-right: 25px;
      .iconfont {
        font-size: 12px;
      }
    }
  }
</style>
