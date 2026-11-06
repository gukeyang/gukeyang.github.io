---
title: 安知鱼主题配置踩坑记录
date: 2026-11-04 10:00:00
categories:
  - 折腾记录
tags:
  - AnZhiYu
  - 主题配置
cover: /img/cover-default.svg
description: 把主题默认值里属于原作者的信息清掉，换成自己的站点内容。
---

主题装好之后先别急着写文章，有几处默认值是原作者的信息，不处理的话站点上会挂着别人的头像和收款码。

## 必须改掉的默认项

| 配置项 | 默认值问题 | 本站处理 |
| --- | --- | --- |
| `avatar.img` | 原作者头像外链 | 换成本地 `/img/avatar.svg` |
| `reward.enable` | 打赏二维码指向原作者 | 关闭 |
| `aside.card_weixin` | 原作者微信名片 | 关闭 |
| `footer.bdageitem` | 指向主题官网的徽标 | 关闭 |
| `home_top.siteText` | 显示 `anheyu.com` | 换成自己的域名 |
| `error_404.background` | 作者图床外链 | 换成本地图片 |
| `preloader.avatar` | 作者头像 | 换成本地图 |

## 渲染器别漏装

主题模板是 Pug + Stylus，缺渲染器会直接构建失败：

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

字数统计同理，启用 `wordcount.enable: true` 前要装 `hexo-wordcount`。

<!-- more -->

## 图片自托管

示例封面、头像、favicon 都放在 `source/img/` 下，用 SVG 画的，没有外部图床依赖。这样 GitHub Pages 上不会出现图片被防盗链或图床挂掉的情况。换成自己的照片时，把文件丢进 `source/img/` 再改覆盖配置里的路径就行。

## 关于搜索和评论

两者默认关闭：本地搜索需要额外的 `hexo-generator-searchdb`，评论系统需要 Twikoo / Waline 之类的后端服务。纯静态站要用得上再按主题文档接，不接也不会报错。
