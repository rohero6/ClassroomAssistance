// pages/modify/modify.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
const db = wx.cloud.database()
var app = getApp();
Page({
  data: {
    username: '',
    gender: '',
    xueyuan:'',
    zhuangye:'',
    xuehao:''
  },
  nameChange(e){
    this.checkName(e.detail.value)
  },
  checkName(data) {
    const reg = /^[\u4e00-\u9fa5]{2,4}$/;
    return this.check(data, reg, "请使用真实姓名")
  },
  check(data, reg, errMsg) {
    if (!reg.test(data)) {
      Dialog.alert({
        message: errMsg
      }).then(() => {
        return false
      }); 
    }else{
      return true
    }
  },
  onLoad: function (options) {
    this.setData({
      // 收到数据后使用decodeURIComponent()解码
      username: decodeURIComponent(options.username),
      gender: decodeURIComponent(options.gender),
      xueyuan: decodeURIComponent(options.xueyuan),
      zhuangye: decodeURIComponent(options.zhuangye),
      xuehao: decodeURIComponent(options.xuehao)
    })
  },
  formSubmit: function (e) {
    // 表单返回的所有数据
    var formData = e.detail.value
    if(!this.checkName(formData.username)){
        终止程序
    }
    console.log(formData.username)
    // 获取上一个页面的对象
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    // 调用上一个页面的 setData() 方法，把数据存到上一个页面中去
    prevPage.setData({
      username: formData.username,
      gender: formData.gender,
      xueyuan: formData.xueyuan,
      zhuangye: formData.zhuangye,
      xuehao: formData.xuehao
    })
    db.collection("person").where({
      _openid : app.globalData.OPENID
    }).get().then(first=>{
      app.globalData.USERNAME = formData.username
      if (first.data.length==0){
        db.collection("person").add({
          data:{
          username: formData.username,
          gender: formData.gender,
          xueyuan: formData.xueyuan,
          zhuangye: formData.zhuangye,
          xuehao: formData.xuehao
          }
        }).then(res=>{console.log(res)}).catch(err=>{console.log(err)})
      }else{
        db.collection("person").doc(first.data[0]._id).update({
          data: {
            username: formData.username,
            gender: formData.gender,
            xueyuan: formData.xueyuan,
            zhuangye: formData.zhuangye,
            xuehao: formData.xuehao
          }
        }).then(res => { console.log(res) }).catch(err => { console.log(err) })
      }
    }).catch(err=>{
     
    })
    // 返回到上一个页面
    wx.navigateBack()
  }
})