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
const LoginIn = () => import('@/views/LoginIn');

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
      children: [
        {
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
        },  {
          path: 'depositImport',
          name: 'depositImport',
          component: DepositImport,
          meta: {
            title: '定金导入'
          },
        },{
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
        }
      ]
    }, {
      path: '/page2',
      name: 'page2',
      component: Order,
      meta: {
        title: '基础数据维护'
      }
    }, {
      path: '/loginIn',
      name: 'loginIn',
      component: LoginIn,
      meta: {
        title: '登陆页'
      }
    }
  ]
})
