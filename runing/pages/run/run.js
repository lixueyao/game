// pages/run/run.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 4,
    step: 10,
    point: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for(let i = 0; i < this.data.count; i++) {
      let points = this.data.point;
      points.push({
        text: this.data.step * i + '步',
        isSelect: i == 0? true: false
      })
      this.setData({
        point: points
      })
    }
    wx.getSetting({
      success(res) {
        console.log('success')
        if (!res.authSetting['scope.werun']) {
          wx.authorize({
            scope: 'scope.werun',
            success () {
            }
          })
        }
      }
    })
    wx.getWeRunData({
      success (res) {
        // 拿 encryptedData 到开发者后台解密开放数据
        const encryptedData = res.encryptedData
        console.log(encryptedData)
        // 或拿 cloudID 通过云调用直接获取开放数据
        const cloudID = res.cloudID
        console.log('id=',cloudID)
      }
    })
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

  }
})