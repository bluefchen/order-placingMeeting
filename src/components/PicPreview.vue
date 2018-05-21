<template>
  <div>
    <div class="pic-zoom">
      <PicZoom
        url="http://img12.360buyimg.com/n1/s450x450_jfs/t17149/173/1779654602/189601/335d3d90/5ad8628dN03dc292f.jpg"
        big-url="http://img12.360buyimg.com//n0/jfs/t17149/173/1779654602/189601/335d3d90/5ad8628dN03dc292f.jpg"/>
    </div>
    <div class="slide">slide</div>
  </div>
</template>

<script>
  import PicZoom from 'vue-piczoom';

  export default {
    name: 'PicPreview',
    data() {
      return {}
    },
    methods: {},
    components: {
      PicZoom
    }
  }
</script>

<style scoped lang="less">
  .pic-zoom {
    width: 380px;
    height: 390px;
    border: 1px solid #ddd;
  }
</style>
