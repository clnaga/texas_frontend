// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
  },

  // 调用自定义tabbar的init函数，使页面与tabbar激活状态保持一致
  onShow() {
    this.getTabBar().init();
  },

  createRoom(e) {
    wx.switchTab({
      url: "/pages/room/index"
    });
  }
})
