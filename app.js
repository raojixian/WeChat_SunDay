//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //读取本地题库，赋值到全局变量

    try{
      this.globalData.libs = JSON.parse(wx.getStorageSync('libs'));
    } catch (e) {
      //第一次启动，没有缓存
    }
      
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    libs:{},
    selectLib : null,//当前选择的科目
    selectSub: null,//当前选择的题库
    form:{},//格式化后的数据
    items:[],//当前做的题
    answer:[],//用户的答案
  }
})