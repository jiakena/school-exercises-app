# school-exercises-app 部署指南

## 🚀 Cloudflare Pages 一键部署

### 前置条件
- ✅ GitHub 账户（用于存储代码）
- ✅ Cloudflare 账户（用于部署）

### 部署步骤

#### 第1步：初始化 Git 仓库
```bash
cd C:\Users\Administrator\.qclaw\workspace\school-exercises-app
git init
git add .
git commit -m "Initial commit: school-exercises-app"
```

#### 第2步：推送到 GitHub
```bash
# 在 GitHub 上创建新仓库 school-exercises-app
# 然后执行：
git remote add origin https://github.com/YOUR_USERNAME/school-exercises-app.git
git branch -M main
git push -u origin main
```

#### 第3步：连接 Cloudflare Pages
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧菜单 → **Pages**
3. 点击 **Create a project** → **Connect to Git**
4. 授权 GitHub 账户
5. 选择 `school-exercises-app` 仓库
6. 配置构建设置：
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7. 点击 **Save and Deploy**

#### 第4步：配置环境变量（可选）
如果需要在 Cloudflare 中存储 API Key：
1. 进入项目设置 → **Environment variables**
2. 添加：
   - `KIMI_API_KEY`: `sk-E8rRJlY8IAJ4tk0OXDQtRfTIR21Uy5RYmGaOOIyxz1tt9kSB`
   - `KIMI_API_URL`: `https://api.moonshot.cn/v1`

---

## 📊 部署完成后

| 项目 | 值 |
|------|-----|
| 部署地址 | `https://school-exercises-app.pages.dev` |
| 自动更新 | 每次 push 到 main 分支自动部署 |
| SSL 证书 | 自动配置 |
| CDN | 全球加速 |

---

## 🔧 本地测试

部署前可以本地测试：
```bash
npm run dev
# 访问 http://localhost:5173
```

---

## 📝 常见问题

**Q: 部署失败怎么办？**
A: 检查 GitHub Actions 日志，通常是依赖安装失败或构建命令错误。

**Q: 如何更新已部署的项目？**
A: 只需 push 代码到 GitHub main 分支，Cloudflare 会自动重新部署。

**Q: 可以使用自定义域名吗？**
A: 可以，在 Cloudflare Pages 项目设置中配置自定义域名。

---

## 🎯 快速命令

```bash
# 初始化 Git
git init && git add . && git commit -m "Initial commit"

# 推送到 GitHub
git remote add origin https://github.com/YOUR_USERNAME/school-exercises-app.git
git push -u origin main

# 本地测试
npm run dev

# 生产构建
npm run build
```
