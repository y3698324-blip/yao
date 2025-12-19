# 快速部署指南

## 🚀 5分钟快速部署

### 步骤 1：Supabase 设置（3分钟）

1. **创建项目**
   - 访问 https://supabase.com/
   - 创建新项目
   - 等待项目创建完成

2. **获取配置信息**
   - Settings → API
   - 复制 **Project URL** 和 **anon public key**

3. **创建数据库表**
   - SQL Editor → New query
   - 复制 `supabase-setup.sql` 文件内容
   - 执行 SQL

### 步骤 2：GitHub 推送（1分钟）

```bash
# 如果还没有初始化 Git
git init
git add .
git commit -m "Initial commit"

# 创建 GitHub 仓库后执行
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 步骤 3：Vercel 部署（1分钟）

1. 访问 https://vercel.com/
2. Import GitHub 仓库
3. 添加环境变量：
   - `VITE_SUPABASE_URL` = 你的 Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = 你的 Supabase Key
4. Deploy

### ✅ 完成！

访问 Vercel 提供的网址即可使用。

---

**详细步骤请查看 `DEPLOYMENT.md` 文件**

