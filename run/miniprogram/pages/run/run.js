const app = getApp()
let id = null;

// pages/run/run.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 6,
    step: 2000,
    point: [],
    curRun: 0, //当前步数木
    fillWidth: 0,
    model: 'step',
    curSelect: '-1',
    isload: false,
    intervalID: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(this.data.isload)
    if(this.data.isload) {
      this.setData({
        point: [],
        isload: false,
        curSelect: -1
      })
    }
    this.setData({
      isload: true
    })
    if(this.data.model == 'step') {
      this.initStep()
    }else if(this.data.model == 'qiandao') {
      this.initQ()
    }
  },
  
  initStep: function() {
    console.log(1111)
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
    this.getRunCon()
    id = setInterval(() => {
      this.getRunCon()
    }, 1000 * 10)
  },

  initQ: function() {
    this.setData({
      fillWidth: 0 + '%',
    })
    for(let i = 0; i < this.data.count; i++) {
      let points = this.data.point;
      points.push({
        text: "第"+(i+1)+"天",
        isSelect: i == 0? true: false
      })
      this.setData({
        point: points
      })
    }
    console.log(this.data.point)
  },

  getRunCon: function () {
    let self = this;
    if(this.data.model != 'step') return;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.werun']) {
          wx.authorize({
            scope: 'scope.werun',
            success () {
              wx.getWeRunData({
                success (res) {
                  // 拿 encryptedData 到开发者后台解密开放数据
                  const encryptedData = res.encryptedData
                  // 或拿 cloudID 通过云调用直接获取开放数据
                  const cloudID = res.cloudID
                  wx.cloud.callFunction({
                    name: 'login',
                    data: {
                      weRunData: wx.cloud.CloudID(cloudID), // 这个 CloudID 值到云函数端会被替换
                      obj: {
                        shareInfo: wx.cloud.CloudID('yyy'), // 非顶层字段的 CloudID 不会被替换，会原样字符串展示
                      }
                    },
                    success: res => {
                      console.log('[云函数] [login] user openid: ', res.result)
                      let stepInfo = res.result.event.weRunData.data.stepInfoList;
                      let runCon = stepInfo[stepInfo.length - 1].step;
                      console.log("当前步数",runCon)
                      self.setData({
                        curRun: runCon
                      })
                      self.calculateWidth()
                    },
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  calculateWidth: function() {
    let curRun = this.data.curRun;
    let maxStep = this.data.point[this.data.point.length - 1].text.match(/\d+/g)[0];
    if(curRun >= maxStep) {
      curRun = maxStep
      this.setData({
        curRun: maxStep
      })
    }
    let course = Math.ceil(curRun/maxStep * 100);
    this.data.point.forEach((e,index) => {
      let curIndex = 'point['+index+'].isSelect';
      if(e.text.match(/\d+/g)[0] < curRun) {
        this.setData({
          [curIndex]: true
        })
      }
    })

    this.setData({
      fillWidth: course + '%'
    })
  },

  tsFormatTime: function(timestamp, format) {
    const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
   }

    const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    let returnArr = [];

    let date = new Date(timestamp);
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    returnArr.push(year, month, day, hour, minute, second);

    returnArr = returnArr.map(formatNumber);

    
    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  },

  clickStep: function() {
    clearInterval(id)
    this.setData({
      model: 'step'
    })
    this.onLoad();
  },

  clickQ: function() {
    this.setData({
      model: 'qiandao',
      isload: true
    })
    this.onLoad();
  },

  clickPoint: function(e) {
    if(this.data.model != 'qiandao') return;
    let cnt = e.currentTarget.dataset.index;
    this.data.point.forEach((e, i) => {
      let curp = 'point['+i+'].isSelect';
      if(i <= cnt) {
        this.setData({
          [curp] : true,
          curSelect: cnt,
          fillWidth: (i * (100 / (this.data.count - 1))) + '%'
        })
      }else {
        this.setData({
          [curp] : false,
          curSelect: cnt,
        })
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