// pages/lib/libs/libs.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    touch_start : 0,
    modalHidden: true,
    selectLib:'',
    actionSheetHidden: true,
  },
  btnAddClick: function(){
    wx.navigateTo({
      url: '../addLib/addLib',
    })
  },
  //按下事件开始  
  touchstart: function (e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
  },
  //按下事件结束  
  touchend: function (e) {
    let that = this;
    if (e.timeStamp - that.data.touch_start<350){
      app.globalData.selectLib = e.currentTarget.id
      this.setData({
        test: app.globalData.selectLib
      })
      wx.navigateTo({
        url: '../../sub/subs/subs',
      })
    }
  },
  //长按
  longtap:function(e){
    
    this.setData({
      selectLib: e.currentTarget.id,
      actionSheetHidden: !this.data.actionSheetHidden
    })


  },
  actionSheetChange: function (e) {
    this.setData({
      
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //切换到modal对话框
  tapModal:function(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      modalHidden : false
    })
  },
  //确认
  modalFirm: function (e) {
    this.setData({
      modalHidden: true
    })
    if (hander.removeLib(this.data.selectLib)){
      wx.showToast({
        title: '删除成功',
      })
      this.setData({
        items: hander.getLibsName()
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
    this.setData({
      items: hander.getLibsName()
    })
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