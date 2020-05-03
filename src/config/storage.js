let base = 'resource';
const getBase = () => {
  return wx.getStorageSync(base);
};

const setBase = (value) => {
  wx.setStorage({
    key: base,
    data: value
  });
};

const delBase = () => {
  wx.removeStorageSync(base);
};

let temp = 'temp';

const getTemp = () => {
  return wx.getStorageSync(temp);
};

const setTemp = (value) => {
  wx.setStorage({
    key: temp,
    data: value
  });
};

const delTemp = () => {
  wx.removeStorageSync(temp);
};

export {
  getBase,
  setBase,
  delBase,
  getTemp,
  setTemp,
  delTemp
};
