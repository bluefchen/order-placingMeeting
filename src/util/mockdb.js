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

//4、关联的供应商信息接口
Mock.mock(new RegExp('/orderPlacingMeetingController/queryOpmSupplierList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    'totalSize|1-100': 1,
    'rows|10': [{
      supplierId: '@id', //供应商ID
      province: '@province()', //供应商省份
      city: '@city()', //供应商地市
      supplierName: '@cword()', //供应商名称
      supplierType: '', //供应商类型
      supplierTypeName: '@cword()', //供应商类型名称
      linkMan: '@cname()', //联系人
      linkNbr: '', //联系电话
      supplierPhone: '', //公司电话
      supplierFax: '' //公司传真
    }]
  }
});

//5、关联的零售商信息接口
Mock.mock(new RegExp('/orderPlacingMeetingController/queryOpmRetailerList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    'totalSize|1-100': 1,
    'rows|10': [{
      retailerId: '@id', //零售商ID
      province: '@province()', //零售商省份
      city: '@city()', //零售商地市
      retailerName: '@cword()', //零售商名称
      retailerType: '', //零售商类型
      retailerTypeName: '@cword()', //零售商类型名称
      linkMan: '@cname()', //联系人
      linkNbr: '', //联系电话
      retailerPhone: '', //公司电话
      retailerFax: '' //公司传真
    }]
  }
});

//6、供应商列表查询接口
Mock.mock(new RegExp('/orderPlacingMeetingController/querySupplierList'), {
  rsphead: 's',
  success: true,
  code: null,
  msg: null,
  error: null,
  data: {
    'totalSize|1-99': 1,
    'rows|5-10': [{
        'supplierId': '@id',
        'supplierCode': '@id',
        'province': '@province',
        'city': '@city',
        'supplierName': '@cword(4,6)',
        'supplierType|1': [1001, 1002, 1003, 1004],
        'supplierTypeName|1': ['厂商', '国代', '省代', '其他'],
        'linkMan': '@cname',
        'linkNbr': /\d{5,11}/,
        'supplierPhone': /\d{5,9}\-/,
        'supplierFax': /\d{5,9}\-/
    }]

  }
});

//7、零售商列表查询接口
Mock.mock(new RegExp('/orderPlacingMeetingController/queryRetailerList'), {
  rsphead: 's',
  success: true,
  code: null,
  msg: null,
  error: null,
  data: {
    'totalSize|1-99': 1,
    'rows|5-10': [{
        'retailerId': '@id',
        'retailerCode': '@id',
        'province': '@province',
        'city': '@city',
        'retailerName': '@cword(4,6)',
        'retailerType|1': [1001, 1002, 1003],
        'retailerTypeName|1': ['自营厅', '大连锁', '代理商'],
        'linkMan': '@cname',
        'linkNbr': /\d{5,11}/,
        'retailerPhone': /\d{5,9}\-/,
        'retailerFax': /\d{5,9}\-/
    }]

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
    'totalSize|1-100': 1,
    'rows|10': [{
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
      'supplierId': '@id',
      'supplierName': '@cword(3, 5)',
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

//20、批量导入删除机型数据解析接口
Mock.mock(new RegExp('/orderPlacingMeetingController/analyzeDeleteOpmOfferList'), {
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

//21、批量导入删除机型接口
Mock.mock(new RegExp('/orderPlacingMeetingController/batchDeleteOpmOffer'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});

//22、查询特种机型分配量列表接口
Mock.mock(new RegExp('/orderPlacingMeetingController/queryOpmOfferAllotList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    'totalSize|30-99': 1, 
    'rows|5-10': [{
      'opmOaId':'@id',
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
      'commonReginId': '@id',
      'commonRegionName': '@city',
      'supplierId': '@id',
      'supplierName': '@cword(3, 5)',
      'assignQty|1-99': 1,
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

//23、删除特种机型分配信息接口
Mock.mock(new RegExp('/orderPlacingMeetingController/deleteOpmOfferAllot'), {
  rsphead: 's',
  success: true, //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});

//24、批量导入新增机型数据解析
Mock.mock(new RegExp('/orderPlacingMeetingController/analyzeInsertOpmOfferAllotList'), {
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
      'offerId': '@id', //商品ID
      'offerCode': '@id', //商品编码
      'offerName': '@cword()', //商品名称
      'brandCd': '@cword()', //商品品牌
      'brandName': '@cword()', //商品品牌名称
      'offerModelId': '@id', //商品型号
      'offerModelName': '@cword()', //商品型号名称
      'isCentman|1': ['Y', 'N'], //产品类型，Y-集采，N社采
      'salePrice|100-1000': 100, //终端价格
      'offerQty|100-1000': 100, //上架数量
      'commonReginId': '@id', //省份地区ID
      'commonRegionName': '@province()', //省份地区名称
      'supplierId': '@id', //供货商ID
      'supplierName': '@cword()', //供货商名称
      'assignQty|100-1000': 100, //分配量
      'isSuccess|1': ['Y', 'N'], //校验结果，Y-成功，N-失败
      'resultMsg': '@cword()' //校验信息
    }]
  }
});

//25、批量导入新增机型
Mock.mock(new RegExp('/orderPlacingMeetingController/batchInsertOpmOfferAllot'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});

//29、地区查询接口
Mock.mock(new RegExp('/commonCfgController/getCommonRegionTreeList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  'data|30': [{
    'id': '@id',
    'name': '@province()',
    'parentId': '',
    'areaLevel': ''
  }]
});

//30、	批量导入订单数据解析接口
Mock.mock(new RegExp('/opmOrderController/analyzeInsertOpmOrderList'), {
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
      'opmOrderNo': '@id', //订单号
      'offerId': '@id', //商品ID
      'offerCode': '@id', //商品编码
      'offerName': '@cword()', //商品名称
      'brandCd': '@cword()', //商品品牌
      'brandName': '@cword()', //商品品牌名称
      'offerModelId': '', //商品型号
      'offerModelName': '@cword()', //商品型号名称
      'isCentman|1': ['Y', 'N'], //产品类型，Y-集采，N社采
      'salePrice|100-1000': 100, //终端价格
      'supplierId': '', //供货商ID
      'supplierName': '@cword()', //供货商名称
      'retailerId': '', //零售商ID
      'retailerName': '@cword()', //零售商名称
      'offerQty|100-1000': 100, //订购数量
      'remarks': '@cword()', //备注
      'isSuccess|1': ['Y', 'N'], //校验结果，Y-成功，N-失败
      'resultMsg': '@cword()', //校验信息
    }]
  }
});

//31、批量导入订单数据接口
Mock.mock(new RegExp('/opmOrderController/batchInsertOpmOffer'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});

//32、订单提货查询列表接口
Mock.mock(new RegExp('/opmOrderController/queryOpmOrderPickupRecordList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    'totalSize|1-100': 1,
    'rows|5-10': [{
      'opmOrderId': '@id',
      'opMeetingId': '@id',
      'opmOrderNo': '@id',
      'offerId': '@id',
      'offerCode': '@id',
      'offerName': '@cword(3,6)',
      'brandCd': '@id',
      'brandName': '@cword(3,6)',
      'offerModelId': '@id',
      'offerModelName': '@cword(3,6)',
      'isCentman|1': ['Y', 'N'],
      'salePrice|1-100.1-2': 1,
      'supplierId': '@id',
      'supplierName': '@cword(3,6)',
      'retailerId': '@id',
      'retailerName': '@cword(3,6)',
      'offerQty|1-100': 1,
      'pickupGoodsAmount|1-100': 1,
      'remarks': '@cword(8, 30)',
      'offerPic': {
        'offerPicUrl|1': ['assets/images/telephone1.jpg', 'assets/images/telephone2.jpg', 'assets/images/telephone3.jpg', 'assets/images/telephone4.jpg'],
        'offerPicUrl2': '@url',
        'offerPicUrl3': '@url',
        'offerPicUrl4': '@url',
        'offerPicUrl5': '@url',
        'offerPicUrl6': '@url'
      },
      'orderDt': '@date("yyyy-yy-dd HH:mm:ss")',
      'pickupDt': '@date("yyyy-yy-dd HH:mm:ss")'
    }]
  }
});

//35、订单提货确认接口
Mock.mock(new RegExp('/opmOrderController/updateOpmOrderPickupRecord'), {
  rsphead: 's',
  success: true,
  code: null,
  msg: null,
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});

//36、查询供应商信息接口
Mock.mock(new RegExp('/orderPlacingMeetingController/querySupplierById'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'supplierId': '@id',
    'province': '@province()',
    'city': '@city()',
    'supplierName': '@cword(4, 6)',
    'supplierType': '@id',
    'supplierTypeName': '@cword(4,6)',
    'linkMan': '@cname',
    'linkNbr': /\d{5,11}/,
    'supplierPhone|3': /\d{5,9}\-/,
    'supplierFax|3': /\d{5,9}\-/
  }
});

//37、查询零售商信息接口
Mock.mock(new RegExp('/orderPlacingMeetingController/queryRetailerById'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'retailerId': '@id',
    'province': '@province()',
    'city': '@city()',
    'retailerName': '@cword(4, 6)',
    'retailerType': '@id',
    'retailerTypeName': '@cword(4,6)',
    'linkMan': '@cname',
    'linkNbr': /\d{5,11}/,
    'retailerPhone': /\d{5,9}\-/,
    'retailerFax': /\d{5,9}\-/
  }
});

//38、订单查询列表接口
Mock.mock(new RegExp('/opmOrderController/queryOpmOrderList'), {
  'data': {
    'totalSize|1-99': 1,
    'rows|5-10': [{
      'opmOrderId': '@id',
      'opMeetingId': '@id',
      'opmOrderNo': '@id',
      'offerId': '@id',
      'offerCode': '@id',
      'offerName': '@cword(4,10)',
      'brandCd': '@id',
      'brandName': '@cword(4,10)',
      'offerModelId': '@id',
      'offerModelName': '@word(6,10)',
      'isCentman|1': ['Y', 'N'],
      'salePrice|1-100.1-2': 1,
      'supplierId': '@id',
      'supplierName': '@cword(4,10)',
      'retailerId': '@id',
      'retailerName': '@cword(4,10)',
      'offerQty|1-99': 1,
      'pickupGoodsAmount|1-99': 1,
      'paymentStatusCd|1': [1000, 1001, 1002],
      'paymentStatusCdName|1': ['未交定金', '已交定金', '已付款'],
      'statusCd|1': [1000, 1001, 1002],
      'statusCdName|1': ['进行中', '已完成', '已撤销'],
      'remarks':'@cword(15,30)',
      'offerPic': {
        'offerPicUrl|1': ['assets/images/telephone1.jpg', 'assets/images/telephone2.jpg', 'assets/images/telephone3.jpg', 'assets/images/telephone4.jpg'],
        'offerPicUrl2': '@url',
        'offerPicUrl3': '@url',
        'offerPicUrl4': '@url',
        'offerPicUrl5': '@url',
        'offerPicUrl6': '@url'
      },
      'orderDt': '@date("yyyy-yy-dd HH:mm:ss")',
      'pickupDt': '@date("yyyy-yy-dd HH:mm:ss")'
    }]
  }
});

// 40、查询当前配置模式
Mock.mock(new RegExp('/opmDepositController/queryOpmDepositInfo'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'opMeetingId': '@id',
    'provinceCommonRegionId': '@id',
    'provinceCommonRegionName': '@cword(4, 6)',
    'depositType|+1': [1, 2, 3],
    'depositTypeName|+1': ['全额付款', '定金', '诚意金'],
    'depositProportion|1-100': 10,
    'opmRetailerDepositList|8': [{
      'retailerId': '@id',
      'retailerCode': '@id',
      'retailerName': '@cword(4, 6)',
      'retailerType|+1': [1000, 1001, 1002],
      'retailerTypeName|+1': ['自营厅', '大连锁', '代理商'],
      'depositAmount|1-1000': 100
    }]
  }
});

// 41、配置定金模式接口
Mock.mock(new RegExp('/opmDepositController/updateOpmDepositInfo'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});

// 42、查询定金缴纳情况列表接口
Mock.mock(new RegExp('/opmDepositController/queryOpmDepositList'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'totalSize|1-100': 1,
    'rows|5-10': [{
      'opmOrderId':'@id',
      'opMeetingId':'@id',
      'opmOrderNo':'@id',
      'offerId':'@id',
      'offerCode':'@id',
      'offerName':'@cword(4, 6)',
      'brandCd':'@id',
      'brandName':'@cword(4, 6)',
      'offerModelId':'@id',
      'offerModelName': '@cword(4, 6)',
      'isCentman|1': ['Y', 'N'],
      'price|1-1000': 1000,
      'totalAmount|1-1000': 1000,
      'supplierId':'@id',
      'supplierName':'@cword(4, 6)',
      'retailerId':'@id',
      'retailerName':'@cword(4, 6)',
      'offerQty|1-1000': 1000,
      'pickupGoodsAmount|1-1000': 1000,
      'depositProportion|1-100': 100,
      'depositAmount|1-1000': 1000,
      'paymentStatusCd|+1': [1000, 1001, 1002],
      'paymentStatusCdName|+1':['未交定金', '已交定金', '已付款'],
      'statusCd|+1':[1000, 1001, 1002],
      'statusCdName|+1':['进行中', '已完成', '已撤销'],
      'remarks':'@cword(4, 6)',
      'offerPic':{
        'offerPicId':'@id',
        'offerPicUrl':'',
        'offerPicUrl2':'',
        'offerPicUrl3':'',
        'offerPicUrl4':'',
        'offerPicUrl5':'',
        'offerPicUrl6':''
      }
    }]
  }
});
// 43、批量导入定金缴纳数据解析接口
Mock.mock(new RegExp('/opmDepositController/analyzeInsertOpmDepositList'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'totalSize|1-100': 1,
    'rows|5-10': [{
      'opmOrderId':'@id',
      'opMeetingId':'@id',
      'opmOrderNo':'@id',
      'offerId':'@id',
      'offerCode':'@id',
      'offerName':'@cword(4, 6)',
      'brandCd':'@id',
      'brandName':'@cword(4, 6)',
      'offerModelId':'@id',
      'offerModelName': '@cword(4, 6)',
      'isCentman|1': ['Y', 'N'],
      'price|1-1000': 1000,
      'totalAmount|1-1000': 1000,
      'supplierId':'@id',
      'supplierName':'@cword(4, 6)',
      'retailerId':'@id',
      'retailerName':'@cword(4, 6)',
      'offerQty|1-1000': 1000,
      'pickupGoodsAmount|1-1000': 1000,
      'depositProportion|1-100': 100,
      'depositAmount|1-1000': 1000,
      'paymentStatusCd|+1': [1000, 1001, 1002],
      'paymentStatusCdName|+1':['未交定金', '已交定金', '已付款'],
      'statusCd|+1':[1000, 1001, 1002],
      'statusCdName|+1':['进行中', '已完成', '已撤销'],
      'remarks':'@cword(4, 6)',
      'isSuccess|1': ['Y', 'N'], //校验结果，Y-成功，N-失败
      'resultMsg': '@cword()' //校验信息
    }]
  }
});
// 44、批量导入定金缴纳数据
Mock.mock(new RegExp('/opmDepositController/batchInsertOpmDeposit'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});
// 45、查询诚意金缴纳情况列表接口
Mock.mock(new RegExp('/opmDepositController/queryOpmRetailerDepositList'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'totalSize|1-100': 1,
    'rows|5-10': [{
      'opMeetingId':'@id',
      'retailerId':'@id',
      'retailerCode':'@id',
      'retailerName':'@cword(4, 6)',
      'retailerType|+1': [1001, 1002, 1003],
      'retailerTypeName|+1': ['自营厅', '大连锁', '代理商'],
      'payDepositAmount|1-1000': 100,
      'depositAmount|1-1000': 100
    }]
  }
});

// 46、导入诚意金数据解析
Mock.mock(new RegExp('/opmDepositController/analyzeInsertOpmRetailerDepositList'), {
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
      'opMeetingId':'@id',
      'retailerId':'@id',
      'retailerCode':'@id',
      'retailerName':'@cword(4, 6)',
      'retailerType|+1': [1001, 1002, 1003],
      'retailerTypeName|+1': ['自营厅', '大连锁', '代理商'],
      'payDepositAmount|1-1000': 100,
      'depositAmount|1-1000': 100,
      'isSuccess|1': ['Y', 'N'], //校验结果，Y-成功，N-失败
      'resultMsg': '@cword(8, 10)' //校验信息
    }]
  }
});

// 47、批量导入新增机型
Mock.mock(new RegExp('/opmDepositController/batchInsertOpmRetailerDeposit'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});

// 48、查询政策列表列表
Mock.mock(new RegExp('/opmPolicyController/queryOpmPolicyList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    'totalCnt|1-100': 100, //总记录条数
    'successCnt|1-100': 100, //成功条数
    'failCnt|1-100': 1, //失败条数
    'rows|10':  [{
      'opMeetingId':'@id',
      'policyName': '@cword(4, 6)',
      'policyType|+1': [],
      'policyTypeName|+1':[],
      'content': '@cword(4, 6)',
      'offerCodes': '@id',
      'offerNames': '@cword(4, 6)',
      'discountTypeName': '@cword(4, 6)',
      'quantity|1-1000': 100,
      'discountValue|1-10': 1,
      'amount|1-1000': 100,
      'discountValue2|1-10': 1,
      'partyId': '@id',
      'partyName': '@cname',
      'createDt': '@date',
      'statusCd|+1':[1000, 1001, 1002],
      'statusCdName|+1': ['待审批', '已生效', '失效']
    }]
  }
});

//49、删除政策信息
Mock.mock(new RegExp('/opmPolicyController/deleteOpmPolicy'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});
//49、政策导入数据
Mock.mock(new RegExp('/opmPolicyController/batchInsertOpmPolicy'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});

//52、优惠政策结算订单查询列表接口
Mock.mock(new RegExp('/opmPolicyController/queryOpmPoilcyDepositList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    'totalSize ': '12', 
    'rows': [{
      'opmOrderId':'@id',
      'opMeetingId':'@id',
      'opmOrderNo':'@id',
      'offerId':'@id',
      'offerCode':'@id',
      'offerName':'@cword(4, 6)',
      'brandCd':'@id',
      'brandName':'@cword(4, 6)',
      'offerModelId':'@id',
      'offerModelName':'@cword(4, 6)',
      'isCentman|1': ['Y', 'N'],
      'salePrice|1-100.1-2': 1,
      'supplierId':'@id',
      'supplierName':'@cword(4, 6)',
      'retailerId':'@id',
      'retailerName':'@cword(4, 6)',
      'offerQty|1-1000': 1000,
      'pickupGoodsAmount|1-1000': 1000,
      'paymentStatusCd|+1': [1000, 1001, 1002],
      'paymentStatusCdName|+1':['未交定金', '已交定金', '已付款'],
      'statusCd|+1':[1000, 1001, 1002],
      'statusCdName|+1':['进行中', '已完成', '已撤销'],
      'remarks':'@cword(18, 30)',
      'contents':['',''],
      'discountAmount|1-1000': 1,
      'offerPic':{
        'offerPicId':'@id',
        'offerPicUrl':'',
        'offerPicUrl2':'',
        'offerPicUrl3':'',
        'offerPicUrl4':'',
        'offerPicUrl5':'',
        'offerPicUrl6':''
      }
    }]
  }
});
