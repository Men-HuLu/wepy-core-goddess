import convert from './convert';
import wxHelper from './wxHelper';

const convertName = (filePath, timeStamp) => {
  let arr = filePath.split('.');
  let suffix = arr[arr.length - 1];
  let name = convert.Int10toInt36(timeStamp);
  return `${name}.${suffix}`.toLocaleLowerCase();
};

const postOss = async (filePath, oss, name) => {
  const { host, policy, key, signature, prefix } = oss;
  let rsp = await wxHelper.uploadFile({
    url: host,
    filePath: filePath,
    name: 'file',
    formData: {
      'key': `${prefix}${name}`,
      'policy': policy,
      'OSSAccessKeyId': key,
      'signature': signature
    }
  });
  if (rsp.statusCode === 204) {
    return `${host}${prefix}${name}`;
  }
};

export default {
  convertName,
  postOss
};
