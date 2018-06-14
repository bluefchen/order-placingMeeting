<template>
  <div>
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['首页', '订单管理', '订单提货数据导入']"/>
        </div>
      </div>

      <!-- 文件导入 -->
      <div class="box-1200">
        <Import :url="url" :downloadUrl="downloadUrl" :tableTitle="tableTitle" ref="importComponent"/>
      </div>

      <div class="bottom-btns">
        <el-button type="success" @click="batchInsertOpmOfferAllot">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Import from '@/components/Import';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';

  export default {
    name: 'ImportSpecialModel',
    created() {
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
    },
    data() {
      return {
        url: '/opmOrderController/analyzeInsertOpmOrderPickupRecordList',
        downloadUrl: 'http://192.168.74.17:9086/orderPlacingMeeting/commonCfgController/downloadModel?modelType=OpmOrderPickupRecord',
        tableTitle: [{
          label: '订单号',
          prop: 'opmOrderNo',
          width: 160
        }, {
          label: '零售商',
          prop: 'retailerName',
          width: 120
        }, {
          label: '终端编码',
          prop: 'offerCode',
          width: 80
        }, {
          label: '终端名称',
          prop: 'offerName',
          width: 120
        }, {
          label: '终端品牌',
          prop: 'brandCd',
          width: 100
        }, {
          label: '终端型号',
          prop: 'offerModelName',
          width: 100
        }, {
          label: '产品类型',
          prop: 'isCentman',
          width: 100,
          render: (h, params) => {
            return h({
              template: '<div><span v-if="data.row.isCentman === \'Y\'">集采</span><span v-else>社采</span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '供货商',
          prop: 'supplierName',
          width: 80
        }, {
          label: '订购数量',
          prop: 'offerQty',
          width: 80
        }, {
          label: '提货数量',
          prop: 'pickupGoodsAmount',
          width: 80
        }, {
          label: '校验结果',
          prop: 'isSuccess',
          width: 80,
          render: (h, params) => {
            return h({
              template: '<div><span class="result-icon" v-if="data.row.isSuccess === \'Y\'"></span><span v-else>--</span></div>',
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
        }]
      }
    },
    methods: {
      batchInsertOpmOfferAllot() {
        let tableData = this.$refs.importComponent.tableData;
        if (!tableData.length) {
          this.$message.warning('导入数据不能为空');
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
        this.$post('/opmOrderController/batchInsertOpmOrderPickupRecord', tableDataIsSueccess).then(rsp => {
          this.$router.push({path: '/order/orderPickupData'});
          // this.$message.success('导入订单提货数据成功');
          console.log('34、批量导入订单提货数据接口：', rsp);
        })
      }
    },
    components: {
      Breadcrumb,
      Import,
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

  /*底部按钮*/
  .bottom-btns {
    margin: 20px 0;
    text-align: center;
  }
</style>
