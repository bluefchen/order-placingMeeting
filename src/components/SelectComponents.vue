<template>
  <div class="vue_select-components">
    <div class="el-popover-box">
      <el-popover :placement="placement" :width="width" height="200" trigger="click" v-model="visible">
        <div class="popover-box" v-show="model === 'letter' || model === 'single'">
          <div class="popover-padding">
            <div class="fn-clear popover-head-list" v-show="model === 'letter'">
              <div class="all fn-left">全部：</div>
              <div class="first-letter-list fn-left">
                <ul>
                  <li :class="{'checked': checkedIndex === null}" @click="showAllLetterFilter">所有品牌</li>
                  <li :class="{'checked': checkedIndex === index}" @click="firstLetterFilter(item, index)" v-for="(item, index) in firstLetterList" :key="index">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="popover-item-list fn-clear" :class="{'ml40': model === 'letter'}">
              <ul>
                <li v-show="showAllLetter || item.firstLetter === firstLetter" @click="checkedPopover(item, index)" v-for="(item, index) in list">{{item.label}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="popover-box" v-show="model === 'multi'">
          <div class="popover-header fn-clear">
            <div class="popover-header-title fn-left">已选条件：</div>
            <div class="popover-header-checkedlist fn-left">
              <ul>
                <li v-for="(item, index) in checkedPopoverTextList">{{item.label}}<span @click="delPopText(item, index)" class="iconfont">&#xe633;</span></li>
              </ul>
            </div>
            <div class="fn-right popover-header-notice">（可多选）</div>
          </div>
          <div class="popover-padding">
            <div class="popover-item-list fn-clear">
              <ul>
                <li :class="{'checked': item.checked}" @click="checkedPopoverText(item, index)" v-for="(item, index) in list" :key="index">{{item.label}}</li>
              </ul>
            </div>
          </div>
          <div class="popover-btn">
            <button class="btn-cancel" @click="visible = false">取消</button>
            <button class="btn-submit" @click="saveCheckedPop">确定</button>
          </div>
        </div>

        <Select :disabled="true" v-if="model === 'letter' || model === 'single'" :value.sync="copyValue" :clearable="true" slot="reference" :options="list"/>
        <Select :disabled="true" v-if="model === 'multi'" :value.sync="copyValue" slot="reference"/>

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
        type: String,  //letter：带字母搜索，single：单选， multi多选
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
      if(this.model === 'multi'){
        this.valueList = this.value ? this.value.split("，") : [];
        _.forEach(this.valueList, (val, valIndex) => {
          _.forEach(this.list, (item, index) => {
            if(item.label === val){
              item.checked = true;
              this.checkedPopoverTextList.push(item);
            }
          })

        })
      }
    },
    data() {
      return {
        firstLetterList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        visible: false,
        checkedIndex: null,
        copyValue: this.value,
        firstLetter: null,
        showAllLetter: true,
        checkedPopoverTextList: []
      }
    },
    methods: {
      checkedPopover(item, index){
        this.visible = false;
        this.$emit('update:value', item.value);
      },
      checkedPopoverText(item, index){
        if(!item.checked){
          item.checked = true;
          this.checkedPopoverTextList.push(item);
        }
      },
      delPopText(val, index){
        this.checkedPopoverTextList.splice(index, 1);
        _.forEach(this.list, (item, index) => {
          if(val.label === item.label){
            item.checked = false;
          }
        })
      },
      saveCheckedPop(){
        this.copyValue = '';
        this.visible = false;
        _.forEach(this.checkedPopoverTextList, (item, index) => {
          if(index === this.checkedPopoverTextList.length - 1){
            this.copyValue += item.label;
          }else{
            this.copyValue += item.label + '，';
          }
        });
        this.$emit('update:value', this.copyValue);
      },
      firstLetterFilter(item, index){
        this.firstLetter = item;
        this.checkedIndex = index;
        this.showAllLetter = false;
      },
      showAllLetterFilter(){
        this.checkedIndex = null,
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
        if(this.model === 'multi'){
          this.checkedPopoverTextList = [];
          this.valueList = this.value ? this.value.split("，") : [];
          _.forEach(this.valueList, (val, valIndex) => {
            _.forEach(this.list, (item, index) => {
              if(item.label === val){
                item.checked = true;
                this.checkedPopoverTextList.push(item);
              }
            })

          })
        }
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
    padding: 0;
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
    .el-select .el-input.is-disabled .el-input__inner, .el-input.is-disabled .el-input__icon, .el-input.is-disabled .el-input__inner{
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
    .popover-btn{
      width: 100%;
      text-align: center;
      padding: 10px 0;
      button{
        width: 70px;
        height: 24px;
        text-align: center;
        border: 1px solid #f01919;
        cursor: pointer;
        border-radius: 5px;
        margin: 0 10px;
      }
      .btn-cancel{
        background: #ffe4e4;
        color: #f01919;
      }
      .btn-submit{
        background: #f01919;
        color: #fff;
      }
    }
    .popover-padding{
      padding: 10px;
    }
    .popover-header{
      background: #fafafa;
      min-height: 35px;
      height: auto;
      line-height: 35px;
      border-bottom: 1px dashed #e5e5e5;
      .popover-header-title{
        width: 70px;
        margin-left: 10px;
        color: #777677;
        text-align: right;
      }
      .popover-header-notice{
        width: 90px;
        margin-right: 10px;
        text-align: right;
        color: #1bb7ff;
      }
      .popover-header-checkedlist{
        width: calc(100% - 180px);
        margin-top: 7px;
        ul{
          li{
            position: relative;
            float: left;
            display: inline-block;
            height: 20px;
            margin-right: 4px;
            margin-bottom: 5px;
            padding: 0 20px 0 5px;;
            background: #fff;
            border: 1px solid #c7c7c7;
            line-height: 20px;
            span{
              position: absolute;
              display: block;
              right: 3px;
              top: 5px;
              width: 12px;
              height: 12px;
              color: #a3a3a3;
              text-align: center;
              font-size: 12px;
              line-height: 12px;
              cursor: pointer;
            }
          }
        }
      }
    }
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
            &.checked{
              background: #f01919;
              color: #fff;
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
          &.checked{
            background: #f01919;
            color: #fff;
            border: 1px solid #f01919;
          }
        }
      }
      &.ml40{
        margin-left: 40px;
      }
    }
  }
  

</style>
