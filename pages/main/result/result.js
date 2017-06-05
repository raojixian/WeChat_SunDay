// pages/main/result/result.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tp: 0,//题库类型
    total : 0,
    done : 0,
    right : 0,
    wrongText :"",
    wrongItems:[],
  },
  practice : function(){
    if (this.data.wrongItems.length==0){
      wx.showToast({
        title: "没有错题哦(●'◡'●)ﾉ♥",
      })
    }
    else{
      app.globalData.items = this.data.wrongItems;
      if(this.data.tp ==0){
        wx.navigateTo({url: '../single/single'})
      }
      else if (this.data.tp == 1){
        wx.navigateTo({ url: '../multiple/multiple' })
      }
    }
  }
  ,
  checkSingle:function(){
    var items = app.globalData.items;
    var answers = app.globalData.answers;
    //检查错题
    var rightNum = 0;
    var doneNum = 0;
    var wrongItems = [];
    var wrongText = "";
    for (var i = 0; i < items.length; i++) {
      if (answers[i] != '') {
        doneNum++;
        if (answers[i] == items[i][0]) {
          rightNum++;
        }
        else {
          wrongItems.push(items[i]);
          wrongText += items[i][0] + "  错误：" + answers[i] + "\n";

          for (var j = 1; j < items[i].length; j++) {
            wrongText += items[i][j] + "\n";
          }
          wrongText += "\n";
        }
      }
    }
    this.setData({
      total: items.length,
      done: doneNum,
      right: rightNum,
      wrongText: wrongText,
      wrongItems: wrongItems
    });
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
  checkMultiple: function () {
    var items = app.globalData.items;
    var answers = app.globalData.answers;
    //检查错题
    var rightNum = 0;
    var doneNum = 0;
    var wrongItems = [];
    var wrongText = "";
    for (var i = 0; i < items.length; i++) {
      if (answers[i] != '') {
        doneNum++;
        if (this.isRight(items[i][0], answers[i])){
          rightNum++;
        }
        else {
          wrongItems.push(items[i]);
          wrongText += items[i][0] + "  错误：" + answers[i] + "\n";

          for (var j = 1; j < items[i].length; j++) {
            wrongText += items[i][j] + "\n";
          }
          wrongText += "\n";
        }
      }
    }
    this.setData({
      total: items.length,
      done: doneNum,
      right: rightNum,
      wrongText: wrongText,
      wrongItems: wrongItems
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tp = hander.getSubData(app.globalData.selectLib, app.globalData.selectSub)['type'];
    this.setData({tp:tp});
    if (tp == 0) this.checkSingle();
    else if (tp == 1) this.checkMultiple();
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