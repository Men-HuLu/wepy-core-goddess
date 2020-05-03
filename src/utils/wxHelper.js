import eventHub from '../common/eventHub';
/**
 * @微信小程序登录
 */
const login = async () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @微信小程序请求
 */
const request = async (url, method = 'get', params = {}) => {
  if (params) {
    if (params.query) {
      url = `${url}/${params.query}`;
    }
    if (params.head) {
      url = url + '?';
      Object.keys(params.head).forEach((key) => {
        url = `${url}${key}=${params.head[key]}&`;
      });
      url = url.substring(0, url.length - 1);
    }
  }
  return new Promise((resolve, reject) => {
    const header = {
      'Content-Type': 'application/json'
    };
    eventHub.$emit('requst', header);
    wx.request({
      url: encodeURI(url),
      header: header,
      data: params.body,
      method: method,
      success: rsp => {
        if (rsp.statusCode === 401) {
          wx.showToast({
            title: '登录身份失效,请重新登录',
            icon: 'none'
          });
          return;
        }
        if (!(rsp.statusCode >= 200 && rsp.statusCode < 400)) {
          wx.showToast({
            title: rsp.data,
            icon: 'none'
          });
          return;
        }
        resolve(rsp);
      },
      fail: err => {
        wx.showToast({
          title: '网络请求失败' + err.errMsg,
          icon: 'none'
        });
        reject(err);
      }
    });
  });
};

/**
 * @微信小程序请求
 */
const uploadFile = async ({ url = '', filePath = '', name = '', header = {}, formData = {} }) => {
  console.log(url, filePath, name, header, formData);
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: name,
      header: header,
      formData: formData,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @更新机制
 */
const update = () => {
  const updateManager = wx.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    if (res.hasUpdate) {
      console.log('有新版本需要更新');
    } else {
      console.log('当前已是最新版本');
    }
  });
  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      showCancel: false,
      cancelText: '否',
      confirmText: '是',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      }
    });
  });

  updateManager.onUpdateFailed(function () {
    // 新的版本下载失败
    wx.showModal({
      title: '更新失败',
      content: '重新更新新版本，是否重启应用？',
      cancelText: '否',
      confirmText: '是',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      }
    });
  });
};

/**
 * @模态框
 */
const showModal = ({ title = '', content = '', showCancel = true, cancelText = '取消', cancelColor = '#000000', confirmText = '确定', confirmColor = '#576B95' }) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      showCancel: showCancel,
      cancelText: cancelText,
      cancelColor: cancelColor,
      confirmText: confirmText,
      confirmColor: confirmColor,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @显示消息提示框
 */
const showToast = async ({ title = '', icon = 'success', image = '', duration = 1500, mask = false }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: icon,
      image: image,
      duration: duration,
      mask: mask,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @获取网络图片
 */
const getImageInfo = async ({ src = '' }) => {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: src,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @下载图片
 */
const saveImageToPhotosAlbum = async ({ filePath = '' }) => {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

const chooseImage = async ({ count = 9, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera'] }) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: count,
      sizeType: sizeType,
      sourceType: sourceType,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @拨打电话
 */
const makePhoneCall = async ({ phoneNumber = '' }) => {
  return new Promise((resolve, reject) => {
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @剪贴板
 */
const setClipboardData = async ({ data = '' }) => {
  return new Promise((resolve, reject) => {
    wx.setClipboardData({
      data: data,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @获取用户信息
 */
const getUserInfo = async ({ withCredentials = '', lang = 'en' }) => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: withCredentials,
      lang: lang,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @小程序返回
 */
const navigateBackMiniProgram = async ({ extraData = {} }) => {
  return new Promise((resolve, reject) => {
    wx.navigateBackMiniProgram({
      extraData: extraData,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @路由跳转
 */
const navigateTo = async (url = '', params, events) => {
  let targetUrl = '';
  if (!params) {
    targetUrl = url;
  } else {
    targetUrl = url + '?';
    Object.keys(params).forEach((key) => {
      targetUrl = `${targetUrl}${key}=${params[key]}&`;
    });
    targetUrl = targetUrl.substring(0, targetUrl.length - 1);
  }
  return new Promise((resolve, reject) => {
    wx.navigateTo({
      url: targetUrl,
      events: events,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @路由跳转tab
 */
const switchTab = async (url = '', params, events) => {
  let targetUrl = '';
  if (!params) {
    targetUrl = url;
  } else {
    targetUrl = url + '?';
    Object.keys(params).forEach((key) => {
      targetUrl = `${targetUrl}${key}=${params[key]}&`;
    });
    targetUrl = targetUrl.substring(0, targetUrl.length - 1);
  }
  return new Promise((resolve, reject) => {
    wx.switchTab({
      url: targetUrl,
      events: events,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

/**
 * @小程序尺寸
 */
const systemInfo = () => {
  let info = {};
  let resulet = wx.getSystemInfoSync();
  info.model = resulet.model;
  info.system = resulet.system;
  info.statusBarHeight = resulet.statusBarHeight;
  info.screenHeight = resulet.screenHeight;
  info.screenWidth = resulet.screenWidth;
  // 苹果
  if (info.system.toLowerCase().indexOf('ios') !== -1) {
    info.navigationHeigt = 44;
    if (info.model.toLowerCase().indexOf('iphone x') !== -1) {
      info.tabBarHeight = 82;
    } else {
      info.tabBarHeight = 48;
    }
  } else {
    info.navigationHeigt = 46;
    info.tabBarHeight = 56;
  }
  // 比例
  info.ratio = 750 / info.screenWidth;
  //
  info.rpx_screenWidth = resulet.screenWidth;
  info.rpx_screenHeight = resulet.screenHeight * info.ratio;
  info.rpx_statusBarHeight = resulet.statusBarHeight * info.ratio;
  info.rpx_navigationHeigt = info.navigationHeigt * info.ratio;
  info.rpx_tabBarHeight = info.tabBarHeight * info.ratio;
  return info;
};

const requestPayment = ({ timeStamp, nonceStr, packAge, signType, paySign }) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: timeStamp,
      nonceStr: nonceStr,
      package: packAge,
      signType: signType,
      paySign: paySign,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
};

export default {
  login,
  request,
  uploadFile,
  update,
  showModal,
  showToast,
  getImageInfo,
  saveImageToPhotosAlbum,
  chooseImage,
  makePhoneCall,
  setClipboardData,
  getUserInfo,
  navigateTo,
  switchTab,
  systemInfo,
  navigateBackMiniProgram,
  requestPayment
};
