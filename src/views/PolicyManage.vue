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
            <el-button class="btn-download fn-right" size="small" type="success"><i class="iconfont">&#xe794;</i> 政策投入
            </el-button>
            <el-button type="text" @click="isShow = true">打开</el-button>
            <DialogPopup :visible="isShow" title="优惠政策详情" @visibleChange="modalVisibleChange">
              <div slot="content">
                <p class="vivo">vivo</p>
                <p>vivoX20系列,VIVOX09系列：</p>
                <p>订购数量100以上打<span class="red">九折</span>，订购数量200以下打<span class="red">八折</span>，订购籽量满500打<span
                  class="red">六折</span></p>
                <p>vivoXXX系列,VIVOOOOO系列：</p>
                <p>订购数量100以上打<span class="red">九五</span>折，订购数量200以下打<span class="red">八五</span>折，订购籽量满500打<span
                  class="red">六五</span>折</p>
              </div>
              <div slot="footer">
                <el-button type="success" @click="isShow = false">关闭</el-button>
              </div>
            </DialogPopup>
          </div>
        </div>
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
          formatter: function (row, value) {
            switch (row.isSpecial) {
              case 'N':
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
        isShow: false,
        //分类选择
        isFoldBrand: true, //是否折叠品牌
        isFoldModel: true, //是否折叠型好
        isFoldScreen: false, //是否折叠更多筛选
        //筛选数据
        terminalStateList: [{
          stateName: '上架',
          stateCode: '001'
        }, {
          stateName: '下架',
          stateCode: '002'
        }],
        checkedStateIndex: null,
        specialModelsOptions: [{
          optName: '是',
          optCode: 'Y'
        }, {
          optName: '否',
          optCode: 'N'
        }],
        checkedSpecialIndex: null,
        brandList: [{
          brandName: '苹果',
          brandCode: '001'
        }, {
          brandName: '三星',
          brandCode: '002'
        }, {
          brandName: '华为',
          brandCode: '003'
        }, {
          brandName: '酷派',
          brandCode: '004'
        }, {
          brandName: '中兴',
          brandCode: '005'
        }, {
          brandName: '黑莓',
          brandCode: '006'
        }, {
          brandName: '诺基亚',
          brandCode: '007'
        }, {
          brandName: '魅族',
          brandCode: '008'
        }, {
          brandName: '锤子',
          brandCode: '009'
        }, {
          brandName: '小米',
          brandCode: '010'
        }],
        checkedBrandIndex: null,
        modelList: [],
        checkedModelIndex: null,
        qryModelList: [{
          modelName: 'iphone 3',
          modelCode: '001'
        }, {
          modelName: 'iphone 4',
          modelCode: '002'
        }, {
          modelName: 'iphone 4s',
          modelCode: '003'
        }, {
          modelName: 'iphone 5',
          modelCode: '004'
        }, {
          modelName: 'iphone 5s',
          modelCode: '005'
        }, {
          modelName: 'iphone 6',
          modelCode: '006'
        }, {
          modelName: 'iphone 6s',
          modelCode: '007'
        }, {
          modelName: 'iphone 5c',
          modelCode: '008'
        }, {
          modelName: 'iphone 5se',
          modelCode: '009'
        }, {
          modelName: 'iphone 6 plus',
          modelCode: '010'
        }, {
          modelName: 'iphone 6s plus',
          modelCode: '011'
        }, {
          modelName: 'iphone 7',
          modelCode: '012'
        }, {
          modelName: 'iphone 8',
          modelCode: '013'
        }, {
          modelName: 'iphone X',
          modelCode: '014'
        }],
        checkedCategoryList: [{
          name: '终端状态',
          categoryName: null,
          categoryCode: null
        }, {
          name: '是否特种机型',
          categoryName: null,
          categoryCode: null
        }, {
          name: '终端品牌',
          categoryName: null,
          categoryCode: null
        }, {
          name: '终端型号',
          categoryName: null,
          categoryCode: null
        }],
      }
    },
    methods: {
      search(obj) {
        console.log('参数：', obj);
      },
      changeFoldBrand() {
        this.isFoldBrand = !this.isFoldBrand;
      },
      changeFoldModel() {
        this.isFoldModel = !this.isFoldModel;
      },
      changeFoldScreen() {
        this.isFoldScreen = !this.isFoldScreen;
      },
      checkedState(val, index) {
        if (this.checkedStateIndex != index) {
          this.checkedStateIndex = index;
          this.checkedCategoryList.map((item, index) => {
            if (item.name == '终端状态') {
              item.categoryName = val.stateName;
              item.categoryCode = val.stateCode;
            }
          });
        } else {
          this.delCategoryItem('终端状态');
        }
        ;
      },
      checkedSpecialModel(val, index) {
        if (this.checkedSpecialIndex != index) {
          this.checkedSpecialIndex = index;
          this.checkedCategoryList.map((item, index) => {
            if (item.name == '是否特种机型') {
              item.categoryName = val.optName;
              item.categoryCode = val.optCode;
            }
          });
        } else {
          this.delCategoryItem('是否特种机型');
        }
        ;
      },
      checkedBrand(val, index) {
        if (this.checkedBrandIndex != index) {
          this.checkedBrandIndex = index;
          this.checkedCategoryList.map((item, index) => {
            if (item.name == '终端品牌') {
              item.categoryName = val.brandName;
              item.categoryCode = val.brandCode;
              this.delCategoryItem('终端型号');
            }
          });
          this.modelList = this.qryModelList;
        } else {
          this.delCategoryItem('终端品牌');
        }
        ;
      },
      checkedModel(val, index) {
        if (this.checkedModelIndex != index) {
          this.checkedModelIndex = index;
          this.checkedCategoryList.map((item, index) => {
            if (item.name == '终端型号') {
              item.categoryName = val.modelName;
              item.categoryCode = val.modelCode;
            }
          });
        } else {
          this.delCategoryItem('终端型号');
        }
        ;
      },
      addCategoryItem(val, index) {
        this.checkedCategoryList.push(val);
      },
      delCategoryItem(val) {
        if (val == '终端状态') {
          this.checkedStateIndex = null;
        } else if (val == '是否特种机型') {
          this.checkedSpecialIndex = null;
        } else if (val == '终端品牌') {
          this.checkedBrandIndex = null;
          this.checkedModelIndex = null;
          this.modelList = [];
          this.checkedCategoryList.map((item, index) => {
            if (item.name == '终端型号') {
              item.categoryName = null;
              item.categoryCode = null;
            }
          });
        } else if (val == '终端型号') {
          this.checkedModelIndex = null;
        }
        ;
        this.checkedCategoryList.map((item, index) => {
          if (item.name == val) {
            item.categoryName = null;
            item.categoryCode = null;
          }
        });
      },
      modalVisibleChange(val) {
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

  .queries-list {
    margin: 10px auto;
    border: 1px solid #dfdfdf;
    overflow: hidden;
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

  .checked-query i {
    position: absolute;
    right: 0;
    top: 0;
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
    height: 38px;
  }

  .fold-screen {
    height: 42px;
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

  .category-item.hover {
    border: 1px solid #f82134;
    background-color: #f82134;
    color: #fff;
  }

  .category-item:hover {
    border: 1px solid #f82134;
    color: #f82134;
  }

  .category-item.hover:hover {
    background-color: #f82134;
    color: #fff;
  }

  .category-more, .category-pick-up {
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
  .category-more:hover,
  .category-pick-up:active,
  .category-pick-up:focus,
  .category-pick-up:hover {
    color: #f82134;
  }

  .category-pick-up {
    color: #979797;
  }

  .category-more .iconfont {
    font-size: 12px;
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

</style>
