const categories = require('../../mock/categories')
const products = require('../../mock/products')
const cart = require('../../utils/cart')

Page({
  data: {
    categories,
    products,
    filteredProducts: [],
    selectedCategoryId: 'set',
    cartMap: {},
    cartItems: [],
    totalCount: 0,
    totalAmount: 0,
    isCartPanelVisible: false
  },

  onLoad() {
    this.updateProducts(this.data.selectedCategoryId)
  },

  onShow() {
    this.syncCartMap()
  },

  syncCartMap() {
    const cartMap = {}
    const cartItems = cart.getCart().map((item) => Object.assign({}, item, {
      subtotal: Number(item.price) * Number(item.count)
    }))
    const totalCount = cartItems.reduce((total, item) => total + item.count, 0)
    const totalAmount = cart.getCartTotal(cartItems)

    cartItems.forEach((item) => {
      cartMap[item.id] = item.count
    })

    this.setData({
      cartMap,
      cartItems,
      totalCount,
      totalAmount,
      isCartPanelVisible: totalCount > 0 ? this.data.isCartPanelVisible : false
    })
  },

  updateProducts(categoryId) {
    const filteredProducts = this.data.products.filter((product) => product.categoryId === categoryId)
    this.setData({
      selectedCategoryId: categoryId,
      filteredProducts
    })
  },

  selectCategory(event) {
    const categoryId = event.currentTarget.dataset.id
    this.updateProducts(categoryId)
  },

  goHome() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },

  goProductDetail(event) {
    const productId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${productId}`
    })
  },

  increaseProduct(event) {
    const productId = event.currentTarget.dataset.id
    const product = this.data.products.find((item) => item.id === Number(productId))

    if (!product) {
      return
    }

    cart.addToCart(product, 1)
    this.syncCartMap()
  },

  decreaseProduct(event) {
    const productId = event.currentTarget.dataset.id
    const currentCount = this.data.cartMap[productId] || 0
    cart.updateCartItem(productId, currentCount - 1)
    this.syncCartMap()
  },

  increaseCartItem(event) {
    const productId = event.currentTarget.dataset.id
    const item = this.data.cartItems.find((cartItem) => cartItem.id === Number(productId))

    if (!item) {
      return
    }

    cart.updateCartItem(productId, item.count + 1)
    this.syncCartMap()
  },

  decreaseCartItem(event) {
    const productId = event.currentTarget.dataset.id
    const item = this.data.cartItems.find((cartItem) => cartItem.id === Number(productId))

    if (!item) {
      return
    }

    cart.updateCartItem(productId, item.count - 1)
    this.syncCartMap()
  },

  openCartPanel() {
    if (!this.data.totalCount) {
      return
    }

    this.setData({
      isCartPanelVisible: true
    })
  },

  closeCartPanel() {
    this.setData({
      isCartPanelVisible: false
    })
  },

  clearCart() {
    cart.clearCart()
    this.syncCartMap()
  },

  goCart() {
    this.closeCartPanel()
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  stopTap() {
    return false
  }
})
