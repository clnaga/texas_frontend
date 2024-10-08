// app.js
import { func_post_request } from "./service/webRequest"
import { reqUrl } from "./constants/webRequestConstants"

App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        const url = reqUrl.urlGetToken
        const data = {
          'jsCode': res.code
        }
        func_post_request(url, data, function (res, error) {
          if (error) {
            console.log("Error: ", error)
          } else {
            getApp().globalData.userinfo = res.data;
          }
        })
      }
    })
  },
  globalData: {
    userinfo: {
      token: '',
      name: '输入名称，短点短点',
      curRoomCode: '',
    }
  }
})
