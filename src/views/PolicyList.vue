<template>
  <div class="policy-list-page">
    <!-- 中间背景图片 -->
    <MiddleImgInfoSmall></MiddleImgInfoSmall>
    <div class="content">
      <!-- 我的位置 -->
      <div class="my-location">
        <div class="box-1200">
          <Breadcrumb :list="['政策管理', '政策列表']"/>
        </div>
      </div>

      <!-- 搜索 -->
      <div class="box-1200 search">
        <InputWithSelect @search="search" :options="searchList"/>
      </div>

      <div class="box-1200">
        <div class="order-titl fn-clear">
          <div class="tel-model fn-left">优惠政策列表</div>
        </div>
        <Table :isIndex="true" :tableTitle="tableTitle" :tableData="tableData"/>
        <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
      </div>
    </div>
  </div>
</template>

<script>
  import InputWithSelect from '@/components/InputWithSelect';
  import Table from '@/components/Table';
  import Breadcrumb from '@/components/Breadcrumb';
  import ButtonWithDialog from '@/components/ButtonWithDialog';
  import Pagination from '@/components/Pagination';
  import MiddleImgInfoSmall from '@/components/MiddleImgInfoSmall';
  
  export default {
    name: 'PolicyManage',
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
        searchList:[{
          label: '惠普政策',
          value: 1
        },{
          label: '团订政策',
          value: 2
        }],
        //表格的数据
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
          width: 180,
        }, {
          label: '政策制定日期',
          prop: 'createDt',
          width: 180,
        }, {
          label: '制定人',
          prop: 'partyName',
          width: 150,
        }, {
          label: '制定状态',
          prop: 'statusCdName',
          width: 150
        }],
        tableData: [],
        total: 1, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1, //当前页
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
        this.currentPage = curPage || 1;
        this.$post('/opmPolicyController/queryOpmPolicyList', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          policyName: this.policyManage.policyName,
          policyType: this.policyManage.policyType,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.queryOpmPolicyList(curPage);
      }
    },
    components: {
      InputWithSelect,
      Table,
      Breadcrumb,
      ButtonWithDialog,
      Pagination,
      MiddleImgInfoSmall
    }
  }
</script>

<style lang="less">
  .policy-list-page {
    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }

    .search {
      margin: 10px auto;
    }
    .el-select .el-input {
      width: 100px;
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
  }

</style>
