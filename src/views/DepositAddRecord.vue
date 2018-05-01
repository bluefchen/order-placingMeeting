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
          <Breadcrumb :list="['定金管理', '定金补录']"/>
        </div>
      </div>

      <!-- 搜索 -->
      <div class="box-1200 search">
        <SearchInput :search="search"/>
        <a href="javascript:;" class="category-more fn-left" @click="openMore()" v-show="!openshow">更多条件 <i class="iconfont">&#xe608;</i></a>
        <a href="javascript:;" class="category-more fn-left" @click="openMore()" v-show="openshow">收起条件 <i class="iconfont">&#xe607;</i></a>
      </div>
      
      <!-- 条件搜索 -->
      <div class="condition-search box-1200" v-show="openshow">
        <div class="condition-iterm wid30">
          <label class="label-wrds">零售商名称：</label>
          <input type="text" class="condition-input">
        </div>
        <div class="condition-iterm wid40">
          <label class="label-wrds">订购起止日期：</label>
          <el-date-picker
            v-model="value4"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="condition-iterm wid30">
           <button class="btns">查询</button> 
        </div>
      </div>
      
      <div class="tabs-list box-1200">
        <div class="result-header">
          <TitlePlate title="配置定金的订单列表"/>         
          <button class="btns"><i class="iconfont">&#xe6a8;</i> 导入</button>         
        </div>
        <table width="100%" cellspacing="0" cellpadding="0" class="table">
          <thead>  
            <tr>
              <th width="8%">订单号</th>
              <th width="9%">零售商</th>
              <th width="7%">终端编码</th>
              <th width="12%">终端名称</th>
              <th width="7%">终端品牌</th>
              <th width="8%">终端型号</th>
              <th width="7%">产品类型</th>
              <th width="6%">订购数量</th>
              <th width="10%">供货商</th>
              <th width="6%">货款金额</th>
              <th width="8%">定金比例配置</th>    
              <th width="6%">定金金额</th>
              <th>状态</th>           
            </tr>
          </thead>
          <tbody>
            <tr>            
              <td><router-link to="orderFormDetail" class="red">11020300001</router-link></td>
              <td><p class="overflow">美颜拍照手机</p></td>
              <td><p>美颜拍照</p></td>
              <td><p class="overflow">VIVO-X20全面屏 美颜拍照手机美颜拍照手机</p></td>
              <td><p>VIVO</p></td>
              <td><p>VIVO-X20</p></td>
              <td><p>集采</p></td>
              <td><p>￥1890</p></td>
              <td><p class="overflow">美颜拍照手机美颜拍照手机美颜拍照手机</p></td>
              <td><p>1890</p></td>
              <td><p>1%</p></td>
              <td><p class="red">1890</p></td>
              <td><p>已付款</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchInput from '@/components/SearchInput';
  import DeviceInfo from '@/components/DeviceInfo';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    name: 'DepositAddRecord',
    created() {
    },
    data() {
      return {
        isSelection: true,
        openshow: false,
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
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value5: ''
      }
    },
    methods: {
      search(obj) {
        console.log('参数：', obj);
      },
      openMore(){
        this.openshow = !this.openshow;
      }
    },
    components: {
      SearchInput,
      DeviceInfo,
      Table,
      TitlePlate,
      Breadcrumb
    }
  }
</script>

<style lang="less">
  @import "../assets/css/mixin";

  /*中间背景图片*/
  .img-bg {
    width: 100%;
    height: 200px;
    background: #e4273f;
    .info {
      width: 1036px;
      height: 200px;
      margin: 0 auto;
      background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat right bottom;
      overflow: hidden;
      .p-titl {
        margin: 62px 0 0 0;
        font-size: 22px;
        color: #fcfdff;
      }
      .activity {
        width: 306px;
        margin: 10px 0 0 0;
        line-height: 18px;
        font-size: 12px;
        color: #fcfdff;
        text-align: center;
      }
    }
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
    position: relative;
    margin: 10px auto;
    .category-more{
      position: absolute;
      top: 11px;
      left: 500px;
      color: #151515;
      text-decoration: none;
    }
  }
  
  /* 条件搜索 */
  .condition-search{
    display: flex;
    height: 72px;
    margin: 10px auto  14px;
    border: 1px solid #dfdfdf;
    .condition-iterm{
      position: relative;
      margin: 20px 30px 0 0;
      .label-wrds{
        position: absolute;
        top: 0;
        left: 0;
        width: 110px;
        line-height: 32px;
        font-size: 14px;
        text-align: right;
      }
      .condition-input{
        width: calc(100% - 20px - 110px);
        height: 24px;
        padding: 3px 10px;
        margin-left: 110px; 
        border: 1px solid #e5e5e5;
      }
      .btns{
        left: 15px;
        line-height: 31px;
        padding: 0 30px;
      }
    }
  }
  .search-cnt .search[data-v-2eed8ffc]{
    margin-top:0;
  }
  .el-range-editor.el-input__inner{
    margin-left: 110px;
    height: 32px;
    line-height: 30px;
    border-radius: 0;
  }
  .el-date-editor .el-range__icon{
    line-height: 27px;
  }
  .el-date-editor .el-range-separator{
    line-height: 27px;
  }
  .el-date-editor .el-range__close-icon{
    line-height: 27px;
  }
  .wid30{
    width: 30%;
  }
  .wid40{
    width: 40%;
  }

  .tabs-list{
    margin: 0 auto;
    padding: 0 0 20px;
    .result-header {
      position: relative;
      height: 28px;
      margin: 0 0 8px;
      line-height: 28px;
      .result-info {
        position: absolute;
        top: 0;
        right: 0;

        > span {
          color: #f82134;
        }

        > b {
          margin: 0 3px;
          color: #f82134;
          font-size: 14px;
        }
      }      
    }
  }
  
  .btns{
    position: absolute;
    top: 0;
    right:0;
    padding: 0 20px;
    border:0;
    background-color: #fa0000;
    color:#fff;
    font-size: 12px;
    border-radius: 3px;
    line-height: 28px;
    &:hover{
      background-color: #e20606;
    }
  }

  .table{
    border: 1px solid #e3e3e3;
    table-layout:fixed;
    word-break:break-all;
    thead tr{
      height: 32px;
      background-color: #efefef;
      border-bottom: 1px solid #d1d1d1;
      color: #131212;
      th{
        text-align: center;
        border-right: 1px solid #d1d1d1;
      }
    }
    tbody tr{
      height: 34px;
      border-bottom: 1px solid #e3e3e3;
      &:nth-of-type(2n){
        background-color: #fcfcfc;
      }
      td{
        text-align: center;
        border-right: 1px solid #e3e3e3;
        .overflow{
          margin: 0 auto;
          .truncate(90%);
        }
        i.iconfont{
          font-size: 18px;
        }
        input{
          width: 80%;
          height: 20px;
          border: 1px solid #b3b3b3;
          text-align: center;
          color: #f02b2b;
        }
      }
    }
  }
</style>
