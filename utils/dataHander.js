var app = getApp()

var jsondata = {
  "学科1": {
    "题库1": {
      "type": 0,
      "data": [
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D']]
    },
    "题库2": {
      "type": 0,
      "data": [
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D']]
    }
  },
  "学科2": {
    "题库1": {
      "type": 0,
      "data": [
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D']]
    },
    "题库2": {
      "type": 0,
      "data": [
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D'],
        ['A', 'T', 'A', 'B', 'C', 'D']]
    }
  }
}

//保存题库
function saveData() {
  //app.globalData.libs = libs
  wx.setStorage({
    key: 'libs',
    data: JSON.stringify(app.globalData.libs),
    //data: JSON.stringify(jsondata),
    success: function (res) {
      console.log('异步保存成功')
    }
  })
}


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
}

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

//删除一个Lib
function removeSub(subName) {
  var lib = app.globalData.libs[app.globalData.selectLib];
  delete lib[subName];
  app.globalData.libs[app.globalData.selectLib] = lib;
  saveData();
  return true;
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
  isNull
}
