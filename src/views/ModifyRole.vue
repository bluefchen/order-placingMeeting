<template>
  <div class="modify-role">
    <!-- 我的位置 -->
    <div class="my-location">
      <div class="box-1200">
        <Breadcrumb :list="['系统维护', '角色管理', '角色编辑']"/>
      </div>
    </div>
    <div class="box-1200">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="角色编辑"/>
      </div>
      <!-- 角色编辑 -->
      <el-form :model="roleData" :rules="rules" ref="roleData" label-width="100px" class="demo-ruleForm">
        <div class="role-setup-info">
            <div class="terminal-info-box">
              <el-row :gutter="20">
                <el-col :span="8" :offset="2">
                  <el-form-item prop="name">
                    <div class="condition-item">
                      <label class="label-wrds"><span class="red-star">*</span> 角色名称：</label>
                      <Input :value.sync="roleData.name"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="18" :offset="2">
                  <el-form-item prop="description" class="textarea">
                    <div class="condition-item">
                      <label class="label-wrds"><span class="red-star">*</span> 角色说明：</label>
                      <Input type="textarea" :value.sync="roleData.description"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
        </div>
        <div class="foot-btn">
          <el-form-item>
            <el-button size="small" type="primary" @click="roleAddSubmit('roleData')">保&nbsp;存</el-button>
          </el-form-item>
        </div>
      </el-form>
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
      this.roleData = JSON.parse(sessionStorage.getItem('postRoleId'));
    },
    data() {
      return {
        roleData: {
          name: '',
          description: ''
        },
        rules: {
          name: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' },
            { min: 1, max: 200, message: '长度不能超过200个字符', trigger: 'change' }
          ],
          description: [
            { required: true, message: '角色说明不能为空', trigger: 'blur' },
            { min: 1, max: 250, message: '长度不能超过250个字符', trigger: 'change' }
          ]
        },
      }
    },
    methods: {
      //角色编辑
      roleAddSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post('/systemUserController/savePostRole', {
              postRoleId: this.roleData.postRoleId,
              name: this.roleData.name,
              description: this.roleData.description
            }).then((rsp) => {
              if(rsp.resultCode == '0'){
                this.$msgBox({
                  type: 'success',
                  title: '操作提示',
                  content: '修改成功！'
                }).catch(() => {
                  this.$router.push({
                    path: '/orderManage/roleManage'
                  });
                });
              }else{
                this.$msgBox({
                  type: 'error',
                  title: '操作提示',
                  content: rsp.resultMsg
                }).catch(() => {
                  // console.log('cancel');
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
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

<style lang="less">
  .modify-role {
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
    }

    /*表单验证*/
    .el-form-item{
      margin-bottom: 0;
      margin-left: -100px;
    }
    .el-form-item__content{
      line-height: 24px;
    }
    .el-form-item__error {
      position: absolute;
      padding-top: 0;
      top: 42px;
      left: 114px;
    }
    .el-form-item{
      &.textarea{
        .el-form-item__error{
          top: 62px;
        }
      }
    }
  }

</style>
