<template>
  <div>
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['首页', '订单批量导入']"/>
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
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';

  export default {
    name: 'ImportModelAdd',
    created() {
      this.opMeetingInfo = JSON.parse(sessionStorage.getItem('opMeeting'));
    },
    data() {
      return {
        url: '/opmOrderController/analyzeInsertOpmOrderList',
        downloadUrl: this.$global.fileUrl + '/orderPlacingMeeting/commonCfgController/downloadModel?modelType=OpmOrder',
        tableTitle: [{
          label: '订单号',
          prop: 'opmOrderNo',
          width: 80
        }, {
          label: '零售商',
          prop: 'retailerName',
          width: 80
        }, {
          label: '终端编码',
          prop: 'offerCode',
          width: 80
        }, {
          label: '终端名称',
          prop: 'offerName'
        }, {
          label: '终端品牌',
          prop: 'brandName',
          width: 80
        }, {
          label: '终端型号',
          prop: 'offerModelName',
          width: 80
        }, {
          label: '产品类型',
          prop: 'isCentman',
          width: 80,
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
          label: '订购数量',
          prop: 'offerQty',
          width: 80
        }, {
          label: '供货商',
          prop: 'supplierName',
          width: 80
        }, {
          label: '备注',
          prop: 'remarks'
        }, {
          label: '校验结果',
          prop: 'isSuccess',
          width: 80,
          render: (h, params) => {
            return h({
              template: '<span class="state-icon" :class="data.row.isSuccess === \'Y\' ? \'ok\' : \'error\'"></span>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '校验信息',
          prop: 'resultMsg',
          width: 80
        }]
      }
    },
    methods: {
      batchInsertOpmOffer() {
        let tableData = this.$refs.importComponent.tableData || [];
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
            item.opMeetingId = this.opMeetingInfo.opMeetingId;
            tableDataIsSueccess.push(item);
          }
        });
        this.$post('/opmOrderController/batchInsertOpmOffer', tableDataIsSueccess).then(rsp => {
          this.$msgBox({
            type: 'success',
            title: '操作提示',
            content: '导入新增数据成功'
          }).catch(() => {
            this.$refs.importComponent.tableData = [];
          });
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
