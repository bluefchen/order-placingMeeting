import Vue from 'vue'
import Router from 'vue-router'

const Order = () => import('@/views/Order');
const OrderIndex = () => import('@/views/OrderIndex');
const OrderModel = () => import('@/views/OrderModel');
const SpecialModel = () => import('@/views/SpecialModel');
const ImportModelAdd = () => import('@/views/ImportModelAdd');
const ImportModelDel = () => import('@/views/ImportModelDel');
const ImportSpecialModel = () => import('@/views/ImportSpecialModel');
const ImportPickupAdd = () => import('@/views/ImportPickupAdd');
const OrderPickupData = () => import('@/views/OrderPickupData');
const OrderPickupGoodsConfirm = () => import('@/views/OrderPickupGoodsConfirm');
const DepositConfigure = () => import('@/views/DepositConfigure');
const OrderFormDetail = () => import('@/views/OrderFormDetail');
const DepositAddRecord = () => import('@/views/DepositAddRecord');
const DepositImport = () => import('@/views/DepositImport');
const CyjDepositAddRecord = () => import('@/views/CyjDepositAddRecord');
const CyjImport = () => import('@/views/CyjImport');
const PolicyManage = () => import('@/views/PolicyManage');
const ImportPolicyAdd = () => import('@/views/ImportPolicyAdd');
const PolicyList = () => import('@/views/PolicyList');
const OrderCompositeQuery = () => import('@/views/OrderCompositeQuery');
const Orderdetail = () => import('@/views/Orderdetail');
const PreferentialPolicySettlement = () => import('@/views/PreferentialPolicySettlement');
const TerminalMaintain = () => import('@/views/TerminalMaintain');
const AddTerminalMaintain = () => import('@/views/AddTerminalMaintain');
const DetailTerminalMaintain = () => import('@/views/DetailTerminalMaintain');
const OrderManage = () => import('@/views/OrderManage');
const OrderManageIndex = () => import('@/views/OrderManageIndex');
const SupplierDataMaintain = () => import('@/views/SupplierDataMaintain');
const AddSupplierData = () => import('@/views/AddSupplierData');
const DetailsSupplierData = () => import('@/views/DetailsSupplierData');
const SetailerDataMaintain = () => import('@/views/SetailerDataMaintain');
const AddSetailerData = () => import('@/views/AddSetailerData');
const DetailsSetailerData = () => import('@/views/DetailsSetailerData');

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'orderIndex'
      }
    }, {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        title: '订购会'
      },
      children: [{
        path: 'orderIndex',
        name: 'orderIndex',
        component: OrderIndex,
        meta: {
          title: '首页-订购会'
        },
      }, {
        path: 'orderModel',
        name: 'orderModel',
        component: OrderModel,
        meta: {
          title: '机型管理-订购会'
        },
      }, {
        path: 'specialModel',
        name: 'specialModel',
        component: SpecialModel,
        meta: {
          title: '特种机型分配量维护'
        },
      }, {
        path: 'importModelAdd',
        name: 'importModelAdd',
        component: ImportModelAdd,
        meta: {
          title: '机型导入新增'
        },
      }, {
        path: 'importModelDel',
        name: 'importModelDel',
        component: ImportModelDel,
        meta: {
          title: '机型导入新增'
        },
      }, {
        path: 'importSpecialModel',
        name: 'importSpecialModel',
        component: ImportSpecialModel,
        meta: {
          title: '特种机型导入新增'
        },
      }, {
        path: 'importPickupAdd',
        name: 'importPickupAdd',
        component: ImportPickupAdd,
        meta: {
          title: '订单批量导入'
        },
      }, {
        path: 'orderPickupData',
        name: 'orderPickupData',
        component: OrderPickupData,
        meta: {
          title: '订单提货数据维护'
        },
      }, {
        path: 'orderPickupGoodsConfirm',
        name: 'orderPickupGoodsConfirm',
        component: OrderPickupGoodsConfirm,
        meta: {
          title: '订单提货确认'
        },
      }, {
        path: 'depositConfigure',
        name: 'depositConfigure',
        component: DepositConfigure,
        meta: {
          title: '定金配置'
        },
      }, {
        path: 'orderFormDetail',
        name: 'orderFormDetail',
        component: OrderFormDetail,
        meta: {
          title: '订单详情'
        },
      }, {
        path: 'depositAddRecord',
        name: 'depositAddRecord',
        component: DepositAddRecord,
        meta: {
          title: '定金补录'
        },
      }, {
        path: 'depositImport',
        name: 'depositImport',
        component: DepositImport,
        meta: {
          title: '定金导入'
        },
      }, {
        path: 'cyjDepositAddRecord',
        name: 'cyjDepositAddRecord',
        component: CyjDepositAddRecord,
        meta: {
          title: '诚意金补录'
        },
      }, {
        path: 'cyjImport',
        name: 'cyjImport',
        component: CyjImport,
        meta: {
          title: '诚意金导入'
        },
      }, {
        path: 'policyManage',
        name: 'policyManage',
        component: PolicyManage,
        meta: {
          title: '政策投入'
        },
      }, {
        path: 'importPolicyAdd',
        name: 'importPolicyAdd',
        component: ImportPolicyAdd,
        meta: {
          title: '上传政策'
        },
      }, {
        path: 'policyList',
        name: 'policyList',
        component: PolicyList,
        meta: {
          title: '政策列表'
        },
      }, {
        path: 'orderCompositeQuery',
        name: 'orderCompositeQuery',
        component: OrderCompositeQuery,
        meta: {
          title: '订单综合查询'
        },
      }, {
        path: 'orderdetail',
        name: 'orderdetail',
        component: Orderdetail,
        meta: {
          title: '订单详情'
        },
      }, {
        path: 'preferentialPolicySettlement',
        name: 'preferentialPolicySettlement',
        component: PreferentialPolicySettlement,
        meta: {
          title: '优惠政策结算'
        },
      }]
    }, {
      path: '/TerminalMaintain',
      name: 'terminalMaintain',
      component: TerminalMaintain,
      meta: {
        title: '终端维护'
      }
    }, {
      path: '/AddTerminalMaintain',
      name: 'addTerminalMaintain',
      component: AddTerminalMaintain,
      meta: {
        title: '新增/修改商品'
      }
    }, {
      path: '/DetailTerminalMaintain',
      name: 'detailTerminalMaintain',
      component: DetailTerminalMaintain,
      meta: {
        title: '详情或预览'
      }
    }, {
      path: '/OrderManage',
      name: 'orderManage',
      component: OrderManage,
      meta: {
        title: '订购会管理'
      },
      children: [{
        path: 'OrderManageIndex',
        name: 'orderManageIndex',
        component: OrderManageIndex,
        meta: {
          title: '首页-订购会管理'
        }
      }, {
        path: 'SupplierDataMaintain',
        name: 'supplierDataMaintain',
        component: SupplierDataMaintain,
        meta: {
          title: '供货商资料维护'
        }
      }, {
        path: 'AddSupplierData',
        name: 'addSupplierData',
        component: AddSupplierData,
        meta: {
          title: '新增/修改供货商'
        }
      }, {
        path: 'DetailsSupplierData',
        name: 'detailsSupplierData',
        component: DetailsSupplierData,
        meta: {
          title: '供货商详情'
        }
      }, {
        path: 'SetailerDataMaintain',
        name: 'setailerDataMaintain',
        component: SetailerDataMaintain,
        meta: {
          title: '零售商资料维护'
        }
      }, {
        path: 'AddSetailerData',
        name: 'addSetailerData',
        component: AddSetailerData,
        meta: {
          title: '新增/修改零售商'
        }
      }, {
        path: 'DetailsSetailerData',
        name: 'detailsSetailerData',
        component: DetailsSetailerData,
        meta: {
          title: '零售商详情'
        }
      }]
    }
  ]
})
