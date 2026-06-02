Page({
  data: {},

  goMenu() {
    wx.switchTab({
      url: '/pages/menu/menu'
    })
  },

  goRecharge() {
    wx.navigateTo({
      url: '/pages/recharge/recharge'
    })
  },

  goPoints() {
    wx.navigateTo({
      url: '/pages/points/points'
    })
  },

  onSearch() {
    wx.showToast({
      title: '搜索功能暂未接入',
      icon: 'none'
    })
  },

  showWifiToast() {
    wx.showToast({
      title: '高速网络，畅快体验',
      icon: 'none'
    })
  },

  showSuppliesToast() {
    wx.showToast({
      title: '请联系服务员领取',
      icon: 'none'
    })
  }
})
