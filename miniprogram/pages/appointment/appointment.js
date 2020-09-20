
Page({

  data: {
    date: '',
    show: false,
    show_pop:false,
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    username:"",
    password:""
  },
  showPopup() {
    this.setData({ show_pop: true });
  },

  onClose() {
    this.setData({ show_pop: false });
  },

  onChange(event) {
    const { picker, value, index } = event.detail;

  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },

})