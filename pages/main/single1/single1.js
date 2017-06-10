// pages/main/single1/single1.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  data: {
    items: [],
    tishu: 0,
    index: 0,
    answers : [],
    item: [],
    bc_default: '#FBFBFB',
    bc_select: '#CAE1FF',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',
    array: [],
  },
  setQuestion: function () {
    var that = this;
    var i = that.data.index;
    this.setData({
      item: that.data.items[i],
    })
    var ans = that.data.answers[that.data.index];
    if (ans == ''){
      this.setData({
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
      });
    }
    else if (ans == 'A') {
      this.setData({
        bcA: that.data.bc_select,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
      });
    }
    else if (ans == 'B') {
      this.setData({
        bcB: that.data.bc_select,
        bcA: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
      });
    }
    else if (ans == 'C') {
      this.setData({
        bcC: that.data.bc_select,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcD: that.data.bc_default,
      });
    }
    else if (ans == 'D') {
      this.setData({
        bcD: that.data.bc_select,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
      });
    }
  },
  btnOpClick: function (e) {
    var that = this;
    var select = e.currentTarget.id;
    this.data.answers[that.data.index] = select;
    if (select == 'A') {
      this.setData({
        bcA: that.data.bc_select,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
      });
    }
    else if (select == 'B') {
      this.setData({
        bcB: that.data.bc_select,
        bcA: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
      });
    }
    else if (select == 'C') {
      this.setData({
        bcC: that.data.bc_select,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcD: that.data.bc_default,
      });
    }
    else if (select == 'D') {
      this.setData({
        bcD: that.data.bc_select,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
      });
    }
  },
  nextQuestion: function () {
    var that = this;
    if (that.data.index < that.data.items.length - 1) {
      this.setData({ index: that.data.index + 1});
      that.setQuestion();
    }
  },
  lastQuestion: function () {
    var that = this;
    if (that.data.index > 0) {
      this.setData({ index: that.data.index - 1});
      that.setQuestion();
    }
  },
  submit: function () {
    var that = this;
    app.globalData.answers = that.data.answers;
    wx.redirectTo({url:  '../result/result'})
  },
  bindPickerChange: function (e) {
    this.setData({index: parseInt(e.detail.value)})
    var that = this;
    that.setQuestion();
  },
  onLoad: function (options) {
    var len = app.globalData.items.length;
    var answers = new Array(len);
    answers.fill('');
    var arr = new Array(len);
    for (var i = 0; i < len; i++) {
      arr[i] = app.globalData.items[i][1].substring(0, 22);
    }
    this.setData({
      items: app.globalData.items,
      tishu: len,
      answers : answers,
      array: arr,
    });
    var that = this;
    this.setQuestion();
  }
})