const categories = require('../../mock/categories')
const products = require('../../mock/products')
const cart = require('../../utils/cart')

Page({
  data: {
    categories,
    products,
    filteredProducts: [],
    selectedCategoryId: 'set',
    cartMap: {}
  },

  onLoad() {
    this.updateProducts(this.data.selectedCategoryId)
  },

  onShow() {
    this.syncCartMap()
  },

  syncCartMap() {
    const cartMap = {}
    cart.getCart().forEach((item) => {
      cartMap[item.id] = item.count
    })
    this.setData({
      cartMap
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

  stopTap() {
    return false
  }
})
