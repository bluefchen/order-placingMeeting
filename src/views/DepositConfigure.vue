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
          <Breadcrumb :list="['定金管理', '定金配置']"/>
        </div>
      </div>
      
      <!-- 修改 -->
      <div class="provin box-1200">
        <p class="pro-left">当前省份： <span>江苏省</span></p>
        <div class="provin-edit">
          <div class="fn-clear" v-show="editshow">
            <p class="pro-mid fn-left">定金模式：<span>----</span></p>
            <el-button class="edit-btn fn-left" @click="edit()"><i class="iconfont">&#xe738;</i> 修改</el-button>
          </div>
          <div class="first-step" v-show="!editshow">
            <ul class="selections fn-clear">
              <label class="select-wrds fn-left">定金模式：</label>
              <div class="fn-left" v-show="step == 1 || step == 2 || step == 3">
                <li class="select-sp fn-left" :class="step == 1?'on':''" @click="selectMode(1)">全额付款</li>
                <li class="select-sp fn-left" :class="step == 2?'on':''" @click="selectMode(2)">定金</li>
                <li class="select-sp fn-left" :class="step == 3?'on':''" @click="selectMode(3)">诚意金</li>
              </div>
              <div class="qb fn-left" v-show="step == 4">
                <p class="fir-wrds fn-left">全额付款</p>
                <el-button class="edit-btn fn-left" @click="selectMode(1)"><i class="iconfont">&#xe738;</i> 修改</el-button>
              </div>
              <div class="dj fn-left" v-show="step == 5">
                <p class="fir-wrds fn-left">定金</p>
                <el-button class="edit-btn fn-left" @click="selectMode(2)"><i class="iconfont">&#xe738;</i> 修改</el-button>
              </div>
              <div class="cyj fn-left" v-show="step == 6">
                <p class="fir-wrds fn-left">诚意金</p>
                <el-button class="edit-btn fn-left" @click="selectMode(3)"><i class="iconfont">&#xe738;</i> 修改</el-button>
              </div>
            </ul>
            <div class="steps">
              <!-- 定金 -->
              <div class="second-step fn-clear" v-show="step == 2 || step == 5">
                <label class="select-wrds fn-left">定金比例配置：</label>
                <el-input class="fn-left" suffix-icon="el-icon-date" v-show="step == 2">
                </el-input>
                <p class="sec-done fn-left" v-show="step == 5">10%</p>
                <label class="warn-wrds fn-left">( 注：订单的定金比例在1%-100%之间。)</label>
              </div>
              <!-- 诚意金 -->
              <div class="third-step" v-show="step == 3 || step == 6">
                <div class="model-list-table">
                  <div class="order-titl fn-clear">
                    <TitlePlate class="fn-left" title="配置诚意金的订单列表"/>
                    <p class="warn-wrds fn-right">( 注：每个订单的诚意金金额至少为10000元 )</p>
                  </div>
                  <Table :stripe="false" :border="false" :tableTitle="tableTitle" :tableData="tableData" v-show="step == 3"/>
                  <Table :stripe="false" :border="false" :tableTitle="tableTitleDone" :tableData="tableDataDone" v-show="step == 6"/>
                  <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>                 
                </div>
              </div>
            </div>
            <div class="confirm-btn" v-show="step == 1 || step == 2 || step == 3">
              <el-button class="confirm" @click="confirm(4)" v-show="step == 1">确定</el-button>
              <el-button class="confirm" @click="confirm(5)" v-show="step == 2">确定</el-button>
              <el-button class="confirm" @click="confirm(6)" v-show="step == 3">确定</el-button>
            </div>           
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import TitlePlate from '@/components/TitlePlate';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';

export default {
  name: 'DepositConfigure',
  created() {
  },
  data() {
    return {
      step: 1,
      editshow: true,
      tableTitle: [{
        label: '零售商编码',
        prop: 'offerName',
        width: 200
      }, {
        label: '零售商名称',
        prop: 'brandName',
        width: 450,
      }, {
        label: '零售商类型',
        prop: 'offerModelName',
        width: 234,
      }, {
        label: '诚意金金额',
        prop: 'salePrice',
        render: function (h, params) {
          return h({
            template: '<el-input prefix-icon="el-icon-search" v-model="salePrice"></el-input>',
            data: function () {
              return {
                salePrice: params.row.salePrice
              }
            }
          })
        }
      }],
      tableData: [{

      }],
      tableTitleDone: [{
        label: '零售商编码',
        prop: 'offerName',
        width: 200
      }, {
        label: '零售商名称',
        prop: 'brandName',
        width: 450,
      }, {
        label: '零售商类型',
        prop: 'offerModelName',
        width: 234,
      }, {
        label: '诚意金金额',
        prop: 'salePrice',
        render: function (h, params) {
          return h({
            template: '<p class="red">¥{{salePrice}}</p>',
            data: function () {
              return {
                salePrice: params.row.salePrice
              }
            }
          })
        }
      }],
      tableDataDone: [],
      total: 0, //列表总数
      pageSize: 10, //每页展示条数
      currentPage: 1 //当前页
    }
  },
  methods: {
    edit() {
      this.editshow = !this.editshow;
    },
    selectMode(index){
      this.step = index;
    },
    pageChanged(currentPage) {
      console.log('当前页：', currentPage);
    },
    confirm(index){
      this.step = index;
    },
    pageChanged(curPage) {
      this.queryOpMeetingOfferList(curPage);
    }
  },
  components: {
    Breadcrumb,
    TitlePlate,
    Table,
    Pagination
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

.v_import {
  background-color: #fcfcfc;
  border: 1px solid #e8e8e8;
}
.red{
  color: #e52941;
}
.provin{
  margin: 28px auto;
  font-size: 14px;
  .pro-left{
    position: relative;
    width: 215px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    background-color: #e4263e;
    color: #fff;
  }
}
.provin-edit{
  width: 100%;
  border: 1px solid #e8e8e8;
  .pro-mid{
    width: 354px;
    height: 70px;
    line-height: 70px;
    margin-left: 109px;
  }
  .edit-btn{
    height: 25px;
    padding: 0 12px;
    margin: 22px 0 0 0;
    line-height: 24px;
    color: #e52840;
    border: 1px solid #e52840;
    border-radius: 3px;
    &:hover{
      background-color: #fff;
    }
  }
}
.first-step{
  .confirm-btn{
    width: 100%;
    height: 54px;
    background-color: #fafafa;
    border-top: 1px solid #e8e8e8;
    text-align: center;
    .confirm{
      height: 34px;
      padding: 0 35px;
      line-height: 34px;
      color: #fff;
      margin-top: 10px;
      background-color: #e52840;
      border:0;
    }
  }
  .fir-wrds{
    width: 250px;
    line-height: 34px;
    margin-left: 40px;
  }
  .edit-btn{
    margin-top: 5px;
  }
}
.steps{
  min-height: 100px;
  padding: 0 15px;
}
.select-wrds{
  width: 180px;
  line-height: 34px;
  text-align: right;
}
.selections{
  margin: 20px 0 0 15px;
  font-size: 14px;
  color: #151515; 
  .select-sp{
    width: 114px;
    height: 32px;
    margin-left: 14px;
    line-height: 32px;
    border: 1px solid #b7b7b7;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    &.on{
      border: 1px solid #f01d1d;
      background: url('../assets/images/selected-icon.png') right bottom no-repeat;
      color: #f01d1d;
    }
  }
}
.bottom{
  margin-top: 26px;
  border-top: 1px solid #dcdcdc;
  padding-top: 25px;
  text-align: center;
  .button{
    height: 34px;
    padding: 0 30px;
    border: 0;
    font-size: 14px;
    background-color: #f01919;
    border-radius: 3px;
    color: #fff;
  }
}

.second-step {
  border-top: 1px dashed #e1e1e1;
  padding-top: 20px;
  margin-top: 20px;
  .el-input{
    width: 374px;
  }
  .el-input__inner{
    height: 32px;
    line-height: 32px;
    color: #f01d1d;
    text-align: center;
    border-radius: 0;
    &:focus{
      border: 1px solid #ff2222;
    }
    &:hover{
      border: 1px solid #ff2222;
    }
  }
  .el-icon-date:before{
    content: '\0025';
  }
  .el-input__icon{
    line-height: 32px;
    color: #000;
  } 
  .sec-done{
    width: 108px;
    color: #e52941;
    line-height: 34px;
    margin-left: 40px;
    font-weight: 700;
  }
}
.warn-wrds{
  line-height: 34px;
  color: #fa0000;
  margin-left: 20px;
  font-size: 12px;
}
/* 第三步 */
.third-step{
  border-top: 1px dashed #e1e1e1;
  padding-top: 20px;
  margin-top: 10px;
  .order-titl{
    margin-bottom: 5px;
    .title{
      font-size: 14px;
      line-height: 20px;
    }
  }
  .warn-wrds{
    line-height: 20px;
  }
  .v_pagination .el-pagination{
    margin-bottom: 20px;
  }
  .el-table__empty-block{
    width: calc(100% - 2px) !important;
    border: 1px solid #e6e6e6;
    border-top:0;
  }
  .el-input{
    width: 128px;
    margin:0 auto;
  }
  .el-input--prefix .el-input__inner{
    width: 128px;
    height: 23px;
    text-align: center;
    border-radius: 0;
    color: #ff2222;
    border: 1px solid #b3b3b3;
    &:focus{
      border: 1px solid #ff2222;
    }
    &:hover{
      border: 1px solid #ff2222;
    }
  }
  .el-table__header{
    border: 1px solid #dcdcdc;
    border-right:0;
    th{
      border-right: 1px solid #d1d1d1;
    }
  }
  .el-table--small td, .el-table--small th{
    padding: 4px 0;
  }
  .el-input__icon{
    line-height: 24px;
    color: #ff2222;
  }
  .el-table__body{
    border: 1px solid #dcdcdc;
    border-right:0;
    border-top:0;
    td{
      border-right: 1px solid #d1d1d1;
      .el-icon-search:before{
        content:'\00A5';
      }
    }  
  }
  .el-table__footer-wrapper, .el-table__header-wrapper{
    width: calc(100% - 2px);
  }
  .el-table__body-wrapper{
    width: calc(100% - 2px);
  }
}

</style>
