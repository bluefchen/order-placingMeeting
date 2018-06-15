<template>
  <div>
    <el-button type="text" @click="isShow = true" class="hover-btn">{{title}}</el-button>
    <DialogPopup :visible="isShow" title="优惠政策详情" @visibleChange="visibleChange">
      <div slot="content" class="pop-cnt">
        <p class="p-ttl"><b>{{data.offerNames}}</b></p>
        <p class="cnt-info">{{data.content}}</p>
      </div>
      <div slot="footer">
        <el-button type="success" @click="isShow = false">关闭</el-button>
      </div>
    </DialogPopup>
  </div>
</template>

<script>
  import DialogPopup from '@/components/DialogPopup';

  export default {
    name: 'ButtonWithDialog',
    props: {
      title: {
        type: String,
        require: true
      },
      data: {
        type: Object
      }
    },
    data() {
      return {
        isShow: false,
      }
    },
    methods: {
      visibleChange(val) {
        this.isShow = val;
      }
    },
    components: {
      DialogPopup
    }
  }
</script>

<style scoped lang="less">
  .el-button--text {
    padding: 0;
    color: #606266;
    font-size: 12px;
    &:hover {
      color: #ff0000;
      text-decoration: underline;
    }
  }
  .hover-btn{
    text-decoration: underline;
  }
  .pop-cnt {
    .vivo {
      width: 102px;
      height: 28px;
      margin-bottom: 16px;
      line-height: 28px;
      text-align: center;
      background-color: #ff0000;
      color: #fff;
      border-radius: 14px;
    }
    .p-ttl {
      margin: 0 0 6px 8px;
    }
    .cnt-info {
      margin: 0 0 16px 40px;
      white-space: normal;
    }
  }
</style>
