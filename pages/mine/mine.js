const user = require('../../mock/user')

Page({
  data: {
    user,
    stats: [
      { label: '会员卡', value: user.memberCardCount },
      { label: '余额', value: `￥${Number(user.balance).toFixed(2)}` },
      { label: '积分', value: user.points },
      { label: '优惠券', value: user.couponCount }
    ],
    orderStatuses: [
      { label: '待付款', icon: '付' },
      { label: '待使用', icon: '用' },
      { label: '已使用', icon: '核' },
      { label: '售后', icon: '退' },
      { label: '交易完成', icon: '成' }
    ],
    gridItems: [
      { label: '我的表单', icon: '单', type: 'todo' },
      { label: '我的会员卡', icon: '卡', type: 'recharge' },
      { label: '我的积分', icon: '分', type: 'points' },
      { label: '我的优惠券', icon: '券', type: 'todo' },
      { label: '我的余额', icon: '额', type: 'todo' },
      { label: '积分兑换', icon: '兑', type: 'points' },
      { label: '推广员中心', icon: '推', type: 'todo' },
      { label: '收货人地址', icon: '址', type: 'todo' },
      { label: '我的收藏', icon: '藏', type: 'todo' },
      { label: '联系客服', icon: '客', type: 'todo' }
    ]
  },

  showLoginModal() {
    wx.showModal({
      title: '登录提示',
      content: '当前为 UI 演示版，暂未接入微信登录',
      showCancel: false
    })
  },

  goOrders() {
    wx.navigateTo({
      url: '/pages/order-list/order-list'
    })
  },

  goPoints() {
    wx.navigateTo({
      url: '/pages/points/points'
    })
  },

  goRecharge() {
    wx.navigateTo({
      url: '/pages/recharge/recharge'
    })
  },

  handleGridTap(event) {
    const type = event.currentTarget.dataset.type
    if (type === 'points') {
      this.goPoints()
      return
    }
    if (type === 'recharge') {
      this.goRecharge()
      return
    }
    wx.showToast({
      title: '功能暂未接入',
      icon: 'none'
    })
  }
})
