// pages/sub/subs/subs.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    touch_start: 0,
    modalHidden: true,
    selectSub: '',
    rbtnChecked: 'a',
    actionSheetHidden: true,
  },
  btnAddClick: function () {
    wx.navigateTo({
      url: '../addSub/addSub',
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
    if (e.timeStamp - that.data.touch_start < 350){
      app.globalData.selectSub = e.currentTarget.id;

      var sub = hander.getSubData(app.globalData.selectLib, app.globalData.selectSub);
      var items = sub['data'];
      var tp = sub['type'];

      //设置items乱序
      app.globalData.items = items;

      if (this.data.rbtnChecked == 'a'){
        if (tp == 0){
          wx.navigateTo({
            url: '../../main/single/single',
          })
        }
        else if(tp == 1){
          wx.navigateTo({
            url: '../../main/multiple/multiple',
          })
        }
      }
      else if (this.data.rbtnChecked == 'b') {
        
        if (tp == 0) {
          wx.navigateTo({
            url: '../../main/single1/single1',
          })
        }
        else if (tp == 1) {
          wx.navigateTo({
            url: '../../main/multiple1/multiple1',
          })
        }
      }

    }
  },
  radioChange: function (e) {
    this.setData({
      rbtnChecked: e.detail.value,
    })
  },
  //长按
  longtap: function (e) {
    //切换到actionSheet对话框
    this.setData({
      selectSub: e.currentTarget.id,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //切换到modal对话框
  tapModal:function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      modalHidden: false
    })
  },
  //确认
  modalFirm: function (e) {
    this.setData({
      modalHidden: true
    })
    if (hander.removeSub(this.data.selectSub)) {
      wx.showToast({
        title: '删除成功',
      })
      this.setData({
        items: hander.getSubsName(app.globalData.selectLib)
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
      items: hander.getSubsName(app.globalData.selectLib)
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