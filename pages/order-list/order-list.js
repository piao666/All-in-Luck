const orders = require('../../mock/orders')

const tabs = [
  { id: 'all', name: '全部' },
  { id: 'pending', name: '待付款' },
  { id: 'unused', name: '待使用' },
  { id: 'done', name: '已完成' }
]

Page({
  data: {
    tabs,
    selectedTab: 'all',
    orders,
    filteredOrders: orders
  },

  selectTab(event) {
    const tabId = event.currentTarget.dataset.id
    const filteredOrders = tabId === 'all'
      ? orders
      : orders.filter((item) => item.statusType === tabId)

    this.setData({
      selectedTab: tabId,
      filteredOrders
    })
  },

  goDetail(event) {
    const orderId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${orderId}`
    })
  },

  goMenu() {
    wx.switchTab({
      url: '/pages/menu/menu'
    })
  },

  handleAction(event) {
    const statusType = event.currentTarget.dataset.status
    const title = statusType === 'pending' ? '支付演示' : '使用演示'
    const content = statusType === 'pending'
      ? '当前为 UI 演示版，暂不接入微信支付。'
      : '当前为 UI 演示版，暂不接入真实核销。'

    wx.showModal({
      title,
      content,
      showCancel: false
    })
  }
})
