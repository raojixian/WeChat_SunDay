// pages/main/single/single.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    tishu: 0,
    index : 0,
    item: [],
    title:'题目',
    opA:'选项A',
    opB:'选项B',
    opC:'选项C',
    opD:'选项D',

    bc_default :'#FCFCFC',
    bc_right:'#98FB98',
    bc_wrong:'#FF99B4',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',

    array : [],


  },



  setQuestion:function(){
    var i = this.data.index
    this.setData({
      item: this.data.items[i],
      bcA: this.data.bc_default,
      bcB: this.data.bc_default,
      bcC: this.data.bc_default,
      bcD: this.data.bc_default,
    })
  },
  btnOpClick:function(e){
    var select = e.currentTarget.id;
    if(select == this.data.item[0]){
      if (this.data.index == this.data.tishu -1){
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
      }
      this.nextQuestion();
    }
    else{
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
    }
  },
  nextQuestion:function(){    
    if (this.data.index < this.data.tishu-1){
      this.setData({ index: this.data.index + 1});
      this.setQuestion();
    }
  },
  lastQuestion: function () {
    if (this.data.index > 0) {
      this.setData({ index: this.data.index - 1});
      this.setQuestion();
    }
  },
  showRight:function(){

    if (this.data.item[0] == 'A') {
      this.setData({ 
        bcA: this.data.bc_right,
        });
    }
    else if (this.data.item[0] == 'B') {
      this.setData({
        bcB: this.data.bc_right,
        });
    }
    else if (this.data.item[0] == 'C') {
      this.setData({
        bcC: this.data.bc_right,
        });
    }
    else if (this.data.item[0] == 'D') {
      this.setData({
        bcD: this.data.bc_right,
        });
    }
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
  onLoad: function (options){
    var len = app.globalData.items.length;
    var arr = new Array(len);
    for (var i = 0; i < len; i++) {
      arr[i] = app.globalData.items[i][1];
    }
    this.setData({
      items: app.globalData.items,
      tishu: len,
      array : arr,
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