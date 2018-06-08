<template>
  <div class="order_manage-index">
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info"></div>
    </div>
    <!-- 中间背景图片 -->

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <TitlePlate class="fn-left" title="订购会列表"/>
        <div class="order-type">
          <div class="order-type-text">订购会状态：</div>
          <el-select class="order-type-input" v-model="orderQueryData.statusCd" @change="queryOrderPlacingMeetingList()"
                     placeholder="请选择">
            <el-option
              v-for="item in orderTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="search fn-clear">
        <div class="fn-left search-input">
          <input type="text" v-model="orderQueryData.opmName" placeholder="输入订货会名称搜索">
          <button class="search-btn fn-right" @click="queryOrderPlacingMeetingList()">确定</button>
        </div>
        <div class="fn-right search-query">
          <button @click="compileOrder('新增')"><span class="iconfont">&#xe6a8;</span>&nbsp;新增订购会</button>
        </div>
      </div>

      <table width="100%" cellspacing="0" cellpadding="0" class="table">
        <thead>
        <tr>
          <th width="40%">订购会名称</th>
          <th width="11%">省份</th>
          <th width="11%">参与供货商</th>
          <th width="11%">参与零售商</th>
          <th width="11%">订购会状态</th>
          <th width="16%">操作</th>
        </tr>
        </thead>
      </table>
      <ul class="ul-tab">
        <li class="li-list" v-for="(item, index) in orderPlacingMeetingList">
          <p class="p-line fn-clear">
            <span class="fn-left date-color">订购会编码：{{item.opMeetingNo}}</span>
            <span class="fn-right text-right">
              <button class="btn-del" v-show="item.statusCd === '1000'" @click="delOrder(item)"><span class="iconfont">&#xe610;</span></button>
            </span>
          </p>
          <div class="tabs fn-clear">
            <dl class="dll wid40 fn-left">
              <div class="device-wrap fn-clear" @click="detailOrder(item)">
                <div class="device-pic fn-left">
                  <img :src="item.logoUrl" alt="">
                </div>
                <div class="device-info fn-right">
                  <p class="name">{{item.opmName}}</p>
                  <p class="date">{{item.startDt}}-{{item.endDt}}</p>
                </div>
              </div>
            </dl>
            <dl class="dll wid11 fn-left"><p>{{item.commonRegionName}}</p></dl>
            <dl class="dll wid11 fn-left"><p>{{item.supplierCnt}}家</p></dl>
            <dl class="dll wid11 fn-left"><p>{{item.retailerCnt}}家</p></dl>
            <dl class="dll wid11 fn-left"><p class="device-type"
                                             :class="{'not-start':item.statusCd === '1000', 'underway':item.statusCd === '1001', 'done':item.statusCd === '1002'}">
              {{item.statusCd | statusCdFilter}}</p></dl>
            <dl class="dll wid16 fn-left">
              <button class="updown-btn" v-show="item.statusCd === '1000'" @click="compileOrder('修改', item)">编辑订购会
              </button>
            </dl>
          </div>
        </li>
      </ul>
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>

</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';

  export default {
    name: 'OrderManageIndex',
    created() {
      this.query = this.$route.query;
      // this.$post('/systemUserController/loginInitialize', {
      //   userId: _.get(this.query, 'userId'),
      //   token: _.get(this.query, 'token')
      // }).then(data => {
      //   localStorage.setItem('user', JSON.stringify(data));
      // });
      this.queryOrderPlacingMeetingList();
    },
    data() {
      return {
        orderTypeList: [{
          value: 1000,
          label: '未开始'
        }, {
          value: 1001,
          label: '进行中'
        }, {
          value: 1002,
          label: '已结束'
        }],
        orderQueryData: {
          opmName: '',
          statusCd: ''
        },
        orderPlacingMeetingList: [],
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      queryOrderPlacingMeetingList(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/orderPlacingMeetingController/queryOrderPlacingMeetingList', {
          opmName: this.orderQueryData.opmName,
          statusCd: this.orderQueryData.statusCd,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.orderPlacingMeetingList = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      pageChanged(curPage) {
        this.queryOrderPlacingMeetingList(curPage);
      },
      detailOrder(item) {
        localStorage.setItem('opMeeting', JSON.stringify(item));
        this.$router.push({path: '/order/orderIndex'});
      },
      compileOrder(title, item) {
        if (title === '新增') {
          this.$router.push({
            path: '/orderManage/orderConfig',
            query: {
              operation: 'add'
            }
          });
        } else {
          localStorage.setItem('opMeeting', JSON.stringify(item));
          this.$router.push({
            path: '/orderManage/orderConfig',
            query: {
              operation: 'modify'
            }
          });
        }
      },
      delOrder(item) {
        this.$confirm('确定要删除该订货会吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$post('/orderPlacingMeetingController/deleteOrderPlacingMeeting', {
            opMeetingId: item.opMeetingId
          }).then((rsp) => {
            console.log(rsp.resultMsg, rsp.resultCode);
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.queryOrderPlacingMeetingList(this.currentPage);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    components: {
      TitlePlate,
      Table,
      Pagination
    },
    filters: {
      statusCdFilter: function (value) {
        switch (value) {
          case '1000':
            return '未开始';
            break;
          case '1001':
            return '进行中';
            break;
          case '1002':
            return '已结束';
            break;
        }
      }
    }
  }
</script>

<style lang="less">
  .order_manage-index {
    /*中间背景图片*/
    .img-bg {
      width: 100%;
      height: 401px;
      background: #6e42ef;
    }
    .img-bg .info {
      width: 1200px;
      height: 401px;
      margin: 0 auto;
      background: #6e42ef url('../assets/images/manage-bg.jpg') no-repeat right bottom;
      overflow: hidden;
    }
    /*中间背景图片*/

    /* 条件搜索 */
    .search {
      margin: 10px auto;
      height: 28px;
      .search-input {
        width: 310px;
        height: 26px;
        input {
          width: 238px;
          height: 26px;
          padding: 0 5px;
          line-height: 26px;
          border: 1px solid #d0d0d0;
          &:hover {
            border-color: #c0c4cc;
            & + .search-btn {
              width: 60px;
              height: 28px;
              background: #f8f8f8;
              border: none;
              border: 1px solid #c0c4cc;
              border-left: none;
              cursor: pointer;
            }
          }
          &:focus {
            border-color: #ff7a7a;
            & + .search-btn {
              width: 60px;
              height: 28px;
              background: #f8f8f8;
              border: none;
              border: 1px solid #ff7a7a;
              border-left: none;
              cursor: pointer;
            }
          }
          & + .search-btn {
            width: 60px;
            height: 28px;
            background: #f8f8f8;
            border: none;
            border: 1px solid #d5d5d5;
            border-left: none;
            cursor: pointer;
          }
        }
      }

      .search-query {
        button {
          width: 92px;
          height: 28px;
          background: #fa0000;
          color: #fff;
          border: none;
          cursor: pointer;
          span {
            vertical-align: middle;
          }
        }
      }
    }
    /* 条件搜索 */

    .el-range-editor.el-input__inner {
      height: 32px;
    }
    .el-date-editor .el-range__icon, .el-date-editor .el-range-separator, .el-date-editor .el-range__close-icon {
      line-height: 26px;
    }
    .el-input__inner {
      border-radius: 0;
    }

    .my-location {
      height: 30px;
      line-height: 30px;
      background-color: #f6f6f6;
    }

    .tabs-list {
      margin: 0 auto 20px;
    }
    .order-titl {
      position: relative;
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
      padding-bottom: 3px;
      border-bottom: 2px solid #e5e5e5;
      .order-type {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100px;
        height: 21px;
        padding-left: 100px;
        border: 1px solid #e5e5e5;
        border-bottom: none;
        .order-type-text {
          position: absolute;
          left: 0;
          top: 0;
          width: 80px;
          height: 21px;
          padding: 0 10px;
          background: #f5f5f5;
          border-right: 1px solid #e5e5e5;
          line-height: 22px;
          white-space: nowrap;
          text-align: right;
        }
        .order-type-input {
          height: 21px;
          vertical-align: top;
          line-height: 21px;
          .el-input__inner {
            height: 21px;
            padding-right: 15px;
            border: none;
            line-height: 21px;
            font-size: 12px;
          }
          .el-input__suffix {
            right: 0;
          }
          input {
            vertical-align: top;
          }
        }
      }
    }

    .buttons .btns {
      padding: 0 16px;
      margin-left: 2px;
      border: 0;
      background-color: #fa0000;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      line-height: 28px;
      cursor: pointer;
    }
    .buttons .btns:hover {
      background-color: #e20606;
    }

    .table thead tr {
      height: 40px;
      background-color: #efefef;
      border: 1px solid #dcdcdc;
      color: #131212;
    }
    .table tbody tr {
      height: 90px;
      border-bottom: 1px solid #dcdcdc;
    }
    .table thead tr th {
      text-align: center;
    }

    .li-list {
      margin-top: 16px;
      border: 1px solid #e0e0e0;
      &:hover {
        border: 1px solid #f00;
      }
    }
    .p-line {
      height: 35px;
      line-height: 35px;
      background: #f8f8f8;
      border-bottom: 1px solid #e0e0e0;
      .date-color {
        color: #807e7e;
      }
      .btn-del {
        background: none;
        border: none;
        cursor: pointer;
        .iconfont {
          color: #8f8f8f;
          font-size: 16px;
          padding: 0;
        }
        &:hover {
          .iconfont {
            color: #f82134;
            font-size: 16px;
            padding: 0;
          }
        }
      }
      span {
        width: calc(33% - 20px);
        padding: 0 10px;
        b {
          margin-right: 15px;
        }
      ;
      }
    }
    .tabs dl {
      height: 90px;

    }
    .tabs .dll {
      line-height: 90px;
      text-align: center;
    }
    .wid40 {
      width: 40%;
    }
    .wid16 {
      width: 16%;
    }
    .wid11 {
      width: 11%;
    }

    .device-type {
      margin: 21px auto 0;
      width: 44px;
      height: 44px;
      line-height: 44px;
      border: 2px solid;
      border-radius: 50%;
      &.not-start {
        background: #ffecec;
        border-color: #f00;
        color: #f00;
      }
      &.underway {
        background: #eeffec;
        border-color: #47c044;
        color: #47c044;
      }
      &.done {
        background: #f8f8f8;
        border-color: #bcbcbc;
        color: #bcbcbc;
      }
    }

    .updown-btn {
      padding: 2px 5px;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      border-radius: 3px;
    }
    .updown-btn:hover {
      color: #f82134;
      border: 1px solid #f82134;
      border-radius: 3px;
      text-decoration: none;
      cursor: pointer;
    }
    .red {
      color: #f82134;
    }
    .text-center {
      text-align: center;
    }
    .text-right {
      text-align: right;
    }
    .pd5 {
      padding: 5px;
    }
    .p-line span {
      color: #aaa;
    }
    .p-line span b {
      color: #333;
    }

    .device-wrap {
      padding: 10px;
      text-align: left;
      cursor: pointer;
      .device-pic {
        width: 85px;
        height: 71px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .device-info {
        box-sizing: border-box;
        width: calc(100% - 85px);
        padding-top: 6px;
        padding-left: 15px;
        line-height: 30px;
        color: #333;
        .name {
          height: 26px;
          line-height: 26px;
          color: #050505;
          font-size: 14px;
          font-weight: bold;
          &:hover {
            color: #ed0000;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }

  }

  .el-input__inner {
    height: 20px;
    line-height: 20px;
  }

  .el-input-group__prepend {
    background-color: #f8f8f8;
  }

  .el-input-group__append {
    background-color: #f82134;
    border-color: #f82134;
    color: #fff;
  }

  .el-input.is-active {
    .el-input__inner {
      border-color: #ff7a7a;
      &:focus {
        border-color: #ff7a7a;
      }
    }
  }

  .el-select-dropdown {
    border: none;
  }

  .el-select-dropdown__item.selected {
    color: #fff;
    font-weight: normal;
    background-color: #f13939;
  }
</style>
