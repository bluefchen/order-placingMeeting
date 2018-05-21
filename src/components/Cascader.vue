<template>
  <el-cascader
    :options="options"
    @active-item-change="handleItemChange"
    :props="props"
    @change="handleChange"
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
          value: 'areaId',
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
              if(item.areaId == val){
                item.cities = arr;
              }
            });
          });
        }
      },
      handleChange(item){
        this.$emit('change', item[item.length - 1]);
      }
    }
  }
</script>

<style scoped lang="less">

</style>
