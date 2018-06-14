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
      <TableList :tableTitle="tab.tableTitle" :tableHeader="tab.tableHeader" :tableData="orderPlacingMeetingList"/>
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>

</template>

<script>
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';
  import TableList from '@/components/TableList';

  export default {
    name: 'OrderManageIndex',
    created() {
      this.$post('/systemUserController/loginInitialize', {
        userId: this.$route.query.userId,
        token: this.$route.query.token
      }).then((rsp) => {
        localStorage.setItem('user', JSON.stringify(rsp));
      });
      this.queryOrderPlacingMeetingList();
    },
    data() {
      return {
        tab: {
          tableHeader: [{
            label: '订购会编码',
            prop: 'opMeetingNo',
            colSpan: 14,
            render: (h, params) => {
              return h({
                template: '<p>订购会编码：{{data.row.opMeetingNo}}</p>',
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          }, {
            label: '操作',
            prop: 'operation',
            colSpan: 10,
            render: (h, params) => {
              return h({
                template: `<div class="text-right"><button @click="delOrder(data.row)" class="btn-del" v-show="data.row.statusCd === '1000'"><span class="iconfont">&#xe610;</span></button></div>`,
                data: function () {
                  return {
                    data: params,
                  }
                },
                methods: {
                  delOrder: (item) => {
                    this.delOrder(item)
                  }
                }
              })
            }
          }],
          tableTitle: [{
            label: '订购会名称',
            prop: 'opmName',
            colSpan: 8,
            render: (h, params) => {
              return h({
                template: `
                <div class="photo-wrap fn-clear" @click="detailOrder(data.row)">
                  <div class="photo-pic fn-left">
                    <img v-if="!!data.row.logoUrl" :src="'http://192.168.74.17:9086/orderPlacingMeeting/commonCfgController/download?url=' + data.row.logoUrl" alt="">
                    <img v-else src="./static/img/icon-dhhui-default.jpg" alt="">
                  </div>
                  <div class="photo-info fn-right">
                    <p class="name">{{data.row.opmName}}</p>
                    <p class="date">{{data.row.startDt}} 至 {{data.row.endDt}}</p>
                  </div>
                </div>
                `,
                data: function () {
                  return {
                    data: params
                  }
                },
                methods: {
                  detailOrder(item) {
                    localStorage.setItem('opMeeting', JSON.stringify(item));
                    this.$router.push({path: '/order/orderIndex'});
                  }
                }
              })
            }
          }, {
            label: '省份',
            prop: 'commonRegionName',
            colSpan: 3
          }, {
            label: '参与供货商',
            prop: 'supplierCnt',
            colSpan: 3
          }, {
            label: '参与零售商',
            prop: 'retailerCnt',
            colSpan: 3
          }, {
            label: '订购会状态',
            prop: 'statusCd',
            colSpan: 3,
            render: (h, params) => {
              return h({
                template: `
                <div>
                  <p class="device-type not-start" v-if="data.row.statusCd === '1000'">未开始</p>
                  <p class="device-type underway" v-if="data.row.statusCd === '1001'">进行中</p>
                  <p class="device-type done" v-if="data.row.statusCd === '1002'">已完成</p>
                </div>
               `,
                data: function () {
                  return {
                    data: params,
                  }
                }
              })
            }
          }, {
            label: '操作',
            prop: 'operation',
            colSpan: 4,
            render: (h, params) => {
              return h({
                template: `
                  <div style="text-align: right;">
                    <button class="edit-btn" @click="compileOrder('修改', data.row)">编辑订购会</button>
                    <button class="edit-btn" v-show="data.row.statusCd === '1000' || data.row.statusCd === '1001'" @click="detailOrder(data.row)">管理订购会</button>
                  </div>
                `,
                data: function () {
                  return {
                    data: params,
                  }
                },
                methods: {
                  compileOrder: (title, item) => {
                    this.compileOrder(title, item)
                  },
                  detailOrder(item) {
                    localStorage.setItem('opMeeting', JSON.stringify(item));
                    this.$router.push({path: '/order/orderIndex'});
                  }
                }
              })
            }
          }]
        },

        orderTypeList: [{
          value: '1000',
          label: '未开始'
        }, {
          value: '1001',
          label: '进行中'
        }, {
          value: '1002',
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
        this.$msgBox({
          type: 'info',
          title: '操作提示',
          isShowConfimrBtn: true,
          content: '确定要删除该订货会吗？'
        }).then(() => {
          this.$post('/orderPlacingMeetingController/deleteOrderPlacingMeeting', {
            opMeetingId: item.opMeetingId
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.queryOrderPlacingMeetingList();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除!'
          });
        });
      }
    },
    components: {
      TitlePlate,
      Table,
      Pagination,
      TableList
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
      height: 250px;
      background: #6e42ef;
    }
    .img-bg .info {
      width: 1200px;
      height: 250px;
      margin: 0 auto;
      background: #6e42ef url('../assets/images/manage-bg.jpg') no-repeat right bottom;
      overflow: hidden;
    }
    /*中间背景图片*/

    /* 条件搜索 */
    .search {
      margin: 15px auto;
      height: 30px;
      .search-input {
        width: 310px;
        height: 30px;
        input {
          width: 238px;
          height: 28px;
          padding: 0 5px;
          line-height: 28px;
          border: 1px solid #d0d0d0;
          &:hover {
            border-color: #c0c4cc;
            & + .search-btn {
              width: 60px;
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
              background: #f8f8f8;
              border: none;
              border: 1px solid #ff7a7a;
              border-left: none;
              cursor: pointer;
            }
          }
          & + .search-btn {
            width: 60px;
            height: 30px;
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
          height: 30px;
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
          text-align: right;
          white-space: nowrap;
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
