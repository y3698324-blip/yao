// Vercel 构建脚本：将环境变量注入到 HTML 文件中
const fs = require('fs');
const path = require('path');

// 从环境变量获取 Supabase 配置
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

// 生成环境变量脚本内容
const envScript = `
<script>
// 自动注入的环境变量（由 Vercel 构建时生成）
window.SUPABASE_URL = '${supabaseUrl}';
window.SUPABASE_ANON_KEY = '${supabaseKey}';
</script>
`;

// 需要注入环境变量的 HTML 文件
const htmlFiles = ['test.html', 'admin.html'];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`文件不存在: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否已经注入过环境变量
  if (content.includes('window.SUPABASE_URL')) {
    // 替换现有的环境变量脚本
    content = content.replace(
      /<script>\s*\/\/\s*自动注入的环境变量.*?<\/script>/s,
      envScript.trim()
    );
  } else {
    // 在 </head> 标签前注入环境变量脚本
    content = content.replace('</head>', `${envScript}</head>`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ 已更新 ${file}`);
});

console.log('环境变量注入完成！');

