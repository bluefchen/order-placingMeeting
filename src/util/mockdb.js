// const Mock = require('mockjs')

import Mock from 'mockjs'

Mock.mock(new RegExp('/api/data'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    'channelList|5': [
      {
        orgId: '@id', //渠道ID
        channelName: '@cword(6)' //渠道名称
      }
    ]
  }
});
