// pages/appointment/appointment.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
const db = wx.cloud.database()
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '12:00',
    currentDateEnd:"14:00",
    minHour: 7,
    maxHour: 23,
    showtime: false,
    showDate:false,
    showtimeEnd:false,
    classroom:'',
    date: '2020/5/4',
    dialogShow:false,

  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onInputEnd(event) {
    this.setData({
      currentDateEnd: event.detail,
    });
  },

  jump:function(){
    if (this.data.currentDateEnd < this.data.currentDate){
      Dialog.alert({
        title: '预约失败',
        message: '预约时间有误！请选择正确的时间段'
      }).then(() => {
        
      });
      zhongzhijs;  //利用错误来终止js继续执行
    }
    db.collection("classroom").where({
      classroomNumber:this.data.classroom,
      date : this.data.date
    }).get().then(res=>{
      console.log(res)
      if(res.data.length==0){
        this.yuyue()
        this.sendMessage()
      }
      if (this.data.currentDateEnd < res.data[0].start || this.data.currentDate > res.data[0].end){
        this.yuyue()
        this.sendMessage()
      }else{
        console.log("教室已经被预约了！")
        Dialog.alert({
          title: '预约失败',
          message: '该时间段已被预约！请重新预约'
        }).then(() => {
          // on close
        });

      }
    }).catch(err=>{
      console.log(err)
    })

    
  },
  sendMessage(){
    wx.cloud.callFunction({
      name: "sendMessage",
      data: {
        name: app.globalData.USERNAME,
        space: this.data.classroom,
        time1: this.data.date + " " + this.data.currentDate,
        time2: this.data.date + " " + this.data.currentDateEnd
      }
    }).then(res => {
      console.log(res)
    }).catch(res => {
      console.log(res)
    })

  },
  yuyue(){
    db.collection("classroom").add({
      data: {
        name: app.globalData.USERNAME,
        classroomNumber: this.data.classroom,
        start: this.data.currentDate,
        end: this.data.currentDateEnd,
        date: this.data.date
      }
    }).then(res => {
      console.log(res)
    })
    wx.navigateTo({
      url: '/pages/success/success',
    })
  },
  showPopup() {
    this.setData({ showtime: true });
  },
  showPopupEnd() {
    this.setData({ showtimeEnd: true });
  },
  onDisplay(){
    this.setData({ showdate: true });
  },

  onClose() {
    this.setData({ showtime: false });
    this.setData({ showdate: false });
    this.setData({ showtimeEnd: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      showdate: false,
      date: this.formatDate(event.detail),
    });
  },
  onLoad(options){
    this.setData({
      classroom: options.classroomDeatil
    })
  },



 
})