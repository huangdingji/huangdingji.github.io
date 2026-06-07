# GitHub Actions 自动化

## 工作流

| 文件 | 作用 |
|------|------|
| `.github/workflows/indexnow.yml` | commit push 后自动提交到 IndexNow |

## 触发条件

- `push` 到 `main` 分支
- 当且仅当以下文件变更时：
  - `*.html` (所有 HTML 页面)
  - `sitemap*.xml` (所有 sitemap)
  - `tools/indexnow-config.json`
  - `.github/workflows/indexnow.yml`
- 也可以手动触发：从 GitHub repo → Actions → "IndexNow Auto-Submit" → "Run workflow"

## 一次性配置（必须做）

### 1. 添加 GitHub Secret

1. 进入 GitHub repo: https://github.com/huangdingji/huangdingji.github.io
2. **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
3. 填：
   - **Name**: `INDEXNOW_KEY`
   - **Secret**: `4637e368e9bc47008f9ee8f6ae24ef3c`
4. 点 **Add secret**

### 2. push 触发

```bash
git add <changed files>
git commit -m "新增/修改内容"
git push origin main
```

GitHub Actions 自动跑 → 提交 URL 到 IndexNow。

### 3. 查看运行结果

- GitHub repo → **Actions** 标签
- 点最近一次 "IndexNow Auto-Submit" run
- 看日志：应该看到 "200 OK (URLs accepted)"

## 安全设计

- **API key 不在 git 仓库** — `indexnow-config.json` 的 `key` 字段为空
- **Key 通过 Secret 注入** — GitHub Actions 把 `${{ secrets.INDEXNOW_KEY }}` 作为环境变量传给脚本
- **本地开发兼容** — `export INDEXNOW_KEY=...` 后跑 `python3 tools/submit-indexnow.py`

## 限制

- GitHub 免费版每月 2,000 分钟（这个 workflow 每次跑 1-2 秒, 等于无限）
- IndexNow 每天 10,000 次提交限制
- Workflow 5 分钟超时
- **Node.js 24 强制启用** (env: `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: "true"`) — GitHub 从 2026-06-16 起默认 Node.js 24, 2026-09-16 移除 Node.js 20

## 故障排查

### Workflow 没跑？

1. 检查文件路径是否在 `paths:` 过滤内
2. 查看 Actions 标签的错误日志

### 提交 403 Forbidden？

- 确认 `secrets.INDEXNOW_KEY` 跟 `https://www.qzjy.store/{key}.txt` 内容一致
- 确认 key 文件已部署

### 想手动触发？

- GitHub repo → Actions → "IndexNow Auto-Submit" → Run workflow
