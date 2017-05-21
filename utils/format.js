var app = getApp();
var libs = app.globalData.libs;

var txt = "";//原文本
var type = 0; //格式化题型
var isDrop = false; //是否去掉序号
var data = [];


//寻找下一题,返回值[是否存在，开始位置，长度]
function findAllQuestion(s) {
  var all = [];
  s = "\n" + s;//在字符串头加上换行符
  //var index = [true,0,0];
  var re = /\n.*?[（(][　 ]*[A-D][　 ]*[)）].*?[　 \n;\t]+A(?![　 ]*[)）])/g;
  //re.compile();
  var arr = re.exec(s);
  if (arr != null) var start = re.lastIndex - arr[0].length; //得到开始位置
  while (arr != null) {
    arr = re.exec(s);//寻找下一个
    if (arr != null){
      var next = re.lastIndex - arr[0].length;//得到下一题开始的位置
      all.push(s.slice(start, next));
      start = next; 
    }
    else {
      all.push(s.slice(start));
    }
  }
  return all
}

function getASingle(s){
  s = s + "\n";
  var ti = [];
  //var re = /(^.*?[（(].*?[)）].*?)[　 \n;\t]+(A.*?)[　 \n;\t]+(B.*?)[　 \n;\t]+(C.*?)[　 \n;\t]+(D.*)/g;
  var re = /(.*?[（(][　 ]*[A-D][　 ]*[)）].*?)[　 \n;\t]+(A.*?)[　 \n;\t]+(B.*?)[　 \n;\t]+(C.*?)[　 \n;\t]+(D.*?)\n/g;
  var arr = re.exec(s);
  if (arr != null){
    var title = getSingleTitle(arr[1]);
    ti.push(title[0]);
    ti.push(title[1]);
    ti.push(formatOption(arr[2]));
    ti.push(formatOption(arr[3]));
    ti.push(formatOption(arr[4]));
    ti.push(formatOption(arr[5]));
  }
  return ti;
}

function getSingleTitle(li){
  var title = [];
  var line = li;
  var re = /[(（][　 ]*([A-D])[　 ]*[[）)]/g;
  var arr = re.exec(line);
  if (arr != null) {
    title[0] = arr[1];
    line = line.replace(re,"___");
    line = line.replace("\n", "");
    line = line.replace(/^[　 ;\t]+|[　 ;\t]+$/g,"");
    title[1] = line;
  }
  return title;
}


function formatOption(li){
  var line = li;
  var re = /^[　 \n;\t]*([A-E])/g;
  var arr = re.exec(line);
  if (arr != null) {
    var op = arr[1];
    line = line.replace(/^[　 \n;\t]*[A-E][　 ]*[、.．。;]*/g,".");
    line = op + line;
    line = line.replace(/\n/g,"");
    line = line.replace(/[　 ;\t]+$/g, "");
  }
  return line;
}


function form(s,ty){
  var data = [];
  var all = findAllQuestion(s);
  if(ty == 0){
    for(var i = 0;i<all.length;i++){
      data.push(getASingle(all[i]));
    }
  }
  app.globalData.form = {"type":ty,"data":data};

  var str = "";
  for(var i = 0; i < data.length;i++){
    for(var j = 0 ; j<data[i].length ; j++){
      str = str + "\n" + data[i][j];
    }
    str = str + "\n";
  }
  return str;
}


module.exports = {
  findAllQuestion,
  getASingle,
  form
}
