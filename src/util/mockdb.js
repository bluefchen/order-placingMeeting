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

//10、查询终端品牌接口
Mock.mock(new RegExp('/orderPlacingMeetingController/queryOfferBrandList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  'data|10-20': [{
    'brandCd': '@id',
    'brandName': '@cword(3, 5)'
  }]
});

//11、查询终端型号接口
Mock.mock(new RegExp('/orderPlacingMeetingController/queryOfferModelList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  'data|10-20': [{
    'offerModelId': '@id',
    'offerModelName': '@word(5, 10)'
  }]
});

//17、查询订货会机型接口
Mock.mock(new RegExp('/orderPlacingMeetingController/queryOpMeetingOfferList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    'total|1-99': 1,
    'rows|5-10': [{
      'offerId': '@id',
      'offerCode': '@id',
      'offerName': '@cword(3, 5)',
      'brandCd': '@id',
      'brandName': '@cword(3, 5)',
      'offerModelId': '@id',
      'offerModelName': '@word(5, 10)',
      'isCentman|1': ['Y', 'N'],
      'salePrice|1-100.1-2': 1,
      'offerQty|1-100': 1,
      'isSpecial|1': ['Y', 'N'],
      'offerPic': {
        'offerPicId': '@id',
        'offerPicUrl|1': ['assets/images/telephone1.jpg', 'assets/images/telephone2.jpg', 'assets/images/telephone3.jpg', 'assets/images/telephone4.jpg'],
        'offerPicUrl2': '@url',
        'offerPicUrl3': '@url',
        'offerPicUrl4': '@url',
        'offerPicUrl5': '@url',
        'offerPicUrl6': '@url'
      }
    }]
  }
});

//18、批量导入新增机型数据解析接口
Mock.mock(new RegExp('/orderPlacingMeetingController/analyzeInsertOpMeetingOfferList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    'totalCnt|1-100': 100, //总记录条数
    'successCnt|1-100': 100, //成功条数
    'failCnt|1-100': 1, //失败条数
    'rows|10': [{
      'offerId': '@id', //终端ID
      'offerCode': '@id', //终端编码
      'offerName': '@cword()', //终端名称
      'brandCd': '@cword()', //终端品牌
      'brandName': '@cword()', //终端品牌名称
      'offerModelId': '@id', //终端型号
      'offerModelName': '@cword()', //终端型号名称
      'isCentman|1': ['Y', 'N'], //产品类型，Y-集采，N社采
      'costPrice|100-1000': 100, //终端价格
      'offerQty|100-1000': 100, //上架数量
      'isSpecial|1': ['Y', ''], //是否特种机型，Y-是
      'isSuccess|1': ['Y', 'N'], //校验结果，Y-成功，N-失败
      'resultMsg': '@cword()' //校验信息
    }]
  }
});

//19、批量导入新增机型接口
Mock.mock(new RegExp('/orderPlacingMeetingController/batchInsertOpmOffer'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});
