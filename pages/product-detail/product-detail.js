const products = require('../../mock/products')
const cart = require('../../utils/cart')

const defaultProduct = {
  id: 1,
  categoryId: 'set',
  name: '特调套餐 任选五',
  desc: '含招牌鸡尾酒 5 杯 + 小食拼盘',
  sales: '1.03 万件',
  price: 388,
  points: 10000,
  imageType: 'cocktail'
}

Page({
  data: {
    product: defaultProduct,
    quantity: 1,
    packageItems: [
      { icon: '🍸', name: '招牌鸡尾酒（任选 5 款）', value: 'x1' },
      { icon: '🥨', name: '小食拼盘（坚果/薯片/肉干组合）', value: 'x1' },
      { icon: '⭐', name: '娱乐积分赠送', value: '10000 积分' },
      { icon: '🔔', name: '专属桌台服务', value: 'x1' },
      { icon: '🍴', name: '纸巾 & 餐具', value: 'x1' }
    ],
    usageItems: [
      { icon: '店', title: '到店使用', text: '请在门店出示订单核销码' },
      { icon: '包', title: '不可外带', text: '本套餐仅限店内使用' },
      { icon: '员', title: '请向服务员核销', text: '下单后请出示订单核销码' }
    ]
  },

  onLoad(options) {
    const productId = Number(options.id)
    const product = products.find((item) => item.id === productId) || defaultProduct
    this.setData({
      product
    })
  },

  goBack() {
    const pages = getCurrentPages()
    if (pages.length > 1) {
      wx.navigateBack()
      return
    }
    wx.switchTab({
      url: '/pages/menu/menu'
    })
  },

  increaseQuantity() {
    this.setData({
      quantity: this.data.quantity + 1
    })
  },

  decreaseQuantity() {
    this.setData({
      quantity: Math.max(1, this.data.quantity - 1)
    })
  },

  addToCart() {
    cart.addToCart(this.data.product, this.data.quantity)
    wx.showToast({
      title: '已加入购物车',
      icon: 'none'
    })
  },

  buyNow() {
    wx.showModal({
      title: '提示',
      content: '当前为 UI 演示版，暂未接入微信支付',
      showCancel: false
    })
  }
})
