import wxHelper from '../utils/wxHelper';

const env = 'Debug';
const urlLogin = env === 'Debug' ? 'http://192.168.1.97:5500/login/wxcustom' : 'http://192.168.1.97:5500/login/wxcustom';

const urlConfig = {
  host: '',
  mine: '/mine',
  index: '/index',
  promote: '/promote',
  coupon: '/coupon',
  product: '/product',
  cart: '/cart',
  business: '/business',
  phone: '/mine/phone',
  order: '/order',
  policy: '/policy',
  pay: '/pay'
};

export const url = new Proxy(urlConfig, {
  get: function (target, propKey) {
    if (propKey === 'host') {
      return target.host;
    } else {
      return `${target.host}${target[propKey]}`;
    }
  },
  set: function (target, propKey, value) {
    if (propKey !== 'host') {
      throw new RangeError('属性不能修改');
    }
    if (typeof value !== 'string') {
      throw new TypeError('赋值类型不是string');
    }
    return Reflect.set(target, propKey, value);
  },
  has: function (target, propKey) {
    return !!target[propKey];
  }
});

const loginGet = (code, type = 'p', value = 0) => wxHelper.request(urlLogin, 'post', {
  body: {
    version: 1.0,
    code: code,
    type: type,
    value: value,
    app: 'NSJ'
  }
});

const getMine = () => wxHelper.request(url.mine, 'get');

const putMine = (param) => wxHelper.request(url.mine, 'put', {
  body: param
});

const customIndex = (menu, sub) => wxHelper.request(url.index, 'get', {
  head: {
    menu,
    sub
  }
});

const customDetail = (id) => wxHelper.request(url.index, 'get', {
  query: id
});

const getPromote = () => wxHelper.request(url.promote, 'get');

const getCoupon = () => wxHelper.request(url.coupon, 'get');

const postCoupon = (id) => wxHelper.request(url.coupon, 'post', {
  body: id
});

const getProduct = (id) => wxHelper.request(url.product, 'get', {
  query: id
});

const getCart = () => wxHelper.request(url.cart, 'get');

const postCart = (product, type, kind) => wxHelper.request(url.cart, 'post', {
  body: {
    product,
    type,
    kind
  }
});

const deleteCart = (id) => wxHelper.request(url.cart, 'delete', {
  query: id
});

const business = () => wxHelper.request(url.business, 'get');

const modifyPhone = (encryptedData, iv) => wxHelper.request(url.phone, 'put', {
  body: {
    data: encryptedData,
    iv: iv
  }
});

const getCode = (phone) => wxHelper.request(url.phone, 'get', {
  head: {
    phone
  }
});

const modifyPhone2 = (id, code) => wxHelper.request(url.phone, 'put', {
  body: {
    id,
    code
  }
});

const readOrder = (skip, take) => wxHelper.request(url.order, 'get', {
  head: {
    skip,
    take
  }
});

const readOrderId = (id) => wxHelper.request(url.order, 'get', {
  query: id
});

const ossGet = () => wxHelper.request(url.policy, 'get');

const getPay = (shop) => wxHelper.request(url.pay, 'get', {
  head: {
    shop: shop
  }
});

const postPay = (mch, shop, price) => wxHelper.request(url.pay, 'post', {
  body: {
    mch: mch,
    shop: shop,
    price: price
  }
});

export default {
  loginGet,
  getMine,
  putMine,
  customIndex,
  customDetail,
  getPromote,
  getCoupon,
  postCoupon,
  getProduct,
  getCart,
  postCart,
  deleteCart,
  business,
  modifyPhone,
  modifyPhone2,
  getCode,
  readOrder,
  readOrderId,
  ossGet,
  getPay,
  postPay
};
