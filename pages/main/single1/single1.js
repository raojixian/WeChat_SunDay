// pages/main/single1/single1.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    tishu: 0,
    index: 0,
    answer : [],
    title: '题目',
    opA: '选项1',
    opB: '选项2',
    opC: '选项3',
    opD: '选项4',
    bc_default: '',
    bc_select: '#0999C7',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',

    array: [],
    
  },
  setQuestion: function () {
    var i = this.data.index
    this.setData({
      title: this.data.items[i][1],
      opA: this.data.items[i][2],
      opB: this.data.items[i][3],
      opC: this.data.items[i][4],
      opD: this.data.items[i][5],
      bcA: this.data.bc_default,
      bcB: this.data.bc_default,
      bcC: this.data.bc_default,
      bcD: this.data.bc_default,
    })
    var ans = this.data.answer[this.data.index];
    if (ans == 'A') {
      this.setData({
        bcA: this.data.bc_select,
      });
    }
    else if (ans == 'B') {
      this.setData({
        bcB: this.data.bc_select,
      });
    }
    else if (ans == 'C') {
      this.setData({
        bcC: this.data.bc_select,
      });
    }
    else if (ans == 'D') {
      this.setData({
        bcD: this.data.bc_select,
      });
    }
  },
  btnOpClick: function (e) {
    var select = e.currentTarget.id;
    this.data.answer[this.data.index] = select
    if (select == 'A') {
      this.setData({
        bcA: this.data.bc_select,
        bcB: this.data.bc_default,
        bcC: this.data.bc_default,
        bcD: this.data.bc_default,
      });
    }
    else if (select == 'B') {
      this.setData({
        bcB: this.data.bc_select,
        bcA: this.data.bc_default,
        bcC: this.data.bc_default,
        bcD: this.data.bc_default,
      });
    }
    else if (select == 'C') {
      this.setData({
        bcC: this.data.bc_select,
        bcA: this.data.bc_default,
        bcB: this.data.bc_default,
        bcD: this.data.bc_default,
      });
    }
    else if (select == 'D') {
      this.setData({
        bcD: this.data.bc_select,
        bcA: this.data.bc_default,
        bcB: this.data.bc_default,
        bcC: this.data.bc_default,
      });
    }
  },
  nextQuestion: function () {
    if (this.data.index < this.data.items.length - 1) {
      this.data.index = this.data.index + 1;
      this.setQuestion();
    }
  },
  lastQuestion: function () {
    if (this.data.index > 0) {
      this.data.index = this.data.index - 1;
      this.setQuestion();
    }
  },
  submit: function () {
    app.globalData.answer = this.data.answer;
    wx.redirectTo({
      url:  '../result/result'
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: parseInt(e.detail.value)
    })
    this.setQuestion();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var len = app.globalData.items.length;
    var answer = new Array(len);
    answer.fill(0);
    var arr = new Array(len);
    for (var i = 0; i < len; i++) {
      arr[i] = app.globalData.items[i][1];
    }
    this.setData({
      items: app.globalData.items,
      tishu: len,
      answer : answer,
      array: arr,
    });

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
    this.setQuestion();
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

  }
})