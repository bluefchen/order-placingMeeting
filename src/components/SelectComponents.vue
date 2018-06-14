<template>
  <div class="vue_select-components">
    <div class="el-popover-box">
      <el-popover :placement="placement" :width="width" height="200" trigger="click" v-model="visible">
        <div class="popover-box" v-show="model === 'letter' || model === 'single'">
          <div class="fn-clear popover-head-list" v-show="model === 'letter'">
            <div class="all fn-left">全部：</div>
            <div class="first-letter-list fn-left">
              <ul>
                <li @click="showAllLetterFilter">所有品牌</li>
                <li @click="firstLetterFilter(item)" v-for="(item, index) in firstLetterList" :key="index">{{item}}</li>
              </ul>
            </div>
          </div>
          <div class="popover-item-list fn-clear" :class="{'ml40': model === 'letter'}">
            <ul>
              <li v-show="showAllLetter || item.firstLetter === firstLetter" @click="checkedPopover(item, index)" v-for="(item, index) in list">{{item.label}}</li>
            </ul>
          </div>
        </div>
        <Select :disabled="true" v-if="model === 'letter' || model === 'single'" :value.sync="copyValue" :clearable="true" slot="reference" :options="list"/>
        <Select v-if="model === 'multi'" :value.sync="copyValue" :clearable="true" slot="reference" :options="list"/>
      </el-popover>
      <div class="visible-hide" v-show="visible"></div>
    </div>
  </div>
</template>

<script>
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  export default {
    name: 'SelectComponents',
    props: {
      value: {
        type: [String, Number]
      },
      placement: {
        type: String,
        require: true
      },
      model: {
        type: String,
        require: true
      },
      width: {
        type: Number,
        require: true
      },
      list: {
        type: Array,
        require: true
      }
    },
    created() {
    },
    data() {
      return {
        firstLetterList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        visible: false,
        copyValue: '',
        checkedIndex: null,
        copyValue: this.value,
        firstLetter: null,
        showAllLetter: true,
      }
    },
    methods: {
      checkedPopover(item, index){
        this.visible = false;
        this.$emit('update:value', item.value);
      },
      firstLetterFilter(item){
        this.firstLetter = item;
        this.showAllLetter = false;
      },
      showAllLetterFilter(){
        this.showAllLetter = true;
        this.firstLetter = null;
      }
    },
    components: {
      Input,
      Select
    },
    watch: {
      'value': function(val) {
        this.copyValue = val;
      }
    },
  }
</script>

<style lang="less">
  
  .el-popover{
    border: 1px solid #d6d6d6;
    background: #fff;
    border-radius: 0;
    z-index: 9999;
  }

  .vue_select-components{
    .el-popover-box{
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      .visible-hide{
        background: #000;
        opacity: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        position: fixed;
        left: 0;
        top: 0;
      }
    }
    .el-select .el-input.is-disabled .el-input__inner, .el-input.is-disabled .el-input__icon{
      cursor: pointer;
    }
    .el-input.is-disabled .el-input__inner{
      background: #fff;
      color: #606266;
    }
  }

  .popover-box{
    position: relative;
    width: 100%;
    font-size: 12px;
      z-index: 999;
    .popover-head-list{
      .all{
        width: 40px;
        height: 24px;
        line-height: 24px;
        border: 1px solid #fff;
      }
      .first-letter-list{
        width: calc(100% - 42px);
        line-height: 24px;
        ul{
          width: 100%;
          li{
            display: inline-block;
            float: left;
            width: auto;
            padding: 0 3px;
            margin-right: 4px;
            border: 1px solid #fff;
            cursor: pointer;
            &:hover{
              border: 1px solid #f01919;
            }
          }
        }
      }
    }
    .popover-item-list{
      margin-top: 5px;
      height: 200px;
      overflow: auto;
      ul{
        li{
          float: left;
          display: inline-block;
          padding: 3px 5px;
          margin-right: 10px;
          margin-bottom: 10px;
          border: 1px solid #fff;
          cursor: pointer;
          &:hover{
            background: #f01919;
            color: #fff;
            border: 1px solid #f01919;
          };
        }
      }
      &.ml40{
        margin-left: 40px;
      }
    }
    .checked{
      background: #f01919;
      color: #fff;
      border: 1px solid #f01919;
    }
  }
  

</style>
