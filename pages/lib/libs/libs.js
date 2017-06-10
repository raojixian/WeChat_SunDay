// pages/lib/libs/libs.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  data: {
    items:[],
    modalHidden: true,
    selectLib:'',
    actionSheetHidden: true,
  },
  btnAddClick: function(){
    wx.navigateTo({
      url: '../addLib/addLib',
    })
  },
  itemtap:function(e){
    app.globalData.selectLib = e.currentTarget.id;
    wx.navigateTo({
      url: '../../sub/subs/subs',
    })
  },
  //长按
  longtap:function(e){
    var that = this;
    this.setData({
      selectLib: e.currentTarget.id,
      actionSheetHidden: !that.data.actionSheetHidden
    })
  },
  actionSheetChange: function (e) {
    var that = this;
    this.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
  },
  //切换到modal对话框
  tapModal:function(){
    var that = this;
    this.setData({
      actionSheetHidden: !that.data.actionSheetHidden,
      modalHidden : false
    })
  },
  //确认
  modalFirm: function(e){
    var that = this;
    this.setData({
      modalHidden: true
    })
    if (hander.removeLib(that.data.selectLib)){
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
  onLoad: function () {
    this.setData({
      items: hander.getLibsName()
    })
  },
  onShow: function(){
    this.setData({
      items: hander.getLibsName()
    })
  }
})