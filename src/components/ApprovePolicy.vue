<template>
  <div>
    <el-button type="text" @click="isShow = true" class="hover-btn">审批</el-button>
    <DialogPopup :visible="isShow" title="审批" @visibleChange="visibleChange">
      <div slot="content" class="approve">
        <el-row>
          <el-col :span="14" :offset="2">
            <div class="condition-item">
              <label class="label-wrds">审批结果：</label>
              <Select :value.sync="statusCd" :options="statusList"/>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" :offset="2">
            <div class="condition-item">
              <label class="label-wrds">审批备注：</label>
              <Input type="textarea" :value.sync="reviewRemark"/>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer">
        <el-button type="success" @click="approveOpmPolicy()">确定</el-button>
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
    created() {
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    props: {
      data: Object
    },
    data() {
      return {
        isShow: false,
        statusCd: 1001,
        statusList: [{
          label: '通过',
          value: 1001
        }, {
          label: '不通过',
          value: 1002
        }],
        reviewRemark: ''
      }
    },
    methods: {
      visibleChange(val) {
        this.isShow = val;
      },
      approveOpmPolicy() {
        this.isShow = false;
        this.$post('/opmPolicyController/approveOpmPolicy', {
          policyId: this.data.policyId,
          statusCd: this.statusCd,
          reviewPartyId: this.user.userId,
          reviewRemark: this.reviewRemark
        }).then((rsp) => {
          this.$msgBox({
            type: 'success',
            title: '操作提示',
            content: '优惠政策审批成功'
          }).catch(() => {
            // console.log('cancel');
          });
          this.$emit('update');
        });
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
  .hover-btn{
    padding: 2px 5px;
    border: 1px solid transparent;
    color: #ff0000;
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
    &:hover{
      border: 1px solid #ff0000;
      text-decoration: none;
    }
  }
</style>
