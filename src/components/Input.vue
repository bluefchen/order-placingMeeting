<template>
  <el-input
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    :size="size"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    @change="onChange"
    v-model="copyValue">
  </el-input>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      value: {
        type: [String, Number]
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
      prefixIcon: {
        type: String
      },
      suffixIcon: {
        type: String
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
  .el-input__inner {
    &:hover {
      border-color: #c0c4cc;
    }
    &:focus {
      border-color: #ff7a7a;
    }
  }
</style>
