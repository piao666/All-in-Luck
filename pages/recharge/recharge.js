const user = require('../../mock/user')

const plans = [
  {
    id: 1,
    amount: 588,
    bonus: 228,
    label: '轻松开局',
    desc: '适合小聚和单次畅饮',
    tag: '推荐'
  },
  {
    id: 2,
    amount: 1588,
    bonus: 688,
    label: '常客优选',
    desc: '多人桌游、酒水套餐更划算',
    tag: '高赠送'
  },
  {
    id: 3,
    amount: 3000,
    bonus: 1500,
    label: 'VIP 尊享',
    desc: '适合长期会员和商务招待',
    tag: 'VIP'
  }
]

Page({
  data: {
    balance: Number(user.balance).toFixed(2),
    plans,
    selectedPlanId: 1,
    selectedPlan: plans[0],
    arrivalAmount: plans[0].amount + plans[0].bonus
  },

  selectPlan(event) {
    const planId = Number(event.currentTarget.dataset.id)
    const selectedPlan = plans.find((item) => item.id === planId) || plans[0]

    this.setData({
      selectedPlanId: planId,
      selectedPlan,
      arrivalAmount: selectedPlan.amount + selectedPlan.bonus
    })
  },

  confirmRecharge() {
    const plan = this.data.selectedPlan
    wx.showModal({
      title: '充值演示',
      content: `当前为 UI 演示版，暂不接入微信支付。已选择：充 ${plan.amount} 送 ${plan.bonus}`,
      showCancel: false
    })
  }
})
