# eggoss

simple oss server

一个自建OSS的小项目，项目中越来越喜欢使用阿里OSS的签名前端上传了，可当项目私有化部署而不使用OSS时，又不想改动代码，于是有了这个兼容OSS签名上传的服务端项目。同时在开启匿名上传后也可以做为普通的上传服务器使用。

项目使用eggjs构建,OSS上传测试使用[cool-admin-pro](https://cool-admin.com/) 

镜像拉取
```
docker pull gcslaoli/eggoss
或
docker pull registry.cn-beijing.aliyuncs.com/gcslaoli/eggoss
```
## 示例`docker-compose.yml`
```
version: '3'
services:
  eggoss:
    build: .
    image: gcslaoli/eggoss
    # restart: always
    volumes:
      - ./data/public/:/app/app/public/
    environment:
      # TZ: Asia/Shanghai # 指定时区 默认值 'Asia/Shanghai'
      accessKeySecret: "12345678" # 配置accessKeySecret 默认值'www.lidong.xin'
      fileSize: "100mb" # 最大上传文件大小，默认值 100mb
      allowAnonymous: "true" # 是否允许匿名上传 默认值 false
      protocal: "http" # 返回值中 url协议头 可选 'http' 或 'https' 默认值 'https'
    # ports:
    #   - 7001:7001
```
## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org