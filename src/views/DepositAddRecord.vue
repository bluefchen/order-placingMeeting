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
          <Breadcrumb :list="['首页', '机型管理', '机型维护']"/>
        </div>
      </div>

      <!-- 搜索 -->
      <div class="box-1200 search">
        <SearchInput :search="search"/>
      </div>
      
    </div>
  </div>
</template>

<script>
  import SearchInput from '@/components/SearchInput';
  import DeviceInfo from '@/components/DeviceInfo';
  import Table from '@/components/Table';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    name: 'DepositAddRecord',
    created() {
    },
    data() {
      return {
        isSelection: true,
        tableTitle: [{
          label: '终端品牌',
          prop: 'terminalBrand'
        }, {
          label: '终端型号',
          prop: 'terminalModel'
        }, {
          label: '产品类型',
          prop: 'prodType'
        }, {
          label: '终端价格',
          prop: 'terminalPrice'
        }, {
          label: '是否特种机型',
          prop: 'isSpecial',
          formatter: function(row, value){
            switch(row.isSpecial){
              case 'N':
                console.log(row, value)
                return "非特种机型";
                break;
              case 'Y':
                return '特种机型';
                break;
            }
          }
        }, {
          label: '上架数量',
          prop: 'count'
        }, {
          label: '状态',
          prop: 'type'
        }],
        tableData: [{
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'Y',
          count: 300,
          type: '上架'
        }, {
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'N',
          count: 300,
          type: '下架',
        }, {
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'Y',
          count: 300,
          type: '上架',
        }, {
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'N',
          count: 300,
          type: '下架',
        }, {
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'Y',
          count: 300,
          type: '上架',
        }, {
          terminalName: '手机',
          terminalBrand: 'VIVO',
          terminalModel: 'VIVO-X20',
          prodType: '集采',
          terminalPrice: 1890,
          isSpecial: 'N',
          count: 300,
          type: '下架',
        }],
      }
    },
    methods: {
      search(obj) {
        console.log('参数：', obj);
      }
    },
    components: {
      SearchInput,
      DeviceInfo,
      Table,
      Breadcrumb
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

  .my-location label {
    color: #aaa;
  }

  .location-p {
    display: inline-block;
  }

  .red {
    color: #f82134;
  }

  .green {
    color: #46b02e;
  }

  .search {
    margin: 10px auto;
  }

</style>
