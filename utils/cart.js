const CART_KEY = 'all_in_luck_cart'

function normalizeCount(value, fallback) {
  const count = Number(value)
  if (Number.isFinite(count)) {
    return Math.max(0, Math.floor(count))
  }
  return fallback
}

function normalizeCartItem(product, count) {
  const rawCount = count !== undefined ? count : product.count !== undefined ? product.count : product.quantity
  const normalizedCount = normalizeCount(rawCount, 1)

  return {
    id: Number(product.id),
    name: product.name,
    desc: product.desc,
    price: Number(product.price) || 0,
    points: Number(product.points) || 0,
    count: normalizedCount,
    categoryId: product.categoryId,
    imageType: product.imageType || 'cocktail'
  }
}

function getCart() {
  const cart = wx.getStorageSync(CART_KEY) || []
  if (!Array.isArray(cart)) {
    return []
  }

  return cart
    .filter((item) => item && item.id)
    .map((item) => normalizeCartItem(item))
    .filter((item) => item.count > 0)
}

function saveCart(cart) {
  const normalizedCart = Array.isArray(cart)
    ? cart
      .filter((item) => item && item.id)
      .map((item) => normalizeCartItem(item))
      .filter((item) => item.count > 0)
    : []

  wx.setStorageSync(CART_KEY, normalizedCart)
  return normalizedCart
}

function addToCart(product, count = 1) {
  const cart = getCart()
  const productId = Number(product.id)
  const addCount = normalizeCount(count, 1)
  const existing = cart.find((item) => item.id === productId)

  if (addCount <= 0) {
    return cart
  }

  if (existing) {
    existing.count += addCount
  } else {
    cart.push(normalizeCartItem(product, addCount))
  }

  return saveCart(cart)
}

function updateCartItem(id, count) {
  const productId = Number(id)
  const nextCount = Number(count)
  const cart = getCart()

  if (!Number.isFinite(nextCount) || nextCount <= 0) {
    return removeCartItem(productId)
  }

  return saveCart(cart.map((item) => {
    if (item.id === productId) {
      return Object.assign({}, item, {
        count: Math.floor(nextCount)
      })
    }
    return item
  }))
}

function removeCartItem(id) {
  const productId = Number(id)
  return saveCart(getCart().filter((item) => item.id !== productId))
}

function clearCart() {
  wx.removeStorageSync(CART_KEY)
  return []
}

function getCartTotal(cart) {
  const normalizedCart = Array.isArray(cart) ? cart : []
  return normalizedCart.reduce((total, item) => {
    const count = normalizeCount(item.count, normalizeCount(item.quantity, 0))
    return total + (Number(item.price) || 0) * count
  }, 0)
}

module.exports = {
  CART_KEY,
  getCart,
  saveCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartTotal,
  normalizeCartItem
}
