<template>
  <div class="vue_terminal-maintain">
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="终端详情"/>
      </div>
      <div class="terminal-info fn-clear">
        <div class="terminal-info-images fn-left">
          <PicPreview :picPreviewList="offerPicList"></PicPreview>
        </div>
        <div class="terminal-info-text fn-left">
          <div class="terminal-info-title">{{terminalInfo.offerName}}</div>
          <div class="terminal-info-price">
            <div class="terminal-price">终端价格<span class="price-nub">¥<span>&nbsp;{{terminalInfo.salePrice}}</span></span></div>
          </div>
          <div class="terminal-info-list fn-clear">
            <ul>
              <li><div class="info-type fn-left">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌</div>{{terminalInfo.brandName}}</li>
              <li><div class="info-type fn-left">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</div>{{terminalInfo.offerModelName}}</li>
              <li><div class="info-type fn-left">产品类型</div>{{terminalInfo.isCentman | centmanType}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="result-head">
        <div class="result-title">规格详情</div>
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
                  <div class="content-detail">{{terminalInfo.offerBaseParam.listDt}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">手机类型</label>
                  <div class="content-detail">{{terminalInfo.offerBaseParam.termType}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">操作系统</label>
                  <div class="content-detail">{{terminalInfo.offerBaseParam.os}}</div>
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
                  <div class="content-detail">{{terminalInfo.offerScreenParam.screenType}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">主屏尺寸</label>
                  <div class="content-detail">{{terminalInfo.offerScreenParam.screenSize}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">主屏材质</label>
                  <div class="content-detail">{{terminalInfo.offerScreenParam.screenMaterial}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">主屏分辨率</label>
                  <div class="content-detail">{{terminalInfo.offerScreenParam.resolutionRatio}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">屏幕像素密度</label>
                  <div class="content-detail">{{terminalInfo.offerScreenParam.screenPiexl}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">屏幕技术</label>
                  <div class="content-detail">{{terminalInfo.offerScreenParam.screenTech}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">窄边框</label>
                  <div class="content-detail">{{terminalInfo.offerScreenParam.frame}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">其他屏幕参数</label>
                  <div class="content-detail">{{terminalInfo.offerScreenParam.otherParam}}</div>
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
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.rearCamera}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">前置摄像头</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.frontCamera}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">CPU型号</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.cpuModel}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">CPU频率</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.cpuRate}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">核心数</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.core}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">GPU型号</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.gpuModel}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">RAM容量</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.ram}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">ROM容量</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.rom}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">存储类型</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.memoryType}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">存储卡</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.memoryCard}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">扩展容量</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.extendedCapacity}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">电池类型</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.batteryType}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">电池容量</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.batteryCapacity}}</div>
                </div>
                <div class="content-item">
                  <label class="content-label">电池充电</label>
                  <div class="content-detail">{{terminalInfo.offerHardwardParam.batteryCharge}}</div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import DialogPopup from '@/components/DialogPopup';
  import UploadFile from '@/components/UploadFile';
  import PicPreview from '@/components/PicPreview';

  export default {
    name: 'DetailTerminalMaintain',
    created() {
      this.terminalInfo = JSON.parse(localStorage.getItem('offerCode'));
      _.forEach(this.terminalInfo.offerPicList, (item, index) => {
        this.offerPicList.push(item.url);
      }); 
    },
    data() {
      return {
        terminalInfo: {},
        offerPicList: []
      }
    },
    methods: {
    },
    filters: {
      centmanType: function (value) {
        switch(value){
          case 'Y':
            return '集采';
            break;
          case 'N':
            return '社采';
            break;
        }
      }
    },
    components: {
      TitlePlate,
      Input,
      Select,
      DialogPopup,
      UploadFile,
      PicPreview
    }
  }
</script>

<style lang="less">

  .vue_terminal-maintain {

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

    .terminal-info{
      width: 100%;
      .terminal-info-images{
        width: 385px;
      }
      .terminal-info-text{
        width: 610px;
        margin-left: 35px;
        .terminal-info-title{
          width: 100%;
          height: 64px;
          color: #000;
          font-size: 18px;
          line-height: 24px;
          font-weight: bold;
        }
        .terminal-info-price{
          width: 100%;
          background: #f3f3f3;
          height: 60px;
          line-height: 60px;
          .terminal-price{
            padding: 0 20px;
            color: #999;
            font-size: 14px;
            .price-nub{
              margin-left: 18px;
              color: #f60e0e;
              font-size: 18px;
              span{
                font-size: 24px;
              }
            }
          }
        }
        .terminal-info-list{
          width: 100%;
          margin-top: 5px;
          ul{
            li{
              height: 54px;
              line-height: 54px;
              border-bottom: 1px dashed #e0e0e0;
              font-size: 14px;
              .info-type{
                width: 80px;
                text-align: right;
                color: #999;
                margin-right: 15px;
              }
            }
          }
        }
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
    }

    .result-box{
      width: 100%;
      border-left: 1px solid #dcdcdc;
      border-top: 1px solid #dcdcdc;
      margin-bottom: 20px;
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
            color: #646466;
            line-height: 32px;
            font-size: 14px;
            font-weight: bold;
          }
          .content-input {
            flex: 1 0 0;
          }
          .content-detail{
            flex: 1 0 0;
            color: #757473;
            font-size: 14px;
            font-weight: bold;
            line-height: 32px;
          }
        }
      }
    }

  }

</style>
