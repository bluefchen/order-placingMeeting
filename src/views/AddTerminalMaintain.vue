<template>
  <div class="vue_terminal-maintain">
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" :title="title"/>
      </div>
      <div class="terminal-info-box">
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 终端编码：</label>
              <Input class="condition-input" :value.sync="terminalMaintainInfo.offerCode"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 产品类型：</label>
              <el-radio-group v-model="terminalMaintainInfo.isCentman">
                <el-radio :label="'Y'">集采</el-radio>
                <el-radio :label="'N'">社采</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 终端名称：</label>
              <Input class="condition-input" :value.sync="terminalMaintainInfo.offerName"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 终端品牌：</label>
              <Select class="condition-input" :value.sync="terminalMaintainInfo.brandCd" :options="brandOptions"/>
            </div>
          </el-col>
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 终端型号：</label>
              <Select class="condition-input" :value.sync="terminalMaintainInfo.offerModelId" :options="modelOptions"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 终端价格：</label>
              <Input class="condition-input" :value.sync="terminalMaintainInfo.salePrice"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18" :offset="2">
            <div class="condition-item">
              <label class="label-wrds text-right"><span class="red-star">*</span> 终端图片上传：</label>
              <div class="upload-img-list fn-clear">
                <ul>
                  <el-upload
                    action="/commonCfgController/upload"
                    :file-list="offerPicList"
                    list-type="picture-card"
                    :limit= "6"
                    :on-success="handleAvatarSuccess"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog class="btn-upload" :visible.sync="imgBigVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </ul>
                <div class="attention">注：终端尺寸大小：高宽380*380PX，图片是终端详情的终端产品展示图，最多只能上传6张</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="result-head fn-clear">
        <div class="result-title fn-left">规格详情</div>
        <div class="buttons fn-right">
          <button class="btns" @click="dialogVisible = true"><i class="iconfont">&#xe6a8;</i> 导入规格</button>
        </div>
      </div>
      <div class="result-box">
        <table>
          <tr>
            <td class="result-table-title">
              <p>基本参数</p>
            </td>
            <td>
              <div class="result-table-content">
                <div class="content-item">
                  <label class="content-label">上市日期</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerBaseParam.listDt"/>
                </div>
                <div class="content-item">
                  <label class="content-label">手机类型</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerBaseParam.termType"/>
                </div>
                <div class="content-item">
                  <label class="content-label">操作系统</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerBaseParam.os"/>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="result-table-title">
              <p>屏幕</p>
            </td>
            <td>
              <div class="result-table-content">
                <div class="content-item">
                  <label class="content-label">触摸屏类型</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerScreenParam.screenType"/>
                </div>
                <div class="content-item">
                  <label class="content-label">主屏尺寸</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerScreenParam.screenSize"/>
                </div>
                <div class="content-item">
                  <label class="content-label">主屏材质</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerScreenParam.screenMaterial"/>
                </div>
                <div class="content-item">
                  <label class="content-label">主屏分辨率</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerScreenParam.resolutionRatio"/>
                </div>
                <div class="content-item">
                  <label class="content-label">屏幕像素密度</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerScreenParam.screenPiexl"/>
                </div>
                <div class="content-item">
                  <label class="content-label">屏幕技术</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerScreenParam.screenTech"/>
                </div>
                <div class="content-item">
                  <label class="content-label">窄边框</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerScreenParam.frame"/>
                </div>
                <div class="content-item">
                  <label class="content-label">其他屏幕参数</label>
                  <Input type="textarea" v-model="terminalMaintainInfo.offerScreenParam.otherParam" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="result-table-title">
              <p>硬件</p>
            </td>
            <td>
              <div class="result-table-content">
                <div class="content-item">
                  <label class="content-label">后置摄像头</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.rearCamera"/>
                </div>
                <div class="content-item">
                  <label class="content-label">前置摄像头</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.frontCamera"/>
                </div>
                <div class="content-item">
                  <label class="content-label">CPU型号</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.cpuModel"/>
                </div>
                <div class="content-item">
                  <label class="content-label">CPU频率</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.cpuRate"/>
                </div>
                <div class="content-item">
                  <label class="content-label">核心数</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.core"/>
                </div>
                <div class="content-item">
                  <label class="content-label">GPU型号</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.gpuModel"/>
                </div>
                <div class="content-item">
                  <label class="content-label">RAM容量</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.ram"/>
                </div>
                <div class="content-item">
                  <label class="content-label">存储类型</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.memoryType"/>
                </div>
                <div class="content-item">
                  <label class="content-label">存储卡</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.memoryCard"/>
                </div>
                <div class="content-item">
                  <label class="content-label">扩展容量</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.extendedCapacity"/>
                </div>
                <div class="content-item">
                  <label class="content-label">电池类型</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.batteryType"/>
                </div>
                <div class="content-item">
                  <label class="content-label">电池容量</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.batteryCapacity"/>
                </div>
                <div class="content-item">
                  <label class="content-label">电池充电</label>
                  <Input class="content-input" :value.sync="terminalMaintainInfo.offerHardwardParam.batteryCharge"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="foot-btn">
        <button class="btns" @click="showList">保&nbsp;存</button>
        <button class="btns">预&nbsp;览</button>
    </div>

    <DialogPopup class="dialog-choose-merchants" :visible="dialogVisible" :title="dislogTitle" @visibleChange="visibleChange">
      <div slot="content" class="pop-cnt">
        <UploadFile :url="url" @callback="uploadData"/>
        <div class="import-result-box fn-clear">
          <div class="success">
            <img src="@/assets/images/icon-success.png" class="suc-img">
            <div class="import-text">终端规格详情导入完成！</div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="success" @click="dialogVisible = false">确&nbsp;定</el-button>
        <el-button type="success" @click="dialogVisible = false">关&nbsp;闭</el-button>
      </div>
    </DialogPopup>

  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import DialogPopup from '@/components/DialogPopup';
  import UploadFile from '@/components/UploadFile';

  export default {
    name: 'AddTerminalMaintain',
    created() {

      this.$post('/orderPlacingMeetingController/queryOfferBrandList').then((rsp) => {
        this.brandList = rsp;
        _.forEach(this.brandList, (item) => {
          this.brandOptions.push({
            value: item.brandCd,
            label: item.brandName
          })
        });
      });

      var operation = this.$route.query.operation;
      if(operation === 'add'){
        this.title = '新增终端';
        this.terminalMaintainInfo = {};
        this.terminalMaintainInfo.offerBaseParam = {};
        this.terminalMaintainInfo.offerScreenParam = {};
        this.terminalMaintainInfo.offerHardwardParam = {};
      }else{
        this.title = '修改终端';
        this.terminalMaintainInfo = JSON.parse(localStorage.getItem('offerId'));

        this.qryOfferModelList(this.terminalMaintainInfo.brandCd);

        if(this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl){
          this.offerPicList.push({url: this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl})
        };
        if(this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl2){
          this.offerPicList.push({url: this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl2})
        };
        if(this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl3){
          this.offerPicList.push({url: this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl3})
        };
        if(this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl4){
          this.offerPicList.push({url: this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl4})
        };
        if(this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl5){
          this.offerPicList.push({url: this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl5})
        };
        if(this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl6){
          this.offerPicList.push({url: this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicUrl6})
        };
      }
    },
    data() {
      return {
        terminalMaintainInfo: {},
        title: '',
        brandOptions: [],
        modelOptions: [],

        offerPicList: [],
        imgBigVisible: false,
        dialogImageUrl: '',
        brandList: [],
        modelList: [],

        dialogVisible: false,
        dislogTitle: '导入',

        imgUrl: require('../assets/images/icon-add.png'),
        url: '/orderPlacingMeetingController/analyzeOfferParamList',
      }
    },
    methods: {
      //图片上传成功
      handleAvatarSuccess(res, file, fileList){
        this.offerPicList = fileList
      },
      //图片删除
      handleRemove(file, fileList) {
        this.offerPicList = fileList
      },
      visibleChange(val) {
        this.dialogVisible = val;
      },
      //导入
      uploadData(data) {
        this.data = data;
        console.log('导入文件返回的数据：', data);
      },
      qryOfferModelList(val){
        this.$post('/orderPlacingMeetingController/queryOfferModelList', {
          'brandCd': val
        }).then((rsp) => {
          this.modelList = rsp;
          _.forEach(this.modelList, (item) => {
            this.modelOptions.push({
              value: item.offerModelId,
              label: item.offerModelName
            })
          });
        });
      },
      showList(){
        console.log(this.offerPicList)
      }
    },
    components: {
      TitlePlate,
      Input,
      Select,
      DialogPopup,
      UploadFile
    },
    watch: {
      'terminalMaintainInfo.brandCd': function () {
        this.qryOfferModelList(this.terminalMaintainInfo.brandCd);
        this.terminalMaintainInfo.offerModelId = ''
        this.terminalMaintainInfo.offerModelName = ''
      }
    }
  }
</script>

<style lang="less">

  .vue_terminal-maintain {
    .el-textarea{
      flex: 1;
    }
    .text-right {
      text-align: right;
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
    }

    .order-titl .tel-model {
      min-width: 5px;
      min-height: 20px;
      background: url('../assets/images/red-line.png') no-repeat 0 center;
      padding-left: 10px;
      font-size: 18px;
      color: #000;
      font-weight: 800;
    }

    .terminal-info-box{
      width: 100%;
      padding: 10px 0;
      border: 1px solid #dfdfdf;
    }
    .red-star{
      color: #f00;
    }

    .upload-img-list{
      ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        div{
          display: flex;
          ul{
            li{
              position: relative;
              width: 90px;
              height: 92px;
              margin-right: 15px;
              margin-bottom: 15px;
              background: #fcfcfc;
              border: 1px solid #dfdfdf;
              display: flex;
              justify-content: center;
              align-items: center;
              img{
                max-width: 100%;
                max-height: 100%;
              }
              &.btn-upload{
                cursor: pointer;
              }
            }
          }
          div{
            position: relative;
            width: 90px;
            height: 92px;
            margin-right: 15px;
            margin-bottom: 15px;
            background: #fcfcfc;
            border: 1px solid #dfdfdf;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url('../assets/images/icon-add.png') #fcfcfc no-repeat center center;
            img{
              max-width: 100%;
              max-height: 100%;
            }
            i{
              display: none;
            }
          }
        }
      }
      .attention{
        color: #ffa132;
      }
    }

    .result-head{
      margin-top: 28px;
      .result-title{
        width: 129px;
        height: 34px;
        background: #f6f6f6;
        text-align: center;
        border: 1px solid #dcdcdc;
        font-size: 14px;
        font-weight: bold;
        line-height: 34px;
        border-bottom: none;
      }
      .buttons .btns {
        display: inline-block;
        padding: 0 12px;
        margin-left: 2px;
        border: 0;
        background-color: #fa0000;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        line-height: 28px;
        cursor: pointer;
        text-decoration: none;
      }

      .buttons .btns:hover {
        background-color: #e20606;
      }
    }

    .result-box{
      width: 100%;
      border-left: 1px solid #dcdcdc;
      border-top: 1px solid #dcdcdc;
      table{
        width: 100%;
        tr {
          td{
            border-right: 1px solid #dcdcdc;
            border-bottom: 1px solid #dcdcdc;
          }
        }
      }
      .result-table-title{
        width: 89px;
        background: #fafafa;
        vertical-align: top;
        padding: 20px;
        font-size: 16px;
        font-weight: bold;
      }
      .result-table-content{
        padding: 10px 300px 0px 15px;
        .content-item {
          display: flex;
          margin-bottom: 10px;
          .content-label {
            width: 110px;
            line-height: 32px;
            font-size: 14px;
            font-weight: bold;
            color: #646466;
          }
          .content-input {
            flex: 1 0 0;
          }
        }
      }
    }

    .condition-item {
      .el-radio__input{
        display: none;
        & + .el-radio__label{
          position: relative;
          display: block;
          width: 102px;
          height: 32px;
          padding: 0;
          color: #f01919;
          border: 1px solid #f01919;
          text-align: center;
          font-size: 14px;
          line-height: 32px;
          cursor: pointer;
          border-radius: 3px;
        }
        &.is-checked + .el-radio__label{
          &:after{
            width: 30px;
            height: 24px;
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            background: url('../assets/images/selected-icon.png');
          };
        }
      }
      input[type=radio]{
        margin: 0;
      }
      input[type=radio] + label.label-radio{
        margin-right: 16px;
      }
      input + label{
        width: 102px;
        height: 32px;
        color: #f01919;
        border: 1px solid #f01919;
        text-align: center;
        font-size: 14px;
        line-height: 32px;
        cursor: pointer;
        border-radius: 3px;
      }
      input:checked + label{
        position: relative;
        width: 102px;
        height: 32px;
        color: #f01919;
        border: 1px solid #f01919;
        text-align: center;
        font-size: 14px;
        line-height: 32px;
        cursor: pointer;
        border-radius: 3px;
      }
      input:checked + label:after{
        width: 30px;
        height: 24px;
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        background: url('../assets/images/selected-icon.png');
      }
    }
    .foot-btn{
      width: 100%;
      margin-top: 50px;
      padding: 24px 0;
      border-top: 1px solid #dcdcdc;
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
    .dialog-choose-merchants {
      .el-dialog {
        width: 880px;
      }
    }

    .import-result-box{
      width: 100%;
      height: 168px;
      margin: 20px auto 0;
      background: #f5fff8;
      text-align: center;
      border: 1px solid #e4f0e7;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .success{
      width: 330px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .suc-img{
        margin-right: 16px;
      }
      .import-text{
        color: #000;
        font-size: 16px;
        font-weight: bold;
      }
    }

  }

</style>
