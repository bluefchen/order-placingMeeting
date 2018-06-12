<template>
  <div class="vue_terminal-maintain">
    <el-form :model="terminalMaintainInfo" ref="terminalMaintainInfo" label-width="110px" class="demo-ruleForm">
      <div class="box-1200">
        <div class="order-titl fn-clear">
          <TitlePlate class="fn-left" :title="title"/>
        </div>
        <div class="terminal-info-box">
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item label="终端编码：" prop="offerCode" :rules="[{ min: 0, max: 32, message: '长度不能超过32个字符', trigger: 'blur'}]">
                <Input :value.sync="terminalMaintainInfo.offerCode"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
                <el-form-item label="产品类型：" prop="isCentman" :rules="[{ required: true, message: '请选择产品类型', trigger: 'change' }]">
                  <el-radio-group v-model="terminalMaintainInfo.isCentman">
                    <el-radio :label="'Y'">集采</el-radio>
                    <el-radio :label="'N'">社采</el-radio>
                  </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="终端名称：" prop="offerName" :rules="[{ required: true, message: '请输入终端名称', trigger: 'blur' },{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'change'}]">
                <Input :value.sync="terminalMaintainInfo.offerName"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item label="终端品牌：" prop="brandCd" :rules="[{ required: true, message: '请选择终端品牌', trigger: 'change' }]">
                <Select :value.sync="terminalMaintainInfo.brandCd" :options="brandOptions"/>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="终端型号：" prop="offerModelId" :rules="[{ required: true, message: '请选择终端型号', trigger: 'change' }]">
                <Select :value.sync="terminalMaintainInfo.offerModelId" :options="modelOptions"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item label="终端价格：" prop="salePrice" :rules="[{ required: true, message: '请输入终端价格', trigger: 'blur' },{ type: 'number', message: '终端价格必须为数字值'}]">
                <Input :type="'number'" :value.sync="terminalMaintainInfo.salePrice"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18" :offset="2">
              <el-form-item label="终端图片上传：" prop="offerPicList">
                <div class="upload-img-list fn-clear">
                  <ul>
                    <el-upload
                      action="/commonCfgController/upload"
                      :file-list="offerPicList"
                      list-type="picture-card"
                      :limit= "6"
                      :data="upLoadItem"
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
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="result-head fn-clear">
          <div class="result-title fn-left">规格详情</div>
          <div class="buttons fn-right">
            <button class="btns" @click="importInfo"><i class="iconfont">&#xe6a8;</i> 导入规格</button>
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


                  <el-form-item label="触摸屏类型" :label-position="labelPosition" prop="offerScreenParam.screenType" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                    <Input class="content-input" :value.sync="terminalMaintainInfo.offerScreenParam.screenType"/>
                  </el-form-item>
                  
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
                  <el-form-item label="触摸屏类型" :label-position="labelPosition" prop="offerScreenParam.screenType" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                    <Input class="content-input" :value.sync="terminalMaintainInfo.offerScreenParam.screenType"/>
                  </el-form-item>
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
          <button class="btns" @click="submitForm('terminalMaintainInfo')">保&nbsp;存</button>
          <!-- <button class="btns" @click="saveOffer">保&nbsp;存</button> -->
          <button class="btns" @click="previewOffer">预&nbsp;览</button>
          <!-- <button class="btns" @click="previewOffer">预&nbsp;览</button> -->
      </div>
    </el-form>
    <DialogPopup class="dialog-choose-merchants" :visible="dialogVisible" :title="dislogTitle" @visibleChange="visibleChange">
      <div slot="content" class="pop-cnt">
        <UploadFile :url="url" :downloadUrl="downloadUrl" @callback="uploadData"/>
        <div class="import-result-box fn-clear" v-if="showSuccee">
          <div class="success">
            <img src="@/assets/images/icon-success.png" class="suc-img">
            <div class="import-text">终端规格详情导入完成！</div>
          </div>
        </div>
      </div>
      <div slot="footer">
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
        this.terminalMaintainInfo = {
          brandCd: '',
          offerModelId: ''
        };
        this.terminalMaintainInfo.offerBaseParam = {};
        this.terminalMaintainInfo.offerScreenParam = {};
        this.terminalMaintainInfo.offerHardwardParam = {};
        this.flag = 1;
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
        labelPosition: 'left',
        terminalInfo: {
          offerCode: ''
        },
        terminalMaintainInfo: {
          brandCd: '',
          offerModelId: ''
        },
        flag: 0,
        title: '',
        showSuccee: false,
        brandOptions: [],
        modelOptions: [],
        offerPicList: [],
        imgBigVisible: false,
        dialogImageUrl: '',
        brandList: [],
        modelList: [],
        uploadOfferPicList:{
          'offerPicUrl': '',
          'offerPicUrl2': '',
          'offerPicUrl3': '',
          'offerPicUrl4': '',
          'offerPicUrl5': '',
          'offerPicUrl6': ''
        },
        dialogVisible: false,
        dislogTitle: '导入',
        imgUrl: require('../assets/images/icon-add.png'),
        url: '/orderPlacingMeetingController/analyzeOfferParamList',
        downloadUrl: '/commonCfgController/downloadModel?modelType=',
        upLoadItem: {
          fileType: '2'
        }
      }
    },
    methods: {
      //图片上传成功
      handleAvatarSuccess(res, file, fileList){
        this.offerPicList.push(res.data);
      },
      //图片删除
      handleRemove(file, fileList) {
        this.offerPicList = fileList
      },
      visibleChange(val) {
        this.dialogVisible = val;
      },
      importInfo(){
        this.dialogVisible = true;
        this.showSuccee = false;
      },
      //导入
      uploadData(data) {
        this.$nextTick(function () {
          this.showSuccee = true;
          this.terminalMaintainInfo.offerBaseParam = data.offerBaseParam;
          this.terminalMaintainInfo.offerHardwardParam = data.offerHardwardParam;
          this.terminalMaintainInfo.offerScreenParam = data.offerScreenParam;
        })
      },
      //查询终端型号
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            return false;
          }
        });
      },
      saveOffer(){
        _.some(this.brandList, (item, index) => {
          if(item.brandCd === this.terminalMaintainInfo.brandCd){
             this.terminalMaintainInfo.brandName =  item.brandName
          }
        });
        _.some(this.modelList, (item, index) => {
          if(item.offerModelId === this.terminalMaintainInfo.offerModelId){
             this.terminalMaintainInfo.offerModelName =  item.offerModelName
          }
        });
        _.forEach(this.offerPicList, (item, index) => {
          if(index === 0){
            this.uploadOfferPicList.offerPicUrl = item.url
          }else if(index === 1){
            this.uploadOfferPicList.offerPicUrl2 = item.url
          }else if(index === 2){
            this.uploadOfferPicList.offerPicUrl3 = item.url
          }else if(index === 3){
            this.uploadOfferPicList.offerPicUrl4 = item.url
          }else if(index === 4){
            this.uploadOfferPicList.offerPicUrl5 = item.url
          }else if(index === 5){
            this.uploadOfferPicList.offerPicUrl6 = item.url
          }
        });
        if(this.title === '新增终端'){
          this.$post('/orderPlacingMeetingController/insertOffer', {
            'offerCode': this.terminalMaintainInfo.offerCode,
            'offerName': this.terminalMaintainInfo.offerName,
            'brandCd': this.terminalMaintainInfo.brandCd,
            'brandName': this.terminalMaintainInfo.brandName,
            'offerModelId': this.terminalMaintainInfo.offerModelId,
            'offerModelName': this.terminalMaintainInfo.offerModelName,
            'isCentman': this.terminalMaintainInfo.isCentman,
            'salePrice': this.terminalMaintainInfo.salePrice,
            'statusCd': this.terminalMaintainInfo.statusCd,
            'offerBaseParam': this.terminalMaintainInfo.offerBaseParam,
            'offerScreenParam': this.terminalMaintainInfo.offerScreenParam,
            'offerHardwardParam':{
              'cpuModel': this.terminalMaintainInfo.offerHardwardParam.cpuModel,
              'cpuRate': this.terminalMaintainInfo.offerHardwardParam.cpuRate,
              'core': this.terminalMaintainInfo.offerHardwardParam.core,
              'gpuModel': this.terminalMaintainInfo.offerHardwardParam.gpuModel,
              'ram': this.terminalMaintainInfo.offerHardwardParam.ram,
              'rom': this.terminalMaintainInfo.offerHardwardParam.rom,
              'memoryType': this.terminalMaintainInfo.offerHardwardParam.memoryType,
              'memoryCard': this.terminalMaintainInfo.offerHardwardParam.memoryCard,
              'extendedCapacity': this.terminalMaintainInfo.offerHardwardParam.extendedCapacity,
              'rearCamera': this.terminalMaintainInfo.offerHardwardParam.rearCamera,
              'frontCamera': this.terminalMaintainInfo.offerHardwardParam.frontCamera,
              'batteryCapacity': this.terminalMaintainInfo.offerHardwardParam.batteryCapacity,
              'batteryType': this.terminalMaintainInfo.offerHardwardParam.batteryType,
              'batteryCharge': this.terminalMaintainInfo.offerHardwardParam.batteryCharge
            },
            'offerPic': this.uploadOfferPicList
          }).then((rsp) => {
            this.$router.push({
              path: '/orderManage/terminalMaintain'
            });
          });
        }else{
          this.uploadOfferPicList.offerPicId = this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicId
          this.$post('/orderPlacingMeetingController/updateOffer', {
            'offerId': this.terminalMaintainInfo.offerId,
            'offerCode': this.terminalMaintainInfo.offerCode,
            'offerName': this.terminalMaintainInfo.offerName,
            'brandCd': this.terminalMaintainInfo.brandCd,
            'brandName': this.terminalMaintainInfo.brandName,
            'offerModelId': this.terminalMaintainInfo.offerModelId,
            'offerModelName': this.terminalMaintainInfo.offerModelName,
            'isCentman': this.terminalMaintainInfo.isCentman,
            'salePrice': this.terminalMaintainInfo.salePrice,
            'statusCd': this.terminalMaintainInfo.statusCd,
            'offerBaseParam': this.terminalMaintainInfo.offerBaseParam,
            'offerScreenParam': this.terminalMaintainInfo.offerScreenParam,
            'offerHardwardParam':{
              'cpuModel': this.terminalMaintainInfo.offerHardwardParam.cpuModel,
              'cpuRate': this.terminalMaintainInfo.offerHardwardParam.cpuRate,
              'core': this.terminalMaintainInfo.offerHardwardParam.core,
              'gpuModel': this.terminalMaintainInfo.offerHardwardParam.gpuModel,
              'ram': this.terminalMaintainInfo.offerHardwardParam.ram,
              'rom': this.terminalMaintainInfo.offerHardwardParam.rom,
              'memoryType': this.terminalMaintainInfo.offerHardwardParam.memoryType,
              'memoryCard': this.terminalMaintainInfo.offerHardwardParam.memoryCard,
              'extendedCapacity': this.terminalMaintainInfo.offerHardwardParam.extendedCapacity,
              'rearCamera': this.terminalMaintainInfo.offerHardwardParam.rearCamera,
              'frontCamera': this.terminalMaintainInfo.offerHardwardParam.frontCamera,
              'batteryCapacity': this.terminalMaintainInfo.offerHardwardParam.batteryCapacity,
              'batteryType': this.terminalMaintainInfo.offerHardwardParam.batteryType,
              'batteryCharge': this.terminalMaintainInfo.offerHardwardParam.batteryCharge
            },
            'offerPic': this.uploadOfferPicList
          }).then((rsp) => {
            this.$router.push({
              path: '/orderManage/terminalMaintain'
            });
          });
        }
      },
      previewOffer(){
        _.some(this.brandList, (item, index) => {
          if(item.brandCd === this.terminalMaintainInfo.brandCd){
             this.terminalMaintainInfo.brandName =  item.brandName
          }
        });
        _.some(this.modelList, (item, index) => {
          if(item.offerModelId === this.terminalMaintainInfo.offerModelId){
             this.terminalMaintainInfo.offerModelName =  item.offerModelName
          }
        });
        _.forEach(this.offerPicList, (item, index) => {
          if(index === 0){
            this.uploadOfferPicList.offerPicUrl = item.url
          }else if(index === 1){
            this.uploadOfferPicList.offerPicUrl2 = item.url
          }else if(index === 2){
            this.uploadOfferPicList.offerPicUrl3 = item.url
          }else if(index === 3){
            this.uploadOfferPicList.offerPicUrl4 = item.url
          }else if(index === 4){
            this.uploadOfferPicList.offerPicUrl5 = item.url
          }else if(index === 5){
            this.uploadOfferPicList.offerPicUrl6 = item.url
          }
        });
        if(this.title === '新增终端'){
          this.$post('/orderPlacingMeetingController/insertOffer', {
            'offerCode': this.terminalMaintainInfo.offerCode,
            'offerName': this.terminalMaintainInfo.offerName,
            'brandCd': this.terminalMaintainInfo.brandCd,
            'brandName': this.terminalMaintainInfo.brandName,
            'offerModelId': this.terminalMaintainInfo.offerModelId,
            'offerModelName': this.terminalMaintainInfo.offerModelName,
            'isCentman': this.terminalMaintainInfo.isCentman,
            'salePrice': this.terminalMaintainInfo.salePrice,
            'statusCd': this.terminalMaintainInfo.statusCd,
            'offerBaseParam': this.terminalMaintainInfo.offerBaseParam,
            'offerScreenParam': this.terminalMaintainInfo.offerScreenParam,
            'offerHardwardParam':{
              'cpuModel': this.terminalMaintainInfo.offerHardwardParam.cpuModel,
              'cpuRate': this.terminalMaintainInfo.offerHardwardParam.cpuRate,
              'core': this.terminalMaintainInfo.offerHardwardParam.core,
              'gpuModel': this.terminalMaintainInfo.offerHardwardParam.gpuModel,
              'ram': this.terminalMaintainInfo.offerHardwardParam.ram,
              'rom': this.terminalMaintainInfo.offerHardwardParam.rom,
              'memoryType': this.terminalMaintainInfo.offerHardwardParam.memoryType,
              'memoryCard': this.terminalMaintainInfo.offerHardwardParam.memoryCard,
              'extendedCapacity': this.terminalMaintainInfo.offerHardwardParam.extendedCapacity,
              'rearCamera': this.terminalMaintainInfo.offerHardwardParam.rearCamera,
              'frontCamera': this.terminalMaintainInfo.offerHardwardParam.frontCamera,
              'batteryCapacity': this.terminalMaintainInfo.offerHardwardParam.batteryCapacity,
              'batteryType': this.terminalMaintainInfo.offerHardwardParam.batteryType,
              'batteryCharge': this.terminalMaintainInfo.offerHardwardParam.batteryCharge
            },
            'offerPic': this.uploadOfferPicList
          }).then((rsp) => {
            console.log('新增成功！')
          });
        }else{
          this.uploadOfferPicList.offerPicId = this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicId
          this.$post('/orderPlacingMeetingController/updateOffer', {
            'offerId': this.terminalMaintainInfo.offerId,
            'offerCode': this.terminalMaintainInfo.offerCode,
            'offerName': this.terminalMaintainInfo.offerName,
            'brandCd': this.terminalMaintainInfo.brandCd,
            'brandName': this.terminalMaintainInfo.brandName,
            'offerModelId': this.terminalMaintainInfo.offerModelId,
            'offerModelName': this.terminalMaintainInfo.offerModelName,
            'isCentman': this.terminalMaintainInfo.isCentman,
            'salePrice': this.terminalMaintainInfo.salePrice,
            'statusCd': this.terminalMaintainInfo.statusCd,
            'offerBaseParam': this.terminalMaintainInfo.offerBaseParam,
            'offerScreenParam': this.terminalMaintainInfo.offerScreenParam,
            'offerHardwardParam':{
              'cpuModel': this.terminalMaintainInfo.offerHardwardParam.cpuModel,
              'cpuRate': this.terminalMaintainInfo.offerHardwardParam.cpuRate,
              'core': this.terminalMaintainInfo.offerHardwardParam.core,
              'gpuModel': this.terminalMaintainInfo.offerHardwardParam.gpuModel,
              'ram': this.terminalMaintainInfo.offerHardwardParam.ram,
              'rom': this.terminalMaintainInfo.offerHardwardParam.rom,
              'memoryType': this.terminalMaintainInfo.offerHardwardParam.memoryType,
              'memoryCard': this.terminalMaintainInfo.offerHardwardParam.memoryCard,
              'extendedCapacity': this.terminalMaintainInfo.offerHardwardParam.extendedCapacity,
              'rearCamera': this.terminalMaintainInfo.offerHardwardParam.rearCamera,
              'frontCamera': this.terminalMaintainInfo.offerHardwardParam.frontCamera,
              'batteryCapacity': this.terminalMaintainInfo.offerHardwardParam.batteryCapacity,
              'batteryType': this.terminalMaintainInfo.offerHardwardParam.batteryType,
              'batteryCharge': this.terminalMaintainInfo.offerHardwardParam.batteryCharge
            },
            'offerPic': this.uploadOfferPicList
          }).then((rsp) => {
            console.log('修改成功！')
          });
        };
        this.terminalMaintainInfo.offerPicList = this.offerPicList
        localStorage.setItem('offerCode', JSON.stringify(this.terminalMaintainInfo));
        this.$router.push({
          path: '/orderManage/detailTerminalMaintain',
        });
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
      'terminalMaintainInfo.brandCd': function(newVal, oldVal){
        if(this.flag){
          if(newVal !== oldVal){
            this.modelOptions = [];
            if(newVal){
              this.qryOfferModelList(newVal);
            };
            this.terminalMaintainInfo.offerModelId = '';
          }

        }else{
          this.flag++
        }
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

      .buttons{
        .btns{
          &:hover {
            background-color: #e20606;
          }
        }
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
        .el-form-item{
          font-size: 14px;
          font-weight: bold;
          text-align: left;
          label{
            color: #646466;
            &.el-form-item__label{
              text-align: left;
            }
          }
        }
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

    .terminal-info-box {
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
        &:disabled{
          opacity: 0.7
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

    //表单提示样式
    .el-form-item{
      margin: 10px 0;
    }

    .editor-error{
      position: absolute;
      left: 0;
      bottom: -30px;
      padding: 5px;
      z-index: 999;
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
    }
    .el-form-item__error{
      padding: 5px;
      z-index: 999;
    }

    .el-form-item__label{
      height: 30px;
      line-height: 30px;
      padding: 0;
      color: #333;
    }
    .el-form-item__content{
      line-height: 30px;
    }
    //表单提示样式

  }

</style>
