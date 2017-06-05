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
    rbtnChecked: 'a',
    modalHidden:true,
    text: '1、毛泽东同志说，“‘实事’就是客观存在着的一切事物，‘是’，就是客观事物的内部联系，即规律性，‘求’就是我们去研究。”这段话，出自（   D   ）\nA、《整顿党的作风》    B.《反对党八股》\n    C、《反对本本主义》    D、《改造我们的学习》\n    2. 检验真理的唯一标准是（  C  ）\n    A 、马克思主义    B、“三个有利于”    C 、实践  \n3. “墙上芦苇，头重脚轻根底浅；山间竹笋，嘴尖皮厚腹中空。”毛泽东在延安整风运动期间用这幅对联形象地讽刺了（  A  ）\n    A、主观主义的学风             B、宗派主义的党风     \nC、党八股的文风               D、官僚主义的作风\n4. 延安时期，毛泽东写下了著名的《实践论》、《矛盾论》主要是为了克服党内严重的（  D  ）\n  A、经验主义        B、冒险主义\n  C、机会主义        D、教条主义',
    text1: '\n1. 马克思、恩格斯指出：“一切划时代的体系的真正的内容都是由于产生这些体系的那个时期的需要而形成的。所有这些体系都是以本国过去的整个发展为基础的，是以阶级关系的历史形式及其政治的、道德的、哲学的以及其他的成果为基础的。”就毛泽东思想产生而言，马克思、恩格斯的这段话表明(   ABCD   ) \nA、毛泽东思想的产生是近代中国社会矛盾和革命运动发展的需要 \nB、毛泽东思想的产生是新的社会生产力的增长和工人运动的发展的需要\nC、毛泽东思想的产生是中国革命实践的需要\nD、毛泽东思想的产生是建立在马克思列宁主义和中国优秀传统文化的基础之上的\n2. 党的思想路线的基本内容是（  A  ）\n    A、实事求是           B、 一切从实际出发，理论联系实际\nC、 从群众来到群众中去                        D、在实践中检验真理和发展真理\n3．在理论与实践的关系上，中国共产党在历史上曾经存在过两种错误倾向（AC   ）\n    A、教条主义    B、冒险主义    C、经验主义    D、保守主义\n4．毛泽东思想活的灵魂有三个基本方面（ ABC    ）\n    A、实事求是   B、群众路线    C、独立自主    D、自力更生   E、统一战线  \n5、以下哪些属于毛泽东思想的主要内容（ABD）    A、新民主主义革命理论   B、社会主义革命和社会主义建设理论  \n C、旧民主主义革命理论    D、革命军队建设和军事战略理论  \n6．毛泽东思想、中国特色社会主义理论体系是中国化的马克思主义，它们都坚持（ ABDE ）\n    A、辩证唯物主义和历史唯物主义为哲学基础     B、坚持以实现共产主义为最高理想   C、揭示了中国革命的特殊规律           D、坚持代表最广大人民的根本利益\nE、坚持以无产阶级为领导核心\n7．毛泽东思想是（  ABC     ）\n    A、马克思列宁主义在中国的运用和发展\nB、被实践证明了的关于中国革命和建设的正确的理论原则和经验总结\nC、中国共产党集体智慧的结晶\nD、发展中国特色社会主义必须坚持和贯彻的重大战略思想\n8．毛泽东思想形成和发展的特点有(ACD)\nA．是马克思列宁主义与中国实际相结合的产物 \nB．是毛泽东等人主观创造出来的\nC．是在同错误的理论和实践的斗争中形成和发展起来的 \nD．形成和发展的过程就是马克思主义中国化的过程 ',
  
  },
  radioChange: function (e) {
    this.setData({
      rbtnChecked: e.detail.value,
    })
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
      var str = '';
      if (this.data.rbtnChecked == 'a'){
        str = format.form(this.data.text, 0);
      }
      else if (this.data.rbtnChecked == 'b'){
        str = format.form(this.data.text1, 1);
      }
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