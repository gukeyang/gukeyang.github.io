# AnZhiYu 博客 · GitHub Pages 版

基于 **Hexo 8 + [hexo-theme-anzhiyu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) 1.7.0** 的纯静态博客，配 **GitHub Actions** 自动构建发布到 `gukeyang.github.io` 主站仓库。

主题通过 npm 安装，`_config.anzhiyu.yml` 做覆盖配置，升级主题不会冲掉自定义内容；头像 / favicon / 封面都是仓库内的 SVG，不依赖外部图床。

---

## 一、本地跑起来

环境要求：Node.js ≥ 20（本项目在 Node 22 上验证通过）、Git。

```bash
npm ci          # 按 package-lock.json 安装依赖
npm run dev     # 本地预览 http://localhost:4000
npm run build   # 生成静态文件到 public/
```

---

## 二、上线到 GitHub Pages

本项目已按 `gukeyang.github.io` 配置完毕：

| 项 | 值 |
| --- | --- |
| 仓库 | https://github.com/gukeyang/gukeyang.github.io |
| 站点地址 | https://gukeyang.github.io |
| 发布源 | GitHub Actions（仓库 Settings → Pages → Source） |
| 工作流 | `.github/workflows/deploy.yml` |

### 首次推送

```bash
git remote add origin https://github.com/gukeyang/gukeyang.github.io.git  # 已配置，可跳过
git push -u origin main
```

推送后 Actions 自动执行 `npm ci → npm run build → deploy-pages`，约 1–2 分钟后访问 https://gukeyang.github.io。之后每次 `git push` 都会自动更新，也可以在 Actions 页面手动 `Run workflow`。

> 部署用官方 Pages artifact 方案，不需要 SSH Key、不需要 Token、不需要 `gh-pages` 分支。仓库必须是 `gukeyang.github.io` 主站仓库，`root: /` 不要改；若换成普通项目仓库（访问路径带 `/仓库名/`），`root` 要同步改成 `/仓库名/`。

### 想改站点信息

| 文件 | 字段 |
| --- | --- |
| `_config.yml` | `title` / `subtitle` / `description` / `author` |
| `_config.anzhiyu.yml` | `social.Github`、`home_top.siteText`、导航菜单 |
| `source/about/index.md` | 关于页正文与联系方式 |

改完 `git add . && git commit -m "..." && git push` 即可生效。

---

## 三、目录结构

```
_config.yml                 站点配置（URL、分页、主题选择）
_config.anzhiyu.yml         主题覆盖配置（只写需要改的项，Hexo 深合并主题默认值）
package.json                依赖与脚本
.github/workflows/deploy.yml GitHub Actions 自动部署
source/
  _posts/                   文章（Markdown）
  about/ categories/ tags/  自定义页面
  img/                      本地 SVG 图片（头像、favicon、封面）
public/                     构建产物（已忽略，不入库）
```

主题自带完整配置可参考 `node_modules/hexo-theme-anzhiyu/_config.yml`，或查阅 [主题文档](https://docs.anheyu.com/)。

---

## 四、写文章

```bash
npm run new -- post "文章标题"      # 生成 source/_posts/文章标题.md
```

Front-matter 示例：

```yaml
---
title: 文章标题
date: 2026-11-06 17:00:00
categories:
  - 技术笔记
tags:
  - Hexo
cover: /img/cover-default.svg
description: 一句话摘要
---
```

正文用 `<!-- more -->` 控制首页摘要截断。图片放 `source/img/` 后用 `/img/xxx.png` 引用。写完 `git add && git commit && git push` 即发布。

---

## 五、可选增强

- **本地搜索**：`npm i hexo-generator-searchdb`，在 `_config.yml` 增加 `search: {path: search.xml, field: post, content: true}`，再在 `_config.anzhiyu.yml` 打开 `local_search.enable: true`。
- **评论**：主题支持 Twikoo / Waline / Artalk / Giscus，需要对应的后端或 GitHub Discussions，配置 `comments.use` 及对应段落。
- **自定义域名**：在 `source/` 放 `CNAME` 文件（内容为域名），并把 `_config.yml` 的 `url` 改成该域名；域名 DNS 加 CNAME 指向 `gukeyang.github.io`。
- **RSS / sitemap**：安装 `hexo-generator-feed`、`hexo-generator-sitemap` 后按需启用。
- **主题升级**：`npm update hexo-theme-anzhiyu`；升级后对照主题新版本 `_config.yml` 检查 `_config.anzhiyu.yml` 是否有字段变更。

---

## 六、已做的默认处理

清掉了主题默认配置里属于原作者的内容（头像、微信名片、打赏二维码、页脚徽标、404 背景、预加载头像），关闭了需要额外服务的打赏 / 评论 / 搜索，开启了字数统计，页脚改为本站说明。站点内容可以直接替换成自己的。

---

## 七、在多台电脑上使用

整套博客（文章、配置、部署工作流）都在 Git 仓库里，`node_modules/` 和 `public/` 不入库、由 npm 与 CI 自动还原，所以任何电脑 clone 之后装一次依赖即可开工。

### 新电脑准备

1. 安装 [Node.js](https://nodejs.org/)（≥ 20，建议 LTS）和 [Git](https://git-scm.com/)
2. 克隆仓库并还原依赖：

```bash
git clone https://github.com/gukeyang/gukeyang.github.io.git
cd gukeyang.github.io
npm ci          # 按 package-lock.json 还原与原电脑完全一致的依赖
npm run dev     # 本地预览 http://localhost:4000
```

3. 首次在这台电脑 `git push` 时完成 GitHub 认证：一般会弹出浏览器授权窗口；若不弹，去 Settings → Developer settings → Personal access tokens 生成勾了 `repo` 权限的 token，推送时当密码用。

### 日常多设备同步

- 每次开始写作前先 `git pull`，写完 `git add . && git commit -m "..." && git push`，推送后 1–2 分钟自动上线
- 避免同时在两台电脑改同一篇文章，容易冲突
- 主题升级后记得提交 `package.json` 和 `package-lock.json`，这样其他电脑 `git pull` + `npm ci` 才能同步升级

> 国内网络直连 GitHub 不稳定时，`git push` 报 `CONNECT tunnel failed` / `schannel` 错误的解决办法：
> ① 有代理软件：`git config --global http.proxy http://127.0.0.1:7890`（换成实际端口），不再需要时 `git config --global --unset http.proxy`；
> ② 无代理：重试几次，或换网络环境再推。
