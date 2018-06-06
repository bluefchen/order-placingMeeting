<template>
  <div class="add-role">
    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['系统维护', '角色管理']"/>
      </div>
    </div>
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="角色编辑"/>
      </div>
      <!-- 角色编辑 -->
      <div class="role-setup-info">
        <div class="terminal-info-box">
          <el-row :gutter="20">
            <el-col :span="8" :offset="2">
              <div class="condition-item">
                <label class="label-wrds"><span class="red-star">*</span> 角色名称：</label>
                <Input class="condition-input" :value.sync="roleData.name"/>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18" :offset="2">
              <div class="condition-item">
                <label class="label-wrds"><span class="red-star">*</span> 角色说明：</label>
                <Input class="condition-input" type="textarea" :value.sync="roleData.description"/>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="foot-btn">
        <el-button class="btns" @click="roleAddSubmit" :disabled="!roleData.name || !roleData.description">保&nbsp;存
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Table from '@/components/Table';
  import TitlePlate from '@/components/TitlePlate';
  import Input from '@/components/Input';
  import Pagination from '@/components/Pagination';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    name: 'ModifyRole',
    created() {
      if (this.$route.query.roleInfo) {
        this.roleData = this.$route.query.roleInfo;
      }
    },
    data() {
      return {
        roleData: {
          name: '',
          description: '',
          postRoleId: ''
        }
      }
    },
    methods: {
      //角色编辑
      roleAddSubmit() {
        this.$post('/systemUserController/savePostRole', {
          postRoleId: this.roleData.postRoleId,
          name: this.roleData.name,
          description: this.roleData.description
        }).then((rsp) => {
          this.$alert('修改成功！', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.$router.push({
              path: '/orderManage/userRoleManage'
            });
          });
        });
      }
    },
    components: {
      Table,
      TitlePlate,
      Input,
      Pagination,
      Breadcrumb
    }
  }
</script>

<style scoped lang="less">
  .add-role {
    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
      .title {
        font-size: 18px;
      }
    }
    .role-man {
      text-align: left;
      .iconfont {
        margin: 0 15px;
        color: #f7626f;
        font-size: 18px;
      }
    }
    .terminal-info-box {
      margin-top: 32px;
    }
    .red-star {
      color: #f00;
    }
    .condition-item {
      position: relative;
      margin: 10px 0;
      padding: 0 0 0 110px;
      .label-wrds {
        position: absolute;
        width: 110px;
        line-height: 32px;
        font-size: 14px;
        text-align: right;
        left: 0;
      }
      .condition-input {
        width: 100%;
      }
    }
    .role-setup-info {
      height: 250px;
      border: 1px solid #dfdfdf;
    }
    .foot-btn {
      width: 100%;
      padding: 24px 0;
      background: #fafafa;
      border: 1px solid #dcdcdc;
      border-top: none;
      text-align: center;
      .btns {
        display: inline-block;
        padding: 3px 30px;
        margin: 0 10px;
        border: 0;
        background-color: #fa0000;
        color: #fff;
        font-size: 14px;
        border-radius: 3px;
        line-height: 28px;
        cursor: pointer;
        text-decoration: none;
        &:hover {
          background-color: #e20606;
        }
        &:disabled {
          color: #fff;
          background-color: #f25555;
          cursor: default;
        }
      }
    }

  }

</style>
