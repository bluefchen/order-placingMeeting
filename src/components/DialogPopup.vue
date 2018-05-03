<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :width="width"
      :close-on-click-modal="false"
      center>
      <div slot="title">
        {{title}}
      </div>
      <slot name="content"></slot>
      <div slot="footer">
        <slot name="footer"></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DialogPopup',
    props: {
      width: {
        type: String,
        default: '60%'
      },
      title: {
        type: String,
        required: true
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        this.$emit('visibleChange', val);
      }
    },
    methods: {}
  };
</script>

<style lang="less">
  .el-dialog__header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f82134;
    font-size: 16px;
    padding: 0;
    color: #fff;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn {
      top: 10px;
      font-size: 18px;
    }
  }

  .content {
    min-height: 50px;
  }

  .el-dialog__footer {
    height: 68px;
    padding: 15px 0;
    border-top: 1px solid #e3e3e3;
    background-color: #f3f3f3;
    text-align: center;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
    font-size: 18px;
  }
</style>




