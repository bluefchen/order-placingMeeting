<template>
  <div class="title" @click="handleClick">{{title}}</div>
</template>

<script>
  export default {
    name: 'TitlePlate',
    props: {
      title: {
        type: String,
        required: true
      }
    },
    methods: {
      handleClick() {
        this.$emit('update', this.title);
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  .title {
    min-width: 5px;
    min-height: 20px;
    margin-left: 5px;
    padding-left: 10px;
    background: url('../assets/images/red-line.png') no-repeat 0 center;
    font-size: 18px;
    color: #000;
    font-weight: 800;
  }
</style>
