<template>
  <div>
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['首页', '政策投入', '上传政策']"/>
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
        opMeetingInfo: null,
        url: '/opmPolicyController/analyzeInsertOpmPolicy',
        downloadUrl: this.$global.fileUrl + '/orderPlacingMeeting/commonCfgController/downloadModel?modelType=InsertOpmPolicy',
        tableTitle: [{
          label: '政策编码',
          prop: 'policyNo',
          width: 200
        }, {
          label: '政策名称',
          prop: 'policyName',
          width: 200
        }, {
          label: '政策机型',
          prop: 'policyTypeName',
          width: 120
        }, {
          label: '政策制定日期',
          prop: 'createDt',
          width: 180
        }, {
          label: '制定人',
          prop: 'partyName',
          width: 120
        }, {
          label: '校验结果',
          prop: 'isSuccess',
          width: 100,
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
          prop: 'resultMsg'
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
            tableDataIsSueccess.push(item);
          }
        });
        this.$post('/opmPolicyController/batchInsertOpmPolicy', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          policys: tableDataIsSueccess
        }).then(rsp => {
          if (rsp.resultCode === '0') {
            this.$router.push({path: '/order/policyManage'});
          } else {
            this.$msgBox({
              type: 'info',
              title: '操作提示',
              content: rsp.resultMsg
            }).catch(() => {
              // console.log('cancel');
            });
          }
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

  .bottom-btns {
    margin: 20px 0;
    text-align: center;
  }
</style>
