<template>
  <div>
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['首页', '机型管理', '导入新增']"/>
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
      this.opMeetingInfo = JSON.parse(sessionStorage.getItem('opMeeting'));
    },
    data() {
      return {
        url: '/orderPlacingMeetingController/analyzeInsertOpmOfferAllotList',
        downloadUrl: this.$global.fileUrl + '/orderPlacingMeeting/commonCfgController/downloadModel?modelType=InsertOpmOfferAllot',
        tableTitle: [{
          label: '终端编码',
          prop: 'offerCode',
          width: 160
        }, {
          label: '终端名称',
          prop: 'offerName',
          width: 120
        }, {
          label: '终端品牌',
          prop: 'brandName',
          width: 80
        }, {
          label: '终端型号',
          prop: 'offerModelName',
          width: 100
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
          label: '供货商',
          prop: 'supplierName',
          width: 100
        }, {
          label: '终端价格',
          prop: 'salePrice',
          width: 80,
          render: (h, params) => {
            return h({
              template: '<span>￥{{data.row.salePrice}}</span>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '分配省份',
          prop: 'commonRegionName',
          width: 80
        }, {
          label: '分配量(台)',
          prop: 'assignQty',
          width: 80,
          render: (h, params) => {
            return h({
              template: '<span class="num">{{data.row.assignQty}}</span>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '上架数量',
          prop: 'offerQty',
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
        this.$post('/orderPlacingMeetingController/batchInsertOpmOfferAllot', tableDataIsSueccess).then(rsp => {
          this.$router.push({path: '/order/specialModel'});
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
