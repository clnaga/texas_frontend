// index.js
import Message from 'tdesign-miniprogram/message/index';
import { changeName } from "../../service/user-info/userInfoWebRequest";
import { get_room_info, get_room_operation_log, add2, sub2, lock_room, unlock_room, submit_fin_cash, calculate_amount, delete_player } from '../../service/game/gameWebRequest'

Page({
  data: {
    popupVisible: false,
    dialogKey: '',
    showAdd2Confirm: false,
    showSub2Confirm: false,
    showCalcAmountConfirm: false,
    calcAmountContent: '分摊分摊',
    showDeletePlayerConfirm: false,

    roomStatus: '0',
    diffCash: null,
    finCash: '',
    playerId: '',
    playerName: '',

    roomData: null,
  },

  // 调用自定义tabbar的init函数，使页面与tabbar激活状态保持一致
  onShow() {
    this.getTabBar().init();

    const app = getApp();

    get_room_info(app.globalData.userinfo.curRoomCode).then(respData => {
      this.setData({
        roomData: respData,
        playerName: getApp().globalData.userinfo.name
      });
    }).catch(error => {
      console.log(error);
    })
  },

  // 页面加载，数据初始化
  onLoad() {
  },


  // ========================================================
  // 对局按钮

  // 切换对局信息/对局日志
  onTabsChange(event) {
    const app = getApp()

    const roomCode = app.globalData.userinfo.curRoomCode
    if (event.detail.value == 1) {
      get_room_operation_log(roomCode, 'ALL').then(respData => {
        this.setData({
          roomOperationLogList: respData,
        });
      }).catch(error => {
        console.log(error);
      })
    } else {
      get_room_info(roomCode).then(respData => {
        this.setData({
          roomData: respData,
          playerName: getApp().globalData.userinfo.name
        });
      }).catch(error => {
        console.log(error);
      })
    }
  },

  // 监听logStatusChange事件，切换日志标签，展示对应的日志
  logStatusChange(e) {
    const app = getApp()

    const roomCode = app.globalData.userinfo.curRoomCode
    if (e.detail.value == 0) {
      get_room_operation_log(roomCode, 'ALL').then(respData => {
        this.setData({
          roomOperationLogList: respData,
        });
      }).catch(error => {
        console.log(error);
      })
    } else if (e.detail.value == 1) {
      get_room_operation_log(roomCode, 'ROOM_OPERATION').then(respData => {
        this.setData({
          roomOperationLogList: respData,
        });
      }).catch(error => {
        console.log(error);
      })
    } else {
      get_room_operation_log(roomCode, 'PLAYER_OPERATION').then(respData => {
        this.setData({
          roomOperationLogList: respData,
        });
      }).catch(error => {
        console.log(error);
      })
    }
  },

  // 改变名称
  changeName(e) {
    const context = this
    const nickName = e.detail.value
    getApp().globalData.userinfo.name = nickName
    if (nickName != '') {
      changeName(nickName)
      context.setData({
        "userInfo.userinfo": nickName
      })
    }
  },
  
  // +2
  showAdd2Dialog(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [key]: true, dialogKey: key });
  },
  closeAdd2Dialog() {
    const { dialogKey } = this.data;
    this.setData({ [dialogKey]: false });
  },
  add2() {
    const app = getApp()
    
    const roomCode = app.globalData.userinfo.curRoomCode
    add2(roomCode).then(respData => {
      get_room_info(roomCode).then(respData => {
        this.setData({
          showAdd2Confirm: false,
          roomData: respData,
          playerName: getApp().globalData.userinfo.name
        });
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
  },
  // -2
  showSub2Dialog(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [key]: true, dialogKey: key });
  },
  closeSub2Dialog() {
    const { dialogKey } = this.data;
    this.setData({ [dialogKey]: false });
  },
  sub2() {
    const app = getApp()
    
    const roomCode = app.globalData.userinfo.curRoomCode
    sub2(roomCode).then(respData => {
      get_room_info(roomCode).then(respData => {
        this.setData({
          showSub2Confirm: false,
          roomData: respData,
          playerName: getApp().globalData.userinfo.name
        });
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
  },
  
  // 锁定/解锁房间 
  roomStatusChange() {
    const app = getApp()
    
    const roomCode = app.globalData.userinfo.curRoomCode
    const roomStatus = this.data.roomStatus == '0' ? '1' : '0'
    if (roomStatus == '1') {
      lock_room(roomCode).then(respData => {
        this.setData({
          roomStatus: roomStatus
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
    } else {
      unlock_room(roomCode).then(respData => {
        this.setData({
          roomStatus: roomStatus
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
  
  // 输入当前筹码
  onFinCashBlur(e) {
    this.setData({
      "finCash": e.detail.value
    })
  },
  showPopup: function () {
    this.setData({
      popupVisible: true
    });
  },
  onVisibleChange(e) {
    this.setData({
      popupVisible: e.detail.visible
    });
  },
  onConfirm: function () {
    const app = getApp()
    
    const roomCode = app.globalData.userinfo.curRoomCode
    submit_fin_cash(roomCode, this.data.finCash).then(respData => {
      this.setData({ popupVisible: false });
      get_room_info(roomCode).then(respData => {
        this.setData({
          roomData: respData,
          playerName: getApp().globalData.userinfo.name
        });
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
    
  },
  
  // 计算分摊
  showCalcAmountDialog(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [key]: true, dialogKey: key });
  },
  closeCalcAmountDialog() {
    const { dialogKey } = this.data;
    this.setData({ [dialogKey]: false });
  },
  calcAmount() {
    const app = getApp()
    
    const roomCode = app.globalData.userinfo.curRoomCode
    if (roomCode == undefined) {
      Message.info({
        context: this,
        offset: [10, 32],
        duration: 2000,
        single: false,
        content: '计算分摊，房间编码必填，检查检查',
      });
    }
    calculate_amount(roomCode).then(respData => {
      get_room_info(roomCode).then(respData => {
        this.setData({
          showCalcAmountConfirm: false,
          roomData: respData,
          playerName: getApp().globalData.userinfo.name
        });
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
  },

  // 长按删除玩家信息
  showDeletePlayerDialog(e) {
    const { item, key } = e.currentTarget.dataset;
    this.setData({ [key]: true, dialogKey: key, playerId: item.playerId });
  },
  closeDeletePlayerDialog() {
    const { dialogKey } = this.data;
    this.setData({ [dialogKey]: false, playerId: '' });
  },
  deletePlayer(e) {
    const app = getApp()
    
    const roomCode = app.globalData.userinfo.curRoomCode
    delete_player(roomCode, this.data.playerId).then(respData => {
      get_room_info(roomCode).then(respData => {
        this.setData({
          showDeletePlayerConfirm: false,
          roomData: respData,
          playerName: getApp().globalData.userinfo.name
        });
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
  },

})
