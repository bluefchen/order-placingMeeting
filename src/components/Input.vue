<template>
  <el-input
    :type="type"
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
      type: {
        type: String,
        default: 'input'
      },
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
        default: 'mini'
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
    watch: {
      'value': {
        handler: function (val) {
          this.copyValue = val;
        },
        deep: true
      }
    },
    methods: {
      onChange(val) {
        if(this.type === "number"){
          this.$emit('update:value', _.toNumber(val));
        }else{
          this.$emit('update:value', val);
        }
      }
    }
  }
</script>

<style lang="less">
  .el-input__inner, .el-textarea__inner {
    &:hover {
      border-color: #c0c4cc;
    }
    &:focus {
      border-color: #ff7a7a;
    }
    border-radius: 0;
  }

  .el-textarea {
    vertical-align: top;
    textarea {
      resize: none;
    }
  }
</style>
