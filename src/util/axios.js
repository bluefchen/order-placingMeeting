import Vue from 'vue'
import axios from 'axios'
import {Loading} from 'element-ui'
import './mockdb'

axios.defaults.timeout = 5 * 1000;
axios.defaults.baseURL = 'http://127.0.0.1';
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

let loadingInstance;
axios.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    lock: true,
    text: '数据加载中，请稍后...',
    // spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return config
}, error => {
  loadingInstance.close();
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  loadingInstance.close();
  return response.data;
}, error => {
  loadingInstance.close();
  return Promise.reject(error);
});

export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        res => {
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
