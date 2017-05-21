var app = getApp()
var libs = app.globalData.libs

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
  var isSuccess = true
  //app.globalData.libs = libs
  wx.setStorage({
    key: 'libs',
    data: JSON.stringify(libs),
    //data: JSON.stringify(jsondata),
    success: function (res) {
      console.log('异步保存成功')
    }
  })
  return true
}


//得到所有Lib
function getLibsName() {
  var libsName = ['zzz', 'asda', 'asdgd', 'asgsd']
  for (var key in libs) {
    libsName.push(key)
    //libsName.push("key：" + key + ",value：" + libs[i][key])
  }
  return libsName
}


//得到指定Lib下的题库
function getSubsName(libname) {
  var lib = libs[libname]
  var libName = []
  for (var key in lib){
    libName.push(key)
  }
  return libName
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
  if (libs[libName] == null) {
    libs[libName] = {}
    return true
  }
  else {
    return false
  }
}

//删除一个Lib
function removeLib(libname) {
  
}

function addSub(subName){
  var lib = libs[app.globalData.selectLib];

  if (lib[subName] == null){
    lib[subName] = app.globalData.form;
    libs[app.globalData.selectLib] = lib;
    saveData();
    return true;
  }
  else {
    return false;
  }
}



module.exports = {
  saveData: saveData,
  getLibsName,
  getSubsName,
  addLib,
  addSub,
  isNull
}
