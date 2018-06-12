<template>
  <div class="message-box" v-show="isShowMessageBox">
    <div class="mask"></div>
    <div class="message-content">
      <span class="icon" @click="cancel">&#xe639;</span>
      <h3 class="title">{{title}}</h3>
      <div class="content">
        <p class="msg">{{content}}</p>
        <span class="errstack-btn">详细信息<i class="iconfont">&#xe608;</i></span>
        <div class="alert-err-stack">{{errStack}}</div>
      </div>
      <div class="btn-group">
        <button class="btn-default" @click="cancel" v-show="isShowCancelBtn">{{cancelBtnText}}</button>
        <button class="btn-primary btn-confirm" @click="confirm" v-show="isShowConfimrBtn">{{confirmBtnText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
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
      top: 50%;
      z-index: 50001;
      box-sizing: border-box;
      width: 500px;
      min-height: 200px;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      transform: translate(-50%, -50%);
      .icon {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        color: #878d99;
        font-family: iconfont;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
      .title {
        height: 20px;
        margin-bottom: 6px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 600;
      }
      .content {
        position: relative;
        .msg {
          height: 200px;
          line-height: 25px;
          color: #020202;
          font-size: 12px;
          text-align: left;
          overflow-y: auto;
        }
        .errstack-btn {
          position: absolute;
          right: 0;
          top: 180px;
          color: #d84040;
          font-size: 12px;
          text-decoration: underline;
          .iconfont {
            font-size: 12px;
          }
        }
        .alert-err-stack {
          max-height: 72px;
          padding: 5px;
          background-color: #eff6fb;
          border-radius: 4px;
          line-height: 22px;
          color: #818181;
          font-size: 12px;
          text-align: left;
          overflow-y: auto;
        }
      }
      .btn-group {
        margin-top: 10px;
        text-align: center;
        overflow: hidden;
        .btn-confirm {
          margin: 0 5px;
        }
      }
    }
  }
</style>
