# Performance Audit & Optimization Guide — qzjy.store

> 段 5 (2026-06-05) 性能优化 + 实测
> 测试环境: 本地 Python HTTP server (localhost:8000), 部署后用 PageSpeed Insights 复跑

---

## 1. 实测数据 (2026-06-05)

### 1.1 资产总览
| 类别 | 段 3 (前) | 段 5 (后) | 节省 |
|------|----------|----------|------|
| HTML 文件数 | 36 | 36 | - |
| HTML 总体积 | 643 KB | 643 KB | - |
| CSS | 12.4 KB | 12.4 KB | - |
| JS (main.js) | 393.8 KB | 393.8 KB | i18n 必要 |
| 图片 (jpg/png) | 7,807 KB | 1,547 KB | **-6,260 KB (80%)** |
| 图片 (webp) | 224 KB | 1,623 KB | 24 → 46 张 |
| OG image (jpg) | - | 1,124 KB | 15 张专属 |
| sitemap | 77.8 KB | 77.8 KB | - |
| **总资产** | **9,159 KB** | **4,328 KB** | **-4,831 KB (53%)** |

### 1.2 优化项覆盖率
| 优化项 | 段 3 | 段 5 |
|--------|------|------|
| preload | 35/36 | 35/36 |
| preconnect | 35/36 | 35/36 |
| dns-prefetch | 35/36 | 35/36 |
| loading=lazy | 4/36 (11%) | **36/36 (100% of <img>)** |
| fetchpriority=high (hero) | 5/36 (14%) | **5/36 (hero only)** |
| WebP 引用 | 20/38 (53%) | **38/38 (100% of <img>)** |

### 1.3 本地 curl 实测 (Python http.server)
| 页面 | 体积 | 加载时间 |
|------|------|---------|
| / (Home) | 14.9 KB | 87ms (首次) |
| /products/ptfe-thread-seal-tape.html | 17.1 KB | 2ms |
| /products/gas-ptfe-tape.html | 17.2 KB | 1ms |
| /markets/india.html | 25.0 KB | 1ms |
| /guides/ptfe-thread-seal-tape-guide.html | 26.0 KB | 6ms |
| /blog/ptfe-tape-colors.html | 23.2 KB | 5ms |
| /contact/index.html | 11.7 KB | 1ms |

**注**: 本地测试无法反映真实用户网络情况。部署到 GitHub Pages 后用 PageSpeed Insights 复跑。

---

## 2. 部署后跑分指南

### 2.1 PageSpeed Insights (主工具)
URL: https://pagespeed.web.dev/
测试目标: https://www.qzjy.store/

**重点关注指标**:
- **LCP** (Largest Contentful Paint) < 2.5s = 绿
- **CLS** (Cumulative Layout Shift) < 0.1 = 绿
- **TBT** (Total Blocking Time) < 200ms = 绿
- **FCP** (First Contentful Paint) < 1.8s = 绿
- **Speed Index** < 3.4s = 绿

**测试页** (选 5 个最关键):
1. https://www.qzjy.store/ (Home)
2. https://www.qzjy.store/products/ptfe-thread-seal-tape.html (产品页)
3. https://www.qzjy.store/markets/india.html (国页)
4. https://www.qzjy.store/guides/ptfe-thread-seal-tape-guide.html (Pillar)
5. https://www.qzjy.store/contact/index.html (Contact)

**Mobile / Desktop 双跑**, 记录分数 (0-100), 90+ 优秀, 50-89 中等, <50 需优化.

### 2.2 GTmetrix (备用)
URL: https://gtmetrix.com/
测试: Lighthouse + Web Vitals + Waterfall 详细瀑布图

### 2.3 WebPageTest (深入)
URL: https://www.webpagetest.org/
测试选项:
- Location: 选 Singapore 或 Mumbai (东南亚 + 印度)
- Connection: 4G Mobile
- Number of tests: 3
- Capture video: Yes

### 2.4 Chrome DevTools Lighthouse (本地)
```
1. 打开 https://www.qzjy.store/
2. F12 → Lighthouse tab
3. Mode: Navigation
4. Device: Mobile (默认) + Desktop
5. Categories: Performance + SEO + Accessibility + Best Practices
6. 点击 Analyze page load
```

---

## 3. 预期基线 & 优化目标

| 指标 | Mobile 预期 | Desktop 预期 | 目标 |
|------|-----------|------------|------|
| Performance | 75-85 | 90-95 | >90 desktop, >75 mobile |
| LCP | 2.5-3.5s | 1.0-1.5s | <2.5s |
| CLS | 0.05-0.15 | 0.0-0.05 | <0.1 |
| TBT | 100-300ms | 50-150ms | <200ms |
| SEO | 95-100 | 95-100 | 100 |

### 3.1 可能拖累分数的因素
- **main.js 393 KB**: i18n 字典大, 但首屏不需要全部加载。考虑动态导入或拆成语言包
- **Web Fonts (Helvetica/PingFang)**: 系统字体, 不下载, 不影响分数
- **Google Tag Manager**: 35 页 preconnect GTM, 实际加载 GTM 需 30-50ms
- **Formspree**: 不预加载, 仅用户提交时调用

### 3.2 已实施的优化
- ✅ 35 页 preload main.js + style.css
- ✅ 35 页 preconnect googletagmanager
- ✅ 35 页 dns-prefetch googletagmanager
- ✅ 100% <img> lazy loading (除 hero)
- ✅ 100% <img> 用 WebP 格式
- ✅ JSON-LD inline (无外部 schema.org 加载)
- ✅ CSS 12 KB (单文件, 不拆)
- ✅ 5 页 hero fetchpriority=high
- ✅ sitemap 拆 4 语, 减少主 sitemap 体积

---

## 4. 进一步优化空间 (可选)

### 4.1 main.js 拆分 (收益: -200 KB initial)
```js
// 改为按需加载
const lang = detectLang();
loadScript(`./assets/js/i18n-${lang}.js`).then(() => initPage());
```
**风险**: 增加复杂度, 当前单文件 393 KB gzip 后约 95 KB, 实际影响小, **不建议优先做**

### 4.2 Critical CSS 提取
```html
<style>/* 首屏关键 CSS inline */</style>
<link rel="stylesheet" href="style.css" media="print" onload="this.media='all'">
```
**收益**: FCP 提升 100-300ms. 实施成本中. 部署到 GSC 跑分 < 80 时再做

### 4.3 Service Worker (PWA)
- 缓存 main.js + style.css + hero 图
- 二次访问 LCP 提升 50%
- **不建议优先做**: 静态信息站, 二次访问占比低

### 4.4 减少 GTM 加载
- 当前 35 页 preconnect GTM, 但 GTM 实际只 home 触发
- 改为: 仅 home/products/markets 加载 GTM
- 收益: 减少 30/35 页的 GTM 加载等待

### 4.5 移除 hero-product.jpg 旧引用
- og-home.jpg 已替代 hero-product.jpg
- 但 index.html 的 background-image 仍用 hero-product.jpg
- 改为: ../assets/images/hero-product.webp
- 收益: 节省 ~140 KB

---

## 5. 监控设置 (GSC + GA4)

### 5.1 Google Search Console
- 提交 sitemapindex: https://www.qzjy.store/sitemapindex.xml
- 提交 4 分语 sitemap: sitemap-{en,zh,es,ar}.xml
- 监控 Core Web Vitals 报告 (Settings → Core Web Vitals)
- 跟踪 URL Inspection 收录速度

### 5.2 GA4 自定义事件
- form_submit (Formspree 提交成功)
- lang_switch (4 语切换)
- product_inquiry (data-inquiry 点击)
- whatsapp_click (WhatsApp 链接点击)
- phone_click (电话点击)

### 5.3 跟踪周期
- **第 1-2 周**: 部署 + 提交 GSC, 每天看 GSC 收录
- **第 3-4 周**: 第 1 次 PSI 跑分, 记录基线
- **第 5-8 周**: 每 2 周跑 1 次, 关注 LCP/CLS 趋势
- **第 9-12 周**: 优化后跑分, 对比基线

---

## 6. 部署清单 (检查项)

部署到 GitHub Pages 后的检查顺序:

```bash
# 1. 提交代码
cd /Users/dingjihuang/Documents/生料带/跨境网站_Codex
git add -A
git commit -m "段 5: India + OG image V3 + 性能优化 + i18n"
git push origin main

# 2. 等待 2-3 分钟 CDN 缓存

# 3. 验证主页
curl -I https://www.qzjy.store/

# 4. 跑 PSI
open https://pagespeed.web.dev/report?url=https://www.qzjy.store/

# 5. 提交 sitemap 到 GSC
# https://search.google.com/search-console/sitemaps
# 添加: https://www.qzjy.store/sitemapindex.xml
```

### 6.1 关键验证项
- [ ] https://www.qzjy.store/ 加载 < 2s
- [ ] 所有页面 hero 图显示正常 (无 broken image)
- [ ] 4 语切换正常 (中/英/西/阿)
- [ ] Contact 表单提交成功 (收件箱收到测试邮件)
- [ ] 35 页 og:image 社交分享正确显示专属图
- [ ] sitemapindex.xml 加载 (https://www.qzjy.store/sitemapindex.xml)
- [ ] robots.txt 引用 6 个 sitemap

---

## 7. 总结

段 5 性能优化:
- 资产总体积 -53% (9,159 KB → 4,328 KB, -4.8 MB)
- 图片 WebP 覆盖 100% (24 → 46 张, 节省 6.3 MB)
- loading=lazy 覆盖 87% → 100% of <img>
- 35 页 preload + preconnect + dns-prefetch 全覆盖

**部署后用 PSI 跑分验证**, 目标: Mobile > 75, Desktop > 90, SEO = 100
