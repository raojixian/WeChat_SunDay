// pages/sub/addSub/addSub.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
var format = require('../../../utils/format.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt : null,
    form:"格式化",
    name: '',
    modalHidden:true,
    text: '1、毛泽东同志说，“‘实事’就是客观存在着的一切事物，‘是’，就是客观事物的内部联系，即规律性，‘求’就是我们去研究。”这段话，出自（   D   ）\nA、《整顿党的作风》    B.《反对党八股》\n    C、《反对本本主义》    D、《改造我们的学习》\n    2. 检验真理的唯一标准是（  C  ）\n    A 、马克思主义    B、“三个有利于”    C 、实践    D 、生产力\n3. “墙上芦苇，头重脚轻根底浅；山间竹笋，嘴尖皮厚腹中空。”毛泽东在延安整风运动期间用这幅对联形象地讽刺了（  A  ）\n    A、主观主义的学风             B、宗派主义的党风     \nC、党八股的文风               D、官僚主义的作风\n4. 延安时期，毛泽东写下了著名的《实践论》、《矛盾论》主要是为了克服党内严重的（  D  ）\n  A、经验主义        B、冒险主义\n  C、机会主义        D、教条主义'
  },
  txtChange:function(e){
    this.setData({
      txt: e.detail.value
    })
  },
  getName:function(e){
    this.setData({
      name: e.detail.value
    })
  }
  ,
  clear:function(){
    this.setData({
      txt: null,
      form: "格式化"
    })

  },
  btnFormat:function(){
    if(this.data.form == "格式化"){
      var str = format.form(this.data.text, 0);
      this.setData({
        txt: str
      })
      this.setData({
        form: "保存"
      })
    }
    else if (this.data.form == "保存"){
      if (hander.isNull(this.data.name)) {
        wx.showToast({
          title: '题目不能为空',
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
    this.setData({
      modalHidden: true
    })
    if (hander.addSub(this.data.name, 0)) {
      wx.showToast({
        title: '添加成功',
      })
    }
    else {//如果失败，提示题库已存在
      wx.showToast({
        title: this.data.name + '已存在',
      })
    }
  },
  //取消
  modalCancel: function (e) {
    this.setData({
      modalHidden: true
    })
  },
  retest:function(){
    var text = "\n" + this.data.text
    var re = /\n.*?[（(].*?[)）].*?[　 \n;\t]+A(?![　 ]*[)）])/g;
    var s = re.exec(text)
    this.setData({
      txt: re.lastIndex - s[0].length
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})