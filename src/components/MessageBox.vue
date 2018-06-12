<template>
  <div class="message-box" v-show="isShowMessageBox">
    <div class="mask"></div>
    <div class="message-content">
      <div class="widget-head">
        <h3>{{title}}</h3>
        <span class="icon" @click="cancel">&#xe639;</span>
      </div>
      <div class="widget-body">
        <div class="alert-info-wrap" :class="type">
          <p class="alert-title">{{content}}</p>
          <span class="errstack-btn" v-show="type === 'error'" @click="toggle">详细信息<i
            class="iconfont">&#xe608;</i></span>
        </div>
        <div class="alert-err-stack" v-show="isShowErrStack">{{errStack}}</div>
      </div>
      <div class="widget-foot">
        <button @click="cancel" v-show="isShowCancelBtn">{{cancelBtnText}}</button>
        <button class="btn-ok" @click="confirm" v-show="isShowConfimrBtn">{{confirmBtnText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'success'
      },
      title: {
        type: String,
        default: '标题'
      },
      content: {
        type: String,
        default: '这是弹框内容'
      },
      errStack: {
        type: String,
        default: '错误详细信息'
      },
      isStatusErr: {
        type: Boolean,
        default: false
      },
      isShowErrStack: {
        type: Boolean,
        default: false
      },
      isShowCancelBtn: {
        type: Boolean,
        default: true
      },
      isShowConfimrBtn: {
        type: Boolean,
        default: true
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }
    },
    data() {
      return {
        isShowMessageBox: false,
        resolve: '',
        reject: '',
        promise: '' //保存promise对象
      };
    },
    methods: {
      toggle: function () {
        this.isShowErrStack = !this.isShowErrStack;
      },
      confirm: function () {
        this.isShowMessageBox = false;
        this.resolve('confirm');
        this.remove();
      },
      cancel: function () {
        this.isShowMessageBox = false;
        this.reject('cancel');
        this.remove();
      },
      showMsgBox: function () {
        this.isShowMessageBox = true;
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        return this.promise;
      },
      remove: function () {
        setTimeout(() => {
          this.destroy();
        }, 300);
      },
      destroy: function () {
        this.$destroy();
        document.body.removeChild(this.$el);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .message-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .message-content {
      position: relative;
      left: 50%;
      top: 150px;
      z-index: 50001;
      width: 550px;
      min-height: 350px;
      background-color: #fff;
      transform: translate(-50%);
      .widget-head {
        position: relative;
        height: 36px;
        padding-left: 10px;
        background: #fafafa;
        border-bottom: 1px solid #b0b0b0;
        line-height: 36px;
        color: #000;
        font-size: 14px;
        text-align: left;
        h3 {
          height: 36px;
          line-height: 36px;
          color: #000;
          font-size: 14px;
        }
        .icon {
          position: absolute;
          top: 0;
          right: 0;
          width: 36px;
          height: 36px;
          line-height: 36px;
          color: #ed5656;
          font-size: 18px;
          font-family: iconfont;
          text-align: center;
          cursor: pointer;
          opacity: 0.8;
          &:hover {
            opacity: 1;
          }
        }
      }
      .widget-body {
        position: relative;
        padding: 10px;
        background-color: #fff;
        .alert-info-wrap {
          height: 250px;
          padding-top: 20px;
          padding-left: 96px;
          &.success {
            height: 250px;
            background: url('../assets/images/icon-succ.png') no-repeat 0 0;
          }
          &.error {
            background: url('../assets/images/icon-err.png') no-repeat 0 0;
          }
          &.info {
            background: url('../assets/images/icon-info.png') no-repeat 0 0;
          }
        }
        .alert-title {
          height: 200px;
          line-height: 25px;
          color: #020202;
          font-size: 14px;
          text-align: left;
          overflow-y: auto;
        }
        .errstack-btn {
          position: absolute;
          right: 15px;
          top: 250px;
          color: #d84040;
          font-size: 14px;
          text-decoration: underline;
          cursor: pointer;
        }
        .alert-err-stack {
          max-height: 66px;
          padding: 8px 5px;
          background-color: #eff6fb;
          border-radius: 4px;
          line-height: 22px;
          color: #818181;
          font-size: 12px;
          text-align: left;
          overflow-y: auto;
        }
      }
      .widget-foot {
        width: 100%;
        height: 32px;
        padding: 10px 0;
        background-color: #fafafa;
        border-top: 1px solid #b0b0b0;
        text-align: center;
        button {
          height: 30px;
          margin: 0 5px;
          padding: 5px 20px;
          background-color: #ffe3e3;
          border: 1px solid #e76b6b;
          border-radius: 5px;
          outline: none;
          color: #e43f3f;
          cursor: pointer;
          &:hover {
            background-color: #ffd7d7;
          }
          &.btn-ok {
            background-color: #ed5656;
            border: 1px solid #ed5656;
            color: #fff;
            &:hover {
              background-color: #f56161;
            }
          }
        }
      }
    }
  }
</style>
