<template>
  <el-select
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    :size="size"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    :multiple-limit="multipleLimit"
    :filterable="filterable"
    :default-first-option="defaultFirstOption"
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
    name: 'AreaSelect',
    created() {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.$post('/commonCfgController/getCommonRegionTreeList', {
        commonRegionId: this.withoutPostRole ? '' : (_.get(this.user, 'postRoleId') === this.$global.postRoleId ? _.get(this.user, 'commonReginId') : '')
      }).then((rsp) => {
        this.commonRegionList = rsp;
        _.forEach(this.commonRegionList, (item) => {
          this.options.push({
            value: item.id,
            label: item.name
          })
        });
      });
    },
    props: {
      value: {
        type: [String, Number]
      },
      placeholder: {
        type: String
      },
      clearable: {
        type: Boolean,
        default: true
      },
      filterable: {
        type: Boolean,
        default: true
      },
      defaultFirstOption: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'mini'
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
      },
      withoutPostRole: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        user: null,
        copyValue: this.value,
        options: [],
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
        this.$emit('update:value', val);
      }
    }
  }
</script>

<style lang="less">
  .el-input--small .el-input__inner {
    height: 28px;
    line-height: 28px;
  }

  .el-select .el-input.is-focus .el-input__inner, .el-select .el-input__inner:focus {
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
