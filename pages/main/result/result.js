// pages/main/result/result.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  data: {
    tp: 0,//题库类型
    total: 0,
    done: 0,
    wrongNum: 0,
    wrongText: "",
    wrongItems: [],
    time : '',
  },
  practice: function () {
    var that = this;
    if (that.data.wrongNum == 0) {
      wx.showToast({
        title: "没有错题哦(●'◡'●)ﾉ♥",
      })
    }
    else {
      app.globalData.items = that.data.wrongItems;
      if (that.data.tp == 0) {
        wx.navigateTo({ url: '../single/single' })
      }
      else if (that.data.tp == 1) {
        wx.navigateTo({ url: '../multiple/multiple' })
      }
      else if (that.data.tp == 2) {
        wx.navigateTo({ url: '../judge/judge' })
      }
    }
  },
  //批改单选题
  checkSingle: function () {
    var items = app.globalData.items;
    var answers = app.globalData.answers;
    var wrongNum = 0;
    var doneNum = 0;
    var wrongItems = [];
    var wrongText = "";
    for (var i = 0; i < items.length; i++) {
      if (answers[i] != '') {
        doneNum++;
        if (answers[i] != items[i][0]) {
          wrongNum++;
          wrongItems.push(items[i]);
          wrongText += items[i][0] + " 错误:" + answers[i] + "\n";

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
      wrongNum: wrongNum,
      wrongText: wrongText,
      wrongItems: wrongItems
    });
  },
  //判断多选答案是否正确
  isRight(daan, answer){
    if (answer.length == daan.length) {
      for (var i = 0; i < daan.length; i++) {
        if (answer.indexOf(daan.charAt(i)) < 0) {
          return false;
        }
      }
      return true;
    }
    else return false;
  },
  //批改多选题
  checkMultiple: function () {
    var that = this;
    var items = app.globalData.items;
    var answers = app.globalData.answers;
    var wrongNum = 0;
    var doneNum = 0;
    var wrongItems = [];
    var wrongText = "";
    for (var i = 0; i < items.length; i++) {
      if (answers[i] != '') {
        doneNum++;
        if (!that.isRight(items[i][0], answers[i])) {
          wrongNum++;
          wrongItems.push(items[i]);
          wrongText += items[i][0] + " 错误:" + answers[i] + "\n";

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
      wrongNum: wrongNum,
      wrongText: wrongText,
      wrongItems: wrongItems
    });
  },
  //批改判断题
  checkJudge: function () {
    var items = app.globalData.items;
    var answers = app.globalData.answers;
    var wrongNum = 0;
    var doneNum = 0;
    var wrongItems = [];
    var wrongText = "";
    for (var i = 0; i < items.length; i++) {
      if (answers[i] != '') {
        doneNum++;
        if (answers[i] != items[i][0]) {
          wrongNum++;
          wrongItems.push(items[i]);
          wrongText += items[i][0] + "\n" + items[i][1] + "\n\n";
        }
      }
    }
    this.setData({
      total: items.length,
      done: doneNum,
      wrongNum: wrongNum,
      wrongText: wrongText,
      wrongItems: wrongItems
    });
  },
  formatTime :function (value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60);
      }
    }
    var result = "" + parseInt(theTime) + "秒";
    if(theTime1 > 0) {
      result = "" + parseInt(theTime1) + "分" + result;
    }
        if(theTime2 > 0) {
      result = "" + parseInt(theTime2) + "小时" + result;
    }
    return result;
  },
  onLoad: function (options){

    var that = this;
    var tp = app.globalData.libs[app.globalData.selectLib][app.globalData.selectSub]['type'];
    this.setData({ tp: tp });
    if (tp == 0) that.checkSingle();
    else if (tp == 1) that.checkMultiple();
    else if (tp == 2) that.checkJudge();

    this.setData({
      time: that.formatTime(app.globalData.time / 1000)
    });
  }
})