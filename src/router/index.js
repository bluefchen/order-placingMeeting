import Vue from 'vue'
import Router from 'vue-router'

const Order = () => import('@/views/Order');
const OrderIndex = () => import('@/views/OrderIndex');
const OrderModel = () => import('@/views/OrderModel');
const SpecialModel = () => import('@/views/SpecialModel');
const ImportModel = () => import('@/views/ImportModel');

Vue.use(Router);

export default new Router({
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
          path: 'importModel',
          name: 'importModel',
          component: ImportModel,
          meta: {
            title: '机型导入'
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
    }
  ]
})
