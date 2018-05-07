<template>
  <el-select
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    :size="size"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    :multiple-limit="multipleLimit"
    @change="onChange"
    v-model="copyValue">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: 'Select',
    props: {
      value: {
        type: [String, Number]
      },
      options: {
        type: Array,
        require: true
      },
      placeholder: {
        type: String
      },
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'small'
      },
      multiple: {
        type: Boolean,
        default: false
      },
      collapseTags: {
        type: Boolean,
        default: false
      },
      multipleLimit: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        copyValue: this.value
      }
    },
    methods: {
      onChange(val) {
        this.$emit('update:value', val);
      }
    }
  }
</script>

<style lang="less">
  .el-select .el-input.is-focus .el-input__inner, .el-select .el-input__inner:focus {
    border-color: #ff7a7a;
  }
</style>
