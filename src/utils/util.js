function getDateString(datetime = null) {
  let date = datetime === null ? new Date() : new Date(datetime);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (`${y}-${m}-${d}`);
}

function getDateString2(datetime = null) {
  let date = datetime === null ? new Date() : new Date(datetime);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (`${y}/${m}/${d}`);
}

function getCurrentTime() {
  var keep = '';
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  // var rand = Math.round(Math.random() * 899 + 100);
  keep = y + '' + m + '' + d + '' + h + '' + f + '' + s;
  return keep; // 20160614134947
}

function objLength(input) {
  var type = toString(input);
  var length = 0;
  if (type !== '[object Object]') {
    // throw "输入必须为对象{}！"
  } else {
    for (var key in input) {
      if (key !== 'number') {
        length++;
      }
    }
  }
  return length;
}

// 验证是否是手机号码
function vailPhone(number) {
  return /^1\d{10}$/.test(number);
}

// 浮点型加法函数
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return ((arg1 * m + arg2 * m) / m).toFixed(2);
}

// 浮点型乘法
function mul(a, b) {
  let c = 0;
  let d = a.toString();
  let e = b.toString();
  try {
    c += d.split('.')[1].length;
  } catch (f) {
  }
  try {
    c += e.split('.')[1].length;
  } catch (f) {
  }
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c);
}

// 遍历对象属性和值
function displayProp(obj) {
  var names = '';
  for (var name in obj) {
    names += name + obj[name];
  }
  return names;
}

// 去除字符串所有空格
function sTrim(text) {
  return text.replace(/\s/ig, '');
}

// 转换星星分数
function convertStarArray(score) {
  // 1 全星,0 空星,2半星
  var arr = [];
  for (var i = 1; i <= 5; i++) {
    if (score >= i) {
      arr.push(1);
    } else if (score > i - 1 && score < i + 1) {
      arr.push(2);
    } else {
      arr.push(0);
    }
  }
  return arr;
}
// 验证手机
function isPhone(num) {
  return /^1\d{10}$/.test(num);
}
// 页面提交
function refreshCurrentPage(type) {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  switch (type.toLowerCase()) {
    case 'onload':
      currentPage.onLoad();
      break;
    case 'onshow':
      currentPage.onShow();
      break;
    default:
      currentPage.onLoad();
      currentPage.onShow();
      break;
  }
  wx.stopPullDownRefresh();
}

function urlConvertObj(scene) {
  let arr = decodeURIComponent(scene).split('&');
  let obj = {};
  for (let item of arr) {
    let temp = item.split('=');
    if (temp.length === 2) {
      obj[temp[0]] = temp[1];
    } else if (temp.length === 1) {
      obj[temp[0]] = '';
    }
  }
  return obj;
}

async function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  });
}

export default {
  getCurrentTime,
  getDateString,
  getDateString2,
  objLength,
  displayProp,
  sTrim,
  vailPhone,
  mul,
  accAdd,
  convertStarArray,
  isPhone,
  refreshCurrentPage,
  urlConvertObj,
  sleep
};
