var app = getApp();
var libs = app.globalData.libs;

var txt = "";//原文本
var type = 0; //格式化题型
var isDrop = false; //是否去掉序号
var data = [];


//寻找下一题,返回值[是否存在，开始位置，长度]
function findAllQuestion(s,tp) {
  var all = [];
  s = "\n" + s;//在字符串头加上换行符
  var re = null;
  if (tp == 0) re = /\n.*?[（(][　 ]*[A-D][　 ]*[)）].*?[　 \n;\t]+A(?![　 ]*[)）])/g;
  else if (tp == 1) re = /\n.*?[（(][　 A-E]+[)）].*?[　 \n;\t]+A(?![　 ]*[)）])/g;
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
  console.log('找到：' + all.length +'题')
  return all
}

//格式化选择题选项
function formatOption(li) {
  var line = li;
  var re = /^[　 \n;\t]*([A-E])/g;
  var arr = re.exec(line);
  if (arr != null) {
    var op = arr[1];
    line = line.replace(/^[　 \n;\t]*[A-E][　 ]*[、.．。;]*/g, ".");
    line = op + line;
    line = line.replace(/\n/g, "");
    line = line.replace(/[　 ;\t]+$/g, "");
  }
  return line;
}

//格式化单选的题目
function getSingleTitle(li) {
  var title = [];
  var line = li;
  var re = /[(（][　 ]*([A-D])[　 ]*[[）)]/g;
  var arr = re.exec(line);
  if (arr != null) {
    title[0] = arr[1];//得到答案
    line = line.replace(re, "___");
    line = line.replace("\n", "");
    line = line.replace(/^[　 ;\t]+|[　 ;\t]+$/g, "");
    title[1] = line;//得到题目
  }
  return title;
}

//格式化单选的题目
function getMultipleTitle(li) {
  var title = [];
  var line = li;
  var re = /[(（]([　 A-E]+)[[）)]/g;
  var arr = re.exec(line);
  if (arr != null){
    title[0] = arr[1].replace(/[　 ]/g, "");
    line = line.replace(re, "___");
    line = line.replace("\n", "");
    line = line.replace(/^[　 ;\t]+|[　 ;\t]+$/g, "");
    title[1] = line;//得到题目
  }
  return title;
}


//得到一个单选题
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
  else{//尝试匹配三个选项
    var re = /(.*?[（(][　 ]*[A-C][　 ]*[)）].*?)[　 \n;\t]+(A.*?)[　 \n;\t]+(B.*?)[　 \n;\t]+(C.*?)\n/g;
    var arr = re.exec(s);
    if (arr != null) {
      var title = getSingleTitle(arr[1]);
      ti.push(title[0]);
      ti.push(title[1]);
      ti.push(formatOption(arr[2]));
      ti.push(formatOption(arr[3]));
      ti.push(formatOption(arr[4]));
    }
    else return null;
  }
  return ti;
}

//得到一个多选题
function getAMultiple(s){
  s = s + "\n";
  var ti = [];
  var re = /(.*?[（(][　 A-E]+[)）].*?)[　 \n;\t]+(A.*?)[　 \n;\t]+(B.*?)[　 \n;\t]+(C.*?)[　 \n;\t]+(D.*?)[　 \n;\t]+(E.*?)\n/g;
  var arr = re.exec(s);
  if (arr != null) {
    var title = getMultipleTitle(arr[1]);
    ti.push(title[0]);
    ti.push(title[1]);
    ti.push(formatOption(arr[2]));
    ti.push(formatOption(arr[3]));
    ti.push(formatOption(arr[4]));
    ti.push(formatOption(arr[5]));
    ti.push(formatOption(arr[6]));
  }
  else {
    //尝试匹配四个选项的多选题
    var re = /(.*?[（(][　 A-D]+[)）].*?)[　 \n;\t]+(A.*?)[　 \n;\t]+(B.*?)[　 \n;\t]+(C.*?)[　 \n;\t]+(D.*?)\n/g;
    var arr = re.exec(s);
    if (arr != null) {
      var title = getMultipleTitle(arr[1]);
      ti.push(title[0]);
      ti.push(title[1]);
      ti.push(formatOption(arr[2]));
      ti.push(formatOption(arr[3]));
      ti.push(formatOption(arr[4]));
      ti.push(formatOption(arr[5]));
    }
    else return null;
  }
  return ti;
}

function form(s,tp){
  var data = [];
  
  if(tp == 0){//如果是单选类型
    var all = findAllQuestion(s,tp);
    for(var i = 0;i<all.length;i++){
      var ti = getASingle(all[i]);
      if (ti != null) data.push(ti);
    }
  }
  else if (tp == 1) {//如果是多选类型
    var all = findAllQuestion(s,tp);
    for (var i = 0; i < all.length; i++) {
      var ti = getAMultiple(all[i]);
      if (ti != null){
        data.push(ti);
        console.log('得到一题');
      } 
      
    }
  }

  app.globalData.form = {"type":tp,"data":data};

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
