<template>
  <div class="device-wrap fn-clear">
    <div class="device-pic fn-left">
      <img :src="data.offerPic.offerPicUrl">
    </div>
    <div class="device-info fn-left">
      <p class="name" title="data.offerName">{{data.offerName}}</p>
      <p class="code">编码：{{data.offerCode}}</p>
      <p class="property">
        <span v-if="data.isCentman === 'N'" class="sc">社采</span>
        <span v-if="data.isCentman === 'Y'" class="jc">集采</span>
        <span v-if="data.isSpecial === 'Y'" class="spec">特</span>
        <ReductionPop/>
      </p>
    </div>
  </div>
</template>

<script>
  import ReductionPop from '@/components/ReductionPop';

  export default {
    name: 'DeviceInfo',
    props: {
      data: {
        type: Object,
        default: function() {
          return {
            offerName: '',
            offerCode: '',
            isCentman: '',
            isSpecial: '',
            offerPicId: '',
            offerPic: ''
          }
        }
      }
    },
    data() {
      return {}
    },
    methods: {},
    components: {
      ReductionPop
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/css/mixin";

  .device-wrap {
    text-align: left;
    .device-pic {
      width: 80px;
      height: 80px;
      box-sizing: border-box;
      border: 1px solid #e7e7e7;
      img {
        display: block;
        width: 78px;
        height: 78px;
      }
    }
    .device-info {
      box-sizing: border-box;
      width: calc(100% - 82px);
      padding-left: 15px;
      line-height: 22px;
      .name{
        height: 26px;
        line-height: 26px;
        color: #050505;
        font-size: 14px;
        .truncate();
        &:hover {
          color: #ed0000;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .code {
        color: #7d7d7d;
        .truncate();
      }
      .property {
        margin-top: 8px;
        white-space: nowrap;
        overflow: hidden;
        span {
          display: inline-block;
          height: 20px;
          padding: 0 4px;
          line-height: 20px;
          &.sc {
            background-color: #00b5b8;
            border: 1px solid #00b5b8;
            border-radius: 3px;
            color: #fff;
          }
          &.jc {
            background-color: #e23a3a;
            border: 1px solid #e23a3a;
            border-radius: 3px;
            color: #fff;
          }
          &.spec {
            border: 1px solid #ff982d;
            background-color: #ff982d;
            border-radius: 3px;
            color: #fff;
            font-weight: 800;
          }
        }
      }
    }
  }
</style>
