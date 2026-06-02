const products = require('../../mock/products')
const cart = require('../../utils/cart')

Page({
  data: {
    showCheckoutDemo: false,
    recommendProducts: products.slice(0, 4),
    cartItems: [],
    totalCount: 0,
    totalAmount: 0,
    userPoints: 32000
  },

  onShow() {
    this.loadCart()
  },

  goMenu() {
    wx.switchTab({
      url: '/pages/menu/menu'
    })
  },

  showDemoCart() {
    this.loadCart()
  },

  goProductDetail(event) {
    const productId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${productId}`
    })
  },

  increaseQty(event) {
    const productId = event.currentTarget.dataset.id
    const item = this.data.cartItems.find((cartItem) => cartItem.id === Number(productId))

    if (!item) {
      return
    }

    cart.updateCartItem(productId, item.count + 1)
    this.loadCart()
  },

  decreaseQty(event) {
    const productId = event.currentTarget.dataset.id
    const item = this.data.cartItems.find((cartItem) => cartItem.id === Number(productId))

    if (!item) {
      return
    }

    cart.updateCartItem(productId, item.count - 1)
    this.loadCart()
  },

  addRecommendProduct(event) {
    const productId = event.currentTarget.dataset.id
    const product = products.find((item) => item.id === Number(productId))

    if (!product) {
      return
    }

    cart.addToCart(product, 1)
    this.loadCart()
  },

  loadCart() {
    const cartItems = cart.getCart().map((item) => Object.assign({}, item, {
      subtotal: item.price * item.count
    }))
    const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0)
    const totalAmount = cart.getCartTotal(cartItems)

    this.setData({
      showCheckoutDemo: cartItems.length > 0,
      cartItems,
      totalCount,
      totalAmount
    })
  },

  clearCart() {
    cart.clearCart()
    this.loadCart()
  },

  checkout() {
    wx.showModal({
      title: '提示',
      content: '当前为 UI 演示版，暂未接入微信支付',
      showCancel: false
    })
  },

  noop() {}
})
