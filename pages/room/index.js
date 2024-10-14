import Message from 'tdesign-miniprogram/message/index';
import Toast from 'tdesign-miniprogram/toast/index';
import { create_room, join_room, get_room_list } from '../../service/room/roomWebRequest';

Page({
  data: {
    tabPanelstyle: 'display:flex;justify-content:center;align-items:center;min-height: 500px',
    popupVisible: false,
    enterRoomPopupVisible: false,
    popupJoinRoomVisible: false,

    popupRoomCode: '',
    pageNo: 1,
    maxPageNo: 4,

    roomInfoList: [],
    roomEditInfo: {
      roomCode: '',
      roomHeadCount: '',
      roomHeadAmount: '',
    },
  },

  // 调用自定义tabbar的init函数，使页面与tabbar激活状态保持一致
  onShow() {
    this.getTabBar().init();
    get_room_list(1).then(respData => {
      this.setData({
        roomInfoList: respData,
      });
    }).catch(error => {
      console.log(error);
    })
  },

  // 页面加载，数据初始化
  onLoad() {
  },

  // 搜索房间
  searchRoom() {
    Message.info({
      context: this,
      offset: [10, 32],
      duration: 2000,
      single: false,
      content: '搜索暂未开放',
    });
  },


  //
  // 创建/修改房间
  //
  onRoomCodeChange(e) {
    this.setData({
      "roomEditInfo.roomCode": e.detail.value
    })
  },
  onRoomHeadCountChange(e) {
    this.setData({
      "roomEditInfo.roomHeadCount": e.detail.value
    })
  },
  showPopup: function (e) {
    if (e.currentTarget.dataset.item == undefined) {
      this.setData({ popupVisible: true });
      return;
    }
    if (e.currentTarget.dataset.item.closeFlag === 1) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '关闭的房间不支持修改房间信息',
      });
      return;
    }
    this.setData({
      popupVisible: true,
      "roomEditInfo.roomHeadCount": e.currentTarget.dataset.item.headCount,
      "roomEditInfo.roomHeadAmount": e.currentTarget.dataset.item.headAmount,
      popupRoomCode: e.currentTarget.dataset.item.code,
    });
  },
  onVisibleChange(e) {
    this.setData({
      popupVisible: e.detail.visible,
      "roomEditInfo.roomHeadCount": '',
      "roomEditInfo.roomHeadAmount": '',
      popupRoomCode: '',
    });
  },
  onConfirm: function (e) {
    const roomHeadCount = this.data.roomEditInfo.roomHeadCount
    const roomHeadAmount = this.data.roomEditInfo.roomHeadAmount
    if (roomHeadCount == undefined || roomHeadCount == '' || roomHeadAmount == undefined || roomHeadAmount == '') {
      Message.info({
        context: this,
        offset: [10, 32],
        duration: 2000,
        single: false,
        content: '房间人数、人头金额必填，检查检查',
      });
    } else {
      create_room(this.data.popupRoomCode, roomHeadCount, roomHeadAmount).then(respData => {
        const roomCode = respData
        join_room(roomCode).then(respData => {
          this.setData({
            popupVisible: false,
            enterRoomPopupVisible: false,
            "roomEditInfo.roomCode": '',
            "roomEditInfo.roomHeadCount": '',
            "roomEditInfo.roomHeadAmount": '',
          });
          getApp().globalData.userinfo.curRoomCode = roomCode;
          wx.switchTab({
            url: '/pages/game/index',
          })
        }).catch(error => {
          console.log(error);
        })
      }).catch(error => {
        Message.info({
          context: this,
          offset: [10, 32],
          duration: 2000,
          single: false,
          content: error.msg,
        });
      })
    }
  },
  enterRoomShowPopup: function (e) {
    if (e.currentTarget.dataset.item == undefined) {
      this.setData({ enterRoomPopupVisible: true });
      return;
    }
    if (e.currentTarget.dataset.item.closeFlag === 1) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '关闭的房间不可再加入房间',
      });
      return;
    }

    if (e.currentTarget.dataset.item.ownerOpenId == getApp().globalData.userinfo.token) {
      this.setData({
        popupVisible: true,
        "roomEditInfo.roomHeadCount": e.currentTarget.dataset.item.headCount,
        "roomEditInfo.roomHeadAmount": e.currentTarget.dataset.item.headAmount,
        popupRoomCode: e.currentTarget.dataset.item.code,
      });
    } else {
      this.setData({
        enterRoomPopupVisible: true,
        "roomEditInfo.roomHeadCount": e.currentTarget.dataset.item.headCount,
        "roomEditInfo.roomHeadAmount": e.currentTarget.dataset.item.headAmount,
        popupRoomCode: e.currentTarget.dataset.item.code,
      });
    }
  },
  onEnterRoomVisibleChange(e) {
    this.setData({
      enterRoomPopupVisible: e.detail.visible,
      "roomEditInfo.roomHeadCount": '',
      "roomEditInfo.roomHeadAmount": '',
      popupRoomCode: '',
    });
  },

  // 加入房间
  onRoomHeadAmountChange(e) {
    this.setData({
      "roomEditInfo.roomHeadAmount": e.detail.value
    })
  },
  showJoinRoomPopup: function (e) {
    this.setData({
      popupJoinRoomVisible: true,
    });
  },
  onJoinRoomVisibleChange(e) {
    this.setData({
      popupJoinRoomVisible: e.detail.visible,
    });
  },
  onJoinRoomConfirm: function () {
    const roomCode = this.data.roomEditInfo.roomCode
    if (roomCode == undefined || roomCode == '') {
      Message.info({
        context: this,
        offset: [10, 32],
        duration: 2000,
        single: false,
        content: '加入房间，房间编码必填，检查检查',
      });
    } else {
      join_room(roomCode).then(respData => {
        this.setData({
          popupJoinRoomVisible: false,
          "roomEditInfo.roomCode": '',
        });
        getApp().globalData.userinfo.curRoomCode = roomCode;
        wx.switchTab({
          url: '/pages/game/index',
        })
      }).catch(error => {
        Message.info({
          context: this,
          offset: [10, 32],
          duration: 2000,
          single: false,
          content: error.msg,
        });
      })
    }
  },

  // 步进器
  onPageNoChange(e) {
    const { value } = e.detail;
    this.setData({
      pageNo: value,
    });
    get_room_list(value).then(respData => {
      if (respData.length < 10) {
        this.setData({
          maxPageNo: value
        });
      }
      this.setData({
        roomInfoList: respData,
      });
    }).catch(error => {
      console.log(error);
    })
  },

})
