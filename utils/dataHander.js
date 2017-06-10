var app = getApp()
//保存题库
function saveData() {
  wx.setStorage({
    key: 'libs',
    data: app.globalData.libs,
    /*success: function (res) {
      console.log('异步保存成功')
    }*/
  })
}

//得到默认科目和题库排列顺序
function getNameOrder(){
  var libs = require('/defaultLib.js').defaultLibs;
  var nameOrder = [];
  for (var key in libs){
    var itemOrder = [];
    itemOrder.push(key);
    for (var subKey in libs[key]){
      itemOrder.push(subKey);
    }
    nameOrder.push(itemOrder);
  }
  console.log(nameOrder);
  return nameOrder
}

//得到Lib名称排序
function getLibsName() {
  var name_order = app.globalData.name_order;
  var libsName = [];
  for (var i = 0; i < name_order.length;i++){
    libsName.push(name_order[i][0]);
  }
  console.log(libsName)
  return libsName
}

//得到指定Lib下的题库名
function getSubsName(libName){
  var name_order = app.globalData.name_order;
  var subsName = [];
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName){
      subsName = name_order[i].slice(1);
      break;
    }  
  }
  console.log(subsName)
  return subsName
}

/*
//得到所有Lib
function getLibsName() {
  var libsName = []
  for (var key in app.globalData.libs) {
    libsName.push(key)
    //libsName.push("key：" + key + ",value：" + libs[i][key])
  }
  return libsName
}

//得到指定Lib下的题库名
function getSubsName(libName) {
  var lib = app.globalData.libs[libName]
  var subName = []
  for (var key in lib){
    subName.push(key)
  }
  return subName
}*/

//得到指定Lib下的指定题库
function getSubData(libName,subName) {
  var lib = app.globalData.libs[libName]
  var sub = lib[subName]
  return sub
}

//判断字符串是否为空或全为空格
function isNull(str) {
  if (str == "") return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}

//增加一个新的Lib，如果成功返回true,已存在返回false
function addLib(libName) {
  if (app.globalData.libs[libName] == null) {
    app.globalData.libs[libName] = {}
    saveData();
    return true
  }
  else {
    return false
  }
}
//删除一个Lib
function removeLib(libname) {
  delete app.globalData.libs[libname];
  saveData();
  return true;
}
//增加一个Sub
function addSub(subName){
  var lib = app.globalData.libs[app.globalData.selectLib];

  if (lib[subName] == null){
    lib[subName] = app.globalData.form;
    app.globalData.libs[app.globalData.selectLib] = lib;    
    saveData();
    return true;
  }
  else {
    return false;
  }
}
//删除一个Sub
function removeSub(subName) {
  var lib = app.globalData.libs[app.globalData.selectLib];
  delete lib[subName];
  app.globalData.libs[app.globalData.selectLib] = lib;
  saveData();
  return true;
}
//乱序
function outOfOrder(items){
  var newitems = items.slice(0);
  var len = items.length;
 //将列表随机打乱3*len次
  for (var i = 0; i < 3 * len; i++){
   //得到随机数
   var rnd = parseInt(Math.random() * len, 10);
   //交换选项
   var item = newitems[0];
   newitems[0] = newitems[rnd];
   newitems[rnd] = item;
  }
 return newitems;
}

module.exports = {
  saveData,
  getLibsName,
  getSubsName,
  addLib,
  removeLib,
  addSub,
  removeSub,
  getSubData,
  outOfOrder,
  getNameOrder,
  isNull
}
