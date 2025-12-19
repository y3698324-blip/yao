# 部署指南 - INFP 48阶人格进化定位测评系统

本指南将帮助你完成项目在 GitHub、Vercel 和 Supabase 三个平台的部署。

---

## 📋 部署前准备

### 检查清单

- [ ] 确保所有代码文件已保存
- [ ] 确保 `env.js` 文件已添加到 `.gitignore`（不会提交敏感信息）
- [ ] 准备好 Supabase 账号（如果没有，需要先注册）
- [ ] 准备好 GitHub 账号（如果没有，需要先注册）
- [ ] 准备好 Vercel 账号（如果没有，需要先注册）

---

## 🗄️ 第一步：Supabase 数据库配置

### 1.1 创建 Supabase 项目

1. 访问 [Supabase 官网](https://supabase.com/)
2. 点击 **"Start your project"** 或 **"New Project"**
3. 填写项目信息：
   - **Name**: `infp-personality-test`（或你喜欢的名称）
   - **Database Password**: 设置一个强密码（**重要：请保存好这个密码**）
   - **Region**: 选择离你最近的区域（如 `Southeast Asia (Singapore)`）
4. 点击 **"Create new project"**
5. 等待项目创建完成（约 2-3 分钟）

### 1.2 获取 Supabase 配置信息

1. 项目创建完成后，点击左侧菜单的 **"Settings"**（设置）
2. 点击 **"API"** 选项
3. 找到以下信息并**复制保存**：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（很长的字符串）

### 1.3 创建数据库表

1. 在 Supabase 项目中，点击左侧菜单的 **"SQL Editor"**
2. 点击 **"New query"**
3. 复制以下 SQL 代码并粘贴到编辑器中：

```sql
-- 创建兑换码表
CREATE TABLE IF NOT EXISTS codes (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(4) UNIQUE NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_codes_code ON codes(code);
CREATE INDEX IF NOT EXISTS idx_codes_is_used ON codes(is_used);

-- 创建测评结果表（可选，用于存储测评结果）
CREATE TABLE IF NOT EXISTS test_results (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(4) NOT NULL,
  user_info JSONB,
  scores JSONB,
  result_type VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 设置 Row Level Security (RLS)
ALTER TABLE codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- 删除现有策略（如果存在）
DROP POLICY IF EXISTS "Allow anonymous read codes" ON codes;
DROP POLICY IF EXISTS "Allow anonymous update codes" ON codes;
DROP POLICY IF EXISTS "Allow anonymous insert codes" ON codes;
DROP POLICY IF EXISTS "Allow anonymous insert test_results" ON test_results;
DROP POLICY IF EXISTS "Allow anonymous read test_results" ON test_results;

-- 允许匿名用户读取 codes 表
CREATE POLICY "Allow anonymous read codes" ON codes
  FOR SELECT USING (true);

-- 允许匿名用户更新 codes 表（用于标记兑换码为已使用）
CREATE POLICY "Allow anonymous update codes" ON codes
  FOR UPDATE USING (true);

-- 允许匿名用户插入 codes 表（用于管理端生成兑换码）
CREATE POLICY "Allow anonymous insert codes" ON codes
  FOR INSERT WITH CHECK (true);

-- 允许匿名用户插入 test_results（用于存储测评结果）
CREATE POLICY "Allow anonymous insert test_results" ON test_results
  FOR INSERT WITH CHECK (true);

-- 允许匿名用户读取 test_results（可选，如果需要）
CREATE POLICY "Allow anonymous read test_results" ON test_results
  FOR SELECT USING (true);
```

4. 点击 **"Run"** 或按 `Ctrl+Enter` 执行 SQL
5. 确认执行成功（应该看到 "Success. No rows returned"）

### 1.4 验证表创建成功

1. 点击左侧菜单的 **"Table Editor"**
2. 应该能看到两个表：
   - `codes`（兑换码表）
   - `test_results`（测评结果表）

---

## 📦 第二步：GitHub 仓库创建和代码推送

### 2.1 初始化 Git 仓库（如果还没有）

在项目根目录打开终端（PowerShell 或 CMD），执行：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 提交代码
git commit -m "Initial commit: INFP 48阶人格测评系统"
```

### 2.2 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com/)
2. 点击右上角的 **"+"** → **"New repository"**
3. 填写仓库信息：
   - **Repository name**: `infp-personality-test`（或你喜欢的名称）
   - **Description**: `INFP 48阶人格进化定位测评系统`
   - **Visibility**: 选择 **Public**（公开）或 **Private**（私有）
   - **不要**勾选 "Initialize this repository with a README"（因为我们已经有了）
4. 点击 **"Create repository"**

### 2.3 推送代码到 GitHub

GitHub 会显示推送代码的指令，在项目目录的终端中执行：

```bash
# 添加远程仓库（将 YOUR_USERNAME 替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/infp-personality-test.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

**注意**：如果提示需要登录，按照提示操作即可。

### 2.4 验证代码已推送

刷新 GitHub 仓库页面，应该能看到所有项目文件。

---

## 🚀 第三步：Vercel 部署

### 3.1 连接 GitHub 仓库到 Vercel

1. 访问 [Vercel](https://vercel.com/)
2. 点击 **"Sign Up"** 或 **"Login"**
3. 选择 **"Continue with GitHub"**（使用 GitHub 账号登录）
4. 授权 Vercel 访问你的 GitHub 仓库

### 3.2 导入项目

1. 登录后，点击 **"Add New..."** → **"Project"**
2. 在项目列表中找到你的 `infp-personality-test` 仓库
3. 点击 **"Import"**

### 3.3 配置项目设置

1. **Project Name**: 保持默认或修改为你喜欢的名称
2. **Framework Preset**: 选择 **"Other"** 或 **"Vite"**
3. **Root Directory**: 保持默认 `./`
4. **Build Command**: `npm run vercel-build`（应该已经自动填充）
5. **Output Directory**: 保持默认或留空
6. **Install Command**: `npm install`（如果需要）

### 3.4 配置环境变量

在 **"Environment Variables"** 部分，添加以下环境变量：

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | 你的 Supabase Project URL（从步骤 1.2 获取） |
| `VITE_SUPABASE_ANON_KEY` | 你的 Supabase anon public key（从步骤 1.2 获取） |

**添加方法**：
1. 点击 **"Environment Variables"** 展开
2. 在 **"Key"** 输入框输入 `VITE_SUPABASE_URL`
3. 在 **"Value"** 输入框粘贴你的 Supabase URL
4. 点击 **"Add"**
5. 重复上述步骤添加 `VITE_SUPABASE_ANON_KEY`

### 3.5 部署项目

1. 点击 **"Deploy"** 按钮
2. 等待部署完成（约 1-2 分钟）
3. 部署成功后，Vercel 会显示你的网站地址，例如：
   - `https://infp-personality-test.vercel.app`

### 3.6 验证部署

1. 点击 Vercel 提供的网站地址
2. 应该能看到测评系统的首页
3. 访问 `/admin` 路径测试管理端（例如：`https://your-site.vercel.app/admin`）

---

## ✅ 第四步：验证和测试

### 4.1 测试用户端功能

1. 访问你的网站首页
2. 输入一个兑换码（如果还没有，先到管理端生成）
3. 完成测评流程
4. 检查是否能正常生成报告

### 4.2 测试管理端功能

1. 访问 `/admin` 路径
2. 使用密码 `admin123` 登录
3. 生成一些兑换码
4. 检查兑换码列表是否显示
5. 切换到"数据统计"页面，检查统计数据是否显示

### 4.3 验证 Supabase 数据

1. 回到 Supabase 项目
2. 点击 **"Table Editor"** → **"codes"**
3. 应该能看到刚才生成的兑换码记录
4. 检查 `is_used` 字段是否正确更新

---

## 🔧 常见问题排查

### 问题 1：Vercel 部署失败

**可能原因**：
- 环境变量配置错误
- 构建脚本路径错误

**解决方法**：
1. 检查 Vercel 部署日志（点击部署记录查看详情）
2. 确认环境变量名称和值正确
3. 确认 `scripts/inject-env.js` 文件存在

### 问题 2：Supabase 连接失败

**可能原因**：
- Supabase URL 或 Key 配置错误
- RLS 策略配置错误

**解决方法**：
1. 检查浏览器控制台错误信息
2. 确认环境变量已正确配置
3. 检查 Supabase RLS 策略是否正确设置

### 问题 3：兑换码无法使用

**可能原因**：
- Supabase 表未创建
- RLS 策略限制

**解决方法**：
1. 检查 Supabase 表是否存在
2. 检查 RLS 策略是否允许匿名访问
3. 检查浏览器控制台错误信息

### 问题 4：数据统计不显示

**可能原因**：
- 测评结果未存储到 Supabase
- LocalStorage 数据未同步

**解决方法**：
1. 检查是否有测评结果数据
2. 检查浏览器 LocalStorage 中的数据
3. 确认数据统计函数正常工作

---

## 📝 后续维护

### 更新代码

1. 在本地修改代码
2. 提交到 Git：
   ```bash
   git add .
   git commit -m "更新说明"
   git push
   ```
3. Vercel 会自动检测到更新并重新部署

### 修改环境变量

1. 在 Vercel 项目设置中修改环境变量
2. 重新部署项目（Vercel 会自动触发）

### 备份数据

1. 定期导出 Supabase 数据
2. 在 Supabase 项目设置中可以导出数据库

---

## 🎉 完成！

恭喜！你的项目已经成功部署到三个平台：

- ✅ **GitHub**: 代码仓库
- ✅ **Vercel**: 网站托管
- ✅ **Supabase**: 数据库存储

现在你可以：
- 分享网站链接给用户使用
- 通过管理端管理兑换码和数据
- 查看数据统计和分析

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看浏览器控制台的错误信息
2. 查看 Vercel 部署日志
3. 查看 Supabase 日志
4. 参考项目 README.md 文件

祝部署顺利！🚀

