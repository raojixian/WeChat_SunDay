// pages/lib/addLib/addLib.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    inputText : "",
  },
  bindChange: function (e) {
     this.data.inputText = e.detail.value
  },
  //切换到modal对话框
   modalTap: function (e) {
     if (hander.isNull(this.data.inputText)){
       wx.showToast({
         title: '题目不能为空',
       })
     }
     else{
       this.setData({
         inputText: this.data.inputText,
         modalHidden: false
       })
     }
   },
   //确认
   modalFirm: function (e) {
     this.setData({
       modalHidden: true
     })
     if (hander.addLib(this.data.inputText)) {
       wx.showToast({
         title: '添加成功',
       })
     }
     else {//如果失败，提示题库已存在
       wx.showToast({
         title: '已存在',
       })
     }
   },
   //取消
   modalCancel: function (e) {
     this.setData({
       modalHidden: true
     })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})