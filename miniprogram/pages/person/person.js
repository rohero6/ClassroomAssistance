// pages/detail/detail.js
var app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: '',
    username: '',
    xueyuan:'',
    zhuangye:'',
    xuehao:''
  },
  onLoad(){
    
    db.collection("person").where({
      _openid:app.globalData.OPENID
    }).get().then(res=>{
      console.log(res)
      if(res.data.length>0){
        this.setData({
          xueyuan: res.data[0].xueyuan,
          zhuangye: res.data[0].zhuangye,
          xuehao: res.data[0].xuehao,
          username:res.data[0].username,
          gender :res.data[0].gender
        })
      }else{
        this.setData({
          username: app.globalData.USERINFO.nickName,
          gender: app.globalData.USERINFO.gender
        })
      }
    }).catch(err=>{console.log(err)})
  },
  changeAvatar: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        this.setData({
          imgUrl: tempFilePaths
        })
      }
    })
  },
  jump: function (e) {
    // 跳转到“个人资料修改页”
    wx.navigateTo({
      // 为了避免用户名中的特殊字符破坏字符串结构，使用encodeURIComponent()编码
      url: '/pages/modify/modify?username=' + encodeURIComponent(this.data.username) +
       '&gender=' + encodeURIComponent(this.data.gender) + '&xueyuan=' 
       + encodeURIComponent(this.data.xueyuan) + '&zhuangye=' 
       + encodeURIComponent(this.data.zhuangye) + '&xuehao=' 
       + encodeURIComponent(this.data.xuehao)
    })
  }
})