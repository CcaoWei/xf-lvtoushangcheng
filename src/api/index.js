import request from '@/utils/request'
// 首页
export const getIndex = () => {
  return request({
    url: '/api/mall_api/pc/wx/home/index',
    method: 'get'
  })
}
//  分类
export const getType = () => {
  return request({
    url: '/api/mall_api/pc/wx/catalog/index',
    method: 'get'
  })
}
//  点击分类 获取分类内容
export const getGory = id => {
  console.log(id)
  return request({
    url: '/api/mall_api/pc/wx/goods/category',
    method: 'get',
    params: {
      id
    }
  })
}
//  二级分类
export const getTypeList = data => {
  return request({
    url: '/api/mall_api/pc/wx/goods/list',
    method: 'get',
    params: data
  })
}
//  商品详情
export const typeDetail = id => {
  return request({
    url: '/api/mall_api/pc/wx/goods/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//  品牌商列表
export const brandList = data => {
  return request({
    url: '/api/mall_api/pc/wx/brand/list',
    method: 'get',
    params: data
  })
}
//  品牌商详情
export const brandDetail = id => {
  return request({
    url: '/api/mall_api/pc/wx/brand/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//  单个品牌下的商品列表
export const brandGoodsList = data => {
  return request({
    url: '/api/mall_api/pc/wx/goods/list',
    method: 'get',
    params: data
  })
}
//  详情页大家都在看
export const goodsRelated = id => {
  return request({
    url: '/api/mall_api/pc/wx/goods/related',
    method: 'get',
    params: {
      id
    }
  })
}
//  优惠券列表
export const couponList = data => {
  return request({
    url: '/api/mall_api/pc/wx/coupon/list',
    method: 'get',
    params: data
  })
}
//  根据分类id,获取分类下的子分类
export const catalogCurren = id => {
  return request({
    url: '/api/mall_api/pc/wx/catalog/current',
    method: 'get',
    params: {
      id
    }
  })
}
//  优惠券领取
export const couponReceive = id => {
  return request({
    url: '/api/mall_api/pc/wx/coupon/receive',
    method: 'post',
    data: {
      couponId: id
    }
  })
}
//  专题精选列表
export const topicList = data => {
  return request({
    url: '/api/mall_api/pc/wx/topic/list',
    method: 'get',
    params: data
  })
}
//  专题精选列表
export const topicDetail = id => {
  return request({
    url: '/api/mall_api/pc/wx/topic/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//  专题精选 留言
export const commentList = data => {
  return request({
    url: '/api/mall_api/pc/wx/comment/list',
    method: 'get',
    params: data
  })
}
//  专题精选 推荐
export const topicRelated = id => {
  return request({
    url: '/api/mall_api/pc/wx/topic/related',
    method: 'get',
    params: {
      id
    }
  })
}
//  专题精选 发表评论 需要token
export const commentPost = data => {
  console.log(data)
  return request({
    url: '/api/mall_api/pc/wx/comment/post',
    method: 'post',
    data
  })
}
// 分类搜索页接口
export const searchInfo = () => {
  return request({
    url: '/api/mall_api/pc/wx/search/index',
    method: 'get'
  })
}
//  分类搜索页接口
export const searchHelper = data => {
  return request({
    url: '/api/mall_api/pc/wx/search/helper',
    method: 'get',
    params: {
      keyword: data
    }
  })
}
//  商品添加购物车
export const addCart = data => {
  return request({
    url: '/api/mall_api/pc/wx/cart/add',
    method: 'post',
    data
  })
}
// 购物车列表
export const cartList = () => {
  return request({
    url: '/api/mall_api/pc/wx/cart/index',
    method: 'get'
  })
}
//  立即购买
export const cartFastadd = data => {
  return request({
    url: '/api/mall_api/pc/wx/cart/fastadd',
    method: 'post',
    data
  })
}
// 订单列表 需要token
export const orderList = type => {
  return request({
    url: '/api/mall_api/pc/wx/order/list',
    method: 'get',
    params: {
      showType: type
    }
  })
}
// 登录
export const login = data => {
  return request({
    url: '/api/mall_api/pc/wx/auth/login',
    method: 'post',
    data
  })
}
// 注册
export const register = data => {
  return request({
    url: '/api/mall_api/pc/wx/auth/register',
    method: 'post',
    data
  })
}
// 购物车商品是否选择
export const cartChecked = data => {
  return request({
    url: '/api/mall_api/pc/wx/cart/checked',
    method: 'post',
    data
  })
}
// 购物车编辑商品数量
export const cartUpdate = data => {
  return request({
    url: '/api/mall_api/pc/wx/cart/update',
    method: 'post',
    data
  })
}
// 下单操作
export const cartCheckout = data => {
  return request({
    url: '/api/mall_api/pc/wx/cart/checkout',
    method: 'get',
    params: data
  })
}
// 收货地址列表
export const addressList = () => {
  return request({
    url: '/api/mall_api/pc/wx/address/list',
    method: 'get'
  })
}
// 收货地址保存
export const addressSave = data => {
  return request({
    url: '/api/mall_api/pc/wx/address/save',
    method: 'post',
    data
  })
}
// 省份城市区县列表
export const regionList = id => {
  return request({
    url: '/api/mall_api/pc/wx/region/list',
    method: 'get',
    params: {
      pid: id
    }
  })
}
// 收货地址详情
export const addressDetail = id => {
  return request({
    url: '/api/mall_api/pc/wx/address/detail',
    method: 'get',
    params: {
      id: id
    }
  })
}
// 删除收货地址
export const addressDelete = id => {
  return request({
    url: '/api/mall_api/pc/wx/address/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}
// 下单时优惠券列表
export const couponSelectlist = data => {
  return request({
    url: '/api/mall_api/pc/wx/coupon/selectlist',
    method: 'get',
    params: data
  })
}
// 下单时优惠券列表
export const orderSubmit = data => {
  return request({
    url: '/api/mall_api/pc/wx/order/submit',
    method: 'post',
    data
  })
}
// 订单详情
export const orderDetail = id => {
  return request({
    url: '/api/mall_api/pc/wx/order/detail',
    method: 'get',
    params: {
      orderId: id
    }
  })
}
// 删除订单
export const orderDelete = data => {
  return request({
    url: '/api/mall_api/pc/wx/order/delete',
    method: 'post',
    data
  })
}
// 取消订单
export const orderCancel = data => {
  return request({
    url: '/api/mall_api/pc/wx/order/cancel',
    method: 'post',
    data
  })
}
// 申请退款
export const orderRefund = data => {
  return request({
    url: '/api/mall_api/pc/wx/order/refund',
    method: 'post',
    data
  })
}
// 确认收货
export const orderConfirm = data => {
  return request({
    url: '/api/mall_api/pc/wx/order/confirm',
    method: 'post',
    data
  })
}
// 去评论
export const orderGoods = data => {
  return request({
    url: '/api/mall_api/pc/wx/order/goods',
    method: 'get',
    params: data
  })
}
// 兑换优惠券
export const couponExchange = data => {
  return request({
    url: '/api/mall_api/pc/wx/coupon/exchange',
    method: 'post',
    data
  })
}
// 优惠券列表-我的
export const couponMylist = data => {
  return request({
    url: '/api/mall_api/pc/wx/coupon/mylist',
    method: 'get',
    params: data
  })
}
// 收藏商品
export const collectAddordelete = data => {
  return request({
    url: '/api/mall_api/pc/wx/collect/addordelete',
    method: 'post',
    data
  })
}
// 收藏商品-我的
export const collectList = data => {
  return request({
    url: '/api/mall_api/pc/wx/collect/list',
    method: 'get',
    params: data
  })
}
// 购物车-删除商品
export const cartDelete = data => {
  return request({
    url: '/api/mall_api/pc/wx/cart/delete',
    method: 'post',
    data
  })
}
// 评-上传照片-单
export const storageUpload = data => {
  return request({
    url: '/api/mall_api/pc/wx/storage/upload',
    method: 'post',
    data
  })
}
// 评价-上传照片-多
export const batchUpload = data => {
  return request({
    url: '/api/mall_api/pc/wx/storage/batchUpload',
    method: 'post',
    data
  })
}
// 发表评价
export const orderComment = data => {
  return request({
    url: '/api/mall_api/pc/wx/order/comment',
    method: 'post',
    data
  })
}
// 购物车商品货品数量(根据登录用户,未登录返回0)
export const cartGoodscount = () => {
  return request({
    url: '/api/mall_api/pc/wx/cart/goodscount',
    method: 'get'
  })
}
// 请求重置uuid
export const authRegCaptcha = data => {
  return request({
    url: '/api/mall_api/pc/wx/auth/regCaptcha',
    method: 'post',
    data
  })
}
// h5支付微信
export const webPay = orderId => {
  return request({
    url: '/wxpay_api/wxPay/webPay',
    method: 'post',
    params: {
      orderId: orderId
    }
  })
}
// 退款微信
export const wxRefund = data => {
  return request({
    url: '/wxpay_api/wxPay/wxRefund',
    method: 'post',
    params: data
  })
}
// h5支付支付
export const aliPay = orderId => {
  return request({
    url: '/alipay_api/aliPay/webPay',
    method: 'post',
    params: {
      orderId: orderId
    }
  })
}
// 忘记密码
export const userResetPW = data => {
  return request({
    url: '/api/mall_api/pc/wx/user/resetPW',
    method: 'post',
    data
  })
}
// 意见反馈
export const feedbackSubmit = data => {
  return request({
    url: '/api/mall_api/pc/wx/feedback/submit',
    method: 'post',
    data
  })
}
// 支付后状态微信
export const findWxOrderStatus = id => {
  return request({
    url: '/wxpay_api/pc/wx/order/findWxOrderStatus',
    method: 'get',
    params: {
      orderId: id
    }
  })
}
// 支付后状态支付宝
export const findAliOrderStatus = id => {
  return request({
    url: '/alipay_api/aliPay/findAliOrderStatus',
    method: 'get',
    params: {
      orderId: id
    }
  })
}
// 退款支付宝
export const aliRefund = data => {
  return request({
    url: '/alipay_api/aliPay/aliRefund',
    method: 'post',
    params: data
  })
}
// 个人中心订单数
export const userIndex = () => {
  return request({
    url: '/api/mall_api/pc/wx/user/index',
    method: 'get'
  })
}
// 查询物流
export const orderGetOrderShip = id => {
  return request({
    url: '/api/mall_api/pc/wx/order/getOrderShip',
    method: 'get',
    params: {
      orderId: id
    }
  })
}
// 用户评论
export const getUserCommentList = data => {
  return request({
    url: '/api/mall_api/pc/wx/user/getUserCommentList',
    method: 'get',
    params: data
  })
}
// 更新手机号第一步旧手机号
export const authVerifyOldPhone = data => {
  return request({
    url: '/api/mall_api/pc/wx/auth/verifyOldPhone',
    method: 'post',
    data
  })
}
// 更新手机号第一步旧手机号
export const authResetMobile = data => {
  return request({
    url: '/api/mall_api/pc/wx/auth/resetMobile',
    method: 'post',
    data
  })
}

// 账户余额
export const balanceStatistics = () => {
  return request({
    url: '/api/mall_api/pc/wx/account/balanceStatistics',
    method: 'get'
  })
}

// 企业资料提交
export const submitData = data => {
  return request({
    url: '/api/mall_api/lt/auth/register-information',
    method: 'post',
    data
  })
}
// 支付宝扫码支付（生成商家二维码）
export const aliPayQRCode = data => {
  return request({
    url: '/alipay_api/aliPay/QRCodePay',
    method: 'post',
    params: data
  })
}
// 微信扫码支付（生成商家二维码）
export const wxPayQRCode = data => {
  return request({
    url: '/wxpay_api/wxPay/nativePay',
    method: 'post',
    params: data
  })
}
// 重置密码
export const resetPW = data => {
  return request({
    url: '/api/mall_api/pc/wx/user/resetPW',
    method: 'post',
    data
  })
}
// 老手机号
export const verifyOldPhone = data => {
  return request({
    url: '/api/mall_api/pc/wx/auth/verifyOldPhone',
    method: 'post',
    data
  })
}
// 更换手机号(账号)2020-06-01 15:21:31
export const resetMobile = data => {
  return request({
    url: '/api/mall_api/pc/wx/auth/resetMobile',
    method: 'post',
    data
  })
}

// 注册送券列表
export const firstCoupons = () => {
  return request({
    url: '/api/mall_api/pc/wx/coupon/getList',
    method: 'get'
  })
}

// 手机号是否存在+正则校验
export const validateTel = params => {
  return request({
    url: '/api/mall_api/pc/wx/auth/verify-mobile',
    method: 'get',
    params
  })
}

// 检查是否有二级密码
export const checkPassWord = params => {
  return request({
    url: '/api/mall_api/pc/wx/user/checkPassWord',
    method: 'get',
    params
  })
}

// 保存二级密码
export const savePayPassWord = data => {
  return request({
    url: '/api/mall_api/pc/wx/user/savePayPassWord',
    method: 'post',
    data
  })
}