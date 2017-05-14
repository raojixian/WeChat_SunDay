//index.js
//获取应用实例
var app = getApp()
var save = require('../../utils/save.js')
Page({
  data: {
    motto: '我是你妈妈',
    userInfo: {},
    num: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  btnClick: function () {
    /**if (this.data.motto == '我是你妈妈') {
      this.setData({
        motto: 'changed data'
      })
    } else {
      this.setData({
        motto: '我是你妈妈'
      })
    }
**/

    var text = "aaaa"
    var re = /a*/
    var result = re.exec(text)
    if (result) {
      this.setData({
        num: this.data.num + 1
      })
    }

    save.saveData()
    this.setData({
      motto: app.globalData.tiku
    })

    

  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
