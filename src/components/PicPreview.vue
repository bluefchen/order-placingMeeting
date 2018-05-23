<template>
  <div>
    <div class="pic-zoom">
      <PicZoom :url="url" :bigUrl="bigUrl"/>
    </div>
    <div class="slide">
      <div class="slide-left fn-left" @click="scrollLeft"><img src="@/assets/images/icon-btn-left.png" alt=""></div>
      <div class="slide-center fn-left">
        <ul :class="{'animate':animate}">
          <li v-for="(item, index) in imgList" @click="checkedUrl(item, index)" :class="{'checked': index == checkedIndex}">
            <img :src="item" alt="" width="100">
          </li>
        </ul>
      </div>
      <div class="slide-right fn-right" @click="scrollRight"><img src="@/assets/images/icon-btn-right.png" alt=""></div>
    </div>
  </div>
</template>

<script>
  import PicZoom from 'vue-piczoom';

  export default {
    name: 'PicPreview',
    created() {
      this.checkedUrl(this.imgList[0], 0);
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
        ],
        url: '',
        bigUrl: '',
        checkedIndex: '',
        animate: false,
      }
    },
    methods: {
      checkedUrl(item, index){
        this.url = item;
        this.bigUrl = item;
        this.checkedIndex = index;
      },
      scrollLeft(){
        if(this.imgList.length > 4 ){
          this.animate = true;
          this.imgList.push(this.imgList[0]);
          this.imgList.shift();
          this.animate= false;
        };
        if(this.checkedIndex != 0){
          this.checkedIndex--
        };
        this.checkedUrl(this.imgList[this.checkedIndex], this.checkedIndex);
      },
      scrollRight(){
        if(this.imgList.length > 4){
          this.animate = true;
          var item = this.imgList.pop();
          this.imgList.unshift(item);
          this.animate= false;
        };
        if(this.checkedIndex != 3 && this.checkedIndex < (this.imgList.length - 1)){
          this.checkedIndex++
        };
        this.checkedUrl(this.imgList[this.checkedIndex], this.checkedIndex);
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
      width: 19px;
      height: 72px;
      line-height: 72px;
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
        left: 0;
        top: 0;
        width: 130%;
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
    }
  }
</style>
