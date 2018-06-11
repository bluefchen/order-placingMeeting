<template>
  <div>
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info">
        <p class="p-titl">2018夏季VIVO品牌新品订货会即将开启</p>
        <div class="activity">
          <p>活动日期：2018/04/10-2018/04/11</p>
          <p>活动地址：XXX市XXXXXXXXX街XXX路XX号</p>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['政策管理', '政策审核']"/>
        </div>
      </div>

      <!-- 搜索 -->
      <div class="box-1200 search">
        <InputWithSelect @search="search"/>
      </div>

      <div class="box-1200">
        <div class="order-titl fn-clear">
          <div class="tel-model fn-left">优惠政策列表</div>
          <div class="buttons fn-right">
            <router-link class="btns" to="/order/importPolicyAdd"><i class="iconfont">&#xe6a8;</i> 政策投入</router-link>
          </div>
        </div>
        <Table :isIndex="true" :tableTitle="tableTitle" :tableData="tableData"/>
      </div>
    </div>
  </div>
</template>

<script>
  import InputWithSelect from '@/components/InputWithSelect';
  import Table from '@/components/Table';
  import Breadcrumb from '@/components/Breadcrumb';
  import ButtonWithDialog from '@/components/ButtonWithDialog';
  import ApprovePolicy from '@/components/ApprovePolicy';

  export default {
    name: 'PolicyExamine',
    created() {
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
      this.queryOpmPolicyList();
    },
    data() {
      return {
        policyManage: {
          policyType: '',
          policyName: ''
        },
        tableTitle: [{
          label: '政策名称',
          prop: 'policyName',
          render: (h, params) => {
            return h(ButtonWithDialog, {
              props: {
                title: params.row.policyName,
                data: params.row
              }
            });
          }
        }, {
          label: '政策机型',
          prop: 'offerNames',
          width: 200,
        }, {
          label: '政策制定日期',
          prop: 'createDt',
          width: 180,
        }, {
          label: '制定人',
          prop: 'partyName',
          width: 120,
        }, {
          label: '政策状态',
          prop: 'statusCdName',
          width: 120
        }, {
          label: '操作',
          width: 120,
          render: (h, params) => {
            return h(ApprovePolicy, {
              props: {
                data: params.row
              },
              on: {
                update: (data) => {
                  this.queryOpmPolicyList();
                }
              }
            });
          }
        }],
        tableData: [],
        isShow: false
      }
    },
    methods: {
      search(obj) {
        this.policyManage.policyType = obj.type;
        this.policyManage.policyName = obj.value;
        this.queryOpmPolicyList();
      },
      queryOpmPolicyList(curPage, pageSize) {
        this.$post('/opmPolicyController/queryOpmPolicyList', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          policyName: this.policyManage.policyName,
          policyType: this.policyManage.policyType,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
        })
      }
    },
    components: {
      InputWithSelect,
      Table,
      Breadcrumb,
      ButtonWithDialog,
      ApprovePolicy
    }
  }
</script>

<style scoped lang="less">
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

  .search {
    margin: 10px auto;
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
    text-decoration: none;
  }

  .buttons .btns:hover {
    background-color: #e20606;
  }

  .child {
    height: 330px;
  }

</style>
