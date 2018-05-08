<template>
  <div>
    <div class="login">
      <!-- 中间背景图片 -->
      <div class="login-top box-1200 fn-clear">
        <div class="left fn-left">
          <span class="red">中国电信渠道终端合作运营门户</span>
          <label>欢迎登陆</label>
        </div>
        <div class="right fn-right">
          <p class="p1">全国客服电话</p>
          <p class="p2">400-881-0000</p>
        </div>
      </div>
      <div class="login-info fn-clear">
        <div class="box-1200">
          <div class="login-in fn-right">
            <div class="line-one fn-clear">
              <span class="fn-left" :class="{'on': active == 1}" @click="handleClick(1)">账号密码</span>
              <span class="fn-left" :class="{'on': active == 2}" @click="handleClick(2)">省市名称</span>
            </div>
            <div class="login-pwd" v-show="active == 1">
              
              <Input prefixIcon="el-icon-userman"/>
            </div>
            <div class="login-pwd" v-show="active == 2">
              
            </div>
          </div>
        </div>
      </div>
      <div class="login-bottom">
        
      </div>
    </div>
  </div>
</template>
<script>
  import Input from '@/components/Input';
  export default {
    name: 'LoginIn',
    created() {
    },
    data() {
      return {
        active: 1
      };
    },
    methods: {
      handleClick(index) {
        this.active = index;
      }
    },
    components: {
      Input
    }
  }
</script>
<style lang="less">
  .login{
    .login-top{
      height: 80px;
      .left{
        span{
          position: relative;
          font-size: 28px;
          font-weight: bold;
          line-height: 80px;
          &::after{
            position: absolute;
            content: '';
            width: 1px;
            height: 30px;
            top: 3px;
            right: -10px;
            background-color: #ccc;
          }
        }
        label{
          font-size: 24px;
          color: #000;
          margin-left: 16px;
        }
      }
      .right{
        .p1{
          margin: 20px 0 8px;
          font-size: 18px;
        }
        .p2{
          font-size: 18px;
          font-weight: bold;
          color: #f60e0e;
        }
      }
    }
    .login-info{
      width: 100%;
      height: 440px;
      background: #605ff0 url("../assets/images/login-bg.jpg") no-repeat center;
      .login-in{
        width: 340px;
        height: 340px;
        margin: 50px 0 0 0;
        background-color: #f4f0fe;
      }
      .line-one{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #f60e0e;
        font-size: 18px;
        color: #000;
      }
      .line-one span{
        width: 50%;
        text-align: center;
        cursor: pointer;
        &.on{
          background-color: #f60e0e;
          color: #fff;
        }
      }
    }
  }
  
</style>
