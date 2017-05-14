var app = getApp()

function saveData() {
  var isSuccess = true
  wx.setStorage({
    key: 'tiku',
    data: app.globalData.test,
    success: function (res) {
      console.log('异步保存成功')     
    }   
  })
  return true
}

module.exports = {
  saveData: saveData,

}
