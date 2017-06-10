// pages/sub/addSub/addSub.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
var format = require('../../../utils/format.js')
Page({
  data: {
    txt : null,
    formTxt: null,
    inputShow: true ,
    btn1Name:'清空',
    btn2Name:"查找",
    name: '',
    rbtnChecked: 'a',
    modalHidden:true,
  },
  radioChange: function (e) {
    this.setData({
      rbtnChecked: e.detail.value
    })
  },
  txtChange:function(e){
    this.setData({
      txt: e.detail.value
    })
  },
  //得到名称
  getName:function(e){
    this.setData({
      name: e.detail.value
    })
  }
  ,
  btn1click:function(){
    var that = this;
    if (that.data.btn1Name == "清空"){
      this.setData({
        txt: null
      })
    }else{
      this.setData({
        inputShow: true,
        btn1Name:"清空",
        btn2Name: "查找"
      })
    }

  },
  btn2click:function(){
    var that = this;
    if (that.data.btn2Name == "查找"){
      var str = '';
      if (that.data.rbtnChecked == 'a'){
        str = format.form(that.data.txt, 0);
      }
      else if (that.data.rbtnChecked == 'b'){
        str = format.form(that.data.txt, 1);
      } else if (that.data.rbtnChecked == 'c'){
        str = format.form(that.data.txt, 2);
      }

      this.setData({
        formTxt: str,
        inputShow : false,
        btn1Name:"返回",
        btn2Name: "保存",
      })

      if (app.globalData.form != null) {
        var len = app.globalData.form_len;
        console.log(len);
        wx.showToast({
          title: '找到' + len +'题,请仔细核对'
        })
      }
      else{
        this.setData({
          formTxt: '没有找到该题型,请返回并检查格式！',
        })
      }
    }
    else{
      console.log(app.globalData.form)
      if (app.globalData.form == null) {
      wx.showToast({
        title: '没有题目哦',
        })
      }
      else if (hander.isNull(that.data.name) ) {
        wx.showToast({
          title: '名称不能为空',
        })
      }
      else {
        this.setData({
          modalHidden: false
        })
      }
    }
    
  },
  //确认
  modalFirm: function (e) {
    var that = this;
    this.setData({
      modalHidden: true
    })
    if (hander.addSub(that.data.name, 0)) {
      wx.showToast({
        title: '添加成功',
      })
    }
    else {//如果失败，提示题库已存在
      wx.showToast({
        title: that.data.name + '名称已存在',
      })
    }
  },
  //取消
  modalCancel: function (e) {
    this.setData({
      modalHidden: true
    })
  },
  onLoad: function () {
    this.setData({ inputShow: true})
  }
})