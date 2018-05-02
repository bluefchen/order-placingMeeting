<template>
  <div>
  <el-dialog   
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose"
    center>
    <span slot="title" class="el-dialog__header">{{title}}</span>
    <template>
      <slot name="content"></slot>
    </template>   
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
 export default {
    name: 'DialogPopup',
    props: {
      value: {
        type: Boolean,
        default:false
      }
    },
    data() {
      return {
        dialogVisible: false
      };
    },
    watch: {
      value(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        this.$emit("visible-change",val);
      }
    },
    methods: {
      handleClose(done) {
        done();         
      },
    },
    mounted() {
      if (this.value) {
        this.dialogVisible = true;
      }
    }   
  };
</script>
<style lang="less">
  .el-dialog__header{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f82134;      
    font-size: 16px;
    padding:0;
    .el-dialog__title{
      color: #fff;
    }
    .el-dialog__headerbtn{
      top: 10px;
      font-size: 18px;
    }
  }
  .content{
    min-height: 50px;
  }
  .el-dialog__footer{
    text-align: center;
    height: 66px;
    padding:0;
    border-top: 1px solid #e3e3e3;
    background-color: #f3f3f3;
    button{
      margin: 15px 24px 0 0;
    }
    .el-button{
      background-color: #f01919;
      color: #fff;
      border: 0;
    }
  } 
  .el-dialog__headerbtn .el-dialog__close{
    color: #fff;
    font-size: 18px;
  }
</style>




