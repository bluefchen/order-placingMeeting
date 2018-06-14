// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import {Loading, Message} from 'element-ui'
Vue.use(ElementUI);

import App from './App';
import router from './router';
import _ from 'lodash';
Vue.prototype._ = _;

import MessageBox from './util/msgbox';
Vue.use(MessageBox);

import './util/axios';

import '@/assets/css/reset.css';
import '@/assets/css/common.css';


router.beforeEach((to, from, next) => {
  if(to.path === '/order/depositAddRecord' || to.path === '/order/cyjDepositAddRecord'){
    let opmDepositInfo = JSON.parse(localStorage.getItem('opmDeposit'));
    if(opmDepositInfo.depositType == 1){
      Message.error({message: '当前配置不能补录!'});
      return;
    }else if(opmDepositInfo.depositType == 2){
      next({path: "/order/depositAddRecord"});
    }else if(opmDepositInfo.depositType == 3){
      // next('/order/cyjDepositAddRecord');
      next({path: "/order/cyjDepositAddRecord"});
    }
  } else {
    document.title = to.meta.title || document.title;
    next();
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
