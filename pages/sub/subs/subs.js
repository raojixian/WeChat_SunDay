// pages/sub/subs/subs.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  data: {
    items: [],
    order: false,
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
  itemtap: function (e) {
    var that = this;
    var selectSub = e.currentTarget.id;
    app.globalData.selectSub = selectSub;
    var sub = app.globalData.libs[app.globalData.selectLib][selectSub]
    var items = sub['items'];
    var tp = sub['type'];
    //设置items乱序
    if (that.data.order == true) {
      items = hander.outOfOrder(items);
    }

    app.globalData.items = items;

    if (that.data.rbtnChecked == 'a') {
      if (tp == 0) {
        wx.navigateTo({
          url: '../../main/single/single',
        })
      }
      else if (tp == 1) {
        wx.navigateTo({
          url: '../../main/multiple/multiple',
        })
      }
      else if (tp == 2) {
        wx.navigateTo({
          url: '../../main/judge/judge',
        })
      }
    }
    else if (that.data.rbtnChecked == 'b') {

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
      else if (tp == 2) {
        wx.navigateTo({
          url: '../../main/judge1/judge1',
        })
      }
    }
  },
  radioChange: function (e) {
    this.setData({
      rbtnChecked: e.detail.value,
    })
  },
  switchChange: function () {
    var that = this;
    this.data.order = !that.data.order;
  },
  //长按
  longtap: function (e) {
    //切换到actionSheet对话框
    var that = this;
    this.setData({
      selectSub: e.currentTarget.id,
      actionSheetHidden: false
    })
  },
  actionSheetChange: function (e) {
    var that = this;
    this.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
  },
  //切换到modal对话框
  tapModal: function () {
    var that = this;
    this.setData({
      actionSheetHidden: true,
      modalHidden: false
    })
  },
  //确认
  modalFirm: function (e) {
    var that = this;
    this.setData({
      modalHidden: true
    })
    if (hander.removeSub(that.data.selectSub)) {
      wx.showToast({
        title: '删除成功',
      })
      this.setData({
        items: hander.getSubsName()
      })
    }
  },
  //取消
  modalCancel: function (e) {
    this.setData({
      modalHidden: true
    })
  },
  moveUp: function () {
    var that = this;
    this.setData({
      actionSheetHidden: true
    })
    if (hander.moveSub(that.data.selectSub, 0)) {
      this.setData({
        items: hander.getSubsName()
      })
    }
    else {
      wx.showToast({
        title: '到顶啦！',
      })
    }
  },
  moveDown: function () {
    var that = this;
    this.setData({
      actionSheetHidden: true
    })
    if (hander.moveSub(that.data.selectSub, 1)) {
      this.setData({
        items: hander.getSubsName()
      })
    }
    else {
      wx.showToast({
        title: '到底啦！',
      })
    }
  },
  onShow: function () {
    this.setData({
      items: hander.getSubsName()
    })
  }
})