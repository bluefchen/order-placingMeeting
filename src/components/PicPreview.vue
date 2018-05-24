<template>
  <div>
    <div class="pic-zoom">
      <PicZoom :url="url" :bigUrl="bigUrl"/>
    </div>
    <div class="slide fn-clear">
      <button class="slide-left fn-left" @click="scrollLeft" :disabled="animateLeft">
        <img src="@/assets/images/icon-btn-left.png">
      </button>
      <div class="slide-center fn-left">
        <ul :class="{'animate-left': animateLeft, 'animate-right': animateRight}">
          <li v-for="(item, index) in imgList" v-on:mouseover="checkedUrl(item, index)" :class="{'checked': index === checkedIndex}" v-show="index >= showMinIndex && index <= showMaxIndex">
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
      <button class="slide-right fn-right" @click="scrollRight" :disabled="animateRight">
        <img src="@/assets/images/icon-btn-right.png">
      </button>
    </div>
  </div>
</template>

<script>
  import PicZoom from 'vue-piczoom';

  export default {
    name: 'PicPreview',
    created() {
      //取图片列表最后一项，放到数组最前面。ul往左偏移一项显示，防止点击左右按钮切换时候出现突然显示问题。自动选择index为1的项
      var imgItem = this.imgList.pop();
      this.imgList.unshift(imgItem);
      this.imgList.push(imgItem);
      this.checkedUrl(this.imgList[1], 1);
    },
    data() {
      return {
        imgList: [
          'http://img12.360buyimg.com/n1/s450x450_jfs/t17149/173/1779654602/189601/335d3d90/5ad8628dN03dc292f.jpg'
        ,
          'http://img10.360buyimg.com/n1/s450x450_jfs/t17773/222/1772357349/201925/627b888c/5ad8614bN7b9187f7.jpg'
        ,
          'http://img10.360buyimg.com/n1/s450x450_jfs/t18157/222/1822300674/231514/6c179af8/5ad87390N086a3c91.jpg'
        ,
          'http://img12.360buyimg.com/n1/s450x450_jfs/t17086/355/1787289240/85381/8ed3a44/5ad86285Nc411d600.jpg'
        ,
          'http://img14.360buyimg.com/n1/s450x450_jfs/t17494/75/1869981719/216755/afe6bf7/5ad87250N8b8f157e.jpg'
        ,
          'http://img10.360buyimg.com/n1/s450x450_jfs/t18076/23/1790973070/197564/1c7e24b3/5ad87379N59492ad3.jpg'
        ],
        url: '',
        bigUrl: '',
        checkedIndex: '',
        animateLeft: false, //往左切换的动画样式
        animateRight: false, //向右切换的动画样式
        showMinIndex: 0, //显示的最小索引值
        showMaxIndex: 5, //显示的最大索引值
        showIndexLength: 5 //显示的最大和最小索引值的数差
      }
    },
    methods: {
      checkedUrl(item, index){
        this.url = item;
        this.bigUrl = item;
        this.checkedIndex = index;
      },
      scrollLeft(){
        if(this.showMinIndex > 0){
          this.animateLeft = true;
          setTimeout(() => {
            this.showMinIndex = this.showMinIndex - 1;
            this.showMaxIndex = this.showMaxIndex - 1;
            this.animateLeft = false;
          }, 500)
        };
      },
      scrollRight(){
        if(this.showMinIndex + this.showIndexLength < this.imgList.length){
          this.animateRight = true;
          setTimeout(() => {
            this.showMinIndex = this.showMinIndex + 1;
            this.showMaxIndex = this.showMaxIndex + 1;
            this.animateRight= false;
          }, 500)
        };
      }
    },
    components: {
      PicZoom
    }
  }
</script>

<style scoped lang="less">
  .pic-zoom {
    width: 380px;
    height: 390px;
    border: 1px solid #ddd;
  }
  .slide{
    margin-top: 20px;
    width: 100%;
    .slide-left, .slide-right{
      position: relative;
      width: 19px;
      height: 72px;
      background: none;
      border: none;
      line-height: 72px;
      z-index: 999;
      cursor: pointer;
      img{
        vertical-align: middle;
      }
    }
    .slide-center{
      position: relative;
      margin-left: 15px;
      width: 325px;
      height: 72px;
      overflow: hidden;
      ul{
        position: absolute;
        left: -82px;
        top: 0;
        width: 160%;
        height: 72px;
        li{
          float: left;
          display: flex;
          width: 68px;
          height: 68px;
          margin-right: 10px;
          border: 2px solid #fff;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          img{
            max-width: 100%;
            max-height: 100%;
          }
          &.checked{
            border: 2px solid #f00;
          }
        }
        &.animate-left{
          transition: all 0.5s;
          left: 0;
        }
        &.animate-right{
          transition: all 0.5s;
          left: -164px;
        }
      }

    }
  }
</style>
