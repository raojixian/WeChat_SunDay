// pages/main/multiple/multiple.js
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
    item:[],
    bc_default: '#FCFCFC',
    bc_right: '#98FB98',
    bc_wrong: '#FF99B4',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',
    bcE: '',
    array: [],
    answer:'',
  },

  setQuestion: function () {
    var i = this.data.index

    this.setData({
      item: this.data.items[i],
      bcA: this.data.bc_default,
      bcB: this.data.bc_default,
      bcC: this.data.bc_default,
      bcD: this.data.bc_default,
      bcE: this.data.bc_default,
      answer:'',
    })

  },
  btnOpClick: function (e) {
    var select = e.currentTarget.id;
    if (this.data.answer.indexOf(select) < 0){
      this.setData({ answer: this.data.answer + select });//更新用户答案
      //console.log(this.data.answer)

      if (this.data.item[0].indexOf(select) >= 0) {//如果是正确答案

        if (this.data.index < this.data.tishu - 1) {//如果不是最后一题
          //如果正确选项没有全部回答完
          if (!this.isRight(this.data.item[0], this.data.answer)) {
            if (select == 'A') {
              this.setData({ bcA: this.data.bc_right });
            }
            else if (select == 'B') {
              this.setData({ bcB: this.data.bc_right });
            }
            else if (select == 'C') {
              this.setData({ bcC: this.data.bc_right });
            }
            else if (select == 'D') {
              this.setData({ bcD: this.data.bc_right });
            }
            else if (select == 'E') {
              this.setData({ bcE: this.data.bc_right });
            }
          }
          else {//否则，下一题
            this.nextQuestion();
          }
        } else {//如果是最后一题
          if (select == 'A') {
            this.setData({ bcA: this.data.bc_right });
          }
          else if (select == 'B') {
            this.setData({ bcB: this.data.bc_right });
          }
          else if (select == 'C') {
            this.setData({ bcC: this.data.bc_right });
          }
          else if (select == 'D') {
            this.setData({ bcD: this.data.bc_right });
          }
          else if (select == 'E') {
            this.setData({ bcE: this.data.bc_right });
          }
        }
      }
      else {//如果是错误答案
        if (select == 'A') {
          this.setData({ bcA: this.data.bc_wrong });
        }
        else if (select == 'B') {
          this.setData({ bcB: this.data.bc_wrong });
        }
        else if (select == 'C') {
          this.setData({ bcC: this.data.bc_wrong });
        }
        else if (select == 'D') {
          this.setData({ bcD: this.data.bc_wrong });
        }
        else if (select == 'E') {
          this.setData({ bcE: this.data.bc_wrong });
        }
      }
    }
    
  },
  nextQuestion: function () {
    if (this.data.index < this.data.tishu - 1) {
      this.setData({ index: this.data.index + 1 });
      this.setQuestion();
    }
  },
  lastQuestion: function () {
    if (this.data.index > 0) {
      this.setData({ index: this.data.index - 1 });
      this.setQuestion();
    }
  },
  //显示正确答案
  showRight: function () {
    if (this.data.item[0].indexOf('A')>=0){
      this.setData({bcA: this.data.bc_right,});
    }
    if (this.data.item[0].indexOf('B') >= 0) {
      this.setData({ bcB: this.data.bc_right, });
    }
    if (this.data.item[0].indexOf('C') >= 0) {
      this.setData({ bcC: this.data.bc_right, });
    }
    if (this.data.item[0].indexOf('D') >= 0) {
      this.setData({ bcD: this.data.bc_right, });
    }
    if (this.data.item[0].indexOf('E') >= 0) {
      this.setData({ bcE: this.data.bc_right, });
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: parseInt(e.detail.value)
    })
    this.setQuestion();
  },
  //判断多选答案是否正确
  isRight(daan,answer){
    if(answer.length>=daan.length){
      for (var i = 0; i < daan.length; i++) {
        if (answer.indexOf(daan.charAt(i)) < 0){
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
      arr[i] = app.globalData.items[i][1];
    }
    this.setData({
      items: app.globalData.items,
      tishu: len,
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