<template>
  <div>
    <!-- 中间背景图片 (首页和其他页面不一样)-->
    <div class="img-bg">
      <div class="info">
        <p class="p-titl">2018夏季VIVO品牌新品订货会</p>
        <div class="activity">
          <p>活动日期：2018/04/10-2018/04/11</p>
          <p>活动地址：XXX市XXXXXXXXX街XXX路XX号</p>
        </div>
      </div>
    </div>
    <!-- 中间背景图片 -->
    <!-- 内容 -->
    <div class="content">
      <div class="mid-cnt">
        <p class="tit"><span>订货会介绍</span></p>
        <div class="cnt-info">
          <label>4月22日，中国电信股份有限公司XX分公司2017春季订货会在石家庄隆重召开。本次盛会由中国电信XX分公司举办，22家国内知名品牌手机厂商和全省上百家手机分销商、零售商代表等2000余人均到场参观交流、洽商合作，盛况空前。</label>
          <label>4本次订货会突出两大主题： <span class="red">全网通天下，生态赢未来。</span></label>
          <label><span class="red">全网通天下，销售更无忧</span></label>
          <label>XX电信传承创业、创新、创造的企业文化，推出六模全网通，共建互联网生态。助力实体经济振兴和产业链发展壮大，构建良好的终端产业生态。</label>
          <label>XX电信作为省内通信行业翘楚，本次订货会吸引了华为、三星、OPPO、VIVO、酷派、金立、荣耀、小米、魅族等二十二家知名厂商参展，各厂家纷纷携多款全网通手机终端亮相。终端价位从高到低覆盖完全，周边产品和业务选择多样化，手机终端的竞争力扩展至农村，实现了产业链的多元发展。</label>
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
      this.queryOpmSupplierList();
      this.queryOpmRetailerList();
    },
    data() {
      return {
        supplierList: [], //关联供应商列表
        retailerList: [], //关联零售商列表
        pageSize: 10, //每页展示条数
        activeName: '参会供货商',
        tabsList: [{
          tabLabel: '参会供货商',
          tableTitle: [{
            label: '省份',
            prop: 'province',
            width: 140
          }, {
            label: '地市',
            prop: 'city',
            width: 140
          }, {
            label: '供应商名称',
            prop: 'supplierName'
          }, {
            label: '供应商类型',
            prop: 'supplierTypeName',
            width: 120
          }, {
            label: '联系人',
            prop: 'linkMan',
            width: 120
          }, {
            label: '联系电话',
            prop: 'linkNbr',
            width: 120
          }, {
            label: '公司电话',
            prop: 'supplierPhone',
            width: 120
          }, {
            label: '公司传真',
            prop: 'supplierFax',
            width: 120
          }],
          tableData: [],
          pageSize: 0,
          total: 0,
          pageChanged: this.queryOpmSupplierList
        }, {
          tabLabel: '参会零售商',
          tableTitle: [{
            label: '省份',
            prop: 'province',
            width: 140
          }, {
            label: '地市',
            prop: 'city',
            width: 140
          }, {
            label: '零售商名称',
            prop: 'retailerName'
          }, {
            label: '零售商类型',
            prop: 'retailerTypeName',
            width: 120
          }, {
            label: '联系人',
            prop: 'linkMan',
            width: 120
          }, {
            label: '联系电话',
            prop: 'linkNbr',
            width: 120
          }, {
            label: '公司电话',
            prop: 'retailerPhone',
            width: 120
          }, {
            label: '公司传真',
            prop: 'retailerFax',
            width: 120
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
          opMeetingId: '订货会ID',
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
          opMeetingId: '订货会ID',
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
  /*中间背景图片*/
  .img-bg {
    width: 100%;
    height: 341px;
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
    margin: 62px 0 0 74px;
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
    width: 1084px;
    margin: 16px auto;
  }

  .cnt-info label {
    display: block;
    line-height: 28px;
    text-indent: 32px;
    font-size: 14px;
  }

  .red {
    color: #ff0404;
  }

  .stores {
    margin-top: 42px;
  }
</style>
