//app.js

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据

    //读取本地题库，赋值到全局变量
    var libs = wx.getStorageSync('libs');
    var name_order = wx.getStorageSync('name_order');
    if (libs != '' && name_order != ''){
      this.globalData.libs = libs;
      this.globalData.name_order = name_order;
      console.log(name_order);
    }
    else{
      //第一次启动，设置默认题库
      var defaultLibs = require('/utils/defaultLib.js').defaultLibs;
      this.globalData.libs = defaultLibs;
      var name_order = require('/utils/dataHander.js').getNameOrder();
      this.globalData.name_order = name_order;
      wx.setStorage({
        key: 'libs',
        data: defaultLibs,
        success: function (res) {
          console.log('默认题库保存成功')
        }
      })
      wx.setStorage({
        key: 'name_order',
        data: name_order,
        success: function (res) {
          console.log('默认排序保存成功')
        }
      })
    }

  },
  globalData:{
    libs: {},//全部科目列表
    name_order : [],//记录所有科目和题库的排序
    selectLib : null,//当前选择的科目
    selectSub: null,//当前选择的题库
    form:{},//格式化的数据
    form_len: 0,//格式化题目的个数
    items:[],//当前做的题
    answers:[],//用户的答案
  }
})