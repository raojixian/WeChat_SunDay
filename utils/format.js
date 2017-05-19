var app = getApp();
var libs = app.globalData.libs;

var txt = "";//原文本
var type = 0; //格式化题型
var isDrop = false; //是否去掉序号
data = [];


//寻找下一题,返回值[是否存在，开始位置，长度]
function findAllQuestion(s) {
  var all = [];
  s = "\n" + s;//在字符串头加上换行符
  //var index = [true,0,0];
  var re = /"\n.*?[（(].*?[)）].*?[　 \n;\t]+A(?![　 ]*[)）])"/;
  re.compile();
  var arr = re.exec(s);
  while (arr != null) {
    var ti = [];
    ti[0] = arr[0];
    var start = re.lastIndex; //得到开始位置
    var len = arr[0].length; //得到题目长度
    arr = re.exec(s);//寻找下一个
    if (arr != null) {
      var next = re.lastIndex;//得到下一题开始的位置
      ti[1] = s.slice(start + len, next);
    }
    else {
      ti[1] = s.slice(start + len);
    }
    all.pust(ti);
  }

  return all
}

function patternOption() {


}
























module.exports = {
  saveData: saveData,
  getLibsName,

}
