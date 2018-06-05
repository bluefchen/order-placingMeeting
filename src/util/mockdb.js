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

//1、订货会列表查询接口
Mock.mock(new RegExp('/orderPlacingMeetingController/queryOrderPlacingMeetingList'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'totalSize|1-99': 10,
    'rows|5-10': [{
      'opMeetingId': '@id',
      'opMeetingNo': '@id',
      'opmName': '@cword(4, 12)',
      'opmAddr': '@cword(8, 16)',
      'startDt': '@date()',
      'endDt': '@date()',
      'commonRegionId': '@id',
      'commonRegionName': '@province',
      'statusCd|1': ['1000', '1001', '1002'],
      'discription': '@cword(10,20)',
      'logoUrl|1': ['/static/img/telephone1.jpg', '/static/img/telephone2.jpg', '/static/img/telephone3.jpg', '/static/img/telephone4.jpg'],
      'depositRecordEnddt': '@date()',
      'pickupRecordEnddt': '@date()',
      'statusDt': '@date()',
      'supplierCnt|1-100': 11,
      'retailerCnt|1-100': 11
    }]
  }
});

//2、新增订货会接口
Mock.mock(new RegExp('/orderPlacingMeetingController/insertOrderPlacingMeeting'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'resultMsg': '成功',
    'resultCode': '0'
  }
});

//3、修改订货会接口
Mock.mock(new RegExp('/orderPlacingMeetingController/updateOrderPlacingMeeting'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'resultMsg': '成功',
    'resultCode': '0'
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
      supplierCode: '@id', //供应商编码
      province: '@province()', //供应商省份
      city: '@city()', //供应商地市
      supplierName: '@cword(3,6)', //供应商名称
      supplierType: '', //供应商类型
      supplierTypeName: '@cword(3,6)', //供应商类型名称
      linkMan: '@cname()', //联系人
      linkNbr: /\d{5,10}/, //联系电话
      supplierPhone: /\d{5,10}/, //公司电话
      supplierFax: /\d{5,10}/ //公司传真
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
      'retailerId': '@id',
      'retailerCode': '@id',
      'province': '@province()',
      'city': '@city()',
      'retailerName': '@cword(3,6)',
      'retailerType': '',
      'retailerTypeName': '@cword(3,6)',
      'linkMan': '@cname()',
      'linkNbr': /\d{5,10}/,
      'retailerPhone': /\d{5,10}/,
      'retailerFax': /\d{5,10}/,
      'statusCd': '@id',
      'statusCdName': '@cword(3,6)'
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
      'commonRegionId': '@id',
      'commonRegionName': '@province',
      'supplierName': '@cword(4,6)',
      'supplierType|1': ['1001', '1002', '1003', '1004'],
      'supplierTypeName|1': ['厂商', '国代', '省代', '其他'],
      'linkMan': '@cname',
      'linkNbr': /\d{5,11}/,
      'supplierPhone': /\d{5,9}\-/,
      'supplierFax': /\d{5,9}\-/,
      'statusCd|1': ['1000', '1001'],
      'statusCdName|1': ['有效', '停用'],
      'remarks': '@cword(10,20)'
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
      'commonRegionId': '@id',
      'commonRegionName': '@province',
      'retailerName': '@cword(4,6)',
      'retailerType|1': ['1001', '1002', '1003'],
      'retailerTypeName|1': ['自营厅', '大连锁', '代理商'],
      'linkMan': '@cname',
      'linkNbr': /\d{5,11}/,
      'retailerPhone': /\d{5,9}\-/,
      'retailerFax': /\d{5,9}\-/,
      'statusCd|1': ['1000', '1001'],
      'statusCdName|1': ['有效', '停用'],
      'remarks': '@cword(10,20)'
    }]
  }
});

//8、删除订货会接口
Mock.mock(new RegExp('/orderPlacingMeetingController/deleteOrderPlacingMeeting'), {
  rsphead: 's',
  success: true,
  code: null,
  msg: null,
  error: null,
  data: {
    'resultMsg': '成功',
    'resultCode': '0'
  }
});

//9、查询终端产品列表接口
Mock.mock(new RegExp('/orderPlacingMeetingController/queryOfferList'), {
  rsphead: 's',
  success: true,
  code: null,
  msg: null,
  error: null,
  data: {
    'totalSize|1-99': 10,
    'rows|5-10': [{
      'offerId': '@id',
      'offerCode': '@id',
      'offerName': '@cword(3,6)',
      'brandCd': '@id',
      'brandName': '@cword(3,6)',
      'offerModelId': '@id',
      'offerModelName': '@word(3,6)',
      'isCentman|1': ['Y', 'N'],
      'salePrice|1-100.1-2': 1,
      'statusCd|1': ['1001', '1002'],
      'offerBaseParam': {
        'listDt': '@date',
        'termType': '',
        'os': '@word(5,10)'
      },
      'offerScreenParam': {
        'screenType': '@cword(3,6)',
        'screenSize|1-10.1': 9.7,
        'screenMaterial': '@cword(3,5)',
        'resolutionRatio|1': ['720P', '1080P', '2K', '4K'],
        'screenPiexl|1-99.1-1': 1,
        'screenTech': '@cword(3,10)',
        'frame|1': ['是', '否'],
        'otherParam': '@cword(10,20)'
      },
      'offerHardwardParam': {
        'cpuModel': '@word(3,5)',
        'cpuRate|1-10': 1,
        'core|1-8': 2,
        'gpuModel': '@word(3,6)',
        'ram|1': [2, 4, 6, 8, 16],
        'rom|1': [2, 4, 6, 8, 16],
        'memoryType': '@word(3,6)',
        'memoryCard': '@word(3,6)',
        'extendedCapacity|1': [2, 4, 6, 8, 16],
        'rearCamera': '@cword(6,12)',
        'frontCamera': '@cword(6,12)',
        'batteryCapacity|1000-9999': 1000,
        'batteryType': '@word(3,10)',
        'batteryCharge': '@word(2,10)',
        'offerPic': {
          'offerPicId': '@id',
          'offerPicUrl|1': ['/static/img/telephone1.jpg', '/static/img/telephone2.jpg', '/static/img/telephone3.jpg', '/static/img/telephone4.jpg'],
          'offerPicUrl2': '@url',
          'offerPicUrl3': '@url',
          'offerPicUrl4': '@url',
          'offerPicUrl5': '@url',
          'offerPicUrl6': '@url'
        }
      }
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
        'offerPicUrl|1': ['/static/img/telephone1.jpg', '/static/img/telephone2.jpg', '/static/img/telephone3.jpg', '/static/img/telephone4.jpg'],
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
      'opmOaId': '@id',
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
        'offerPicUrl|1': ['/static/img/telephone1.jpg', '/static/img/telephone2.jpg', '/static/img/telephone3.jpg', '/static/img/telephone4.jpg'],
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

//27、附件上传接口
Mock.mock(new RegExp('/commonCfgController/upload'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': false,
  'data': {
    'url': ''
  }
});

//29、地区查询接口
Mock.mock(new RegExp('/commonCfgController/getCommonRegionTreeList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  'data|30': [{
    'id|1': ['1000001', '1000002', '1000003', '1000004', '1000005', '1000006', '1000007', '1000008', '1000009', '1000010'],
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
        'offerPicUrl|1': ['/static/img/telephone1.jpg', '/static/img/telephone2.jpg', '/static/img/telephone3.jpg', '/static/img/telephone4.jpg'],
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
      'remarks': '@cword(15,30)',
      'offerPic': {
        'offerPicUrl|1': ['/static/img/telephone1.jpg', '/static/img/telephone2.jpg', '/static/img/telephone3.jpg', '/static/img/telephone4.jpg'],
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

//40、查询当前配置模式
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

//41、配置定金模式接口
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

//42、查询定金缴纳情况列表接口
Mock.mock(new RegExp('/opmDepositController/queryOpmDepositList'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'totalSize|1-100': 1,
    'rows|5-10': [{
      'opmOrderId': '@id',
      'opMeetingId': '@id',
      'opmOrderNo': '@id',
      'offerId': '@id',
      'offerCode': '@id',
      'offerName': '@cword(4, 6)',
      'brandCd': '@id',
      'brandName': '@cword(4, 6)',
      'offerModelId': '@id',
      'offerModelName': '@cword(4, 6)',
      'isCentman|1': ['Y', 'N'],
      'price|1-1000': 1000,
      'totalAmount|1-1000': 1000,
      'supplierId': '@id',
      'supplierName': '@cword(4, 6)',
      'retailerId': '@id',
      'retailerName': '@cword(4, 6)',
      'offerQty|1-1000': 1000,
      'pickupGoodsAmount|1-1000': 1000,
      'depositProportion|1-100': 100,
      'depositAmount|1-1000': 1000,
      'paymentStatusCd|+1': [1000, 1001, 1002],
      'paymentStatusCdName|+1': ['未交定金', '已交定金', '已付款'],
      'statusCd|+1': [1000, 1001, 1002],
      'statusCdName|+1': ['进行中', '已完成', '已撤销'],
      'remarks': '@cword(4, 6)',
      'offerPic': {
        'offerPicId': '@id',
        'offerPicUrl': '',
        'offerPicUrl2': '',
        'offerPicUrl3': '',
        'offerPicUrl4': '',
        'offerPicUrl5': '',
        'offerPicUrl6': ''
      }
    }]
  }
});
//43、批量导入定金缴纳数据解析接口
Mock.mock(new RegExp('/opmDepositController/analyzeInsertOpmDepositList'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'totalSize|1-100': 1,
    'rows|5-10': [{
      'opmOrderId': '@id',
      'opMeetingId': '@id',
      'opmOrderNo': '@id',
      'offerId': '@id',
      'offerCode': '@id',
      'offerName': '@cword(4, 6)',
      'brandCd': '@id',
      'brandName': '@cword(4, 6)',
      'offerModelId': '@id',
      'offerModelName': '@cword(4, 6)',
      'isCentman|1': ['Y', 'N'],
      'price|1-1000': 1000,
      'totalAmount|1-1000': 1000,
      'supplierId': '@id',
      'supplierName': '@cword(4, 6)',
      'retailerId': '@id',
      'retailerName': '@cword(4, 6)',
      'offerQty|1-1000': 1000,
      'pickupGoodsAmount|1-1000': 1000,
      'depositProportion|1-100': 100,
      'depositAmount|1-1000': 1000,
      'paymentStatusCd|+1': [1000, 1001, 1002],
      'paymentStatusCdName|+1': ['未交定金', '已交定金', '已付款'],
      'statusCd|+1': [1000, 1001, 1002],
      'statusCdName|+1': ['进行中', '已完成', '已撤销'],
      'remarks': '@cword(4, 6)',
      'isSuccess|1': ['Y', 'N'], //校验结果，Y-成功，N-失败
      'resultMsg': '@cword()' //校验信息
    }]
  }
});
//44、批量导入定金缴纳数据
Mock.mock(new RegExp('/opmDepositController/batchInsertOpmDeposit'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});
//45、查询诚意金缴纳情况列表接口
Mock.mock(new RegExp('/opmDepositController/queryOpmRetailerDepositList'), {
  'rsphead': 's',
  'success': true,
  'code': null,
  'msg': null,
  'error': null,
  'data': {
    'totalSize|1-100': 1,
    'rows|5-10': [{
      'opMeetingId': '@id',
      'retailerId': '@id',
      'retailerCode': '@id',
      'retailerName': '@cword(4, 6)',
      'retailerType|+1': [1001, 1002, 1003],
      'retailerTypeName|+1': ['自营厅', '大连锁', '代理商'],
      'payDepositAmount|1-1000': 100,
      'depositAmount|1-1000': 100
    }]
  }
});

//46、导入诚意金数据解析
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
      'opMeetingId': '@id',
      'retailerId': '@id',
      'retailerCode': '@id',
      'retailerName': '@cword(4, 6)',
      'retailerType|+1': [1001, 1002, 1003],
      'retailerTypeName|+1': ['自营厅', '大连锁', '代理商'],
      'payDepositAmount|1-1000': 100,
      'depositAmount|1-1000': 100,
      'isSuccess|1': ['Y', 'N'], //校验结果，Y-成功，N-失败
      'resultMsg': '@cword(8, 10)' //校验信息
    }]
  }
});

//47、批量导入新增机型
Mock.mock(new RegExp('/opmDepositController/batchInsertOpmRetailerDeposit'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});

//48、查询政策列表列表
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
    'rows|10': [{
      'opMeetingId': '@id',
      'policyId': '@id',
      'policyName': '@cword(4, 6)',
      'policyType|+1': [],
      'policyTypeName|+1': [],
      'content': '@cword(80, 100)',
      'offerCodes': '@id',
      'offerNames': '@cword(4, 6)',
      'discountTypeName': '@cword(10, 20)',
      'quantity|1-1000': 100,
      'discountValue|1-10': 1,
      'amount|1-1000': 100,
      'discountValue2|1-10': 1,
      'partyId': '@id',
      'partyName': '@cname',
      'createDt': '@date',
      'statusCd|+1': [1000, 1001, 1002],
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
//50、政策导入数据
Mock.mock(new RegExp('/opmPolicyController/batchInsertOpmPolicy'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: null
});
//51、政策审批接口
Mock.mock(new RegExp('/opmPolicyController/approveOpmPolicy'), {
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
      'opmOrderId': '@id',
      'opMeetingId': '@id',
      'opmOrderNo': '@id',
      'offerId': '@id',
      'offerCode': '@id',
      'offerName': '@cword(4, 6)',
      'brandCd': '@id',
      'brandName': '@cword(4, 6)',
      'offerModelId': '@id',
      'offerModelName': '@cword(4, 6)',
      'isCentman|1': ['Y', 'N'],
      'salePrice|1-100.1-2': 1,
      'supplierId': '@id',
      'supplierName': '@cword(4, 6)',
      'retailerId': '@id',
      'retailerName': '@cword(4, 6)',
      'offerQty|1-1000': 1000,
      'pickupGoodsAmount|1-1000': 1000,
      'paymentStatusCd|+1': [1000, 1001, 1002],
      'paymentStatusCdName|+1': ['未交定金', '已交定金', '已付款'],
      'statusCd|+1': [1000, 1001, 1002],
      'statusCdName|+1': ['进行中', '已完成', '已撤销'],
      'remarks': '@cword(18, 30)',
      'contents': ['', ''],
      'discountAmount|1-1000': 1,
      'offerPic': {
        'offerPicId': '@id',
        'offerPicUrl': '',
        'offerPicUrl2': '',
        'offerPicUrl3': '',
        'offerPicUrl4': '',
        'offerPicUrl5': '',
        'offerPicUrl6': ''
      }
    }]
  }
});
//53、冻结供应商接口
Mock.mock(new RegExp('/orderPlacingMeetingController/freezeSupplier'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
//54、激活供应商接口
Mock.mock(new RegExp('/orderPlacingMeetingController/unfreezeSupplier'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
//55、删除供应商接口
Mock.mock(new RegExp('/orderPlacingMeetingController/deleteSupplier'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
// 56、新增供应商接口
Mock.mock(new RegExp('/orderPlacingMeetingController/addSupplier'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
// 57、修改供应商接口
Mock.mock(new RegExp('/orderPlacingMeetingController/updateSupplier'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
// 58、冻结零售商接口
Mock.mock(new RegExp('/orderPlacingMeetingController/freezeRetailer'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
// 59、激活零售商接口
Mock.mock(new RegExp('/orderPlacingMeetingController/unfreezeRetailer'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
// 60、删除零售商接口
Mock.mock(new RegExp('/orderPlacingMeetingController/deleteRetailer'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
// 61、新增零售商接口
Mock.mock(new RegExp('/orderPlacingMeetingController/addRetailer'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
// 62、修改零售商接口
Mock.mock(new RegExp('/orderPlacingMeetingController/updateRetailer'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
//63、冻结用户
Mock.mock(new RegExp('/systemUserController/freezeSystemUser'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
//64、激活用户
Mock.mock(new RegExp('/systemUserController/unfreezeSystemUser'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
//65、	删除用户接口
Mock.mock(new RegExp('/systemUserController/deleteSystemUser'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
//66、	新增用户接口
Mock.mock(new RegExp('/systemUserController/addSystemUser'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
//67、	修改用户接口
Mock.mock(new RegExp('/systemUserController/updateSystemUser'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
//68、用户列表查询
Mock.mock(new RegExp('/systemUserController/querySystemUserList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    'totalSize |1-100': 100, //总记录条数
    'rows|10': [{
      'partyId': '@id',
      'commonRegionId': '1000001',
      'commonRegionName': '@province',
      'userType|+1': [1000, 1001],//用户类型
      'relaId': '1122',
      'relaName': '@cword(5)',
      'systemUserCode': '@id',
      'name': '@cname',
      'linktelenumber': '19899992222',
      'remark': '@cword(9)',
      'stautsCd|+1': [1000, 1001, 1002],
      'statusCdName|+1': ['有效', '冻结', '无效']
    }]
  }
});
//69、角色列表查询接口
Mock.mock(new RegExp('/systemUserController/queryPostRoleList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  'data|5': [{
    'postRoleId': '@id',
    'name': '@cname',
    'description': '@cword(10)'
  }]
});
//70、	保存角色接口
Mock.mock(new RegExp('/systemUserController/savePostRole'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "postRoleId": '@id',
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
//71、	查询所有菜单接口
Mock.mock(new RegExp('/systemUserController/querySystemMenuList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  'data|8': [{
    'systemMenuId': '@id',
    'systemMenuName': '@cword(6)',
    'subSysMenuId': '@id',
    'orderSeq|+1': [1, 2, 3, 4, 5, 6, 7, 8],
    'sysModularId': '@id',
    'isLastNode|+1': ['Y', 'N']
  }]
});
//72、	查询已关联菜单接口
Mock.mock(new RegExp('/systemUserController/queryRoleShortuctMenu'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  'data|8': [{
    'postRoleId': '@id',
    'systemMenuId': '@id',
    'systemMenuName': '@cword(7)',
    'subSysMenuId': '@id',
    'orderSeq|+1': [1, 2, 3, 4, 5, 6, 7, 8],
    'sysModularId': '@id',
    'isLastNode|+1': ['Y', 'N']
  }]
});
//73、	查询角色关联用户接口
Mock.mock(new RegExp('/systemUserController/queryPostRoleRelaUserList'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    'totalSize |1-100': 100, //总记录条数
    'rows|10': [{
      'userRoleId': '@id',
      'postRoleId': '@id',
      'partyId': '@id',
      'commonRegionId': '@id',
      'commonRegionName': '@province',
      'userType|+1': [1000, 1001],
      'relaId': '@id',
      'relaName': '@cword(5)',
      'systemUserCode': '@id',
      'name': '@cname',
      'linktelenumber': '13788823232',
      'remark': '@cword(11)',
      'stautsCd|+1': [1000, 1001, 1002],
      'statusCdName|+1': ['有效', '冻结', '无效']
    }]
  }
});
//74、	删除关联关系
Mock.mock(new RegExp('/systemUserController/deletePostRoleRelaUser'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
//75、新增关联关系
Mock.mock(new RegExp('/systemUserController/addPostRoleRelaUser'), {
  rsphead: 's',
  success: 'true', //是否成功true/失败false
  code: null,
  msg: null, //失败信息
  error: null,
  data: {
    "resultMsg": "成功",
    "resultCode": "0"
  }
});
