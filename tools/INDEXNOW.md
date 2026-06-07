# IndexNow 集成文档

## 概述

本项目使用 [IndexNow](https://www.indexnow.org/) 协议主动向搜索引擎（Bing / Yandex / Naver / Seznam）推送新发布或更新的 URL，相比传统 sitemap 被动等待抓取，**IndexNow 是 push 模式**，URL 提交后 24-72 小时内被抓取。

## 文件

- `4637e368e9bc47008f9ee8f6ae24ef3c.txt` — API key 验证文件（用户从 Bing Webmasters 导出, 放在站点根目录）
- `tools/indexnow-config.json` — IndexNow 配置
- `tools/submit-indexnow.sh` — 提交脚本

## 配置

| 字段 | 值 |
|------|------|
| Host | `www.qzjy.store` |
| Key | `4637e368e9bc47008f9ee8f6ae24ef3c` |
| Key Location | `https://www.qzjy.store/4637e368e9bc47008f9ee8f6ae24ef3c.txt` |
| Endpoint | `https://api.indexnow.org/indexnow` |

## 使用方法

### 1. 首次部署（已完成）

将 `4637e368e9bc47008f9ee8f6ae24ef3c.txt` 提交到 GitHub Pages 后，访问 `https://www.qzjy.store/4637e368e9bc47008f9ee8f6ae24ef3c.txt` 应当返回纯文本 `4637e368e9bc47008f9ee8f6ae24ef3c`。

### 2. 提交 URL

```bash
# 提交所有 sitemap 中的 URL
./tools/submit-indexnow.sh

# 提交特定 URL
./tools/submit-indexnow.sh https://www.qzjy.store/blog/ptfe-tape-for-hot-water.html
```

### 3. HTTP 状态码

| 状态 | 含义 |
|------|------|
| 200 | URL 已接受 |
| 202 | URL 已接收，等待抓取 |
| 400 | 请求格式错误 |
| 403 | key 文件不存在或不匹配 |
| 422 | URL 列表无效 |
| 429 | 请求过于频繁 |

## 工作流程

### 发布新内容后

1. 写完 HTML，commit + push 部署
2. 等 GitHub Pages 部署完成（~1 分钟）
3. 跑 `./tools/submit-indexnow.sh https://www.qzjy.store/path/to/new-page.html`
4. 24-72 小时内 Bing 抓取新页面

### 每月全量提交

每月底跑一次 `./tools/submit-indexnow.sh`（无参数），自动从 5 个 sitemap 读取所有 URL 并提交。

## 限制

- IndexNow 端点每次最多 10,000 URL
- 每天最多 10,000 次提交（单 key）
- 提交频率：建议新内容发布后立即提交，老内容每月一次

## 验证

提交后 5-10 分钟，到 [Bing Webmasters](https://www.bing.com/webmasters) → 索引检查 → URL 检查 输入 URL 看是否被收录。
