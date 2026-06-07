# qzjy.store SEO 修改方案

> 目标：把现有 SEO 规划从“内容铺量型”调整为“高质量收录 + 商业转化 + 可维护增长”。
> 适用站点：https://www.qzjy.store/

---

## 一、总体调整方向

当前 SEO_PLAN 的方向基本正确，但内容量和 KPI 偏激进，文档也混入了大量执行日志。后续建议按以下原则调整：

1. 先保证页面稳定收录，再扩内容。
2. 先优化高转化页面，再写大量博客。
3. 先做高商业意图关键词，再做泛知识长尾词。
4. 国家认证类内容必须谨慎，避免过度承诺。
5. 多语言当前先保证用户可读，后续再升级独立语言目录。

---

## 二、文档结构调整

把现有 `SEO_PLAN.md` 拆成 3 份，减少混乱：

| 文件 | 用途 |
|---|---|
| `SEO_PLAN.md` | 只保留 SEO 战略、关键词、内容优先级、KPI |
| `SEO_CHANGELOG.md` | 记录每次改了什么、修了什么 bug |
| `SEO_QA_CHECKLIST.md` | 发布前检查清单：404、样式、sitemap、canonical、meta、语言切换 |

### 修改建议

- `SEO_PLAN.md` 删除大段修复日志，只保留规划。
- 已完成事项不要反复堆在前面，可放到 changelog。
- 每月只更新一次 KPI，不要每次小修改都塞进主计划。

---

## 三、KPI 调整

原 KPI 偏乐观，建议改成更现实的 6 个月目标：

| 指标 | 1 个月 | 3 个月 | 6 个月 |
|---|---:|---:|---:|
| Google/Bing 收录页数 | 20-35 | 35-55 | 60-90 |
| GSC 展示次数/月 | 100-500 | 1,000-3,000 | 5,000-15,000 |
| 自然点击/月 | 10-50 | 80-300 | 300-1,000 |
| 有展示关键词数 | 30-80 | 100-250 | 300-600 |
| 进入前 30 的关键词 | 3-10 | 10-30 | 30-80 |
| 月询盘数 | 1-5 | 3-10 | 8-25 |

> 不建议把“月询盘 50-80”作为 6 个月硬目标。新域名需要时间积累信任和权重。

---

## 四、页面优先级重排

### P0：先优化 5 个转化核心页

这 5 页是外贸询盘站的基础，优先级高于继续大量写博客：

1. 首页 `/`
2. 产品中心 `/products/`
3. OEM/ODM `/oem-odm.html`
4. 工厂实力 `/factory.html`
5. 联系页 `/contact/`

### 每页必须检查

- H1 是否唯一。
- 首屏是否清楚说明：工厂、产品、OEM、批发、出口。
- 是否有明显 CTA：Get Quote / WhatsApp / Send Inquiry。
- 是否告诉客户提交：规格、数量、包装方式、目的国/港口。
- 图片是否真实可信，避免明显 AI 图、中文水印、中文包装无法解释。
- 移动端是否正常。

---

## 五、关键词策略调整

### 继续主攻

高商业价值，适合当前站点：

- PTFE tape manufacturer
- PTFE tape supplier
- PTFE tape wholesale
- PTFE tape factory China
- PTFE thread seal tape manufacturer
- OEM PTFE tape
- private label PTFE tape
- custom PTFE tape packaging
- high density PTFE tape
- yellow PTFE tape for gas

### 暂缓主攻

这些词搜索量大，但竞争强、转化不一定高：

- Teflon tape
- plumber tape
- what is PTFE tape
- how to use PTFE tape

这些可以用博客覆盖，但不要作为首页/产品页主目标。

---

## 六、内容生产节奏调整

原计划 6 个月新增 47 篇偏多。建议先做 20 篇高质量内容。

### 第一批：高商业价值 8 篇

| 优先级 | 文章主题 | 目标 |
|---|---|---|
| P0 | How to Buy PTFE Tape from China | 承接采购商 |
| P0 | OEM PTFE Tape Packaging Guide | 承接 OEM/ODM |
| P0 | PTFE Tape Specifications Guide | 承接规格询盘 |
| P0 | PTFE Tape Quality Control Checklist | 建立工厂信任 |
| P0 | High Density PTFE Tape Buyer Guide | 承接高密度产品 |
| P0 | Yellow Gas PTFE Tape Guide | 承接燃气产品 |
| P1 | PTFE Tape MOQ, Sample and Lead Time | 承接交易问题 |
| P1 | PTFE Tape Carton Packing and Export Guide | 承接出口包装 |

### 第二批：国家市场 6 篇

已有国家页可以继续优化，但新增博客建议只做重点市场：

- India
- Saudi Arabia
- UAE
- Pakistan
- Egypt
- Iraq

每篇重点写：

- 当地水暖/五金/建材渠道
- 常见规格
- 包装偏好
- 进口注意事项
- WhatsApp 询盘格式

### 第三批：问题长尾 6 篇

只选和采购/产品选择有关的问题：

- Yellow vs White PTFE Tape
- PTFE Tape Thickness Guide
- PTFE Tape Density Explained
- PTFE Tape for Hot Water
- PTFE Tape for Gas Line
- PTFE Tape Shelf Life and Storage

---

## 七、国家认证内容规则

BIS / SABER / ESMA / GOEIC 这类内容可以做，但必须加风险提示。

### 固定免责声明建议

```text
Import regulations and certification requirements may change. Buyers should confirm the latest requirements with a local customs broker, certification agency, or importer of record before shipment.
```

### 不要写

- “一定不需要认证”
- “我们保证清关”
- “一定符合当地法规”
- “可直接用于燃气/饮用水”但没有证书支持

### 可以写

- “For general wholesale use, buyers commonly confirm...”
- “For gas or potable water applications, additional certification may be required.”
- “Please confirm with your local customs broker before shipment.”

---

## 八、多语言策略调整

当前方案：单 URL + JS 动态翻译。

### 短期

继续使用现有 JS 翻译，目标是：

- 用户切换语言能看懂主要内容。
- 产品页、联系页、核心 CTA 翻译完整。
- 博客可以优先翻译标题、首屏、CTA、FAQ。

### 长期

如果要做多语言 SEO，应升级为独立 URL：

```text
/en/
/zh/
/es/
/ar/
```

并配置真正的 `hreflang`：

```html
<link rel="alternate" hreflang="en" href="https://www.qzjy.store/en/..." />
<link rel="alternate" hreflang="zh-CN" href="https://www.qzjy.store/zh/..." />
<link rel="alternate" hreflang="es" href="https://www.qzjy.store/es/..." />
<link rel="alternate" hreflang="ar" href="https://www.qzjy.store/ar/..." />
```

这个不是当前 P0，等英文站收录和询盘稳定后再做。

---

## 九、外链策略调整

### 先做

- Made-in-China
- Alibaba International
- GlobalSources
- Kompass
- EC21
- ExportHub
- TradeIndia
- IndiaMart

### 谨慎做

- Reddit
- Quora
- Pinterest

这些平台不要硬塞链接，更适合做回答和品牌露出。

### 不做

- 买外链
- 批量垃圾目录
- 私人博客网络 PBN
- 隐藏链接
- 自动生成低质评论

---

## 十、发布前 QA 清单

每次新增页面或博客，必须检查：

- 页面是否能打开，状态码 200。
- 页面是否有唯一 H1。
- title 是否 45-65 字符。
- meta description 是否 120-160 字符。
- canonical 是否指向正确 URL。
- sitemap 是否包含该 URL。
- robots.txt 没有屏蔽。
- 图片 alt 是否为英文。
- 图片是否没有中文水印、明显 AI 感或错误文字。
- CTA 是否能点击。
- WhatsApp 链接是否能打开。
- 联系页是否可提交。
- 移动端是否不乱版。
- 语言切换是否正常。

---

## 十一、未来 30 天执行顺序

### 第 1 周：修基础

1. 检查全站 404。
2. 检查所有页面 H1/title/meta/canonical。
3. 检查 sitemap 和 robots。
4. 检查移动端和语言切换。
5. 修复明显旧模板页面。

### 第 2 周：优化转化页

1. 首页文案再聚焦工厂、OEM、出口、批发。
2. Products 页突出规格、包装、MOQ、询盘按钮。
3. OEM/ODM 页补包装能力、标签、纸箱、条码、SKU。
4. Factory 页换真实工厂图，减少 AI 感。
5. Contact 页强化询盘格式。

### 第 3 周：写 3 篇高商业博客

1. How to Buy PTFE Tape from China
2. OEM PTFE Tape Packaging Guide
3. PTFE Tape Quality Control Checklist

### 第 4 周：提交和观察

1. 更新 sitemap。
2. 提交 Google Search Console。
3. 提交 Bing Webmaster Tools。
4. 用 IndexNow 推送新增/修改 URL。
5. 记录 GSC/Bing 收录状态。

---

## 十二、最终判断

原 SEO 规划方向正确，但需要从“多写内容”调整为：

```text
先稳页面质量
再稳收录
再稳核心转化页
最后扩内容矩阵
```

对当前新站来说，最重要的不是一下子写 50 篇，而是让 Google 和 Bing 认为这个站：

1. 页面稳定。
2. 内容真实。
3. 主题集中。
4. 产品明确。
5. 联系方式可信。
6. 对采购商有实际帮助。

