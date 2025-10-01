# 个人网站

一个简洁的静态个人网站，包含首页、关于、项目、联系四个页面，并支持深浅色主题切换。

## 预览

直接用浏览器打开 `index.html` 即可。

- 首页：`index.html`
- 关于：`about.html`
- 项目：`projects.html`
- 联系：`contact.html`

如使用本地 HTTP 服务器，请在站点根目录启动，这样以 `/` 开头的资源（如 `/styles.css`、`/script.js`）可正常加载。

### 用 Python 启动本地服务器（任选其一）

```bash
# Python 3
python3 -m http.server 8080
# 然后访问 http://localhost:8080/
```

```bash
# Python 2
python -m SimpleHTTPServer 8080
# 然后访问 http://localhost:8080/
```

## 自定义

- 修改文案：编辑对应 HTML 文件内容。
- 调整样式：编辑 `styles.css` 中的 CSS 变量与样式。
- 默认主题：在 `script.js` 调整首选主题逻辑，或在 HTML 的 `<html>` 标签设置 `data-theme="dark"`/`light`。

## 部署

这是纯静态网站，可托管到 GitHub Pages、Vercel、Netlify 或任意静态托管服务。
