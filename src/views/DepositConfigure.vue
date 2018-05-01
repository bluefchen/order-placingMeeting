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
        <p class="pro-left fn-left">当前省份： 江苏省</p>
        <p class="pro-mid fn-left">定金模式：----</p>
        <button class="edit-btn fn-left"><i class="iconfont">&#xe738;</i> 修改</button>
      </div>
      
      <div class="provin-edit">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="选择定金模式"></el-step>
          <el-step title="配置定金"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
       
        <!-- 第一步 -->
        <div class="first-step" v-show="active == 1">
          <ul class="selections fn-clear">
            <label class="select-wrds fn-left">选择定金模式：</label>
            <li class="select-sp fn-left">全额付款</li>
            <li class="select-sp on fn-left">定金</li>
            <li class="select-sp fn-left">诚意金</li>
          </ul>
          <div class="bottom">
            <button class="button" @click="next">下一步</button>
          </div>
        </div>
        
        <!-- 第二步 -->
        <div class="second-step" v-show="active == 2">
          <div class="info">
            <p class="fn-left">省份：<span>江苏</span></p>
            <p class="fn-right">选择定金模式：<span class="red">定金</span></p>
          </div>
          <div class="tabs-list">
            <div class="order-titl fn-clear">
              <div class="tel-model fn-left">配置定金的订单列表</div>
              <div class="result-wrds fn-right"> <span class="red">校验结果：</span>Excel中共有<b class="red">100</b>条数据，其中<b class="red">98</b>条校验通过有效，<b class="red">2</b>条校验不通过无效，点击提交可以导入正确信息。</div>
            </div>
            <table width="100%" cellspacing="0" cellpadding="0" class="table">
              <thead>  
                <tr>
                  <th width="8%">订单号</th>
                  <th width="8%">零售商</th>
                  <th width="8%">终端编码</th>
                  <th width="15%">终端名称</th>
                  <th width="8%">终端品牌</th>
                  <th width="10%">终端型号</th>
                  <th width="7%">产品类型</th>
                  <th width="7%">订购数量</th>
                  <th width="11%">供货商</th>
                  <th width="7%">货款金额</th>
                  <th>定金比例配置</th>           
                </tr>
              </thead>
              <tbody>
                <tr>            
                  <td><a href="" class="red">11020300001</a></td>
                  <td>11020300001</td>
                  <td>11020300001</td>
                  <td><p class="overflow-handle">VIVO-X20全面屏 美颜拍照手机</p></td>
                  <td>VIVO</td>
                  <td>VIVO-X20</td>
                  <td>集采</td>
                  <td>￥1890</td>
                  <td><p class="overflow-handle">美颜拍照手机</p></td>
                  <td>1890</td>
                  <td><p><input type="text" value="1%"></p></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="bottom-btns">
            <button class="confirm-btn" @click="next">确定</button>
            <button class="reset-btn">重置</button>
          </div>
        </div>

        <!-- 第三步 -->
        <div class="third-step" v-show="active == 3">
          <div class="success fn-clear">
            <img src="../assets/images/icon-success.png" class="suc-img fn-left">
            <div class="wrds fn-right">
              <p class="p1">订单的定金配置完成！</p> 
              <p class="p2">等待订货会进行或结束时到<span>定金管理</span>》<a href="" class="red">定金补录</a>查看结果。</p>
              <button class="button" @click="next">继续定金配置</button>
            </div>
          </div>        
        </div>
      </div>

     <!--  <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps> -->

    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import Import from '@/components/Import';

export default {
  name: 'DepositConfigure',
  created() {
  },
  data() {
    return {
      active: 1
    }
  },
  methods: {
    search(obj) {
      console.log('参数：', obj);
    },
    next() {
      if (this.active++ > 2) this.active = 1;
    }
  },
  components: {
    Breadcrumb,
    Import
  }
}
</script>

<style scoped lang="less">
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
  /*height: 70px;*/
  /*margin: 20px auto;*/
  background-color: #fcfcfc;
  border: 1px solid #e8e8e8;
  /*line-height: 70px;*/
}

.provin{
  height: 70px;
  margin: 50px auto;
  line-height: 70px;
  border: 1px solid #e8e8e8;
  font-size: 14px;
  overflow: hidden;
  .pro-left{
    position: relative;
    width: 212px;
    text-indent: 34px;
    border-right: 1px solid #e8e8e8;
    background-color: #fcfcfc;
    &:after{
      position: absolute;
      content: '';
      top: 27px;
      right: -10px;
      width: 10px;
      height: 15px;
      background: url('../assets/images/arrow-right.png') no-repeat;
    }
  }
  .pro-mid{
    margin-left: 37px;
  }
  .edit-btn{
    height: 25px;
    padding: 0 12px;
    margin: 22px 0 0 140px;
    line-height: 25px;
    color: #e52840;
    border: 1px solid #e52840;
    border-radius: 3px;
  }
}
.provin-edit{
  width: 100%;
  padding-bottom: 50px;
  .el-steps--horizontal{
    margin: 30px auto;
  } 
  .el-step__title{
    font-size: 14px;
    &.is-success{
      color: #e52941;
    }
  }
}

.red{
  color: #e52941;
}

.selections{
  width: 496px;
  margin: 60px auto 42px;
  font-size: 14px;
  color: #151515;
  .select-wrds{
    line-height: 34px;
  }
  .select-sp{
    width: 114px;
    height: 32px;
    margin-left: 14px;
    line-height: 32px;
    border: 1px solid #b7b7b7;
    text-align: center;
    border-radius: 3px;
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


/* 第二步 */
.second-step {
  .info{
    width: 1154px;
    height: 38px;
    margin: 0 auto;
    border: 1px solid #e8e8e8;
    background-color: #fcfcfc;
    line-height: 38px;
    p{
      width: calc(50% - 94px);
      margin-left: 94px;
    }
  }
  .tabs-list{
    width: 1118px;
    margin: 0 auto;
    padding: 12px 18px 20px;
    border: 1px solid #e8e8e8;
    border-top:0;
    .order-titl{
      height: 28px;
      margin: 0 0 8px;
      line-height: 28px;
      .tel-model{
        min-width: 5px;
        min-height: 20px;
        background: url('../assets/images/red-line.png') no-repeat 0 center;
        padding-left: 10px;
        font-size: 18px;
        color: #000;
        font-weight: 800;
      }
      .result-wrds b{
        font-size: 14px;
        margin: 0 3px;
      }
    }
  }
}

.table{
  border: 1px solid #e3e3e3;
}
.table thead tr{
  height: 32px;
  background-color: #efefef;
  border-bottom: 1px solid #d1d1d1;
  color: #131212;
}
.table thead tr th{
  text-align: center;
  border-right: 1px solid #d1d1d1;
}
.table tbody tr{
  height: 34px;
  border-bottom: 1px solid #e3e3e3;
}
.table tbody tr td{
  text-align: center;
  border-right: 1px solid #e3e3e3;
}
.table tbody tr:nth-of-type(2n){
  background-color: #fcfcfc;
}
.table td i.iconfont{
  font-size: 18px;
}
.table tbody tr td input{
  width: 80%;
  height: 20px;
  border: 1px solid #b3b3b3;
  text-align: center;
  color: #f02b2b;
}

/*底部按钮*/
.bottom-btns{
  margin-top: 20px;
  text-align: center;
  button{
    height: 34px;
    padding: 0 32px;
    margin-right: 32px;
    background-color: #f01919;
    line-height: 34px;
    border: 0;
    font-size: 14px;
    color: #fff;
    border-radius: 3px;
    &.grey{
      background-color: #cecece;
      color: #9d9d9d;
    }
  }
  .reset-btn{
    margin-right: 0;
  }
}

/* 第三步 */
.third-step{
  width: 1028px;
  height: 168px;
  margin: 98px auto;
  border: 1px solid #e4f0e7;
  background-color: #f5fff8;
  .success{
    width: 450px;
    margin: 16px auto 0;
    .suc-img{
      margin-right: 16px;
    }
    .wrds{
      .p1{
        margin: 20px 0 14px 0;
        font-size: 16px;
      }
      .p2{
        margin: 0 0 20px 0;
        font-size: 12px;
        span{
          margin-left: 6px;
        }
        a{
          margin-left: 6px;
          margin-right: 4px;
          text-decoration: underline;
        }
      }
    }
    .button{
      height: 34px;
      padding: 0 10px;
      border: 0;
      font-size: 14px;
      background-color: #f01919;
      border-radius: 3px;
      color: #fff;
    }
  }

}

</style>
