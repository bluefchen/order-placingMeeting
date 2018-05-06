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
          <Breadcrumb :list="['政策管理', '政策投入']"/>
        </div>
      </div>

      <!-- 搜索 -->
      <div class="box-1200 search">
        <InputWithSelect :search="search"/>
      </div>

      <div class="box-1200">
        <div class="order-titl fn-clear">
          <div class="tel-model fn-left">优惠政策列表</div>
          <div class="buttons fn-right">
            <router-link class="btns" to="/order/importPolicyAdd"><i class="iconfont">&#xe6a8;</i> 政策投入</router-link>
          </div>
        </div>
        <Table :stripe="false" :border="false" :tableTitle="tableTitle" :tableData="tableData"/>
      </div>
    </div>
  </div>
</template>

<script>
  import InputWithSelect from '@/components/InputWithSelect';
  import Table from '@/components/Table';
  import Breadcrumb from '@/components/Breadcrumb';
  import ButtonWithDialog from '@/components/ButtonWithDialog';

  export default {
    name: 'PolicyManage',
    created() {
    },
    data() {
      return {
        title: '优惠政策详情',
        tableTitle: [{
          label: '序号',
          prop: 'orderNum',
          width: 100,
        }, {
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
          prop: 'policyModel',
          width: 180,
        }, {
          label: '政策制定日期',
          prop: 'policyDate',
          width: 180,
        }, {
          label: '制定人',
          prop: 'policyModelName',
          width: 120,
        }, {
          label: '制定状态',
          prop: 'state',
          width: 120,
          render: (h, params) => {
            return h({
              template: '<div><span v-if="data.row.state === \'Y\'">已发布</span><span v-else>待审核</span></div>',
              data() {
                return {
                  data: params
                }
              }
            });
          }
        }, {
          label: '操作',
          width: 120,
          render: function (h, params) {
            return h({
              template: '<el-button type="text" @click="deleteInfo(row)" class="delete-btn">删除</el-button>',
              data: function () {
                return {
                  data: params.row
                }
              },
              methods: {
                deleteInfo(row) {
                  console.log(row)
                }
              },
            })
          }
        }],
        tableData: [{
          orderNum: '1',
          policyName: 'VIVO',
          policyModel: '普惠机型',
          policyDate: '2018-04-04',
          policyModelName: '吴晓明',
          state: 'Y'
        }],
        isShow: false
      }
    },
    methods: {
      search(obj) {
        console.log('参数：', obj);
      }
    },
    components: {
      InputWithSelect,
      Table,
      Breadcrumb,
      ButtonWithDialog
    }
  }
</script>

<style scoped lang="less">
  /*中间背景图片*/
  .img-bg {
    width: 100%;
    height: 200px;
    background: #e4273f;
  }

  .img-bg .info {
    width: 1036px;
    height: 200px;
    margin: 0 auto;
    background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat right bottom;
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
    margin: 15px 0;
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

  .el-table--small td, .el-table--small th {
    padding: 5px 0;
  }

  .v_table .el-table, .v_table .el-table__expanded-cell {
    border: 1px solid #dcdcdc;
    border-bottom: 0;
  }

  .delete-btn {
    padding: 0;
    color: #ff0000;
    font-size: 12px;
    &:hover {
      color: #ff0000;
      text-decoration: underline;
    }
  }

</style>
