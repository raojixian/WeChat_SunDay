// pages/main/multiple1/multiple1.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  data: {
    items: [],
    tishu: 0,
    index: 0,
    item: [],
    answers: '',
    bc_default: '#FBFBFB',
    bc_select: '#CAE1FF',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',
    bcE: '',
    bcF: '',
    array: [],
    beginTime:0
  },

  setQuestion: function () {
    var that = this;
    var i = that.data.index
    this.setData({ item: that.data.items[i] });

    var ans = that.data.answers[that.data.index];

    if (ans.indexOf('A') >= 0) this.setData({ bcA: that.data.bc_select });
    else this.setData({ bcA: that.data.bc_default });

    if (ans.indexOf('B') >= 0) this.setData({ bcB: that.data.bc_select });
    else this.setData({ bcB: that.data.bc_default });

    if (ans.indexOf('C') >= 0) this.setData({ bcC: that.data.bc_select });
    else this.setData({ bcC: that.data.bc_default });

    if (ans.indexOf('D') >= 0) this.setData({ bcD: that.data.bc_select });
    else this.setData({ bcD: that.data.bc_default });

    if (ans.indexOf('E') >= 0) this.setData({ bcE: that.data.bc_select });
    else this.setData({ bcE: that.data.bc_default });

    if (ans.indexOf('F') >= 0) this.setData({ bcE: that.data.bc_select });
    else this.setData({ bcF: that.data.bc_default });

  },
  btnOpClick: function (e) {
    var that = this;
    var select = e.currentTarget.id;
    if (that.data.answers[that.data.index].indexOf(select) < 0) {//如果用户答案不包括选项
      this.data.answers[that.data.index] = that.data.answers[that.data.index] + select;//增加选项

      if (select == 'A') { this.setData({ bcA: that.data.bc_select }); }
      else if (select == 'B') { this.setData({ bcB: that.data.bc_select }); }
      else if (select == 'C') { this.setData({ bcC: that.data.bc_select }); }
      else if (select == 'D') { this.setData({ bcD: that.data.bc_select }); }
      else if (select == 'E') { this.setData({ bcE: that.data.bc_select }); }
      else if (select == 'F') { this.setData({ bcF: that.data.bc_select }); }
    }
    else {
      //去掉答案
      var s = that.data.answers[that.data.index]
      var index = s.indexOf(select);
      this.data.answers[that.data.index] = s.slice(0, index) + s.slice(index + 1);
      if (select == 'A') { this.setData({ bcA: that.data.bc_default }); }
      else if (select == 'B') { this.setData({ bcB: that.data.bc_default }); }
      else if (select == 'C') { this.setData({ bcC: that.data.bc_default }); }
      else if (select == 'D') { this.setData({ bcD: that.data.bc_default }); }
      else if (select == 'E') { this.setData({ bcE: that.data.bc_default }); }
      else if (select == 'F') { this.setData({ bcF: that.data.bc_default }); }
    }
  },
  nextQuestion: function () {
    var that = this;
    if (that.data.index < that.data.tishu - 1) {
      this.setData({ index: that.data.index + 1 });
      that.setQuestion();
    }
  },
  lastQuestion: function () {
    var that = this;
    if (that.data.index > 0) {
      this.setData({ index: that.data.index - 1 });
      that.setQuestion();
    }
  },
  //提交
  submit: function () {
    var that = this;
    app.globalData.answers = that.data.answers;
    app.globalData.time = new Date().getTime() - that.data.beginTime;
    wx.redirectTo({ url: '../result/result' });
  },
  bindPickerChange: function (e) {
    this.setData({ index: parseInt(e.detail.value) });
    var that = this;
    this.setQuestion();
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
      answers: answers,
      array: arr,
      beginTime: new Date().getTime()
    });
    var that = this;
    this.setQuestion();
  }
})