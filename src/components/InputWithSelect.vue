<template>
  <div class="v_input-with-select">
    <el-input :placeholder="placeholder" v-model="input" class="input-with-select" :size="size">
      <el-select v-model="select" slot="prepend" placeholder="请选择" v-if="!isHideSelect" :clearable="clearable">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button slot="append" @click="handleSearch()">搜 索</el-button>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: 'InputWithSelect',
    created() {
      this.placeholder = this.placeholderText ? this.placeholderText : '输入终端编码或名称搜索';
    },
    props: {
      size: {
        type: String,
        default: 'small'
      },
      placeholderText: {
        type: String
      },
      options: {
        type: Array,
        default: function () {
          return [{
            label: '集采',
            value: 'Y'
          }, {
            label: '社采',
            value: 'N'
          }]
        }
      },
      isHideSelect: {
        type: Boolean //是否隐藏下拉框
      },
      clearable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        input: '',
        select: '',
      }
    },
    methods: {
      handleSearch() {
        this.$emit('search', {
          value: this.input,
          type: this.select
        });
      }
    },
  }
</script>

<style lang="less">
  .input-with-select {
    width: 480px;
  }

  .el-select .el-input {
    min-width: 100px;
  }

  .el-input-group__append, .el-input-group__prepend {
    border-radius: 0;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #f8f8f8;
  }

  .input-with-select .el-input-group__append {
    background-color: #f82134;
    border-color: #f82134;
    color: #fff;
  }

  .el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #ff7a7a;
  }

  .el-select-dropdown {
    border: none;
  }

  .el-select-dropdown__item.selected {
    color: #fff;
    font-weight: normal;
    background-color: #f13939;
  }
</style>
