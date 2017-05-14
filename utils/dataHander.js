var app = getApp()
var libs = app.globalData.libs

function saveData() {
  var isSuccess = true
  wx.setStorage({
    key: 'libs',
    data: [{
      "学科1": [
        {
          "题库1": [
            {
              "type": "0",
              "item": [
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" }]
            }],
          "题库2": [
            {
              "type": "0",
              "item": [
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" }]
            }]

        }],
      "学科2": [
        {
          "题库1": [
            {
              "type": "0",
              "item": [
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" }]
            }],
          "题库2": [
            {
              "type": "0",
              "item": [
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" },
                { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A" }]
            }]

        }]
    }],
    success: function (res) {
      console.log('异步保存成功')     
    }   
  })
  return true
}

var jsonList = [{ "uname": "王强", "day": "2010/06/17" },{ "uname": "王海云", "day": "2010/06/11" }]

function getLibsName(){
  var libsName = ['zzz','asda','asdgd','asgsd']
  for (var i = 0; i < libs.length; i++){
    for (var key in libs[0]) {
      libsName.push(key)
      //libsName.push("key：" + key + ",value：" + libs[i][key])
    }
  }
  return libsName
}




//根据名字返回Lib
function getLibByName(name){
  var lib = null
  for (var key in libs[0]){
      if (key == name) lib = libs[0][key]
  }
  
  return lib
}


//得到指定Lib下的题库
function getSubsName(libname){
  var lib = getLibByName(libname)
  var libName = []
    for (var key in lib[0]) {
      libName.push(key)
  }
  return libName
}



module.exports = {
  saveData: saveData,
  getLibsName,
  getSubsName
}
