// pages/lib/addLib/addLib.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    name: "",
    modalTitle:'添加科目',
    modalMsg: "",
    modaltap : 0,
  },
  //得到名称
  getName: function (e) {
    var str = e.detail.value;
    this.setData({
      name: str.replace(/(^\s*)|(\s*$)/g, "")
    })
  },
  //切换到modal对话框,添加科目
   modalTap0: function (e) {
     var that = this;
     if (that.data.name == ''){
       wx.showToast({
         title: '名称不能为空',
       })
     }
     else{
       this.setData({
         modaltap:0,
         modalTitle: '添加科目',
         modalMsg: str,
         modalHidden: false
       })
     }
   },
   //切换到modal对话框，设置默认题库
   modalTap1: function (e) {
    var that = this;
    this.setData({
      modaltap: 1,
      modalTitle: '恢复默认科目！',
      modalMsg: "",
      modalHidden: false
    })
   },
   //确认
   modalFirm: function (e) {
     var that = this;
     this.setData({
       modalHidden: true
     })
     if (that.data.modaltap == 0){
       if (hander.addLib(that.data.name)) {
         wx.showToast({
           title: '添加成功',
         })
       }
       else {//如果失败，提示题库已存在
         wx.showToast({
           title: '名称已存在',
         })
       }
     } else if (that.data.modaltap == 1){
       var def = require('../../../utils/defaultLib.js');
       app.globalData.libs = def.defaultLibs;
       wx.setStorage({
         key: 'libs',
         data: def.defaultLibs,
         /*success: function (res) {
           console.log('默认题库保存成功')
         }*/
       })
       wx.showToast({
         title: '已恢复',
       })
     }
   },
   //取消
   modalCancel: function (e) {
     this.setData({modalHidden: true})
   }
})