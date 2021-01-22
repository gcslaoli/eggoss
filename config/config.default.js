/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611219300163_3183';

  // add your middleware config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };

  const whitelist = [
    // images
    '.jpg', '.jpeg', // image/jpeg
    '.png', // image/png, image/x-png
    '.gif', // image/gif
    '.bmp', // image/bmp
    '.wbmp', // image/vnd.wap.wbmp
    '.webp',
    '.tif',
    '.psd',
    // text
    '.svg',
    '.js', '.jsx',
    '.json',
    '.css', '.less',
    '.html', '.htm',
    '.xml',
    // tar
    '.zip',
    '.gz', '.tgz', '.gzip',
    // video
    '.mp3',
    '.mp4',
    '.avi',
    '.xlsx',
    '.xls',
  ];

  config.multipart = {
    fileSize: '100mb',
    mode: 'file',
    whitelist,
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
    origin: '*', // 允许的请求来源（* 表示允许所有的IP的请求 ）
  };
  config.oss = {
    client: {
      accessKeyId: 'LTAI4G7PMtfUqdgCNMRB66Xa',
      accessKeySecret: 'M5HmmPrYfgA1CES39M5DAuir8y3sEc',
      bucket: 'oss',
      endpoint: 'dev.lidong.xin',
      timeout: '3600s',
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
