<template>
  <el-date-picker
    :type="type"
    :start-placeholder="stratPlaceholder"
    :end-placeholder="endPlaceholder"
    :range-separator="rangeSeparator"
    :default-time="defaultTime"
    :clearable="clearable"
    :disabled="disabled"
    :editable="editable"
    :size="size"
    :format="format"
    :value-format="valueFormat"
    @change="onChange"
    v-model="copyValue">
  </el-date-picker>
</template>

<script>
  export default {
    name: 'DatePicker',
    props: {
      value: {
        type: Array
      },
      type: {
        type: String,
        default: 'daterange'
      },
      stratPlaceholder: {
        type: String,
        default: '开始时间'
      },
      endPlaceholder: {
        type: String,
        default: '结束时间'
      },
      rangeSeparator: {
        type: String,
        default: '至'
      },
      defaultTime: {
        type: Array,
        default: function () {
          return ['00:00:00', '23:59:59'];
        }
      },
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      editable: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'mini'
      },
      format: {
        type: String,
        default: 'yyyy-MM-dd'
      },
      valueFormat: {
        type: String,
        default: 'yyyy-MM-dd'
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
  .el-range-editor--small.el-input__inner{
    width: 100%;
    height: 28px;
    border-radius: 0;
  }
  .el-range-editor.is-active, .el-range-editor.is-active:hover {
    border-color: #ff7a7a;
  }
  .el-range-editor.el-input__inner{
    padding: 2px 10px;
  }

  .el-date-table td.end-date span, .el-date-table td.start-date span {
    background-color: #ff7a7a;
  }

  .el-date-table td.today span, .el-date-table td.available:hover {
    color: #ff7a7a;
  }
</style>
