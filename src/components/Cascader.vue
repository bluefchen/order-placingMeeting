<template>
  <el-cascader
    :options="options"
    :props="props"
    :separator="separator"
    :size="size"
    :disabled="disabled"
    :clearable="clearable"
    :expand-trigger="expandTrigger"
    :show-all-levels="showAllLevels"
    :change-on-select="changeOnSelect"
    v-model="copyValue"
    @active-item-change="handleItemChange"
    @change="onChange"
  ></el-cascader>
</template>

<script>
  export default {
    name: 'Cascader',
    props: {
      value: {
        type: String
      },
      separator: {
        type: String,
        default: '/'
      },
      size: {
        type: String,
        default: 'small'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      expandTrigger: {
        type: String,
        default: 'click'
      },
      showAllLevels: {
        type: Boolean,
        default: false
      },
      changeOnSelect: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.$post('/commonCfgController/getCommonRegionTreeList').then((rsp) => {
        this.areaList = rsp;
      });
    },
    data() {
      return {
        copyValue: this.value,
        props: {
          value: 'areaId',
          children: 'cities'
        },
        areaList: []
      }
    },
    computed: {
      options() {
        let arr = [];
        _.forEach(this.areaList, (item) => {
          arr.push({
            label: item.name,
            areaId: item.id,
            cities: []
          })
        });
        return arr;
      }
    },
    methods: {
      handleItemChange(val) {
        if (val) {
          this.$post('/commonCfgController/getCommonRegionTreeList', {
            commonRegionId: val
          }).then((rsp) => {
            let arr = [];
            _.forEach(rsp, (item) => {
              arr.push({
                label: item.name,
                areaId: item.id
              })
            });
            _.forEach(this.options, (item) => {
              if (item.areaId == val) {
                item.cities = arr;
              }
            });
          });
        }
      },
      onChange(val) {
        this.$emit('update:value', val[val.length - 1]);
      }
    }
  }
</script>

<style lang="less">
  .el-cascader-menu__item.is-active, .el-cascader-menu__item:focus:not(:active) {
    color: #fff;
    font-weight: normal;
    background-color: #f13939;
  }
</style>
