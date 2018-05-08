<template>
  <el-cascader
    :options="options"
    @active-item-change="handleItemChange"
    :props="props"
  ></el-cascader>
</template>

<script>
  export default {
    name: 'Cascader',
    created() {
      this.$post('/commonCfgController/getCommonRegionTreeList').then((rsp) => {
        this.areaList = rsp;
      });
    },
    data() {
      return {
        areaList: [],
        props: {
          value: 'label',
          children: 'cities'
        }
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
        debugger;
        if (val.id && !val.cities.length) {
          this.$post('/commonCfgController/getCommonRegionTreeList', {
            commonRegionId: val.id
          }).then((rsp) => {
            let arr = [];
            _.forEach(rsp, (item) => {
              arr.push({
                label: item.name,
                areaId: item.id
              })
            });
            val.cities = arr;
          });
        }
      }
    }
  }
</script>

<style scoped lang="less">

</style>
