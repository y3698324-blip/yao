-- Supabase 数据库初始化脚本
-- 在 Supabase SQL Editor 中执行此脚本

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

