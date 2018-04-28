import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page1 from '@/views/page1'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'helloWorld'
      }
    }, {
      path: '/page1',
      name: 'page1',
      component: Page1,
      meta: {
        title: '订购会管理'
      },
      children: [
        {
          path: 'helloWorld',
          name: 'helloWorld',
          component: HelloWorld
        }
      ]
    }, {
      path: '/page2',
      name: 'page2',
      component: Page1,
      meta: {
        title: '基础数据维护'
      }
    }
  ]
})
