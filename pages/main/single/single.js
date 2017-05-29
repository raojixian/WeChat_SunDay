// pages/main/single/single.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    index : 0,
    daan:'',
    title:'题目',
    opA:'选项1',
    opB:'选项2',
    opC:'选项3',
    opD:'选项4',

    bc_default :'',
    bc_right:'#09BB07',
    bc_wrong:'#DE0507',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    this.data.items  = app.globalData.items
    
  },

  setQuestion:function(){
    var i = this.data.index
    this.setData({
      daan: this.data.items[i][0],
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
  },
  btnOpClick:function(e){
    var select = e.currentTarget.id;
    if(select == this.data.daan){
      if (select == 'A') {
        this.setData({ bcA: this.data.bc_right });
      }
      else if (select == 'B'){
        this.setData({ bcB: this.data.bc_right });
      }
      else if (select == 'C'){
        this.setData({ bcC: this.data.bc_right });
      }
      else if (select == 'D'){
        this.setData({ bcD: this.data.bc_right });
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
    if (this.data.index < this.data.items.length -1 ){
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