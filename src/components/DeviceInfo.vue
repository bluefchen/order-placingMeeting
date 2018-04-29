<template>
  <div class="device-wrap fn-clear">
    <div class="device-pic fn-left">
      <img src="@/assets/images/telephone1.jpg">
    </div>
    <div class="device-info fn-left">
      <p class="name">VIVO-X20全面屏 美颜拍照手机</p>
      <p class="code">编码：11020300001</p>
      <p class="property">
        <span class="sc">社采</span>
        <span class="jc">集采</span>
        <span class="spec">特</span>
        <ReductionPop/>
      </p>
    </div>
  </div>
</template>

<script>
  import ReductionPop from '@/components/ReductionPop';

  export default {
    name: 'DeviceInfo',
    props: {},
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
  .device-wrap {
    min-width: 320px;
    text-align: left;
    .device-pic {
      width: 80px;
      height: 70px;
      border: 1px solid #e7e7e7;
      img {
        display: block;
        width: 78px;
        height: 68px;
      }
    }
    .device-info {
      margin-left: 15px;
      .name {
        height: 26px;
        line-height: 26px;
        color: #050505;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &:hover {
          color: #ed0000;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .code {
        color: #7d7d7d;
      }
      .property {
        margin-top: 10px;
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
            border-radius: 2px;
            color: #fff;
            font-weight: 800;
          }
        }
      }
    }
  }
</style>
