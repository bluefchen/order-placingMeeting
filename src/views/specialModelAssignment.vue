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
  <!-- 中间背景图片 -->
  
  <div class="content">
    <!-- 我的位置 -->
    <div class="my-location">
      <div class="location">
        <label>我的位置： </label>
        <p class="location-p">机型管理  > <span class="red">特种机型分配</span></p>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="search-cnt fn-clear">
      <div class="search fn-left">
        <input type="text" class="search-input" placeholder="输入终端名称搜索">       
      </div>
      <button class="search-btn fn-left">搜 索</button>
    </div>

    <!-- 更多筛选（机型管理） -->
    <div class="queries-list">
            <p class="queries-title">所有分类 > <span class="checked-query">类别：手机<i class="iconfont">&#xe633;</i></span><span class="checked-query">品牌：中兴<i class="iconfont">&#xe633;</i></span><a href="javascript:;" class="category-more fn-right">更多筛选 <i class="iconfont">&#xe608;</i></a></p>
            <div class="queries-category fn-clear">
                <span class="category-label fn-left">终端状态：</span>
                <div class="category-list fn-left">
                    <span class="category-item">上架</span>
                    <span class="category-item">下架</span>
                </div>
            </div>
            <div class="queries-category fn-clear">
                <span class="category-label fn-left">是否特种机型：</span>
                <div class="category-list fn-left">
                    <span class="category-item">是</span>
                    <span class="category-item">否</span>
                </div>
            </div>
            <div class="queries-category fn-clear">
                <span class="category-label fn-left">终端品牌：</span>
                <div class="category-list fn-left" ng-class="{fold: $ctrl.isFoldBrand}">
                    <span class="category-item hover">苹果</span>
                    <span class="category-item">三星</span>
                    <span class="category-item">华为</span>
                    <span class="category-item">酷派</span>
                    <span class="category-item">中兴</span>
                    <span class="category-item">黑莓</span>
                    <span class="category-item">苹果</span>
                    <span class="category-item">三星</span>
                    <span class="category-item">华为</span>
                    <span class="category-item">酷派</span>
                    <span class="category-item">中兴</span>
                    <span class="category-item">黑莓</span>
                    <span class="category-item">苹果</span>
                    <span class="category-item">三星</span>
                    <span class="category-item">华为</span>
                    <span class="category-item">酷派</span>
                    <span class="category-item">中兴</span>
                    <span class="category-item">黑莓</span>
                </div>
                <a href="javascript:;" class="category-more fn-right">更多 <i class="iconfont">&#xe608;</i></a>
                <a href="javascript:;" class="category-more fn-right">收起 <i class="iconfont">&#xe607;</i></a>
            </div>
            <div class="queries-category fn-clear">
                <span class="category-label fn-left">终端型号：</span>
                <div class="category-list fn-left" ng-class="{fold: $ctrl.isFoldModel}">
                    <span class="category-item">Iphone 5s</span>
                    <span class="category-item">Iphone 6</span>
                    <span class="category-item">Iphone 6s</span>
                    <span class="category-item">Iphone 6plus</span>
                    <span class="category-item">Iphone 7s</span>
                </div>
                <a href="javascript:;" class="category-more fn-right">更多 <i class="iconfont">&#xe608;</i></a>
                <a href="javascript:;" class="category-more fn-right">收起 <i class="iconfont">&#xe607;</i></a>
            </div>
        </div>

    <div class="tabs-list">
      <div class="order-titl fn-clear">
        <div class="tel-model fn-left">特种机型分配量列表</div>
        <div class="buttons fn-right">
          <button class="btns"><i class="iconfont">&#xe6a8;</i> 导入机型</button>
          <button class="btns"><i class="iconfont">&#xe610;</i> 导入删除机型</button>
        </div>
      </div>
      <table width="100%" cellspacing="0" cellpadding="0" class="table">
        <thead>    
          <tr>
            <th width="22%">终端名称</th>
            <th width="12%">终端品牌</th>
            <th width="12%">终端型号</th>
            <th width="9%">终端类型</th>
            <th width="12%">供货商</th>
            <th width="8%">提货价</th>
            <th width="8%">分配省份</th>
            <th>分配量（台）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="td-first">             
              <p class="p-img"><img src="@/assets/images/telephone1.jpg"></p>
              <p class="tel-info">
                <a href="" class="tel-href overflow-handle">VIVO-X20全面屏 美颜拍照手机</a>
                <label>编码：11020300001</label>
                <label class="tags">
                  <!-- 社采或者集采 -->
                  <span class="sc">社采</span>
                  <!-- <span class="jc">集采</span> -->
                  <span class="mj">满减
                    <label class="small-pop">
                      <label>满<b class="red">10000</b>减<b class="red">200</b></label>
                      <label>满<b class="red">20000</b>减<b class="red">400</b></label>
                    </label>
                  </span>
                  <span class="spec">特</span>                 
                </label>    
              </p>            
            </td>
            <td>VIVO</td>
            <td>VIVO-X20</td>
            <td>集采</td>
            <td>￥1890</td>
            <td><i class="iconfont red">&#xe63f;</i></td>
            <td>300</td>
            <td><b class="red">200</b></td>
          </tr>
          <tr>            
            <td class="td-first">             
              <p class="p-img"><img src="@/assets/images/telephone2.jpg"></p>
              <p class="tel-info">
                <a href="" class="tel-href overflow-handle">VIVO-X20全面屏 美颜拍照手机</a>
                <label>编码：11020300001</label>
                <label class="tags">
                  <!-- 社采或者集采 -->
                  <span class="jc">集采</span>
                  <span class="mj">满减
                    <label class="small-pop">
                      <label>满<b class="red">10000</b>减<b class="red">200</b></label>
                      <label>满<b class="red">20000</b>减<b class="red">400</b></label>
                    </label>
                  </span>
                  <span class="spec">特</span>                 
                </label>  
              </p>              
            </td>
            <td>VIVO</td>
            <td>VIVO-X20</td>
            <td>集采</td>
            <td>￥1890</td>
            <td><i class="iconfont red">&#xe63f;</i></td>
            <td>300</td>
            <td><b class="red">200</b></td>
          </tr>
          <tr>
            <td class="td-first">             
              <p class="p-img"><img src="@/assets/images/telephone3.jpg"></p>
              <p class="tel-info">
                <a href="" class="tel-href overflow-handle">VIVO-X20全面屏 美颜拍照手机</a>
                <label>编码：11020300001</label>
                <label class="tags">
                  <!-- 社采或者集采 -->
                  <span class="mj">满减
                    <label class="small-pop">
                      <label>满<b class="red">10000</b>减<b class="red">200</b></label>
                      <label>满<b class="red">20000</b>减<b class="red">400</b></label>
                    </label>
                  </span>
                  <span class="spec">特</span>                 
                </label>  
              </p>              
            </td>
            <td>VIVO</td>
            <td>VIVO-X20</td>
            <td>集采</td>
            <td>￥1890</td>
            <td><i class="iconfont red">&#xe63f;</i></td>
            <td>上架</td>
            <td><b class="red">200</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'specialModelAssignment',
    created() {

    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style scoped lang="less">
  /*顶部*/
.toper{
  width: 100%;
  border-bottom: 2px solid #ff0404;
}
.top-header{
  width: 1180px;
  height: 36px;
  margin: 0 auto;
  line-height: 36px;
}
.top-header img{
  margin: 5px 130px 0 0;
}
.iterms li{
  float: left;
  padding: 0 25px;
  font-size: 14px;
  color: #000;
}
.user a{
  float: right;
  width: 38px;
  height: 20px;
  line-height: 20px;
  padding-left: 12px;
  margin-top: 9px;
  color: #000;
  border-left: 1px solid #dadada;
  text-decoration: none;
}
.select-info{
  float: left;
  padding: 0 10px;
}
/*顶部*/

/*头部切换*/
.header{
  width: 1200px;
  height: 80px;
  margin: 0 auto;
}
.header img{
  margin-top: 10px;
}
.tab-change{
  margin-top: 26px;
}
.tab-change .lifor{
  position: relative;
  float: left;
  height: 45px;
  padding: 0 23px;
  line-height: 45px;
  font-size: 14px;
  color: #000;
}
.tab-change .lifor.on{
  color: #ff0404;
}
.tab-change .lifor.on:after{
  position: absolute;
  content: '';
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background: #ff0404;
}
.tab-change .lifor:hover .li-list{
  display: block;
}
.tab-change .lifor .li-list{
  position: absolute;
  display: none;
  left: -20%;
  top: 46px;
  width: 140%;
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  background: #f8f8f8;
  color: #000;
  box-shadow: 0px 0px 10px #bcbcbc;
}
.tab-change .lifor .li-list li{
  height: 45px;
  line-height: 45px;
  text-align: center;
  cursor: pointer;
}
.tab-change .lifor .li-list li:hover{
  color: #fff;
  background-color: #f13939;
}
/*头部切换*/

/*中间背景图片*/
.img-bg{
  width: 100%;
  height: 200px;
  background: #e4273f;
}
.img-bg .info{
  width: 1036px;
  height: 200px;
  margin: 0 auto;
  background: #e4273f url('../assets/images/index-bg2.jpg') no-repeat right bottom; 
  overflow: hidden;
}
.img-bg .info .p-titl{
  margin: 62px 0 0 0;
  font-size: 22px;
  color: #fcfdff;
}
.img-bg .info .activity{
  width: 306px;
  margin: 10px 0 0 0;
  line-height: 18px;
  font-size: 12px;
  color: #fcfdff;
  text-align: center;
}
/*中间背景图片*/


.my-location{
  height: 30px;
  line-height: 30px;
  background-color: #f6f6f6;
}
.location{
  width: 1160px;
  margin: 0 auto;
}
.my-location label{
  color: #aaa;
}
.location-p{
  display: inline-block;
}
.red{
  color: #f82134;
}
.green{
  color: #46b02e;
}
.search-cnt{
  width: 1160px;
  margin: 18px auto;
}
.search{
  display: flex;
  width: 416px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #d5d5d5;
  border-right:0;
}
.search:hover{
  border: 1px solid #f13939;
  border-right:0;
}
.selections{
  position: relative;
  width: 77px;
  height: 34px;
  border-right: 1px solid #d5d5d5;
  background-color: #f8f8f8;
  font-size: 14px;
  color: #595959; 
  cursor: pointer;
}
.selections .wrds{
  padding-left: 13px;
}
.selections i{
  position: absolute;
  top: 0;
  right: 10px;
}
.selections:hover .select-list{
  display: block;
}
.select-list{
  position: absolute;
  display: none;
  left: -1px;
  top: 35px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  background: #fff;
  box-shadow: 0 5px 5px #bcbcbc;
}
.select-list li{
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.select-list li:hover{
  color: #fff;
  background-color: #f13939;
}
.search-input{
  flex:1;
  padding: 0 16px;
  height: 34px;
  line-height: 34px;
}
.search-btn{
  width: 62px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background-color: #f13939;
  color:#fff;
  font-size: 14px;
  border:0;
}

.queries-list {
  width: 1160px;
  margin: 10px auto;
  border: 1px solid #dfdfdf;
}
.queries-title {
  height: 40px;
  padding: 0 12px;
  line-height: 40px;
  color: #6b6b6b;
  border-bottom: 1px solid #dfdfdf;
}
.checked-query {
  position: relative;
  display: inline-block;
  height: 20px;
  margin-left: 10px;
  padding: 0 25px 0 5px;
  line-height: 20px;
  border: 1px solid #d2d2d2;
  color: #333;
  cursor: pointer;
}
.checked-query i{
  position: absolute;
  right: 0;
  top:0;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
}
.checked-query .iconfont {
  margin-left: 4px;
  color: #d2d2d2;
  font-size: 12px;
}
.checked-query:hover {
  border-color: #f82134;
}
.checked-query:hover .iconfont {
  background-color: #f82134;
  color: #fff;
}
.queries-category {
  margin: 0 12px;
  line-height: 38px;
  border-bottom: 1px dashed #ccc;
}
.queries-category:last-of-type {
  border-bottom: none;
}
.category-label {
  width: 90px;
  color: #999;
  text-align: right;
}
.category-list {
  display: inline-block;
  width: 80%;
  margin-left: 20px;
  color: #000;
  overflow: hidden;
}
.fold {
  height: 28px;
}
.category-item {
  display: inline-block;
  margin-right: 10px;
  padding: 0 4px;
  border: 1px solid #fff;
    line-height: 18px;
  white-space: nowrap;
  cursor: pointer;
}
.category-item.hover{
  border: 1px solid #f82134;
  background-color: #f82134;
  color: #fff;
}
.category-item:hover{
  border: 1px solid #f82134;
  color: #f82134;
}
.category-item.hover:hover{
  background-color: #f82134;
  color: #fff;
}
.category-more {
  display: inline-block;
  height: 22px;
  margin-top: 7px;
  padding: 0 5px;
  line-height: 22px;
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  text-decoration: none;
}
.category-more:active,
.category-more:focus,
.category-more:hover {
  color: #f82134;
}
.category-more .iconfont {
  font-size: 12px;
}

.tabs-list{
  width: 1160px;
  margin: 0 auto 70px;
}
.order-titl{
  height: 28px;
  margin: 15px 0;
  line-height: 28px;
}
.order-titl .tel-model{
  min-width: 5px;
  min-height: 20px;
  background: url('../assets/images/red-line.png') no-repeat 0 center;
  padding-left: 10px;
  font-size: 18px;
  color: #000;
  font-weight: 800;
}

.buttons .btns{
  padding: 0 12px;
  margin-left:2px;
  border:0;
  background-color: #fa0000;
  color:#fff;
  font-size: 12px;
  border-radius: 3px;
  line-height: 28px;
}
.buttons .btns:hover{
  background-color: #e20606;
}
.table thead tr{
  height: 40px;
  background-color: #efefef;
  border: 1px solid #dcdcdc;
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
}
.table input[type=checkbox]{
  width: 16px;
  height: 16px;
  background: url('../assets/images/checkbox.png') no-repeat;
}
.table input[type=checkbox]:checked{
  background: url('../assets/images/checkedbox.png') no-repeat;
}
.table tbody .td-first{
  display: flex;
}
.table tbody .td-first .p-img{
  width: 79px;
  height: 67px;
  margin: 10px 15px 0 0;
  border: 1px solid #e7e7e7;
  text-align: center;
  overflow: hidden;
}
.table tbody .td-first .tel-info{
  flex: 1;
  text-align: left;
}
.table tbody .td-first .tags{
  position: relative;
  display: flex;
  margin-top: 10px;
}
.table tbody .td-first .tags span{
  display: inline-block;
  height: 18px;
  padding: 0 4px;
  line-height: 18px;
  font-size: 12px;
  border-radius: 3px;
}
.table tbody .td-first .tags .sc{
  background-color: #00b5b8;
  border: 1px solid #00b5b8;
  color: #fff;
  margin-right: 3px;
}
.table tbody .td-first .tags .jc{
  background-color: #e23a3a;
  border: 1px solid #e23a3a;
  color: #fff;
  margin-right: 3px;
}
.table tbody .td-first .tags .mj{
  position: relative;
  border: 1px solid #e23a3a;
  color:#e23a3a;
  margin-right: 6px;
}
.table tbody .td-first .tags .spec{
  padding: 0 2px;
  border: 1px solid #ff982d;
  background-color: #ff982d;
  color: #fff;
  font-size: 14px;
  border-radius: 2px;
}
.table tbody .td-first .small-pop{
  display: none;
  position: absolute;
  top: 14px;
    left: -158px;
  width: 218px;
  height: 52px;
  padding-top: 26px;
  background: url('../assets/images/smremind-pop.png') no-repeat;
}
.table tbody .td-first .mj:hover .small-pop{
  display: block;
}
.table tbody .td-first .small-pop label{
  display: block;
  padding: 0 22px;
  margin-bottom: 2px;
  text-align: left;
}
.table .tel-href{
  display: block;
  margin: 15px 0 10px;
  font-size: 14px;
  color: #050505; 
  text-decoration: none;
}
.table .tel-href:hover{
  color: #ed0000;
  text-decoration: underline;
}
.table .tel-href.overflow-handle{
  width: 96%;
}
.table .tel-info label{
  color: #7d7d7d;
}
.table td i.iconfont{
  font-size: 18px;
}
.table tbody tr:hover{
  background-color: #f9f9f9;
}
.updown-btn{  
  padding:2px 5px;
  border:0;
  text-decoration: underline;
}
.updown-btn:hover{
  border: 1px solid #f82134;
  border-radius: 3px;
  text-decoration: none;
}
.updown-btn.green:hover{
  border: 1px solid #46b02e;
}
</style>
