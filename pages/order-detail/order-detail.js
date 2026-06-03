const orders = require('../../mock/orders')

Page({
  data: {
    order: orders[0],
    timeline: []
  },

  onLoad(options) {
    const order = orders.find((item) => item.id === options.id) || orders[0]
    this.setData({
      order,
      timeline: this.buildTimeline(order)
    })
  },

  buildTimeline(order) {
    const timeline = [
      { label: '提交订单', value: order.orderTime, active: true },
      { label: '完成支付', value: order.payTime || '待付款', active: order.statusType !== 'pending' },
      { label: '到店使用', value: order.useTime, active: order.statusType === 'done' }
    ]

    return timeline
  },

  handlePrimaryAction() {
    const order = this.data.order
    const title = order.statusType === 'pending' ? '支付演示' : '核销演示'
    const content = order.statusType === 'pending'
      ? '当前为 UI 演示版，暂不接入微信支付。'
      : '当前为 UI 演示版，暂不接入真实核销。'

    wx.showModal({
      title,
      content,
      showCancel: false
    })
  },

  goMenu() {
    wx.switchTab({
      url: '/pages/menu/menu'
    })
  },

  goHome() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})
