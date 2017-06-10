// pages/main/judge/judge.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  data: {
    items: [],
    show: [],
    order:[]
  },
  itemtap:function(e){
    var that = this;
    var index =  e.currentTarget.id;
    if (that.data.show[index] == '♫'){
      if (that.data.items[index][0] == '对') this.data.show[index] = '✔';
      else this.data.show[index] = '✘';
      this.setData({
        show: that.data.show
      })
    }
  },
  onLoad: function (options) {
    var len = app.globalData.items.length;
    var order = new Array(len);
    for (var i = 0; i < len; i++) {
      order[i] = i;
    }
    var arr = new Array(len);
    arr.fill('♫');
    this.setData({
      items: app.globalData.items,
      show : arr,
      order : order
    })
  }
})