<template>
  <el-cascader
    :options="options"
    @active-item-change="handleItemChange"
    :props="props"
    @change="handleChange"
    v-model="selectedOpt"
  ></el-cascader>
</template>

<script>
  export default {
    name: 'Cascader',

    props: {
      level: {
        type: String
      },
      regionId: {
        type: String
      }
    },

    created() {
      this.$post('/commonCfgController/getCommonRegionTreeList').then((rsp) => {
        this.areaList = rsp;
        this.selectedOpt = [this.regionId]; //设置默认值
      });
    },
    data() {
      return {
        areaList: [],
        props: {
          value: 'areaId',
          children: 'cities'
        },
        selectedOpt: []
      }
    },
    computed: {
      options() {
        let arr = [];
        _.forEach(this.areaList, (item) => {
          if(this.level === 'province'){
            arr.push({
              label: item.name,
              areaId: item.id
            })
          }else{
            arr.push({
              label: item.name,
              areaId: item.id,
              cities: []
            })
          }
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
        if(this.level === 'province'){
          var flag = {}
          this.areaList.forEach( (opt,index) =>{
            if(item[item.length - 1] === opt.id){
              flag = opt;
              return;
            };
          });
          this.$emit('change', flag.id, flag.name);
        }else{
          this.$emit('change', item[item.length - 1]);
        }
      }
    }
  }
</script>

<style scoped lang="less">

</style>
