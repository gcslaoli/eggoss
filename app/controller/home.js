'use strict';
const fs = require('mz/fs');
const path = require('path');
const pump = require('mz-modules/pump');
const moment = require('moment');
const uuid = require('uuid');
const crypto = require('crypto');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, config } = this;
    const body = {
      host: ctx.request.host,
      allowAnonymous: config.oss.client.allowAnonymous,
      protocal: config.oss.client.protocal,
    };
    ctx.body = body;
  }
  async upload() {
    const { ctx, config } = this;
    this.logger.info('upload被调用了');
    this.logger.info(ctx.request.body);
    const { key, policy, signature } = ctx.request.body;
    const file = ctx.request.files[0];
    let filename = '未指定.txt';
    if (!file) return ctx.throw(400, '未上传文件!');
    if (!key) {
      if (!config.oss.client.allowAnonymous) return ctx.throw(403, '禁止匿名上传！');
      filename = moment().format('YYYYMMDD') + '/' + uuid.v1() + path.extname(file.filename).toLowerCase();
    } else {
      const signatureV = crypto.createHmac('sha1', config.oss.client.accessKeySecret).update(policy).digest('base64');
      if (signature !== signatureV) {
        return ctx.throw(403, '签名验证失败！');
      }
      filename = key;
    }

    const targetPath = path.join(this.config.baseDir, 'app/public', filename);
    const dirname = path.dirname(targetPath);
    this.logger.info({ dirname });
    await this.mkdirsSync(dirname);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);

    try {
      await pump(source, target);
      ctx.logger.warn('save %s to %s', file.filepath, targetPath);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }
    ctx.body = { code: 1000, url: config.oss.client.protocal + '://' + ctx.request.host + '/' + filename };
  }
  async mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    if (this.mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

module.exports = HomeController;
