// pages/jilu/jilu.js
//
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const db = wx.cloud.database()
var app = getApp();
var startX
var startY
Page({

  /**
   * 页面的初始数据
   */
  data: {
   jilu:[]
  },

  cancel(e){

    Dialog.confirm({
      message: '确定取消预约吗？',
    }).then(() => {
      wx.showLoading({
        title: '取消中',
      })
      db.collection("classroom").doc(e.target.dataset.docid).remove().then(res => {
        console.log(res)
        this.delete(e)
        wx.hideLoading()
        Notify({ type: 'primary', message: '取消成功' });
        this.onLoad()
      }).catch(err => {
        console.log(err)
      })
    });

    
  },
  delete(e) {
    var index = e.currentTarget.dataset.indexdel;  //获取自定义的内容下标值
    var list = this.data.jilu;              //获取内容列表
    list.splice(index, 1);       //截取指定的内容
    this.setData({               //重新渲染列表
      jilu: list
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      db.collection("classroom").where({
        _openid: app.globalData.OPEN_ID
      }).get().then(res => {
        this.setData({
          jilu: res.data
        })
        app.globalData.INFOMATIONED=true
      }).catch(err => {
        console.log(err)
      })

    
     
  },

  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = this._touchstart(e, this.data.jilu)
    this.setData({
      jilu: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = this._touchmove(e, this.data.jilu)
    this.setData({
      jilu: data
    })
  },
  _touchstart(e, items) {
    //开始触摸时 重置所有删除
    items.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })

    startX = e.changedTouches[0].clientX
    startY = e.changedTouches[0].clientY

    return items
  },
  _touchmove(e, items) {
    var index = e.currentTarget.dataset.index, //当前索引
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = this._angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        });
    items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    return items
  },
  _angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  }
 
})