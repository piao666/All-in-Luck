const user = require('../../mock/user')

const tabs = [
  { id: 'all', name: '全部' },
  { id: 'beer', name: '啤酒' },
  { id: 'cocktail', name: '鸡尾酒' },
  { id: 'set', name: '套餐' },
  { id: 'snack', name: '小食' }
]

const gifts = [
  {
    id: 1,
    categoryId: 'beer',
    name: '百威啤酒 275ML',
    desc: '到店兑换冰镇啤酒 1 瓶',
    points: 1500,
    tag: '热门',
    imageType: 'beer'
  },
  {
    id: 2,
    categoryId: 'cocktail',
    name: '经典鸡尾酒',
    desc: '任选经典鸡尾酒 1 杯',
    points: 2500,
    tag: '推荐',
    imageType: 'cocktail'
  },
  {
    id: 3,
    categoryId: 'set',
    name: '特调套餐抵扣券',
    desc: '套餐消费可抵扣 88 元',
    points: 12000,
    tag: '高价值',
    imageType: 'cocktail-set'
  },
  {
    id: 4,
    categoryId: 'snack',
    name: '小食拼盘',
    desc: '薯条、鸡块、坚果组合',
    points: 3000,
    tag: '多人',
    imageType: 'snack-plate'
  },
  {
    id: 5,
    categoryId: 'beer',
    name: '精酿啤酒',
    desc: '精选精酿啤酒 1 杯',
    points: 2200,
    tag: '冰镇',
    imageType: 'craft-beer'
  }
]

Page({
  data: {
    points: user.points,
    tabs,
    gifts,
    filteredGifts: gifts,
    selectedTab: 'all'
  },

  selectTab(event) {
    const tabId = event.currentTarget.dataset.id
    const filteredGifts = tabId === 'all'
      ? gifts
      : gifts.filter((item) => item.categoryId === tabId)

    this.setData({
      selectedTab: tabId,
      filteredGifts
    })
  },

  redeemGift(event) {
    const giftId = Number(event.currentTarget.dataset.id)
    const gift = gifts.find((item) => item.id === giftId)

    if (!gift) {
      return
    }

    wx.showModal({
      title: '兑换演示',
      content: `当前为 UI 演示版，暂不扣减积分。商品：${gift.name}`,
      showCancel: false
    })
  },

  showPointsDetail() {
    wx.showToast({
      title: '积分明细暂未接入',
      icon: 'none'
    })
  }
})
