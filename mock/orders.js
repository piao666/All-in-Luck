const orders = [
  {
    id: 'AIL20260603001',
    status: '待使用',
    statusType: 'unused',
    title: '特调套餐 任选五',
    tableNo: 'A06',
    orderTime: '2026-06-03 20:18',
    payTime: '2026-06-03 20:19',
    useTime: '今日到店使用',
    verifyCode: '6829 1754',
    totalAmount: 388,
    points: 10000,
    payment: '会员余额',
    remark: '少冰，先上小食',
    items: [
      {
        name: '特调套餐 任选五',
        desc: '招牌鸡尾酒 5 杯 + 小食拼盘',
        price: 388,
        count: 1,
        imageType: 'cocktail-set'
      }
    ]
  },
  {
    id: 'AIL20260602012',
    status: '交易完成',
    statusType: 'done',
    title: '百威啤酒 275ML',
    tableNo: 'B03',
    orderTime: '2026-06-02 21:06',
    payTime: '2026-06-02 21:07',
    useTime: '2026-06-02 22:14',
    verifyCode: '已核销',
    totalAmount: 114,
    points: 4500,
    payment: '微信支付演示',
    remark: '冰镇',
    items: [
      {
        name: '百威啤酒 275ML',
        desc: '经典冰镇瓶装啤酒',
        price: 38,
        count: 3,
        imageType: 'beer'
      }
    ]
  },
  {
    id: 'AIL20260603007',
    status: '待付款',
    statusType: 'pending',
    title: '小食拼盘',
    tableNo: 'C01',
    orderTime: '2026-06-03 21:32',
    payTime: '',
    useTime: '付款后使用',
    verifyCode: '付款后生成',
    totalAmount: 88,
    points: 3000,
    payment: '未支付',
    remark: '番茄酱单独放',
    items: [
      {
        name: '小食拼盘',
        desc: '薯条、鸡块、坚果组合',
        price: 88,
        count: 1,
        imageType: 'snack-plate'
      }
    ]
  }
]

module.exports = orders
