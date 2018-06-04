<template>
  <div>
    <el-button type="text" @click="isShow = true" class="hover-btn">审批</el-button>
    <DialogPopup :visible="isShow" title="审批" @visibleChange="visibleChange">
      <div slot="content" class="pop-cnt">
        <el-row>
          <el-col :span="16" :offset="4">
            <div class="condition-iterm">
              <label class="label-wrds">审批结果：</label>
              <Select class="condition-input" :value.sync="orderQueryData" :options="paymentStatusList"/>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer">
        <el-button type="success" @click="isShow = false">确定</el-button>
        <el-button type="success" @click="isShow = false">取消</el-button>
      </div>
    </DialogPopup>
  </div>
</template>

<script>
  import DialogPopup from '@/components/DialogPopup';

  export default {
    name: 'ApprovePolicy',
    props: {},
    data() {
      return {
        isShow: false,
        orderQueryData: null,
        paymentStatusList: [{
          label: '通过',
          value: 1
        }, {
          label: '不通过',
          value: 0
        }]
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
    }
  }
</style>
