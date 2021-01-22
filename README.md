# eggoss

simple oss server

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