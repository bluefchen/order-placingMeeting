<template>
  <div>
    <div class="pic-zoom">
      <PicZoom :url="url" :bigUrl="bigUrl"/>
    </div>
    <div class="slide">
      <button class="slide-left fn-left" @click="scrollLeft" :disabled="animateLeft"><img src="@/assets/images/icon-btn-left.png" alt=""></button>
      <div class="slide-center fn-left">
        <ul :class="{'animate-left': animateLeft==true, 'animate-right': animateRight==true}">
          <li v-for="(item, index) in imgList" @click="checkedUrl(item, index)" :class="{'checked': index == checkedIndex}" v-show="index > showIndex - 1 && index < showIndex + 6">
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
      <button class="slide-right fn-right" @click="scrollRight" :disabled="animateRight"><img src="@/assets/images/icon-btn-right.png" alt=""></button>
    </div>
  </div>
</template>

<script>
  import PicZoom from 'vue-piczoom';

  export default {
    name: 'PicPreview',
    created() {
      var imgItem = this.imgList.pop();
      this.imgList.unshift(imgItem);
      this.imgList.push(imgItem);

      if(this.imgList.length > 4){
        this.checkedIndex = 1;
      }else{
        this.checkedIndex = 1;
      };
      this.checkedUrl(this.imgList[this.checkedIndex], this.checkedIndex);
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
        animateLeft: false,
        animateRight: false,
        showIndex: 0,
      }
    },
    methods: {
      checkedUrl(item, index){
        this.url = item;
        this.bigUrl = item;
        this.checkedIndex = index;
      },
      scrollLeft(){
        if(this.showIndex > 0){
          this.animateLeft = true;
          setTimeout(() => {
            this.showIndex = this.showIndex - 1;
            this.animateLeft = false;
          }, 500)
        };
      },
      scrollRight(){
        if(this.showIndex + 5 < this.imgList.length){
          this.animateRight = true;
          setTimeout(() => {
            this.showIndex = this.showIndex + 1;
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
        }
        li.checked{
          border: 2px solid #f00;
        }
      }
      ul.animate-left{
        transition: all 0.5s;
        left: 0px;
      }
      ul.animate-right{
        transition: all 0.5s;
        left: -164px;
      }
    }
  }
</style>
