<template>
  <div class="supplier-data-maintain">
    <!-- 中间背景图片 -->
    <div class="img-bg">
      <div class="info"></div>
    </div>
    <!-- 中间背景图片 -->


    <!-- 搜索 -->
    <div class="box-1200">
      <div class="search fn-clear">
        <InputWithSelect :placeholderText="'请输入供货商名称或编码查询'" class="fn-left" @search="search" :isHideSelect="true"
                         :placeholder="placeholder"/>
        <div class="fn-left category-more" @click="isShowMoreCondition = !isShowMoreCondition">更多条件 <i
          v-show="isShowMoreCondition" class="iconfont">&#xe607;</i><i
          v-show="!isShowMoreCondition" class="iconfont">&#xe608;</i></div>
      </div>
    </div>

    <!-- 条件搜索 -->
    <div class="box-1200 condition-search" v-show="isShowMoreCondition">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="condition-item">
            <label class="label-wrds">省份：</label>
            <AreaSelect :value.sync="orderQueryData.commonRegionId"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">供货商类型：</label>
            <Select :value.sync="orderQueryData.type" :options="supplierTypeList"/>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="condition-item">
            <label class="label-wrds">供货商状态：</label>
            <Select :value.sync="orderQueryData.statusCd" :options="supplierStatusList"/>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="box-1200 tabs-list">
      <div class="order-titl fn-clear">
        <div class="fn-left btn-checkbox">
          <TitlePlate title="供货商资料维护列表"/>
        </div>
        <div class="buttons fn-right">
          <button class="btns" @click="addSupplier('新增')"><i class="iconfont">&#xe642;</i> 新增供货商</button>
          <button class="btns" @click="batchUnfreezeSupplier"><i class="iconfont">&#xe6bd;</i> 批量激活</button>
          <button class="btns" @click="batchFreezeSupplier"><i class="iconfont">&#xe60c;</i> 批量冻结</button>
          <button class="btns" @click="batchDeleteSupplier"><i class="iconfont">&#xe610;</i> 批量删除</button>
        </div>
      </div>
      <Table :isSelection="true" :table-title="tableTitle" :table-data="tableData" @selectionChange="selectionChange"/>
      <Pagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @pageChanged="pageChanged"/>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Input from '@/components/Input';
  import Select from '@/components/Select';
  import DatePicker from '@/components/DatePicker';
  import InputWithSelect from '@/components/InputWithSelect';
  import TitlePlate from '@/components/TitlePlate';
  import Table from '@/components/Table';
  import DeviceInfo from '@/components/DeviceInfo';
  import Pagination from '@/components/Pagination';
  import ChooseMerchants from '@/components/ChooseMerchants';
  import AreaSelect from '@/components/AreaSelect';

  export default {
    name: 'SupplierDataMaintain',
    created() {
      this.qrySupplierList();
    },
    data() {
      return {
        placeholder: '输入供货商编码或供货商名称查询',
        //供货商类型
        supplierTypeList: [{
          value: '1001',
          label: '厂商'
        }, {
          value: '1002',
          label: '国代'
        }, {
          value: '1003',
          label: '省代'
        }, {
          value: '1004',
          label: '其他'
        }],
        //供货商状态
        supplierStatusList: [{
          value: '1000',
          label: '有效'
        }, {
          value: '1001',
          label: '停用'
        }],

        tableTitle: [{
          label: '省份',
          prop: 'commonRegionName'
        }, {
          label: '供货商名称',
          prop: 'supplierName',
          width: 150
        }, {
          label: '供货商编码',
          prop: 'supplierCode'
        }, {
          label: '供货商类型',
          prop: 'supplierTypeName'
        }, {
          label: '联系人',
          prop: 'linkMan',
          width: 80
        }, {
          label: '联系电话',
          prop: 'linkNbr'
        }, {
          label: '公司电话',
          prop: 'supplierPhone'
        }, {
          label: '公司传真',
          prop: 'supplierFax'
        }, {
          label: '状态',
          prop: 'statusCdName',
          width: 80
        }, {
          label: '操作',
          prop: 'remarks',
          width: 220,
          render: (h, params) => {
            return h({
              template: `<div>
                <el-button class="delete-btn" v-if="data.row.statusCd === '1001'" @click="unfreezeSupplier([data.row.supplierId])">激活</el-button>
                <el-button class="delete-btn" v-if="data.row.statusCd === '1000'" @click="freezeSupplier([data.row.supplierId])">冻结</el-button>
                <el-button class="delete-btn" @click="addSupplier('修改', data.row)">修改</el-button>
                <el-button :disabled="data.row.statusCd === '1001'" class="delete-btn" @click="deleteSupplier([data.row.supplierId])">删除</el-button>
                <el-button class="delete-btn" @click="detailSupplier(data.row)">详情</el-button>
              </div>`,
              data() {
                return {
                  data: params
                }
              },
              methods: {
                freezeSupplier: (val) => {
                  this.freezeSupplier(val);
                },
                unfreezeSupplier: (val) => {
                  this.unfreezeSupplier(val);
                },
                deleteSupplier: (val) => {
                  this.deleteSupplier(val);
                },
                addSupplier: (title, val) => {
                  this.addSupplier(title, val);
                },
                detailSupplier: (val) => {
                  this.detailSupplier(val);
                },
              }
            });
          }
        }],
        tableData: [],
        paymentCtatusCd: '', //付款状态CD
        qryOpmOrderList: [], //查询返回的数据
        orderQueryData: {
          offerNameOrCode: '',
          commonRegionId: '',
          type: '',
          statusCd: ''
        },
        isShowMoreCondition: false, //是否显示更多条件
        selectList: [],
        total: 0, //列表总数
        pageSize: 10, //每页展示条数
        currentPage: 1 //当前页
      }
    },
    methods: {
      search(obj) {
        this.orderQueryData.isCentman = obj.type;
        this.orderQueryData.offerNameOrCode = obj.value;
        this.qrySupplierList()
      },
      qrySupplierList(curPage, pageSize) {
        this.currentPage = curPage || 1;
        this.$post('/orderPlacingMeetingController/querySupplierList', {
          commonRegionId: this.orderQueryData.commonRegionId,
          supplierNameOrCode: this.orderQueryData.offerNameOrCode,
          supplierType: this.orderQueryData.type,
          statusCd: this.orderQueryData.statusCd,
          pageSize: pageSize || 10,
          curPage: curPage || 1
        }).then((rsp) => {
          this.tableData = rsp.rows;
          this.total = rsp.totalSize;
        })
      },
      selectionChange(val) {
        this.selectList = val;
      },
      batchFreezeSupplier() {
        let supplierList = [],
          flag = false;
        if (!this.selectList.length) {
          this.$msgBox({
            type: 'info',
            title: '操作提示',
            content: '请选择需要冻结的供货商'
          }).catch(() => {
            // console.log('cancel');
          });
        } else {
          _.map(this.selectList, function (item) {
            if (item.statusCd == '1001') {
              flag = true;
              return;
            }
            supplierList.push(item.supplierId);
          })
        }
        if (flag) {
          this.$msgBox({
            type: 'info',
            title: '操作提示',
            content: '请选择需要冻结的有效供货商'
          }).catch(() => {
            // console.log('cancel');
          });
        } else {
          this.freezeSupplier(supplierList);
        }
      },
      batchUnfreezeSupplier() {
        let supplierList = [],
          flag = false;
        if (!this.selectList.length) {
          this.$msgBox({
            type: 'info',
            title: '操作提示',
            content: '请选择需要激活的供货商'
          }).catch(() => {
            // console.log('cancel');
          });
        } else {
          _.map(this.selectList, function (item) {
            if (item.statusCd == '1000') {
              flag = true;
              return;
            }
            supplierList.push(item.supplierId);
          })
        }
        if (flag) {
          this.$msgBox({
            type: 'info',
            title: '操作提示',
            content: '请选择需要激活的有效供货商'
          }).catch(() => {
            // console.log('cancel');
          });
        } else {
          this.unfreezeSupplier(supplierList);
        }
      },
      batchDeleteSupplier() {
        let supplierList = [],
          flag = false;
        if (!this.selectList.length) {
          this.$msgBox({
            type: 'info',
            title: '操作提示',
            content: '请选择需要删除的供货商'
          }).catch(() => {
            // console.log('cancel');
          });
        } else {
          _.map(this.selectList, function (item) {
            if (item.statusCd == '1001') {
              flag = true;
              return;
            }
            supplierList.push(item.supplierId);
          })
        }
        if (flag) {
          this.$msgBox({
            type: 'info',
            title: '操作提示',
            content: '请选择需要删除的有效供货商'
          }).catch(() => {
            // console.log('cancel');
          });
        } else {
          this.deleteSupplier(supplierList);
        }
      },

      freezeSupplier(val) {
        this.$post('/orderPlacingMeetingController/freezeSupplier', {
          supplierIds: val
        }).then((rsp) => {
          this.$msgBox({
            type: 'success',
            title: '操作提示',
            content: '冻结成功'
          }).catch(() => {
            // console.log('cancel');
          });
          this.qrySupplierList(this.currentPage);
        })
      },
      unfreezeSupplier(val) {
        this.$post('/orderPlacingMeetingController/unfreezeSupplier', {
          supplierIds: val
        }).then((rsp) => {
          this.$msgBox({
            type: 'success',
            title: '操作提示',
            content: '激活成功'
          }).catch(() => {
            // console.log('cancel');
          });
          this.qrySupplierList(this.currentPage);
        })
      },
      deleteSupplier(val, index) {
        this.$msgBox({
          type: 'info',
          title: '操作提示',
          isShowConfimrBtn: true,
          cancelBtnText: '取消',
          content: '确定要删除该供货商吗？'
        }).then(() => {
          this.$post('/orderPlacingMeetingController/deleteSupplier', {
            supplierIds: val
          }).then((rsp) => {
            this.$msgBox({
              type: 'success',
              title: '操作提示',
              content: '删除成功'
            }).catch(() => {
              // console.log('cancel');
            });
            this.qrySupplierList(this.currentPage);
          })
        }).catch(() => {
          // console.log('cancel');
        });
      },
      addSupplier(title, val) {
        if (title === '新增') {
          this.$router.push({
            path: '/orderManage/addSupplierData',
            query: {
              operation: 'add'
            }
          });
        } else {
          sessionStorage.setItem('supplierId', JSON.stringify(val));
          this.$router.push({
            path: '/orderManage/addSupplierData',
            query: {
              operation: 'modify'
            }
          });
        }

      },
      detailSupplier(val) {
        sessionStorage.setItem('supplierId', JSON.stringify(val));
        this.$router.push({
          path: '/orderManage/detailsSupplierData'
        });
      },
      pageChanged(curPage) {
        this.qrySupplierList(curPage);
      }
    },
    components: {
      Breadcrumb,
      Input,
      Select,
      DatePicker,
      InputWithSelect,
      TitlePlate,
      Table,
      DeviceInfo,
      Pagination,
      ChooseMerchants,
      AreaSelect
    }
  }
</script>

<style lang="less">
  .supplier-data-maintain {
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
      background: #6e42ef url('../assets/images/manage-bg.jpg') no-repeat center bottom;
      overflow: hidden;
    }
    /*中间背景图片*/

    /* 条件搜索 */
    .title-plate {
      margin-top: 13px;
      padding: 8px 0;
      border-bottom: 2px solid #e5e5e5;
    }

    .btn-checkbox {
      input {
        display: none;
      }
      input + label {
        padding-left: 22px;
        background: url('../assets/images/checkbox.png') no-repeat left center;
        font-size: 14px;
        cursor: pointer;
      }
      input:checked + label {
        background: url('../assets/images/checkedbox.png') no-repeat left center;
      }
    }

    .search {
      margin: 17px auto;
    }

    .category-more {
      height: 22px;
      margin: 5px 0 0 20px;
      padding: 0 5px;
      line-height: 22px;
      background-color: #fff;
      border: 0;
      color: #333;
      text-decoration: none;
      cursor: pointer;
      &:active, &:focus, &:hover {
        color: #f82134;
      }
      .iconfont {
        font-size: 12px;
      }
    }
    /* 条件搜索 */
    .tabs-list {
      margin: 0 auto 20px;
    }
    .order-titl {
      height: 28px;
      margin: 15px 0 8px;
      line-height: 28px;
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
    .v_table .delete-btn {
      background: none;
    }
  }
</style>
