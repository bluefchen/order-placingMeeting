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
            <el-button class="btn-download fn-right" size="small" type="success"><i class="iconfont">&#xe642;</i> 政策投入
            </el-button>
          </div>         
        </div>
        <Table :stripe="false" :border="false" :tableTitle="tableTitle" :tableData="tableData">       
          <!-- 弹窗 -->
          <DialogPopup :visible="isShow" title="优惠政策详情" @visibleChange="visibleChange">
            <div slot="content" class="pop-cnt">
              <p class="vivo">vivo</p>
              <p class="p-ttl"><b>vivoX20系列,VIVOX09系列：</b></p>
              <p class="cnt-info">订购数量100以上打<span class="red">九折</span>，订购数量200以下打<span class="red">八折</span>，订购籽量满500打<span
                class="red">六折</span></p>
              <p class="p-ttl"><b>vivoXXX系列,VIVOOOOO系列：</b></p>
              <p class="cnt-info">订购数量100以上打<span class="red">九五</span>折，订购数量200以下打<span class="red">八五</span>折，订购籽量满500打<span
                class="red">六五</span>折</p>
            </div>
            <div slot="footer">
              <el-button type="success" @click="isShow = false">关闭</el-button>
            </div>
          </DialogPopup>
        </Table>
      </div>
    </div>
  </div>
</template>

<script>
  import InputWithSelect from '@/components/InputWithSelect';
  import Table from '@/components/Table';
  import Breadcrumb from '@/components/Breadcrumb';
  import DialogPopup from '@/components/DialogPopup';

  export default {
    name: 'PolicyManage',    
    created() {
    },
    data() {
      return {
        title: '优惠政策详情',
        //表格的数据
        isSelection: true,
        tableTitle: [{
          label: '序号',
          prop: 'orderNum',
          width: 106,        
        }, {
          label: '政策名称',
          prop: 'policyName',
          width: 360,
          render: function (h, params) {
            return h({
              template: '<el-button type="text" @click="openDetail(reslutList)" class="hover-btn">{{reslutList.policyName}}</el-button>',
              data: function () {
                return {
                  reslutList: params.row,
                }
              },
              methods: {
                openDetail(list){
                  this.isShow = true;
                }
              },
            })
          }
        }, {
          label: '政策机型',
          prop: 'policyModel',
          width: 176,
        }, {
          label: '政策制定日期',
          prop: 'policyDate',
          width: 166,
        },  {
          label: '制定人',
          prop: 'policyModelName',
          width: 128,
        }, {
          label: '制定状态',
          prop: 'state',
          width: 110,
        },{
          label: '操作',
          render: function (h, params) {
            return h({
              template: '<el-button type="text" @click="deleteInfo(reslutList)" class="delete-btn">删除</el-button>',
              data: function () {
                return {
                  reslutList: params.row
                }
              },
              methods: {
                deleteInfo(list){
                  console.log(list)
                }
              },
            })
          }
        }],
        tableData: [{
          orderNum: '手机',
          policyName: 'VIVO',
          policyModel: 'VIVO-X20',
          policyDate: '集采',
          policyModelName: 1890,
          state: 'Y'
        }],
        isShow: false
      }
    },
    methods: {
      search(obj) {
        console.log('参数：', obj);
      },     
      visibleChange(val) {
        this.isShow = val;
      }
    },
    components: {
      InputWithSelect,
      Table,
      Breadcrumb,
      DialogPopup
    }
  }
</script>

<style lang="less">
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
  .el-table--small td, .el-table--small th{
    padding: 5px 0;
  }
  .v_table .el-table, .v_table .el-table__expanded-cell{
    border: 1px solid #dcdcdc;
    border-bottom: 0;
  }
  .el-table__row .el-button--text{
    padding: 0;
    color: #606266;
    font-size: 12px;
    font-weight: normal;
  }
  .hover-btn:hover{
    color: #ff0000;
    text-decoration: underline;
  }
  /* 弹窗 */ 
  .pop-cnt{
    .vivo{
      width: 102px;
      height: 28px;
      margin-bottom: 16px;
      line-height: 28px;
      text-align: center;
      background-color: #ff0000;
      color: #fff;
      border-radius: 14px;
    }
    .p-ttl{
      margin: 0 0 6px 8px; 
    }
    .cnt-info{
      margin: 0 0 16px 40px;
    }
  }
  


</style>
