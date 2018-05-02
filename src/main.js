// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './util/axios'

import _ from 'lodash';
Vue.prototype._ = _;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/reset.css'
import '@/assets/css/common.css'

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  if (to.path === "/user") {
    next("/login");
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
