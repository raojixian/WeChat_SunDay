// pages/main/single/single.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  data: {
    items: [],
    tishu: 0,
    index: 0,
    item: [],
    bc_default: '#FBFBFB',
    bc_right: '#98FB98',
    bc_wrong: '#FF99B4',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',
    bcE: '',
    array: [],
  },
  setQuestion: function () {
    var that = this;
    var i = that.data.index
    this.setData({
      item: that.data.items[i],
      bcA: that.data.bc_default,
      bcB: that.data.bc_default,
      bcC: that.data.bc_default,
      bcD: that.data.bc_default,
      bcE: that.data.bc_default,
    })
  },
  btnOpClick: function (e) {
    var that = this;
    var select = e.currentTarget.id;
    if (select == that.data.item[0]) {
      if (that.data.index == that.data.tishu - 1) {
        if (select == 'A') {
          this.setData({ bcA: that.data.bc_right });
        }
        else if (select == 'B') {
          this.setData({ bcB: that.data.bc_right });
        }
        else if (select == 'C') {
          this.setData({ bcC: that.data.bc_right });
        }
        else if (select == 'D') {
          this.setData({ bcD: that.data.bc_right });
        }
        else if (select == 'E') {
          this.setData({ bcE: that.data.bc_right });
        }
      }
      that.nextQuestion();
    }
    else {
      if (select == 'A') {
        this.setData({ bcA: that.data.bc_wrong });
      }
      else if (select == 'B') {
        this.setData({ bcB: that.data.bc_wrong });
      }
      else if (select == 'C') {
        this.setData({ bcC: that.data.bc_wrong });
      }
      else if (select == 'D') {
        this.setData({ bcD: that.data.bc_wrong });
      }
      else if (select == 'E') {
        this.setData({ bcE: that.data.bc_wrong });
      }
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
  showRight: function () {
    var that = this;
    if (that.data.item[0] == 'A') {
      this.setData({ bcA: that.data.bc_right });
    }
    else if (that.data.item[0] == 'B') {
      this.setData({ bcB: that.data.bc_right });
    }
    else if (that.data.item[0] == 'C') {
      this.setData({ bcC: that.data.bc_right });
    }
    else if (that.data.item[0] == 'D') {
      this.setData({ bcD: that.data.bc_right });
    }
    else if (that.data.item[0] == 'E') {
      this.setData({ bcE: that.data.bc_right });
    }
  },
  bindPickerChange: function (e) {
    this.setData({ index: parseInt(e.detail.value) })
    var that = this;
    that.setQuestion();
  },
  onLoad: function (options) {
    var len = app.globalData.items.length;
    var arr = new Array(len);
    for (var i = 0; i < len; i++) {
      arr[i] = app.globalData.items[i][1].substring(0, 22);
    }
    this.setData({
      items: app.globalData.items,
      tishu: len,
      array: arr,
    });
    var that = this;
    this.setQuestion();
  }
})