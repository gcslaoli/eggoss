# 编译过程
FROM node:lts-alpine
# 暴露容器端口
EXPOSE 7001
# 配置环境变量
ENV NODE_ENV=production
# 更换为阿里更新源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata
# 创建app目录
RUN mkdir -p /app
# 设置工作目录
WORKDIR /app
# 持久化日志目录
VOLUME [ "/app/app/public" ]
COPY package.json /app/package.json
RUN yarn --registry=https://npm.sltapp.cn
# RUN yarn
COPY ./ /app
CMD yarn docker-start
