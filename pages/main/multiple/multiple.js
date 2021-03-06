// pages/main/multiple/multiple.js
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
    bcF: '',
    array: [],
    answer: '',
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
      bcF: that.data.bc_default,
      answer: '',
    })

  },
  btnOpClick: function (e) {
    var that = this;
    var select = e.currentTarget.id;
    if (that.data.answer.indexOf(select) < 0) {
      this.setData({ answer: that.data.answer + select });//更新用户答案

      if (this.data.item[0].indexOf(select) >= 0) {//如果是正确答案

        if (this.data.index < that.data.tishu - 1) {//如果不是最后一题
          //如果正确选项没有全部回答完
          if (!this.isRight(that.data.item[0], that.data.answer)) {
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
            else if (select == 'F') {
              this.setData({ bcF: that.data.bc_right });
            }
          }
          else {//否则，下一题
            that.nextQuestion();
          }
        } else {//如果是最后一题
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
          else if (select == 'F') {
            this.setData({ bcF: that.data.bc_right });
          }
        }
      }
      else {//如果是错误答案
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
        else if (select == 'F') {
          this.setData({ bcF: that.data.bc_wrong });
        }
      }
    }

  },
  nextQuestion: function () {
    var that = this;
    if (that.data.index < that.data.tishu - 1) {
      this.setData({ index: that.data.index + 1 });
      this.setQuestion();
    }
  },
  lastQuestion: function () {
    var that = this;
    if (that.data.index > 0) {
      this.setData({ index: that.data.index - 1 });
      this.setQuestion();
    }
  },
  //显示正确答案
  showRight: function () {
    var that = this;
    if (that.data.item[0].indexOf('A') >= 0) {
      this.setData({ bcA: that.data.bc_right, });
    }
    if (that.data.item[0].indexOf('B') >= 0) {
      this.setData({ bcB: that.data.bc_right, });
    }
    if (that.data.item[0].indexOf('C') >= 0) {
      this.setData({ bcC: that.data.bc_right, });
    }
    if (that.data.item[0].indexOf('D') >= 0) {
      this.setData({ bcD: that.data.bc_right, });
    }
    if (that.data.item[0].indexOf('E') >= 0) {
      this.setData({ bcE: that.data.bc_right, });
    }
    if (that.data.item[0].indexOf('F') >= 0) {
      this.setData({ bcF: that.data.bc_right, });
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: parseInt(e.detail.value)
    })
    var that = this;
    that.setQuestion();
  },
  //判断多选答案是否正确
  isRight(daan, answer) {
    if (answer.length >= daan.length) {
      for (var i = 0; i < daan.length; i++) {
        if (answer.indexOf(daan.charAt(i)) < 0) {
          return false;
        }
      }
      return true;
    }
    else return false;
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
    that.setQuestion();
  }
})