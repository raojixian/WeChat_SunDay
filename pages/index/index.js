//index.js
//获取应用实例
var app = getApp()
var hander = require('../../utils/dataHander.js')
Page({
  data: {
    userInfo: {},
  },
  //事件处理函数
  bindViewTap: function () {
    hander.saveData()
    wx.navigateTo({
      url: '../logs/logs',    
    })
  },
  btnStart:function(){
    wx.redirectTo({
      url: '../lib/libs/libs',
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
