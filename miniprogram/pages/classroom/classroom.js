// pages/classroom/classroom.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    classroom: ['文科楼\n101', '文科楼\n102', '文科楼\n103', '文科楼\n104', '文科楼\n105', '文科楼\n106', '文科楼\n107', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201', '文科楼\n108', '文科楼\n201']
  },

  //搜索方法
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  onSearch() {
      wx.showToast({
        title: '搜索',
      })
  
  },
  onClick() {
    Toast('搜索' + this.data.value);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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