import Vue from 'vue'
import axios from 'axios'
import {Loading} from 'element-ui'
// import './mockdb'

axios.defaults.timeout = 5 * 1000;
let user = JSON.parse(sessionStorage.getItem('user'));
// axios.defaults.baseURL = 'http://192.168.74.17:8080/orderPlacingMeeting/';
axios.defaults.baseURL = '/orderPlacingMeeting/';
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  'token': _.get(user, 'token')
};

let loadingInstance;
axios.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    lock: true,
    text: '数据加载中，请稍后...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return config
}, error => {
  setTimeout(function () {
    loadingInstance.close();
  }, 50);
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  setTimeout(function () {
    loadingInstance.close();
  }, 50);
  return response.data;
}, error => {
  setTimeout(function () {
    loadingInstance.close();
  }, 50);
  if (error.response.status === 504 || error.response.status === 404) {
    setTimeout(function () {
      Vue.prototype.$msgBox({
        type: 'error',
        title: '操作提示',
        content: '您请求资源URL不存在!'
      }).catch(() => {
        // console.log('cancel');
      });
    }, 50);
  } else {
    setTimeout(function () {
      Vue.prototype.$msgBox({
        type: 'error',
        title: '操作提示',
        content: '服务器出小差了，请稍后再试!'
      }).catch(() => {
        // console.log('cancel');
      });
    }, 50);
  }
  return Promise.reject(error);
});

export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, 'param=' + JSON.stringify(params))
      .then(
        res => {
          if (!res.success) {
            setTimeout(function () {
              Vue.prototype.$msgBox({
                type: 'abnormal',
                title: '操作提示',
                content: res.msg,
                errStack: res.error
              }).catch(() => {
                // console.log('cancel');
              });
            }, 50);
          }
          resolve(res.data)
        },
        err => {
          reject(err.data)
        }
      )
      .catch(err => {
        reject(err.data)
      })
  })
}

export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

Vue.prototype.$axios = axios;
Vue.prototype.$get = fetchGet;
Vue.prototype.$post = fetchPost;
