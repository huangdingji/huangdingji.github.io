# Internal Link Strategy — qzjy.store

> 内部链接策略文档。覆盖：当前内链矩阵、内链质量、改进建议、季度规划。
>
> 维护人：SEO 工作流 · 更新日期：2026-06-05

---

## 1. Site Structure (层级架构)

```
qzjy.store/
├── index.html                    ← 首页（首页级别，权重最高）
├── products/                     ← 产品大类
│   ├── index.html
│   ├── ptfe-thread-seal-tape     ← 核心产品 P1
│   ├── gas-ptfe-tape             ← 核心产品 P2
│   ├── high-density-ptfe-tape    ← 核心产品 P3
│   ├── oem-ptfe-tape             ← 核心产品 P4
│   └── plumbing-seal-tape        ← 核心产品 P5
├── blog/                         ← 博客（13 篇）
│   ├── index.html
│   ├── 5 旧博客（老版）
│   └── 8 新博客（段 1 新增）
├── guides/                       ← Pillar 内容（2 篇）
│   ├── ptfe-thread-seal-tape-guide    ← Pillar A
│   └── how-to-choose-ptfe-tape        ← Pillar B
├── markets/                      ← 国页（5 个）
│   ├── index.html
│   ├── saudi-arabia / uae / egypt / iraq / pakistan
├── about/                        ← 公司信息
├── contact/                      ← 联系
├── oem-odm.html                  ← 转化页
├── factory.html                  ← 工厂介绍
└── quality.html                  ← 质量体系
```

**Page Count**: 34 URL in sitemap

**Authority Layer**:
- **Layer 1** (顶级权威): index.html, products/, blog/, markets/, guides/
- **Layer 2** (核心转化): 5 产品页 + 2 Pillar + 5 国页 + oem-odm/factory/quality
- **Layer 3** (内容支持): 13 博客

---

## 2. Current Internal Link Matrix

### 2.1 Page-by-Page Coverage

| Page Type | Page | Outbound Internal Links | Inbound Internal Links | Notes |
|-----------|------|------------------------:|-----------------------:|-------|
| **首页** | index.html | 37 | (n/a, root) | 含 5 产品 + blog + markets + contact 等 |
| **Pillar** | ptfe-thread-seal-tape-guide (A) | 29 | high | Pillar B + 8 blog + 4 产品 + 5 国页 |
| **Pillar** | how-to-choose-ptfe-tape (B) | 36 | high | Pillar A + 9 blog + 5 产品 + markets |
| **产品** | ptfe-thread-seal-tape (P1) | 10 | medium | 2 guide + 8 blog (Related Reading 段) |
| **产品** | gas-ptfe-tape (P2) | 10 | medium | 同上 |
| **产品** | high-density-ptfe-tape (P3) | 10 | medium | 同上 |
| **产品** | oem-ptfe-tape (P4) | 10 | medium | 同上 |
| **产品** | plumbing-seal-tape (P5) | 10 | medium | 同上 |
| **国页** | saudi-arabia | 10 | medium | 2 guide + 8 blog |
| **国页** | uae / egypt / iraq / pakistan | 10 | medium | 同上 |
| **博客-老** | what-is-ptfe-thread-seal-tape | 10 | medium | 2 guide + 8 blog (扩写后从 5→10) |
| **博客-老** | how-to-use-ptfe-tape | 10 | medium | 同上 |
| **博客-老** | ptfe-tape-vs-pipe-dope | 10 | medium | 同上 |
| **博客-老** | ptfe-tape-thickness-guide | 10 | medium | 同上 |
| **博客-老** | best-ptfe-tape-for-gas-pipes | 10 | medium | 同上 |
| **博客-新** | 8 新博客 (段 1 新增) | 5 | low | 2 guide + 2 老 blog + 1 产品 |
| **转化页** | oem-odm / factory / quality | (in footer + nav) | medium | 通过导航接收权重 |

### 2.2 Hub Identification

**Top 3 Hubs** (链接接收最多):
1. **Pillar A (ptfe-thread-seal-tape-guide)** — 被 Pillar B + 5 产品 + 5 国页 + 13 博客引用
2. **Pillar B (how-to-choose-ptfe-tape)** — 被 Pillar A + 5 产品 + 5 国页 + 13 博客引用
3. **ptfe-thread-seal-tape 产品页** — 被 Pillar A/B + 5 国页 + 8 新博客 + 1 转化页引用

**Top 3 Authority Spreaders** (链接发出最多):
1. **首页** (37 links) — nav + footer + 5 产品卡
2. **Pillar B** (36 links) — 12 章节内链 + Related Reading
3. **Pillar A** (29 links) — 10 章节内链 + Related Reading

---

## 3. Content Cluster Architecture (集群架构)

### 3.1 Cluster Map

```
                ┌─ Pillar A: ptfe-thread-seal-tape-guide
                │     ├─→ 5 产品 (P1-P5) 【横向】
                │     ├─→ 5 国页 【横向】
                │     ├─→ 8 博客 (T1-T8) 【纵向支撑】
                │     └─→ Pillar B 【互链】
                │
                └─ Pillar B: how-to-choose-ptfe-tape
                      ├─→ 5 产品 【横向】
                      ├─→ 5 国页 【横向】
                      ├─→ 8 博客 (T1-T8) 【纵向支撑】
                      └─→ Pillar A 【互链】

Cluster 1 (基础认知):
  T1: is-ptfe-tape-the-same-as-teflon-tape
  T2: ptfe-tape-colors
  T3: ptfe-tape-shelf-life

Cluster 2 (技术规格):
  T4: ptfe-tape-specifications
  T5: ptfe-tape-thickness-guide (老)
  T6: ptfe-tape-temperature-range

Cluster 3 (应用场景):
  T7: ptfe-tape-for-hot-water
  T8: ptfe-tape-for-cold-water
  T9: ptfe-tape-vs-thread-sealant

Cluster 4 (操作与对比):
  T10: how-to-use-ptfe-tape (老)
  T11: ptfe-tape-vs-pipe-dope (老)
  T12: what-is-ptfe-thread-seal-tape (老)
  T13: best-ptfe-tape-for-gas-pipes (老)
```

### 3.2 Link Equity Flow

**理想流向** (Google 推荐):
```
Pillar A ⇄ Pillar B (强互链, 同等权威)
   ↓          ↓
 5 国页  ←→  5 国页 (SCC: same content cluster)
   ↓          ↓
 5 产品   ←→  5 产品 (横向相关, 强链接)
   ↓
 13 博客 (上链到 Pillar + 产品)
```

**实际状态**: ✓ 链路完整, Pillar 互链、产品横向链接、国页到 Pillar 链接均已建立。

---

## 4. Anchor Text Strategy (锚文本策略)

### 4.1 锚文本类型分布

| 锚文本类型 | 当前用法 | 比例目标 |
|-----------|---------|---------|
| **精确匹配** (Exact Match) | "PTFE thread seal tape", "gas PTFE tape" | 15-20% |
| **部分匹配** (Partial Match) | "PTFE specifications", "tape thickness guide" | 30-40% |
| **品牌** (Branded) | "FuJianTeflonTape", "qzjy.store" | 10-15% |
| **通用** (Generic) | "Read more", "Learn more", "Click here" | 15-20% |
| **裸链** (Naked URL) | (基本不用) | <5% |

### 4.2 锚文本规则

- **同一目标页**, 来自不同源页, 使用**多样化**锚文本
- **避免**: 100% 精确匹配锚文本指向同一 URL (Panda 风险)
- **优先**: 部分匹配 (Partial Match) + 品牌组合
- **例**: 指向 ptfe-thread-seal-tape 产品页的 5 种锚文本
  1. "PTFE thread seal tape" (EM)
  2. "standard plumber tape" (PM)
  3. "our 12mm PTFE tape" (PM + brand)
  4. "this PTFE tape product" (PM)
  5. "12mm × 10m PTFE roll" (PM, 含规格)

---

## 5. Improvement Roadmap (改进路线图)

### 5.1 已知 Gap (待补)

#### Gap 1: 8 新博客互链缺失 ⚠️
**问题**: 8 新博客的"Related Reading"段都用同一组 5 链接（2 guide + 2 老 blog + 1 产品）— **新博客之间不互链**。

**修复方案**: 每篇新博客 Related Reading 增加 2-3 个**新博客互链**:
- T1 (teflon same) → T2 (colors), T3 (shelf-life)
- T2 (colors) → T1 (teflon), T6 (temperature)
- T3 (shelf-life) → T6 (temperature), T4 (specifications)
- T4 (specifications) → T6 (temperature), T5 (thickness - 已有)
- T5 (thickness) → T4 (specifications), T6 (temperature)
- T6 (temperature) → T4, T7, T8 (hot/cold water)
- T7 (hot water) → T8 (cold water), T6 (temperature)
- T8 (cold water) → T7 (hot water), T6 (temperature)
- T9 (vs thread sealant) → T11 (vs pipe dope - 老 blog), T4 (specifications)

**目标**: 每新博客 Related Reading 段从 5 → 7-8 链接 (新增 2-3 个新博客互链)

#### Gap 2: Pillar A → Pillar B 弱 ⚠️
**问题**: Pillar A → Pillar B 只有 1 个内嵌链接（在 H2 "Procurement" 章节内 "order" 锚点）。Pillar A 的 Related Reading 段有 Pillar B 链接，但 Pillar A 整个文档中**Pillar B 链接总数仅 1-2 个**。

**修复方案**: 在 Pillar A 至少 3 个章节中加 Pillar B 内链:
- H2 "7. Procurement" — "order" 锚点 (已有) → 升级为"specification and ordering workflow" 锚点
- H2 "6. Common Mistakes" — 加 "for the full procurement workflow, see our [Pillar B]"
- H2 "5. Application Map" — 加 "for product selection by market, see [Pillar B]"

**目标**: Pillar A → Pillar B 链接从 1 → 3-4 个

#### Gap 3: 国页 → 产品页弱 ⚠️
**问题**: 5 国页 Related Reading 段有 10 链接（2 guide + 8 blog），**没有直接链到 5 产品页**。

**修复方案**: 每国页加 1-2 个产品页链接 (在 "Recommended Products" 段, 而非 Related Reading):
- Saudi Arabia / UAE → 强调 gas-ptfe-tape (中东燃气市场)
- Egypt / Iraq / Pakistan → 强调 ptfe-thread-seal-tape (通用市场)

**目标**: 每国页加 1 个 "Recommended Products" H2 段，3-5 个产品卡链接

#### Gap 4: 8 新博客 → 自己产品页弱 ⚠️
**问题**: 8 新博客 Related Reading 段都链到 `ptfe-thread-seal-tape` (P1)，**没有针对自己主题的产品页链接**:
- ptfe-tape-for-hot-water → 应链 high-density-ptfe-tape
- ptfe-tape-for-cold-water → 应链 ptfe-thread-seal-tape
- ptfe-tape-colors → 应链 gas-ptfe-tape (yellow), oem-ptfe-tape (colored)
- ptfe-tape-shelf-life → 应链 oem-ptfe-tape (OEM 关注保质期)
- ptfe-tape-vs-thread-sealant → 应链 ptfe-thread-seal-tape (核心)

**目标**: 每新博客 Related Reading 段加 1 个 "主题相关产品页" 链接

#### Gap 5: 5 老博客 Related Reading 链接无差异化 ⚠️
**问题**: 5 老博客 Related Reading 段都用同一组 10 链接（2 guide + 8 新 blog），**没有"上下文相关"的链接**（即根据博客主题选链接）。

**修复方案**: 按主题分配不同链接:
- what-is-ptfe-thread-seal-tape → colors, specifications, is-ptfe-tape-same-as-teflon
- how-to-use-ptfe-tape → specifications, thickness-guide, vs-pipe-dope
- ptfe-tape-vs-pipe-dope → vs-thread-sealant, how-to-use-ptfe-tape
- ptfe-tape-thickness-guide → specifications, temperature-range
- best-ptfe-tape-for-gas-pipes → gas-ptfe-tape 产品页, vs-thread-sealant

**目标**: 5 老博客 Related Reading 段从"统一 10 链接" → "主题相关 10 链接"（每篇不同 4-5 个）

---

### 5.2 Q3 2026 季度规划

#### Week 1-2: 补 Gap 1-2
- [ ] 8 新博客 Related Reading 段差异化 (Gap 1)
- [ ] Pillar A → Pillar B 链接强化 (Gap 2)

#### Week 3-4: 补 Gap 3-4
- [ ] 5 国页加 "Recommended Products" 段 (Gap 3)
- [ ] 8 新博客 → 主题产品页链接 (Gap 4)

#### Month 2: 补 Gap 5 + 整体质量检查
- [ ] 5 老博客 Related Reading 段差异化 (Gap 5)
- [ ] 全站 orphan page 检查 (用 Screaming Frog 扫描)
- [ ] 锚文本多样化审计 (避免 Panda)

#### Month 3: 高级优化
- [ ] 上下文链接 (Contextual Links): 在博客正文段落中加内链（不止 Related Reading 段）
- [ ] 产品页 → 博客链接（产品页"Application Scenarios"段加博客链接）
- [ ] 转化路径优化: 博客 → 产品 → Request Quote 路径加中间 CTA

---

## 6. Quick Reference: 何时加内链

### 6.1 必须加内链的位置

| 位置 | 类型 | 锚文本 |
|------|------|--------|
| 新博客第 1 段 (开头) | Pillar 链 | "PTFE thread seal tape" (Pillar A) |
| 新博客最后 1 段 (结尾) | 产品页链 | 主题相关产品 |
| 新博客"FAQ"段 | 博客互链 | 其他相关博客 |
| 5 产品页"Related Reading" | 2 Pillar + 8 博客 | (已建立) |
| 5 国页"Related Reading" | 2 Pillar + 8 博客 + (待加) 产品 | (Gap 3) |
| 转化页 (oem-odm/factory/quality) | 5 产品 | 产品卡 |

### 6.2 不应加内链的位置

- ❌ 同一段落内多次指向同一 URL (用户体验差)
- ❌ 锚文本是 "click here" / "read more" (无 SEO 价值)
- ❌ 页脚堆砌链接 (Panda 风险)
- ❌ 隐藏链接 (CSS display:none, 惩罚风险)

---

## 7. Monitoring Metrics (监控指标)

| 指标 | 当前 | 目标 (Q3 end) | 工具 |
|------|------|---------------|------|
| **平均 Page 内链数** | 10-15 | 12-18 | Screaming Frog |
| **Orphan Pages (无入链)** | 0 | 0 | Screaming Frog |
| **Pillar 内链数** | A=29, B=36 | A=33, B=40 | Screaming Frog |
| **博客内链数** | 5-10/篇 | 7-12/篇 | Screaming Frog |
| **锚文本多样性** | 部分重复 | 5+ 变体/页 | 自查 |
| **首页 → 产品页 链接** | 5 | 5+ (维持) | Manual |
| **产品页 → Pillar 链接** | 2 | 2+ (维持) | Manual |

---

## 8. Tools & Workflow (工具与流程)

### 8.1 定期检查
- **每周**: 1 个新内容/页面 → 内链合规检查
- **每月**: 全站 Screaming Frog crawl, 检查 orphan + 锚文本
- **每季度**: 内链矩阵 review, 更新本文档

### 8.2 工具
- **Screaming Frog SEO Spider**: 内链 + 锚文本审计
- **Google Search Console**: 内部链接报告 (Coverage > Internal Links)
- **Ahrefs / Semrush**: 内链可视化 + 权重流
- **本地 Python 脚本**: `/外贸素材库/_tools/audit_internal_links.py` (待写)

---

## 9. Change Log (变更记录)

| Date | Change | Author |
|------|--------|--------|
| 2026-06-05 | 段 2 完成后编写, 覆盖 34 URL sitemap, 5 Gap 已识别 | SEO 工作流 |
| 2026-06-04 | 段 1 完成: 8 新博客 + 5 国页扩写 + 5 老博客扩写 (1500-1700 字) | SEO 工作流 |
| 2026-05-30 | FAQ i18n 完成 (21 FAQ × 3 语 = 126 翻译条目) | SEO 工作流 |
| 2026-05-25 | 5 段 1 新页上线 (2 Pillar + 8 博客 + 5 国页) | SEO 工作流 |

---

**下一次 review**: 2026-07-05 (月度检查)
