<template>
  <div class="v_upload-file">
    <label>上传文件：</label>
    <div class="file-upload">
      <p class="file-name">{{uploadFileName}}</p>
      <el-upload
        class="file-check"
        action=""
        :file-list="fileList"
        :show-file-list="false"
        :multiple="false"
        :on-change="handleChange"
        :auto-upload="false">
        <el-button slot="trigger" size="small">浏览</el-button>
      </el-upload>
    </div>
    <el-button class="btn-upload" size="small" type="success" :disabled="!fileList[0].raw" @click="upload">导入
    </el-button>
    <el-button class="btn-download fn-right" size="small" type="success" @click="download"><i
      class="iconfont">&#xe794;</i> 模板下载
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'UploadFile',
    props: {
      callback: {
        type: Function
      }
    },
    data() {
      return {
        fileList: [{
          name: ''
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
      upload() {
        let excelfileExtend = '.xls,.xlsx';
        let fileExtend = this.fileList[0].name.substring(this.fileList[0].name.lastIndexOf('.')).toLowerCase();
        if (excelfileExtend.indexOf(fileExtend) <= -1) {
          this.$message.error('文件格式错误');
          return false
        }
        let formdata = new FormData();
        formdata.append('file', this.fileList[0].raw);
        this.$axios.post('/orderPlacingMeetingService/analyzeInsertOpMeetingOfferList', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(rsp => {
          this.$emit('callback' , rsp.data || []);
          console.log('17、批量导入新增机型数据解析接口：', rsp.data);
        })
      },
      download() {
        this.$axios.get('/rest/schedule/template', {
          params: {
            key: ''
          },
          responseType: 'arraybuffer'
        }).then((response) => {
          //创建一个blob对象,file的一种
          let blob = new Blob([response.data], {type: 'application/x-xls'});
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileNames[scheduleType] + '_' + response.headers.datestr + '.xls';
          link.click();
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/css/mixin";

  .v_upload-file {
    > label {
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
          background-color: #f8f8f8;
          border-radius: 0;
          &:focus, &:hover {
            background-color: #efebeb;
            border-color: #dcdfe6;
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
