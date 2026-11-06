---
title: Hexo + GitHub Actions 自动部署备忘录
date: 2026-11-05 10:00:00
categories:
  - 技术笔记
tags:
  - Hexo
  - GitHub Pages
  - GitHub Actions
cover: /img/cover-code.svg
description: 用官方 Pages artifact 方式发布 Hexo 静态站，不需要 SSH Key 也不需要 Token。
---

把本站的发布流程记下来，免得下次换机器又要翻文档。

## 仓库与 Pages 设置

1. 新建仓库，名字必须是 `<用户名>.github.io`（用户主页仓库）。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 本地推送 `main` 分支即可，工作流会自动构建 `public/` 并部署。

## 工作流关键点

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

`pages: write` 与 `id-token: write` 是官方 `actions/deploy-pages` 必需的权限，缺一个就会在部署阶段报 403。构建产物通过 `actions/upload-pages-artifact` 上传，因此不需要 `gh-pages` 分支，也不用配 SSH Key。

## 本地命令

```bash
npm ci           # 按 package-lock.json 装依赖
npm run dev      # 本地预览 http://localhost:4000
npm run build    # 生成 public/
```

<!-- more -->

## 主题通过 npm 安装的好处

主题放在 `node_modules/hexo-theme-anzhiyu`，`theme: anzhiyu` 由 Hexo 自动解析。比起 `git clone` 到 `themes/`，这样仓库里不会有嵌套的 Git 仓库，CI 里 `npm ci` 一步就能还原完整环境。

主题配置用 Hexo 的覆盖机制：在博客根目录建 `_config.anzhiyu.yml`，里面只写要改的项，Hexo 会与主题默认配置做深合并。

## 站点配置的两个坑

- `url` 必须写最终访问地址，`root` 对 `<用户名>.github.io` 主站仓库必须保持 `/`。
- 若改用普通项目仓库（地址为 `/仓库名/`），`root` 要同步改成 `/仓库名/`，否则 CSS、JS 全部 404。

```yaml
url: https://YOUR_GITHUB_USERNAME.github.io
root: /
```
