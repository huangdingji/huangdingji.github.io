# 跨境外贸官网使用说明

这是为 GitHub Pages 准备的纯静态英文外贸展示网站，适合 PTFE Thread Seal Tape / Teflon Tape / Plumber Tape 源头工厂展示产品、OEM/ODM 能力、工厂实力、质量控制和联系方式。

## 目录结构

- `index.html`：首页
- `products.html`：产品页面
- `oem-odm.html`：OEM/ODM 定制页面
- `factory.html`：工厂实力页面
- `quality.html`：质量控制页面
- `contact.html`：联系与询盘页面
- `assets/css/style.css`：网站样式
- `assets/js/main.js`：移动端菜单、询盘按钮和邮件表单逻辑
- `assets/images/`：网站图片素材
- `.nojekyll`：GitHub Pages 静态站点兼容文件

## 上线前需要修改

1. 打开 `assets/js/main.js`，把下面两项改成真实联系方式：
   - `CONTACT_EMAIL`
   - `WHATSAPP_NUMBER`
2. 打开各个 HTML 页面的页脚，把占位信息替换成真实信息：
   - `sales@example.com`
   - `+86 000 0000 0000`
   - 公司地址
3. 如果后续有更好的工厂、包装、质检图片，可以直接替换 `assets/images/` 里的同名文件。

## 图片使用说明

本版已避开你特别说明不要使用的蓝色塑料筐散装生料带图片。当前网站图片优先选择无明显水印、无中文主视觉、适合外贸展示的产品和工厂类素材。

如果后续替换图片，建议遵守：

- 首页首图：用清晰产品或应用场景图，不要有中文水印。
- 产品图：尽量用英文标识或无文字图片。
- 工厂图：尽量体现生产、包装、仓储、质检，不要过度营销。
- 图片文件名保持英文，例如 `product-standard.jpg`、`factory-workshop.jpg`。

## GitHub Pages 上传方法

1. 新建一个 GitHub 仓库，例如 `ptfe-tape-website`。
2. 把本目录 `跨境网站_Codex` 里面的所有文件上传到仓库根目录。
3. 进入 GitHub 仓库的 `Settings`。
4. 找到 `Pages`。
5. Source 选择 `Deploy from a branch`。
6. Branch 选择 `main`，目录选择 `/root`。
7. 保存后等待 1-3 分钟，GitHub 会生成网站地址。

## 本地预览方法

直接双击打开 `index.html` 即可预览。如果想用本地服务预览，也可以在本目录运行：

```bash
python3 -m http.server 8000
```

然后浏览器打开：

```text
http://localhost:8000
```

## 询盘表单说明

当前询盘表单使用 `mailto:` 方式，不需要服务器后台。客户提交后会打开他的邮件客户端，并自动填入询盘内容。

如果后续想接入第三方表单服务，可以把 `contact.html` 的表单提交地址改成 Formspree、Basin、Getform 等服务提供的接口。

