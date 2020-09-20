const db = wx.cloud.database();
var app = getApp();
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: [],
    name : ''
  },
  toPerson(){
    wx,wx.navigateTo({
      url: '/pages/person/person',
    })
  },
  loginCheck(){
    if(!app.globalData.LOGINED){
      Dialog.alert({
        title: '未登录',
        message: '请先登录再使用！'
      }).then(() => {
        // on close
      });
    }else{
      return true;
    }
  },
  informaitionCheck(){
    db.collection('person').where({
      _openid: app.globalData.OPENID
    }).get().then(res=>{
      console.log(res)
      if(res.data.length==0 &&app.globalData.LOGINED){
        Dialog.alert({
          title: '首次登录',
          message: '请先设置个人信息再使用！'
        }).then(() => {
          wx.navigateTo({
            url: '/pages/person/person',
          })
        });
      }else{
        app.globalData.USERNAME=res.data[0].username
        this.setData({
          name: res.data[0].username
        })
        console.log(app.globalData.USERNAME)
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e);
    if (e.detail.userInfo != null) {
      this.setData({ 
        canIUse: false,
        userInfo: e.detail.userInfo 
        });
      app.globalData.LOGINED = true;
      app.globalData.USERINFO = e.detail.userInfo;
      console.log(app.globalData.LOGINED);
      console.log(app.globalData.USERINFO.nickName)
      this.informaitionCheck()
    
    }
    else {
      wx.showToast({
        title: '授权失败',
        image: '../../images/fail.png'
      })
      this.setData({ canIUse: true });
    }
    console.log(this.data.canIUse)

  },
  person: function () {
    if (this.loginCheck()) {
      wx.navigateTo({
        url: '../person/person',
      })
    }
  },
  jilu: function () {
    if(this.loginCheck()){
      wx.navigateTo({
        url: '../jilu/jilu',
      })
    }
  
  },
  getquanxian(){
    if(this.loginCheck()){
      wx.requestSubscribeMessage({
        tmplIds: ['92oVEzAhY_z8QzUG95lkCCWJUsErVzKmygflhVndEko'],
        success(res) {
          console.log(res)
        },
        fail(res) {
          console.log(res)
        }
      })
    }
    
  },
  onLoad(){
    this.informaitionCheck()
  },
  onShow() {
    this.onLoad();
  },
})