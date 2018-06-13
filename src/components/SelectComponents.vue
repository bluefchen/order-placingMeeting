<template>
  <div class="vue_select-components">
    <div class="el-popover-box">  
      <el-popover :placement="placement" :width="width" trigger="click" v-model="visible">
        <div class="popover-box">
          <div class="fn-clear popover-head-list">
            <div class="all fn-left">全部：</div>
            <div class="first-letter-list fn-left">
              <ul>
                <li>所有品牌</li>
                <li v-for="(item, index) in firstLetterList" :key="index">{{item}}</li>
              </ul>
            </div>
          </div>
          <div class="popover-item-list fn-clear">
            <ul>
              <li :class="{'checked': checkedIndex===index}" @click="checkedPopover(item, index)" v-for="(item, index) in list">{{item.label}}</li>
            </ul>
          </div>
        </div>
        <input type="text" :value.sync="value" slot="reference" readonly />
      </el-popover>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'SelectComponents',
    props: {
      placement: {
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
        value: '',
        checkedIndex: null,
      }
    },
    methods: {
      checkedPopover(item, index){
        this.value = item.label;
        console.log(item, index);
        this.checkedIndex = index;
        this.visible = false;
        this.$emit('update:value', item);
      }
    },
    components: {
    }
  }
</script>

<style lang="less">
  
  .el-popover{
    border: 1px solid #d6d6d6;
    background: #fff;
    border-radius: 0;
  }
  .checked{

  }

  .vue_select-components{
    .el-popover-box{
      width: 100%;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      position: relative;
      &:after{
        display: block;
        content: '\E605';
        position: absolute;
        right: 0;
        top: 0;
      }
      input{
        width: 100%;
        height: 28px;
        line-height: 28px;
        border: 1px solid #dcdfe6;
        cursor: pointer;
        position: relative;
        text-indent: 15px;
      }
    }
  }

  .popover-box{
    width: 100%;
    font-size: 12px;
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
      margin-left: 40px;
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
            border: 1px solid #f01919;
          };
        }
      }
    }
    .checked{
      background: #f01919;
      color: #fff;
      border: 1px solid #f01919;
    }
  }
  

</style>
