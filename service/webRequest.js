// 封装post请求
export function func_post_request(url, data, callback) {
    const app =  getApp();
    wx.request({
        url: url,
        data: data,
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'wxOpenId': app.globalData.userinfo.token,
        },
        method: 'POST',
        dataType: 'json',
        success(res) {
            if (callback != null) {
                callback(res.data)
            }
        },
        fail(error) {
            if (callback != null) {
                callback(null, error)
            }
        }
    })
}