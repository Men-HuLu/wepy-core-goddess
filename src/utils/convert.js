function Int10toInt62(num) {
  let res = '';
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  do {
    let rem = num % 62;
    num = Math.floor(num / 62);
    let z = str.substr(rem, 1);
    res = `${z}${res}`;
  }
  while (num > 0);
  return res;
}

function Int10toInt36(num) {
  let res = '';
  let str = '0123456789abcdefghijklmnopqrstuvwxyz';
  do {
    let rem = num % 36;
    num = Math.floor(num / 36);
    let z = str.substr(rem, 1);
    res = `${z}${res}`;
  }
  while (num > 0);
  return res;
}

export default {
  Int10toInt62,
  Int10toInt36
};
