import Vue from 'vue'
import axios from 'axios'
import './mockdb'

axios.defaults.baseURL = 'http://127.0.0.1';
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
});

Vue.prototype.$axios = axios;
