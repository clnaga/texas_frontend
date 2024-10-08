// index.js
import { changeName } from "../../service/user-info/userInfoWebRequest";

Page({
  data: {
    userinfo: null,
  },
  
  onShow: function () {
    const app =  getApp();
    this.setData({
      userinfo: app.globalData.userinfo
    })
  },

  changeName(e) {
    const context = this
    const nickName = e.detail.value
    getApp().globalData.userinfo.name = nickName
    if (nickName != '') {
      changeName(nickName)
      context.setData({
        "userInfo.userinfo": nickName
      })
    }
  },

})
