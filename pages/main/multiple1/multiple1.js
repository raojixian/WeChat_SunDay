// pages/main/multiple1/multiple1.js
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
    item: [],
    answers: '',
    bc_default: '#FCFCFC',
    bc_select: '#0999C7',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',
    bcE: '',
    array: [],
    
  },

  setQuestion: function () {
    var i = this.data.index

    this.setData({
      item: this.data.items[i],
    })

    var ans = this.data.answers[this.data.index];

    if (ans.indexOf('A')>=0) this.setData({bcA: this.data.bc_select});
    else this.setData({ bcA: this.data.bc_default});

    if (ans.indexOf('B') >= 0) this.setData({ bcB: this.data.bc_select});
    else this.setData({ bcB: this.data.bc_default});

    if (ans.indexOf('C') >= 0) this.setData({ bcC: this.data.bc_select});
    else this.setData({ bcC: this.data.bc_default});

    if (ans.indexOf('D') >= 0) this.setData({ bcD: this.data.bc_select});
    else this.setData({ bcD: this.data.bc_default});

    if (ans.indexOf('E') >= 0) this.setData({ bcE: this.data.bc_select});
    else this.setData({ bcE: this.data.bc_default});

  },
  btnOpClick: function (e) {
    var select = e.currentTarget.id;
    if (this.data.answers[this.data.index].indexOf(select) < 0) {//如果用户答案不包括选项
      this.data.answers[this.data.index] = this.data.answers[this.data.index] + select;//增加选项
      //console.log(this.data.answers[this.data.index]);

      if (select == 'A') {
        this.setData({bcA: this.data.bc_select});
      }
      else if (select == 'B') {
        this.setData({bcB: this.data.bc_select});
      }
      else if (select == 'C') {
        this.setData({bcC: this.data.bc_select});
      }
      else if (select == 'D') {
        this.setData({bcD: this.data.bc_select});
      }
      else if (select == 'E') {
        this.setData({ bcE: this.data.bc_select});
      } 
    }
    else{
      var s = this.data.answers[this.data.index]
      var index = s.indexOf(select);
      this.data.answers[this.data.index] = s.slice(0, index) + s.slice(index+1)
      //console.log(this.data.answers[this.data.index]);
      
      if (select == 'A') {
        this.setData({ bcA: this.data.bc_default });
      }
      else if (select == 'B') {
        this.setData({ bcB: this.data.bc_default });
      }
      else if (select == 'C') {
        this.setData({ bcC: this.data.bc_default });
      }
      else if (select == 'D') {
        this.setData({ bcD: this.data.bc_default });
      }
      else if (select == 'E') {
        this.setData({ bcE: this.data.bc_default });
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
  //提交
  submit: function () {
    app.globalData.answers = this.data.answers;
    wx.redirectTo({
      url: '../result/result'
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
    var answers = new Array(len);
    answers.fill('');
    var arr = new Array(len);
    for (var i = 0; i < len; i++) {
      arr[i] = app.globalData.items[i][1];
    }
    this.setData({
      items: app.globalData.items,
      tishu: len,
      answers:answers,
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