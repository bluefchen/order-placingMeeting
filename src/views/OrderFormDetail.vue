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
          <Breadcrumb :list="['订单详情']"/>
        </div>
      </div>
      
      <div class="orderInfo">
        <div class="tel-model">订单信息</div>
          <ul class="info-list">
            <li class="info-list-li">
              <p class="p-tit">买家信息：</p>
              <div class="info-detail">  
                <p class="detail-p wid33"><span>零售商名称：</span>零售商AAAAAAAAA</p>
                    <p class="detail-p wid33"><span>联系人：</span>XXXX</p>
                <p class="detail-p wid33"><span>联系电话：</span>180123456778</p>        
              </div>
              <div class="info-detail">
                <p class="detail-p wid33"><span>零售商类型：</span>散户</p>
                <p class="detail-p wid33"><span>所属省分：</span>江苏</p>
              </div>
            </li>
            <li class="info-list-li">                                               
              <p class="p-tit">卖家信息：</p>
              <div class="info-detail">                                                     
                    <p class="detail-p wid33"><span>供货商名称：</span>零售商CCCCCCC</p>
                <p class="detail-p wid33"><span>联系电话：</span>180123411111</p>
                <p class="detail-p wid33"><span>联系人：</span>XXXX</p>       
              </div>
              <div class="info-detail">
                <p class="detail-p wid33"><span>供货商类型：</span>散户</p>
                <p class="detail-p wid33"><span>所属省分：</span>江苏</p>
              </div>
            </li>
            <li class="info-list-li">       
              <p class="p-tit">订单信息：</p>
              <div class="info-detail">                                                     
                    <p class="detail-p wid24"><span>订单编号：</span>1000000010</p>
                <p class="detail-p wid24"><span>创建时间：</span>2018-04-06 15:02:46</p>
                <p class="detail-p wid24"><span>付款时间：</span></p>
                <p class="detail-p wid24"><span>提货时间：</span></p>        
              </div>
              <table width="100%" cellspacing="0" cellpadding="0" class="table">
                <thead> 
                  <tr>
                    <th width="30%">终端名称</th>
                    <th width="18%">终端品牌</th>
                    <th width="18%">终端型号</th>
                    <th width="15%">终端价格</th>
                    <th>订购数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <DeviceInfo/>
                    </td>
                    <td><p class="overflow">VIVO</p></td>
                    <td>VIVO-X20</td>
                    <td>集采</td>
                    <td>￥1890</td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import DeviceInfo from '@/components/DeviceInfo';

export default {
  name: 'OrderFormDetail',
  created() {
  },
  data() {
    return {
      active: 1,
      editshow: true
    }
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 1;
    },
    edit() {
      this.editshow = !this.editshow;
    },
    reset(){
      this.active = 1;
    }
  },
  components: {
    Breadcrumb,
    DeviceInfo
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
  /*height: 70px;*/
  /*margin: 20px auto;*/
  background-color: #fcfcfc;
  border: 1px solid #e8e8e8;
  /*line-height: 70px;*/
}
.red{
  color: #e52941;
}
.orderInfo{
  width: 1154px;
  margin: 16px auto 0;
  border: 1px solid #cecece;  
}

.tel-model{
  height: 36px;
  line-height: 36px;
  background: url('../assets/images/red-line.png') no-repeat 10px center;
  padding-left: 20px;
  font-size: 18px;
  color: #000;
  font-weight: 800;
  background-color: #f2f1f1;
}
.info-list{
  padding: 15px;
}
.info-list-li{
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid #d6d6d6;
  color: #2b2020;
  font-size: 12px;
}
.info-list-li:last-child{
  margin-bottom: 0;
  border-bottom: 0;
}
.info-list-li .p-tit{
  color: #2b2020;
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: 800;
}
.info-detail{
  margin-left: 58px;
}
.detail-p{
  display: inline-block;
  line-height: 25px;
}
.wid33{
  width: 33%;
}
.wid24{
  width: 24%;
}

.table{
  margin-top: 10px;
  border: 1px solid #e0e0e0;
}
.table thead tr{
  height: 36px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
  color: #131212;
}
.table tbody tr{
  height: 90px;
  border-bottom: 1px solid #dcdcdc;
}
.table thead tr th{
  text-align: center;
}
.table tbody tr td{
  text-align: center;
  .overflow{
    margin: 0 auto;
    .truncate(90%);
  }
}
.device-wrap{
  margin-left: 10px;
}

</style>
