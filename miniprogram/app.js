//app.js
const APP_ID = 'wx48c3861b791c310f';
const APP_SECRET = 'da4fc6cc2da093e627b59be70025ee1b';

App({
  onLaunch: function () {
    var that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: APP_ID,
              secret: APP_SECRET,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            success: function (res) {
              console.log(res.data);
              that.globalData.OPEN_ID = res.data.openid;
              that.globalData.SESSION_KEY = res.data.session_key;
              console.log(that.globalData.OPEN_ID);
            }
          })
        }
      })
    }

    this.globalData = {
      LOGINED: '',
      OPEN_ID: '',
      SESSION_KEY: '',
      CARNUM: "",
      USERINFO: [],
      INFORMATIONED:false,
      USERNAME:''
    }
    
  }
})
