// pages/main/result/result.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total : 0,
    done : 0,
    right : 0,
    wrongText :""

  },
  practice : function(){
    wx.navigateTo({
      url: '../single/single'
    })
    console.log('跳转')
  }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var items = app.globalData.items;
    var answer = app.globalData.answer;
    //检查错题
    var rightNum = 0;
    var doneNum = 0;
    var wrongItems = [];
    var wrongText = "";
    for (var i = 0; i < items.length; i++){
      if (answer[i] != 0){
        doneNum ++;
        if (answer[i] == items[i][0]) {
          rightNum++;
        }
        else {
          wrongItems.push(items[i]);
          wrongText += items[i][0] + "  错误：" +answer[i] + "\n";

          for (var j = 1; j < items[i].length; j++){
            wrongText += items[i][j] +"\n";
          }
          wrongText += "\n";
        }
      }
    }
    this.setData({
      total: items.length,
      done: doneNum,
      right: rightNum,
      wrongText: wrongText
    });

    app.globalData.items = wrongItems;



    
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