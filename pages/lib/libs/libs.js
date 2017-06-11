// pages/lib/libs/libs.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  data: {
    items: [],
    modalHidden: true,
    selectLib: '',
    actionSheetHidden: true,
    alterShow: false,
    name: ''
  },
  btnAddClick: function () {
    wx.navigateTo({
      url: '../addLib/addLib',
    })
  },
  itemtap: function (e) {
    app.globalData.selectLib = e.currentTarget.id;
    wx.navigateTo({
      url: '../../sub/subs/subs',
    })
  },
  //长按
  longtap: function (e) {
    var that = this;
    this.setData({
      selectLib: e.currentTarget.id,
      actionSheetHidden: false,
      alterShow: false,
      name: e.currentTarget.id
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
    if (hander.removeLib(that.data.selectLib)) {
      wx.showToast({
        title: '已删除',
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
  moveUp: function () {
    var that = this;
    this.setData({
      actionSheetHidden: true
    })
    if (hander.moveLib(that.data.selectLib, 0)) {
      this.setData({
        items: hander.getLibsName()
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
    if (hander.moveLib(that.data.selectLib, 1)) {
      this.setData({
        items: hander.getLibsName()
      })
    }
    else {
      wx.showToast({
        title: '到底啦！',
      })
    }
  },
  alterTap: function () {
    this.setData({
      actionSheetHidden: true,
      alterShow: true
    })
  },
  //得到名称
  getName: function (e) {
    var str = e.detail.value;
    this.setData({
      name: str.replace(/(^\s*)|(\s*$)/g, "")
    })
  },
  alterCancel: function () {
    this.setData({
      alterShow: false
    })
  },
  alterConfirm: function () {
    var that = this;
    if (that.data.name == '') {
      wx.showToast({
        title: '名称不能为空',
      })
    } else {
      var state = hander.alterLib(that.data.selectLib, that.data.name);
      if (state == 1) {
        this.setData({
          alterShow: false,
          items: hander.getLibsName()
        })
        wx.showToast({
          title: '已重命名',
        })
      }
      else if (state == 0) {
        wx.showToast({
          title: '已存在',
        })
      }
    }
  },
  onShow: function () {
    this.setData({
      items: hander.getLibsName()
    })
  }
})