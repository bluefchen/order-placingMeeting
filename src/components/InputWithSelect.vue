<template>
  <div class="v_input-with-select">
    <el-input placeholder="输入终端编码或名称搜索" v-model="input" class="input-with-select" size="small">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="集采" value="Y"></el-option>
        <el-option label="社采" value="N"></el-option>
      </el-select>
      <el-button slot="append" @click="handleSearch()">搜 索</el-button>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: 'InputWithSelect',
    props: {
      search: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        input: '',
        select: ''
      }
    },
    methods: {
      handleSearch() {
        this.search({
          value: this.input,
          type: this.select
        });
      }
    },
  }
</script>

<style lang="less">
  .v_input-with-select {
    .input-with-select {
      width: 480px;
    }

    .el-select .el-input {
      width: 90px;
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
  }
</style>
