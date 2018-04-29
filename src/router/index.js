import Vue from 'vue'
import Router from 'vue-router'
import Order from '@/views/Order'
import OrderIndex from '@/views/OrderIndex'
import OrderModel from '@/views/OrderModel'
import SpecialModel from '@/views/SpecialModel'

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
        },{
          path: 'orderModel',
          name: 'orderModel',
          component: OrderModel,
          meta: {
            title: '机型管理-订购会'
          },
        },{
          path: 'specialModel',
          name: 'specialModel',
          component: SpecialModel,
          meta: {
            title: '特种机型分配量维护'
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
