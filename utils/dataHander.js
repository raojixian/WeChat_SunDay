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
  wx.setStorage({
    key: 'name_order',
    data: app.globalData.name_order,
    /*success: function (res) {
      console.log('异步保存成功')
    }*/
  })
}

//判断字符串是否为空或全为空格,返回
function formName(str){
  if (str == "") return -1;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  if(re.test(str)){
    return -1;
  }
  else{
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
}

//得到Lib名称排序
function getLibsName() {
  var name_order = null;
  name_order = app.globalData.name_order;
  var libsName = [];
  for (var i = 0; i < name_order.length; i++) {
    libsName.push(name_order[i][0]);
  }
  return libsName
}

//得到指定Lib下的题库名
function getSubsName() {
  var libName = app.globalData.selectLib;
  var name_order = null;
  name_order = app.globalData.name_order;
  var subsName = [];
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName) {
      subsName = name_order[i].slice(1);
      break;
    }
  }
  return subsName
}

//增加一个新的Lib，如果成功返回true,已存在返回false
function addLib(libName) {
  var libs = app.globalData.libs;
  var name_order = app.globalData.name_order;
  if (libs[libName] == null) {
    app.globalData.libs[libName] = {};
    name_order[name_order.length] = [libName];
    saveData();
    return true
  }
  else {
    return false
  }
}

//增加一个Sub
function addSub(subName) {
  var libName = app.globalData.selectLib;
  var lib = app.globalData.libs[libName];
  var name_order = app.globalData.name_order;
  if (lib[subName] == null) {
    lib[subName] = app.globalData.form;
    app.globalData.libs[app.globalData.selectLib] = lib;
    for (var i = 0; i < name_order.length; i++) {
      if (name_order[i][0] == libName) {
        name_order[i].push(subName);
        break
      }
    }
    app.globalData.name_order = name_order;
    saveData();
    return true;
  }
  else {
    return false;
  }
}

//删除一个Lib
function removeLib(libName) {
  delete app.globalData.libs[libName];
  var name_order = app.globalData.name_order;
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName) {
      name_order.splice(i, 1);
      break;
    }
  }
  saveData();
  return true;
}

//删除一个Sub
function removeSub(subName) {
  var libName = app.globalData.selectLib;
  var lib = app.globalData.libs[libName];
  var name_order = app.globalData.name_order;
  delete lib[subName];
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName) {
      var libItem = name_order[i];
      for (var j = 1; j < libItem.length; j++) {
        if (libItem[j] == subName) {
          libItem.splice(j, 1);
          break;
        }
      }
    }
  }
  saveData();
  return true;
}

//移动Lib,direction; 0,上移,1,下移
function moveLib(libName, direction) {
  var name_order = app.globalData.name_order;
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName) {
      var libItem = name_order[i];
      if (direction == 0 && i > 0) {
        name_order[i] = name_order[i - 1];
        name_order[i - 1] = libItem;
        saveData();
        return true;
      }
      else if (direction == 1 && i < name_order.length - 1) {
        name_order[i] = name_order[i + 1];
        name_order[i + 1] = libItem;
        saveData();
        return true;
      }
    }
  }
  return false;
}


function moveSub(subName, direction) {
  var libName = app.globalData.selectLib;
  var name_order = app.globalData.name_order;
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName) {
      var libItem = name_order[i];
      for (var j = 1; j < libItem.length; j++) {
        if (libItem[j] == subName) {
          var item = libItem[j];
          if (direction == 0 && j > 1) {
            libItem[j] = libItem[j - 1];
            libItem[j - 1] = item;
            saveData();
            return true;
          }
          else if (direction == 1 && j < libItem.length - 1) {
            libItem[j] = libItem[j + 1];
            libItem[j + 1] = item;
            saveData();
            return true;
          }
        }
      }
    }
  }
  return false;
}

//乱序
function outOfOrder(items) {
  var newitems = items.slice(0);
  var len = items.length;
  //将列表随机打乱3*len次
  for (var i = 0; i < 3 * len; i++) {
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
  getLibsName,
  getSubsName,
  addLib,
  addSub,
  removeLib,
  removeSub,
  moveLib,
  moveSub,
  outOfOrder,
  formName
}
