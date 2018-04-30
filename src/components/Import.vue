<template>
  <div class="v_import">
    <UploadFile />
  </div>
</template>

<script>
  import UploadFile from '@/components/UploadFile';

  export default {
    name: 'Import',
    props: {},
    data() {
      return {}
    },
    methods: {},
    components: {
      UploadFile
    }
  }
</script>

<style lang="less">
  .v_import {
    margin-top: 20px;
    padding: 20px 10px;

    .leading-btn {
      display: inline-block;
      height: 36px;
      margin-left: 10px;
      padding: 0 35px;
      background-color: #f82134;
      border: 0;
      color: #fff;
      font-size: 14px;
      vertical-align: top;
    }
    .leading-btn i.iconfont {
      font-size: 18px;
      vertical-align: middle;
    }

    .leading-btn.load {
      padding: 0 15px;
      margin-right: 20px;
    }
  }
</style>
