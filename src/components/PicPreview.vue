<template>
  <div>
    <div class="pic-zoom">
      <PicZoom :url="url"/>
    </div>
    <div class="slide fn-clear">
      <button class="slide-left fn-left" @click="scrollLeft" :disabled="animateLeft">
        <img src="@/assets/images/icon-btn-left.png">
      </button>
      <div class="slide-center fn-left">
        <ul :class="{'animate-left': animateLeft, 'animate-right': animateRight}">
          <li v-for="(item, index) in imgList" v-on:mouseover="checkedUrl(item, index)"
              :class="{'checked': index === checkedIndex}" v-show="index >= showMinIndex && index <= showMaxIndex">
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
      this.imgList = this.picPreviewList;
      if (this.imgList.length) {
        let imgItem = this.imgList.pop();
        this.imgList.unshift(imgItem);
        this.imgList.push(imgItem);
        this.checkedUrl(this.imgList[1], 1);
      }
    },
    props: {
      picPreviewList: {
        type: Array,
        require: true
      },
    },
    data() {
      return {
        imgList: [],
        url: '',
        checkedIndex: '',
        animateLeft: false, //往左切换的动画样式
        animateRight: false, //向右切换的动画样式
        showMinIndex: 0, //显示的最小索引值
        showMaxIndex: 5, //显示的最大索引值
        showIndexLength: 5 //显示的最大和最小索引值的数差
      }
    },
    methods: {
      checkedUrl(item, index) {
        this.url = item;
        this.checkedIndex = index;
      },
      scrollLeft() {
        if (this.showMinIndex > 0) {
          this.animateLeft = true;
          setTimeout(() => {
            this.showMinIndex = this.showMinIndex - 1;
            this.showMaxIndex = this.showMaxIndex - 1;
            this.animateLeft = false;
          }, 500)
        }
      },
      scrollRight() {
        if (this.showMinIndex + this.showIndexLength < this.imgList.length) {
          this.animateRight = true;
          setTimeout(() => {
            this.showMinIndex = this.showMinIndex + 1;
            this.showMaxIndex = this.showMaxIndex + 1;
            this.animateRight = false;
          }, 500)
        }
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

  .slide {
    margin-top: 20px;
    width: 100%;
    .slide-left, .slide-right {
      position: relative;
      width: 19px;
      height: 72px;
      background: none;
      border: none;
      line-height: 72px;
      z-index: 999;
      cursor: pointer;
      img {
        vertical-align: middle;
      }
    }
    .slide-center {
      position: relative;
      margin-left: 15px;
      width: 325px;
      height: 72px;
      overflow: hidden;
      ul {
        position: absolute;
        left: -82px;
        top: 0;
        width: 160%;
        height: 72px;
        li {
          float: left;
          display: flex;
          width: 68px;
          height: 68px;
          margin-right: 10px;
          border: 2px solid #fff;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          img {
            max-width: 100%;
            max-height: 100%;
          }
          &.checked {
            border: 2px solid #f00;
          }
        }
        &.animate-left {
          transition: all 0.5s;
          left: 0;
        }
        &.animate-right {
          transition: all 0.5s;
          left: -164px;
        }
      }

    }
  }
</style>
