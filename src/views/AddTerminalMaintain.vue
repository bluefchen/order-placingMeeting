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
              <el-form-item label="终端名称：" prop="offerName" :rules="[{ required: true, message: '请输入终端名称', trigger: 'blur' },{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                <Input :value.sync="terminalMaintainInfo.offerName"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item label="终端品牌：" prop="brandCd" :rules="[{ required: true, message: '请选择终端品牌', trigger: 'change' }]">
                <SelectComponents :placement="'bottom-start'" :value.sync="terminalMaintainInfo.brandCd" :list="brandOptions" :width="625" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="终端型号：" prop="offerModelId" :rules="[{ required: true, message: '请选择终端型号', trigger: 'change' }]">
                <Select :value.sync="terminalMaintainInfo.offerModelId" :clearable="true" :options="modelOptions"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <el-form-item label="终端价格：" prop="salePrice" :rules="[{ required: true, message: '请输入终端价格', trigger: 'blur' },{ type: 'number', message: '终端价格必须为数字值', trigger: 'blur'}]">
                <Input :type="'number'" :value.sync="terminalMaintainInfo.salePrice"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18" :offset="2">
              <div class="upload-item fn-clear">
                <label class="label-wrds text-right"><span class="red-star">*</span> 终端图片上传：</label>
                <div class="upload-img-list fn-clear">
                  <ul class="fn-left">
                    <el-upload
                      action="http://192.168.74.17:9086/orderPlacingMeeting/commonCfgController/upload"
                      :file-list="showOfferPicList"
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
                  <div v-if="nullError" class="upload-list-null fn-left">请至少上传4张终端图片</div>
                </div>
                <div class="attention">注：终端尺寸大小：高宽380*380PX，图片是终端详情的终端产品展示图，最多只能上传6张</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="result-head fn-clear">
          <div class="result-title fn-left">规格详情</div>
          <div class="buttons fn-right">
            <button type="button" class="btns" @click="importInfo()"><i class="iconfont">&#xe6a8;</i> 导入规格</button>
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
                  <el-row>
                    <el-form-item label="上市日期" prop="offerBaseParam.listDt" >
                      <el-date-picker
                        v-model="terminalMaintainInfo.offerBaseParam.listDt"
                        type="date"
                        size="small"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :editable="false">
                      </el-date-picker>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="手机类型" prop="offerBaseParam.termType" :rules="[{ min: 0, max: 300, message: '长度不能超过300个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerBaseParam.termType"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="操作系统" prop="offerBaseParam.os" :rules="[{ min: 0, max: 300, message: '长度不能超过300个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerBaseParam.os"/>
                    </el-form-item>
                  </el-row>
                </div>
              </td>
            </tr>
            <tr>
              <td class="result-table-title">
                <p>屏幕</p>
              </td>
              <td>
                <div class="result-table-content">
                  <el-row>
                    <el-form-item label="触摸屏类型" prop="offerScreenParam.screenType" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerScreenParam.screenType"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="主屏尺寸" prop="offerScreenParam.screenSize" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerScreenParam.screenSize"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="主屏材质" prop="offerScreenParam.screenMaterial" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerScreenParam.screenMaterial"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="主屏分辨率" prop="offerScreenParam.resolutionRatio" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerScreenParam.resolutionRatio"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="屏幕像素密度" prop="offerScreenParam.screenPiexl" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerScreenParam.screenPiexl"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="屏幕技术" prop="offerScreenParam.screenTech" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerScreenParam.screenTech"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="窄边框" prop="offerScreenParam.frame" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerScreenParam.frame"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="其他屏幕参数" prop="offerScreenParam.otherParam" :rules="[{ min: 0, max: 500, message: '长度不能超过500个字符', trigger: 'blur'}]">
                      <Input type="textarea" :value.sync="terminalMaintainInfo.offerScreenParam.otherParam" />
                    </el-form-item>
                  </el-row>
                </div>
              </td>
            </tr>
            <tr>
              <td class="result-table-title">
                <p>硬件</p>
              </td>
              <td>
                <div class="result-table-content">
                  <el-row>
                    <el-form-item label="后置摄像头" prop="offerHardwardParam.rearCamera" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.rearCamera"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="前置摄像头" prop="offerHardwardParam.frontCamera" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.frontCamera"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="CPU型号" prop="offerHardwardParam.cpuModel" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.cpuModel"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="CPU频率" prop="offerHardwardParam.cpuRate" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.cpuRate"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="核心数" prop="offerHardwardParam.core" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.core"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="GPU型号" prop="offerHardwardParam.gpuModel" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.gpuModel"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="RAM容量" prop="offerHardwardParam.ram" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.ram"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="ROM容量" prop="offerHardwardParam.rom" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.rom"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="存储类型" prop="offerHardwardParam.memoryType" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.memoryType"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="存储卡" prop="offerHardwardParam.memoryCard" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.memoryCard"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="扩展容量" prop="offerHardwardParam.extendedCapacity" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.extendedCapacity"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="电池类型" prop="offerHardwardParam.batteryType" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.batteryType"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="电池容量" prop="offerHardwardParam.batteryCapacity" :rules="[{max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.batteryCapacity"/>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="电池充电" prop="offerHardwardParam.batteryCharge" :rules="[{ min: 0, max: 200, message: '长度不能超过200个字符', trigger: 'blur'}]">
                      <Input :value.sync="terminalMaintainInfo.offerHardwardParam.batteryCharge"/>
                    </el-form-item>
                  </el-row>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="foot-btn">
          <button type="button" class="btns" @click="submitForm('terminalMaintainInfo', '保存')">保&nbsp;存</button>
          <button type="button" class="btns" @click="submitForm('terminalMaintainInfo', '预览')">预&nbsp;览</button>
      </div>
    </el-form>
    <DialogPopup class="dialog-choose-merchants" :visible.sync="dialogVisible" :title="dislogTitle" @visibleChange="visibleChange">
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
        <el-button type="success" @click="visibleChange(false)">关&nbsp;闭</el-button>
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
  import SelectComponents from '@/components/SelectComponents';

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
        this.flag = 1;
      }else{
        this.title = '修改终端';
        this.maintainInfo = JSON.parse(localStorage.getItem('offerId'));
        this.qryOfferModelList(this.maintainInfo.brandCd);
        this.offerPicList.push({url: _.get(this.maintainInfo, 'offerHardwardParam.offerPic.offerPicUrl')});
        this.offerPicList.push({url: _.get(this.maintainInfo, 'offerHardwardParam.offerPic.offerPicUrl2')})
        this.offerPicList.push({url: _.get(this.maintainInfo, 'offerHardwardParam.offerPic.offerPicUrl3')})
        this.offerPicList.push({url: _.get(this.maintainInfo, 'offerHardwardParam.offerPic.offerPicUrl4')})
        this.offerPicList.push({url: _.get(this.maintainInfo, 'offerHardwardParam.offerPic.offerPicUrl5')})
        this.offerPicList.push({url: _.get(this.maintainInfo, 'offerHardwardParam.offerPic.offerPicUrl6')})
        this.showOfferPicList = [];
        _.forEach(this.offerPicList, (item, index) => {
          this.showOfferPicList.push({url: 'http://192.168.74.17:9086/orderPlacingMeeting/commonCfgController/download?url=' + item.url});
        });
        this.terminalMaintainInfo = {
          offerCode: _.get(this.maintainInfo, 'offerCode'),
          offerName: _.get(this.maintainInfo, 'offerName'),
          brandCd: _.get(this.maintainInfo, 'brandCd'),
          brandName: _.get(this.maintainInfo, 'brandName'),
          offerModelId: _.get(this.maintainInfo, 'offerModelId'),
          offerModelName: _.get(this.maintainInfo, 'offerModelName'),
          isCentman: _.get(this.maintainInfo, 'isCentman'),
          salePrice: _.get(this.maintainInfo, 'salePrice'),
          statusCd: _.get(this.maintainInfo, 'statusCd'),
          offerBaseParam: {
            listDt: _.get(this.maintainInfo, 'offerBaseParam.listDt'),
            termType: _.get(this.maintainInfo, 'offerBaseParam.termType'),
            os: _.get(this.maintainInfo, 'offerBaseParam.os'),
          },
          offerScreenParam:{
            screenType: _.get(this.maintainInfo, 'offerScreenParam.screenType'),
            screenSize: _.get(this.maintainInfo, 'offerScreenParam.screenSize'),
            screenMaterial: _.get(this.maintainInfo, 'offerScreenParam.screenMaterial'),
            resolutionRatio: _.get(this.maintainInfo, 'offerScreenParam.resolutionRatio'),
            screenPiexl: _.get(this.maintainInfo, 'offerScreenParam.screenPiexl'),
            screenTech: _.get(this.maintainInfo, 'offerScreenParam.screenTech'),
            frame: _.get(this.maintainInfo, 'offerScreenParam.frame'),
            otherParam: _.get(this.maintainInfo, 'offerScreenParam.otherParam'),
          },
          offerHardwardParam:{
            cpuModel: _.get(this.maintainInfo, 'offerHardwardParam.cpuModel'),
            cpuRate: _.get(this.maintainInfo, 'offerHardwardParam.cpuRate'),
            core: _.get(this.maintainInfo, 'offerHardwardParam.core'),
            gpuModel: _.get(this.maintainInfo, 'offerHardwardParam.gpuModel'),
            ram: _.get(this.maintainInfo, 'offerHardwardParam.ram'),
            rom: _.get(this.maintainInfo, 'offerHardwardParam.rom'),
            memoryType: _.get(this.maintainInfo, 'offerHardwardParam.memoryType'),
            memoryCard: _.get(this.maintainInfo, 'offerHardwardParam.memoryCard'),
            extendedCapacity: _.get(this.maintainInfo, 'offerHardwardParam.extendedCapacity'),
            rearCamera: _.get(this.maintainInfo, 'offerHardwardParam.rearCamera'),
            frontCamera: _.get(this.maintainInfo, 'offerHardwardParam.frontCamera'),
            batteryCapacity: _.get(this.maintainInfo, 'offerHardwardParam.batteryCapacity'),
            batteryType: _.get(this.maintainInfo, 'offerHardwardParam.batteryType'),
            batteryCharge: _.get(this.maintainInfo, 'offerHardwardParam.batteryCharge'),
          },
            offerPic:{
            offerPicUrl: _.get(this.maintainInfo, 'offerPic.offerPicUrl'),
            offerPicUrl2: _.get(this.maintainInfo, 'offerPic.offerPicUrl2'),
            offerPicUrl3: _.get(this.maintainInfo, 'offerPic.offerPicUrl3'),
            offerPicUrl4: _.get(this.maintainInfo, 'offerPic.offerPicUrl4'),
            offerPicUrl5: _.get(this.maintainInfo, 'offerPic.offerPicUrl5'),
            offerPicUrl6: _.get(this.maintainInfo, 'offerPic.offerPicUrl6')
          }
        }
      }
    },
    data() {
      return {
        nullError: null,
        value: '',
        brandCdItem: '',
        offerModelItem: '',


        terminalInfo: {
          offerCode: ''
        },
        terminalMaintainInfo: {
          offerCode: '',
          offerName: '',
          brandCd: '',
          brandName: '',
          offerModelId: '',
          offerModelName: '',
          isCentman: '',
          salePrice: '',
          statusCd: '',
          offerBaseParam: {
            listDt: '',
            termType: '',
            os:''
          },
          offerScreenParam:{
            screenType: '',
            screenSize: '',
            screenMaterial: '',
            resolutionRatio: '',
            screenPiexl: '',
            screenTech: '',
            frame: '',
            otherParam:''
          },
          offerHardwardParam:{
            cpuModel: '',
            cpuRate: '',
            core: '',
            gpuModel: '',
            ram: '',
            rom: '',
            memoryType: '',
            memoryCard: '',
            extendedCapacity: '',
            rearCamera: '',
            frontCamera: '',
            batteryCapacity: '',
            batteryType: '',
            batteryCharge:''},
            offerPic:{
            offerPicUrl: '',
            offerPicUrl2: '',
            offerPicUrl3: '',
            offerPicUrl4: '',
            offerPicUrl5: '',
            offerPicUrl6: ''
          }
        },
        flag: 0,
        title: '',
        showSuccee: false,
        brandOptions: [],
        modelOptions: [],
        offerPicList: [],
        showOfferPicList: [],
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
        downloadUrl: 'http://192.168.74.17:9086/orderPlacingMeeting/commonCfgController/downloadModel?modelType=OfferParam',
        upLoadItem: {
          fileType: '2'
        }
      }
    },
    methods: {
      //图片上传成功
      handleAvatarSuccess(res, file, fileList){
        this.offerPicList.push(res.data);
        this.showOfferPicList[this.showOfferPicList.length] = {
          url: 'http://192.168.74.17:9086/orderPlacingMeeting/commonCfgController/download?url='  + file.url
        };
        console.log(this.offerPicList);
      },
      //图片删除
      handleRemove(file, fileList) {
        var fileIndex = null;
        var fileUrl = file.url; //需根据url添加字符串的长度截取，然后比较获得index值
        _.forEach(this.offerPicList, (item, index) => {
          if(item.url === fileUrl.slice(79)){
            fileIndex = index;
          }
        });
        this.offerPicList.splice(fileIndex, 1)
        this.showOfferPicList = fileList;
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
        if(data.data){
          this.$nextTick(function () {
            this.showSuccee = true;
            this.terminalMaintainInfo.offerBaseParam = data.offerBaseParam;
            this.terminalMaintainInfo.offerHardwardParam = data.offerHardwardParam;
            this.terminalMaintainInfo.offerScreenParam = data.offerScreenParam;
          })
        };
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
      submitForm(formName, title) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.offerPicList.length > 3){
              if(title === '保存'){
                this.saveOffer();
              }else{
                this.previewOffer();
              }
            }else{
              window.scroll(0, 0);
              this.nullError = true;
            }
          } else {
            if(!this.offerPicList.length){
              this.nullError = true;
            };
            window.scroll(0, 0);
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
            'offerCode': _.get(this.terminalMaintainInfo, 'offerCode'),
            'offerName': _.get(this.terminalMaintainInfo, 'offerName'),
            'brandCd': _.get(this.terminalMaintainInfo, 'brandCd'),
            'brandName': _.get(this.terminalMaintainInfo, 'brandName'),
            'offerModelId': _.get(this.terminalMaintainInfo, 'offerModelId'),
            'offerModelName': _.get(this.terminalMaintainInfo, 'offerModelName'),
            'isCentman': _.get(this.terminalMaintainInfo, 'isCentman'),
            'salePrice': _.get(this.terminalMaintainInfo, 'salePrice'),
            'statusCd': _.get(this.terminalMaintainInfo, 'statusCd'),
            'offerBaseParam': _.get(this.terminalMaintainInfo, 'offerBaseParam'),
            'offerScreenParam': _.get(this.terminalMaintainInfo, 'offerScreenParam'),
            'offerHardwardParam':{
              'cpuModel': _.get(this.terminalMaintainInfo.offerHardwardParam, 'cpuModel'),
              'cpuRate': _.get(this.terminalMaintainInfo.offerHardwardParam, 'cpuRate'),
              'core': _.get(this.terminalMaintainInfo.offerHardwardParam, 'core'),
              'gpuModel': _.get(this.terminalMaintainInfo.offerHardwardParam, 'gpuModel'),
              'ram': _.get(this.terminalMaintainInfo.offerHardwardParam, 'ram'),
              'rom': _.get(this.terminalMaintainInfo.offerHardwardParam, 'rom'),
              'memoryType': _.get(this.terminalMaintainInfo.offerHardwardParam, 'memoryType'),
              'memoryCard': _.get(this.terminalMaintainInfo.offerHardwardParam, 'memoryCard'),
              'extendedCapacity': _.get(this.terminalMaintainInfo.offerHardwardParam, 'extendedCapacity'),
              'rearCamera': _.get(this.terminalMaintainInfo.offerHardwardParam, 'rearCamera'),
              'frontCamera': _.get(this.terminalMaintainInfo.offerHardwardParam, 'frontCamera'),
              'batteryCapacity': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryCapacity'),
              'batteryType': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryType'),
              'batteryCharge': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryCharge')
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
            'offerId': _.get(this.terminalMaintainInfo, 'offerId'),
            'offerCode': _.get(this.terminalMaintainInfo, 'offerCode'),
            'offerName': _.get(this.terminalMaintainInfo, 'offerName'),
            'brandCd': _.get(this.terminalMaintainInfo, 'brandCd'),
            'brandName': _.get(this.terminalMaintainInfo, 'brandName'),
            'offerModelId': _.get(this.terminalMaintainInfo, 'offerModelId'),
            'offerModelName': _.get(this.terminalMaintainInfo, 'offerModelName'),
            'isCentman': _.get(this.terminalMaintainInfo, 'isCentman'),
            'salePrice': _.get(this.terminalMaintainInfo, 'salePrice'),
            'statusCd': _.get(this.terminalMaintainInfo, 'statusCd'),
            'offerBaseParam': _.get(this.terminalMaintainInfo, 'offerBaseParam'),
            'offerScreenParam': _.get(this.terminalMaintainInfo, 'offerScreenParam'),
            'offerHardwardParam':{
              'cpuModel': _.get(this.terminalMaintainInfo.offerHardwardParam, 'cpuModel'),
              'cpuRate': _.get(this.terminalMaintainInfo.offerHardwardParam, 'cpuRate'),
              'core': _.get(this.terminalMaintainInfo.offerHardwardParam, 'core'),
              'gpuModel': _.get(this.terminalMaintainInfo.offerHardwardParam, 'gpuModel'),
              'ram': _.get(this.terminalMaintainInfo.offerHardwardParam, 'ram'),
              'rom': _.get(this.terminalMaintainInfo.offerHardwardParam, 'rom'),
              'memoryType': _.get(this.terminalMaintainInfo.offerHardwardParam, 'memoryType'),
              'memoryCard': _.get(this.terminalMaintainInfo.offerHardwardParam, 'memoryCard'),
              'extendedCapacity': _.get(this.terminalMaintainInfo.offerHardwardParam, 'extendedCapacity'),
              'rearCamera': _.get(this.terminalMaintainInfo.offerHardwardParam, 'rearCamera'),
              'frontCamera': _.get(this.terminalMaintainInfo.offerHardwardParam, 'frontCamera'),
              'batteryCapacity': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryCapacity'),
              'batteryType': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryType'),
              'batteryCharge': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryCharge')
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
            'offerCode': _.get(this.terminalMaintainInfo, 'offerCode'),
            'offerName': _.get(this.terminalMaintainInfo, 'offerName'),
            'brandCd': _.get(this.terminalMaintainInfo, 'brandCd'),
            'brandName': _.get(this.terminalMaintainInfo, 'brandName'),
            'offerModelId': _.get(this.terminalMaintainInfo, 'offerModelId'),
            'offerModelName': _.get(this.terminalMaintainInfo, 'offerModelName'),
            'isCentman': _.get(this.terminalMaintainInfo, 'isCentman'),
            'salePrice': _.get(this.terminalMaintainInfo, 'salePrice'),
            'statusCd': _.get(this.terminalMaintainInfo, 'statusCd'),
            'offerBaseParam': _.get(this.terminalMaintainInfo, 'offerBaseParam'),
            'offerScreenParam': _.get(this.terminalMaintainInfo, 'offerScreenParam'),
            'offerHardwardParam':{
              'cpuModel': _.get(this.terminalMaintainInfo.offerHardwardParam, 'cpuModel'),
              'cpuRate': _.get(this.terminalMaintainInfo.offerHardwardParam, 'cpuRate'),
              'core': _.get(this.terminalMaintainInfo.offerHardwardParam, 'core'),
              'gpuModel': _.get(this.terminalMaintainInfo.offerHardwardParam, 'gpuModel'),
              'ram': _.get(this.terminalMaintainInfo.offerHardwardParam, 'ram'),
              'rom': _.get(this.terminalMaintainInfo.offerHardwardParam, 'rom'),
              'memoryType': _.get(this.terminalMaintainInfo.offerHardwardParam, 'memoryType'),
              'memoryCard': _.get(this.terminalMaintainInfo.offerHardwardParam, 'memoryCard'),
              'extendedCapacity': _.get(this.terminalMaintainInfo.offerHardwardParam, 'extendedCapacity'),
              'rearCamera': _.get(this.terminalMaintainInfo.offerHardwardParam, 'rearCamera'),
              'frontCamera': _.get(this.terminalMaintainInfo.offerHardwardParam, 'frontCamera'),
              'batteryCapacity': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryCapacity'),
              'batteryType': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryType'),
              'batteryCharge': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryCharge')
            },
            'offerPic': this.uploadOfferPicList
          }).then((rsp) => {
            console.log('新增成功！')
          });
        }else{
          this.uploadOfferPicList.offerPicId = this.terminalMaintainInfo.offerHardwardParam.offerPic.offerPicId
          this.$post('/orderPlacingMeetingController/updateOffer', {
            'offerId': _.get(this.terminalMaintainInfo, 'offerId'),
            'offerCode': _.get(this.terminalMaintainInfo, 'offerCode'),
            'offerName': _.get(this.terminalMaintainInfo, 'offerName'),
            'brandCd': _.get(this.terminalMaintainInfo, 'brandCd'),
            'brandName': _.get(this.terminalMaintainInfo, 'brandName'),
            'offerModelId': _.get(this.terminalMaintainInfo, 'offerModelId'),
            'offerModelName': _.get(this.terminalMaintainInfo, 'offerModelName'),
            'isCentman': _.get(this.terminalMaintainInfo, 'isCentman'),
            'salePrice': _.get(this.terminalMaintainInfo, 'salePrice'),
            'statusCd': _.get(this.terminalMaintainInfo, 'statusCd'),
            'offerBaseParam': _.get(this.terminalMaintainInfo, 'offerBaseParam'),
            'offerScreenParam': _.get(this.terminalMaintainInfo, 'offerScreenParam'),
            'offerHardwardParam':{
              'cpuModel': _.get(this.terminalMaintainInfo.offerHardwardParam, 'cpuModel'),
              'cpuRate': _.get(this.terminalMaintainInfo.offerHardwardParam, 'cpuRate'),
              'core': _.get(this.terminalMaintainInfo.offerHardwardParam, 'core'),
              'gpuModel': _.get(this.terminalMaintainInfo.offerHardwardParam, 'gpuModel'),
              'ram': _.get(this.terminalMaintainInfo.offerHardwardParam, 'ram'),
              'rom': _.get(this.terminalMaintainInfo.offerHardwardParam, 'rom'),
              'memoryType': _.get(this.terminalMaintainInfo.offerHardwardParam, 'memoryType'),
              'memoryCard': _.get(this.terminalMaintainInfo.offerHardwardParam, 'memoryCard'),
              'extendedCapacity': _.get(this.terminalMaintainInfo.offerHardwardParam, 'extendedCapacity'),
              'rearCamera': _.get(this.terminalMaintainInfo.offerHardwardParam, 'rearCamera'),
              'frontCamera': _.get(this.terminalMaintainInfo.offerHardwardParam, 'frontCamera'),
              'batteryCapacity': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryCapacity'),
              'batteryType': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryType'),
              'batteryCharge': _.get(this.terminalMaintainInfo.offerHardwardParam, 'batteryCharge')
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
      UploadFile,
      SelectComponents
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
      },
      'offerPicList': function(newVal, oldVal){
        if(!newVal.length){
          this.nullError = true;
        }else{
          this.nullError = false;
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
    }

    .upload-item {
      position: relative;
      margin: 10px 0;
      padding-left: 110px;
      .label-wrds{
        position: absolute;
        left: 0;
        top: 0;
        width: 110px;
        text-align: right;
        height: 28px;
        line-height: 28px;
        padding: 0;
        color: #333;
        text-align: right;
        font-size: 14px;
      }
    }

    .attention{
      color: #ffa132;
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
        padding: 10px 300px 10px 15px;
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
          height: 28px;
          padding: 0;
          color: #f01919;
          border: 1px solid #f01919;
          text-align: center;
          font-size: 14px;
          line-height: 28px;
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

    .upload-list-null{
      z-index: 999;
      color: #f56c6c;
      height: 92px;
      line-height: 92px;
      font-size: 12px;
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
      height: 28px;
      line-height: 28px;
      padding: 0;
      color: #333;
    }
    .el-form-item__content{
      line-height: 26px;
    }
    //表单提示样式
    .el-date-editor.el-input{
      width: 100%;
    }

  }
  .el-date-picker__header-label.active, .el-date-picker__header-label:hover, .el-month-table td .cell:hover, .el-month-table td.current:not(.disabled) .cell{
    color: #ff7a7a;
  }
  .el-date-table td.current:not(.disabled) span {
    color: #fff;
    background-color: #ff7a7a;
  }

  .el-date-table td.available:hover {
    color: #ff7a7a;
  }

  .el-date-table td.today span {
    color: #ff7a7a;
    font-weight: 700;
  }

</style>
