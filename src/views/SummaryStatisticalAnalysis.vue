<template>
  <div class="order_summary-statistical-analysis">
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
    <!-- 中间背景图片 -->

    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['首页', '统计查询', '全国汇总统计分析']"/>
      </div>
    </div>

    <!-- 条件搜索 -->
    <div class="box-1200 condition-search">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">省份：</label>
            <AreaSelect :value.sync="formInline.commonRegionId"/>
          </div>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="condition-item">
            <el-button size="small" type="success" @click="onSubmit">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';
  import Input from '@/components/Input';
  import AreaSelect from '@/components/AreaSelect';

  export default {
    name: 'summaryStatisticalAnalysis',
    data() {
      return {
        formInline: {
          commonRegionId: '',
          region: ''
        },

        commonRegionId: '',
        orderPickupRecordList: [], //查询返回的数据
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      qryOpmOrderPickupRecordList(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/opmOrderController/queryOpmOrderPickupRecordList', {
          opMeetingId: '订货会ID',
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.orderPickupRecordList = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.qryOpmOrderPickupRecordList(curPage);
      }
    },
    components: {
      Breadcrumb,
      TitlePlate,
      Table,
      Pagination,
      Input,
      AreaSelect
    }
  }
</script>

<style scoped lang="less">
  .order_summary-statistical-analysis {
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
  }
</style>
