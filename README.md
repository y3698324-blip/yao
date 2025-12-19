# INFP 48阶人格进化定位测评系统

一个基于 Web 的 INFP 人格测评系统，支持兑换码管理和数据统计。

## 功能特性

- ✅ 用户端测评功能（4个维度，40道题目）
- ✅ 管理端兑换码生成和管理
- ✅ 数据统计和可视化
- ✅ 支持 Supabase 数据库存储
- ✅ 支持本地存储（LocalStorage）作为备选方案

## 技术栈

- HTML5 + CSS3 + JavaScript
- Chart.js（数据可视化）
- Supabase（数据库）
- html2pdf.js（PDF导出）

## 部署说明

### 1. GitHub 部署

1. 将代码推送到 GitHub 仓库
2. 确保所有文件都已提交

### 2. Supabase 数据库配置

#### 2.1 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/)
2. 创建新项目
3. 获取项目 URL 和 Anon Key

#### 2.2 创建数据库表

在 Supabase SQL Editor 中执行以下 SQL：

```sql
-- 创建兑换码表
CREATE TABLE codes (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(4) UNIQUE NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX idx_codes_code ON codes(code);
CREATE INDEX idx_codes_is_used ON codes(is_used);

-- 创建测评结果表（可选）
CREATE TABLE test_results (
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

-- 允许匿名用户读取和更新 codes 表
CREATE POLICY "Allow anonymous read codes" ON codes
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous update codes" ON codes
  FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous insert codes" ON codes
  FOR INSERT WITH CHECK (true);

-- 允许匿名用户插入 test_results
CREATE POLICY "Allow anonymous insert test_results" ON test_results
  FOR INSERT WITH CHECK (true);
```

### 3. Vercel 部署

#### 3.1 通过 GitHub 部署

1. 访问 [Vercel](https://vercel.com/)
2. 导入 GitHub 仓库
3. 配置环境变量：
   - `VITE_SUPABASE_URL`: 你的 Supabase 项目 URL
   - `VITE_SUPABASE_ANON_KEY`: 你的 Supabase Anon Key
4. 设置构建命令（可选）：
   - Build Command: `npm run vercel-build`
   - 如果不设置，Vercel 会自动运行构建脚本
5. 部署

**注意**：项目已配置自动构建脚本，会在构建时将环境变量注入到 HTML 文件中。

#### 3.2 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

#### 3.3 更新 vercel.json（如果需要）

当前 `vercel.json` 已配置路由重写：
- `/` → `/test.html`
- `/admin` → `/admin.html`

### 4. 本地开发

#### 4.1 配置环境变量

1. 复制 `env.example.js` 为 `env.js`
2. 填入你的 Supabase 配置：

```javascript
window.SUPABASE_URL = 'https://your-project.supabase.co';
window.SUPABASE_ANON_KEY = 'your-anon-key-here';
```

3. 注意：`env.js` 已在 `.gitignore` 中，不会被提交

#### 4.2 运行项目

使用任何静态文件服务器运行项目，例如：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js http-server
npx http-server

# 使用 VS Code Live Server
# 安装 Live Server 扩展，右键点击 test.html 选择 "Open with Live Server"
```

访问：
- 用户端：http://localhost:8000/test.html
- 管理端：http://localhost:8000/admin.html

## 问题排查

### 兑换码无法使用

1. **检查数据库连接**：
   - 确认 Supabase URL 和 Key 配置正确
   - 检查浏览器控制台是否有错误

2. **检查兑换码格式**：
   - 兑换码必须是4位大写字母或数字
   - 确认兑换码已生成并存在于数据库中

3. **检查本地存储**：
   - 如果未配置 Supabase，系统会使用 LocalStorage
   - 确认管理端和用户端使用相同的存储方式

### 数据库连接问题

1. **检查环境变量**：
   - Vercel：在项目设置中检查环境变量
   - 本地：检查 `env.js` 文件是否存在且配置正确

2. **检查 RLS 策略**：
   - 确认 Supabase RLS 策略允许匿名访问

3. **检查网络**：
   - 确认浏览器可以访问 Supabase API

## 文件结构

```
.
├── test.html              # 用户端测评页面
├── admin.html             # 管理端后台页面
├── questions.js           # 题目数据
├── utils.js              # 工具函数
├── styles.css            # 样式文件
├── vercel.json           # Vercel 配置
├── env.example.js        # 环境变量示例
├── .gitignore            # Git 忽略文件
└── README.md             # 项目说明
```

## 注意事项

1. **安全性**：
   - 管理端密码默认是 `admin123`，建议修改
   - Supabase Anon Key 是公开的，但已配置 RLS 策略保护数据

2. **数据存储**：
   - 如果未配置 Supabase，数据会存储在浏览器的 LocalStorage 中
   - LocalStorage 数据不会跨设备同步

3. **兑换码**：
   - 兑换码长度为4位
   - 格式：大写字母和数字组合
   - 每个兑换码只能使用一次

## 许可证

本项目仅供学习和研究使用。

