<template>
  <div class="order-index">
    <!-- 中间背景图片 (首页和其他页面不一样)-->
    <div class="img-bg">
      <div class="info">
        <p class="p-titl">2018夏季VIVO品牌新品订货会</p>
        <div class="activity">
          <p>活动日期：2018/04/10-2018/04/11</p>
          <p>活动地址：江苏省南京市玄武区龙蟠路88号-南京国展中心</p>
        </div>
      </div>
    </div>
    <!-- 中间背景图片 -->
    <!-- 内容 -->
    <div class="content">
      <div class="mid-cnt">
        <p class="tit"><span>订货会介绍</span></p>
        <div class="cnt-info fn-clear">
          <div class="cnt-img fn-left">
            <img v-if="!!opMeetingInfo.logoUrl" :src="'http://192.168.74.32:8080/orderPlacingMeeting/commonCfgController/download?url=' + opMeetingInfo.logoUrl" alt="">
            <img v-else src="@/assets/images/some-logo-default.png" alt="">
          </div>
          <div class="cnt-wrds fn-right">
            <div v-html="opMeetingInfo.discription"></div>
          </div>
        </div>
      </div>
      <div class="stores">
        <TabWithTable :active-name="activeName" :tabs-list="tabsList"/>
      </div>
    </div>
  </div>
</template>

<script>
  import TabWithTable from '@/components/TabWithTable'

  export default {
    name: 'OrderIndex',
    created() {
      window.scroll(0, 0);
      this.opMeetingInfo = JSON.parse(localStorage.getItem('opMeeting'));
      this.queryOpmSupplierList();
      this.queryOpmRetailerList();

      // 获取定金配置的模式
      this.$post('/opmDepositController/queryOpmDepositInfo', {
        opMeetingId: this.opMeetingInfo.opMeetingId,
      }).then((rsp) => {
        if (rsp) {
          localStorage.setItem('opmDeposit', JSON.stringify(rsp));
        }
      })
    },
    data() {
      return {
        opMeetingInfo: null, //订货会基本信息
        supplierList: [], //关联供应商列表
        retailerList: [], //关联零售商列表
        pageSize: 10, //每页展示条数
        activeName: '参会供货商',
        tabsList: [{
          tabLabel: '参会供货商',
          tableTitle: [{
            label: '省份',
            prop: 'commonRegionName',
            width: 140
          }, {
            label: '供应商名称',
            prop: 'supplierName'
          }, {
            label: '供应商类型',
            prop: 'supplierTypeName',
            width: 140
          }, {
            label: '联系人',
            prop: 'linkMan',
            width: 140
          }, {
            label: '联系电话',
            prop: 'linkNbr',
            width: 140
          }, {
            label: '公司电话',
            prop: 'supplierPhone',
            width: 140
          }, {
            label: '公司传真',
            prop: 'supplierFax',
            width: 140
          }],
          tableData: [],
          pageSize: 0,
          total: 0,
          pageChanged: this.queryOpmSupplierList
        }, {
          tabLabel: '参会零售商',
          tableTitle: [{
            label: '省份',
            prop: 'commonRegionName',
            width: 140
          }, {
            label: '零售商名称',
            prop: 'retailerName'
          }, {
            label: '零售商类型',
            prop: 'retailerTypeName',
            width: 140
          }, {
            label: '联系人',
            prop: 'linkMan',
            width: 140
          }, {
            label: '联系电话',
            prop: 'linkNbr',
            width: 140
          }, {
            label: '公司电话',
            prop: 'retailerPhone',
            width: 140
          }, {
            label: '公司传真',
            prop: 'retailerFax',
            width: 140
          }],
          tableData: [],
          pageSize: 0,
          total: 0,
          pageChanged: this.queryOpmRetailerList
        }]
      }
    },
    methods: {
      queryOpmSupplierList(curPage, pageSize) {
        this.$post('/orderPlacingMeetingController/queryOpmSupplierList', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tabsList[0].pageSize = this.pageSize;
          this.tabsList[0].total = rsp.totalSize;
          this.tabsList[0].tableData = rsp.rows;
        });
      },
      queryOpmRetailerList(curPage, pageSize) {
        this.$post('/orderPlacingMeetingController/queryOpmRetailerList', {
          opMeetingId: this.opMeetingInfo.opMeetingId,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tabsList[1].pageSize = this.pageSize;
          this.tabsList[1].total = rsp.totalSize;
          this.tabsList[1].tableData = rsp.rows;
        });
      }
    },
    components: {
      TabWithTable
    }
  }
</script>

<style scoped lang="less">
  .order-index {
    /*中间背景图片*/
    .img-bg {
      width: 100%;
      height: 250px;
      background: #8252fe url('../assets/images/index-bg.jpg') no-repeat center 0;
    }

    .img-bg .info {
      width: 1180px;
      margin: 0 auto;
      overflow: hidden;
    }

    .img-bg .info .p-titl {
      margin: 82px 0 0 74px;
      font-size: 30px;
      color: #fcfdff;
    }

    .img-bg .info .activity {
      width: 506px;
      margin: 18px;
      line-height: 34px;
      font-size: 16px;
      color: #0053a5;
      text-align: center;
    }

    /*中间背景图片*/

    .content {
      width: 100%;
    }

    .mid-cnt {
      width: 1200px;
      margin: 0 auto;
    }

    .mid-cnt .tit {
      position: relative;
      height: 46px;
      border-bottom: 1px solid #d7d7d7;
      font-size: 16px;
      text-align: center;
    }

    .mid-cnt .tit span {
      position: relative;
      display: block;
      width: 82px;
      margin: 0 auto;
      line-height: 46px;
    }

    .mid-cnt .tit span:after {
      position: absolute;
      content: '';
      bottom: -2px;
      left: 13px;
      width: 58px;
      height: 4px;
      background-color: #ff0404;
    }

    .cnt-info {
      width: 1200px;
      margin: 16px auto;
    }
    .cnt-info .cnt-img{
      width: 278px;
      height: 246px;
      border: 1px solid #ccc;
      text-align: center;
      overflow: hidden;
      img{
        width: 278px;
        height: 246px;
      }
    }
    .cnt-info .cnt-wrds{
      width: 900px;
      height: 246px;
      line-height: 28px;
      overflow-y: auto;
    }
    .red {
      color: #ff0404;
    }

    .stores {
      margin-top: 22px;
    }
  }
</style>
