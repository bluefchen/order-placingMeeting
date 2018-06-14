<template>
  <div class="cyj-import">
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info">
        <p class="p-titl">2018夏季VIVO品牌新品订货会即将开启</p>
        <div class="activity">
          <p>活动日期：2018/04/10-2018/04/11</p>
          <p>活动地址：江苏省南京市玄武区龙蟠路88号-南京国展中心号</p>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['定金管理', '诚意金补录', '诚意金导入']"/>
        </div>
      </div>

      <!-- 文件导入 -->
      <div class="box-1200">
        <Import :url="url" :downloadUrl="downloadUrl" :tableTitle="tableTitle" ref="importComponent"/>
      </div>

      <div class="bottom-btns">
        <el-button type="success" @click="batchInsertOpmOffer">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Import from '@/components/Import';

  export default {
    name: 'ImportModelAdd',
    created() {
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
    },
    data() {
      return {
        url: '/opmDepositController/analyzeInsertOpmRetailerDepositList',
        downloadUrl: 'http://192.168.74.32:8080/orderPlacingMeeting/commonCfgController/downloadModel?modelType=OpmRetailerDeposit',
        tableTitle: [{
          label: '零售商编码',
          prop: 'retailerCode',
          width: 154
        }, {
          label: '零售商名称',
          prop: 'retailerName',
          width: 320
        }, {
          label: '零售商类型',
          prop: 'retailerTypeName',
          width: 150
        }, {
          label: '已交诚意金金额',
          prop: 'payDepositAmount',
          width: 200,
          render: function (h, params) {
            return h({
              template: '<p class="text-tag-danger">{{payDepositAmount}}</p>',
              data: function () {
                return {
                  payDepositAmount: params.row.payDepositAmount
                }
              }
            })
          }
        }, {
          label: '校验结果',
          prop: 'isSuccess',
          width: 100,
          render: (h, params) => {
            return h({
              template: '<div><span class="state-icon" :class="data.row.isSuccess === \'Y\' ? \'ok\' : \'error\'"></span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '校验信息',
          prop: 'resultMsg'
        }],
      }
    },
    methods: {
      batchInsertOpmOffer() {
        let tableData = this.$refs.importComponent.tableData;
        if (!tableData.length) {
          this.$msgBox({
            type: 'info',
            title: '操作提示',
            content: '导入数据不能为空'
          }).catch(() => {
            // console.log('cancel');
          });
          return;
        }
        let tableDataIsSueccess = [];
        _.each(tableData, (item) => {
          if (item.isSuccess === 'Y') {
            tableDataIsSueccess.push({
              opMeetingId: this.opMeetingInfo.opMeetingId,
              ...item
            })
          }
        });
        this.$post('/opmDepositController/batchInsertOpmRetailerDeposit', tableDataIsSueccess).then(rsp => {
          this.$router.push({path: '/order/CyjDepositAddRecord'});
        })
      }
    },
    components: {
      Breadcrumb,
      Import
    }
  }
</script>

<style scoped lang="less">
  .cyj-import {
    /*中间背景图片*/
    .img-bg {
      width: 100%;
      height: 170px;
      background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat center center;
    }

    .img-bg .info {
      width: 1036px;
      height: 170px;
      margin: 0 auto;
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

    /*底部按钮*/
    .bottom-btns {
      margin: 20px 0;
      text-align: center;
    }
  }
</style>
