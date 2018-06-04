<template>
  <div>
    <el-button type="text" @click="isShow = true" class="hover-btn">审批</el-button>
    <DialogPopup :visible="isShow" title="审批" @visibleChange="visibleChange">
      <div slot="content" class="approve">
        <el-row>
          <el-col :span="16" :offset="4">
            <label class="label-wrds">审批结果：</label>
            <Select class="condition-input" :value.sync="statusCd" :options="statusList"/>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <label class="label-wrds">审批备注：</label>
            <Input type="textarea" :value.sync="remark"/>
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
  import Select from '@/components/Select';
  import Input from '@/components/Input';

  export default {
    name: 'ApprovePolicy',
    props: {},
    data() {
      return {
        isShow: false,
        statusCd: 1,
        statusList: [{
          label: '通过',
          value: 1
        }, {
          label: '不通过',
          value: 0
        }],
        remark: ''
      }
    },
    methods: {
      visibleChange(val) {
        this.isShow = val;
      }
    },
    components: {
      DialogPopup,
      Select,
      Input
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

  .approve {
    .el-row {
      margin-bottom: 10px;
    }
    .label-wrds {
      font-size: 12px;
    }
  }
</style>
