// pages/main/judge1/judge1.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  data: {
    items: [],
    answers: [],
    show: [],
    order: [],
    beginTime:0
  },
  itemtap: function (e) {
    var that = this;
    var index = e.currentTarget.id;
    if (that.data.answers[index] == '') {
      that.data.answers[index] = '对';
      that.data.show[index] = '✔';
      this.setData({
        show: that.data.show
      })
    }
    else if (that.data.answers[index] == '对') {
      that.data.answers[index] = '错';
      that.data.show[index] = '✘';
      this.setData({
        show: that.data.show
      })
    }
    else {
      that.data.answers[index] = '对';
      that.data.show[index] = '✔';
      this.setData({
        show: that.data.show
      })
    }
  },
  submit: function () {
    var that = this;
    app.globalData.answers = that.data.answers;
    app.globalData.time = new Date().getTime() - that.data.beginTime;
    wx.redirectTo({
      url: '../result/result'
    })
  },
  onLoad: function (options) {
    var len = app.globalData.items.length;
    var order = new Array(len);
    for (var i = 0; i < len; i++) {
      order[i] = i;
    }
    var answers = new Array(len);
    answers.fill('');
    var show = new Array(len);
    show.fill('☃');
    this.setData({
      items: app.globalData.items,
      answers: answers,
      show: show,
      order: order,
      beginTime: new Date().getTime()
    })
  }
})