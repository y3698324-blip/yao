// 简单静态资源服务器，供 Zeabur 等平台运行
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const root = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.webp': 'image/webp'
};

const rewritePath = (urlPath) => {
  if (urlPath === '/' || urlPath === '') return '/test.html';
  if (urlPath === '/admin') return '/admin.html';
  return urlPath;
};

const envScript = () => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
  return `
<script>
window.SUPABASE_URL = ${JSON.stringify(supabaseUrl)};
window.SUPABASE_ANON_KEY = ${JSON.stringify(supabaseKey)};
</script>
`.trim();
};

const injectEnvToHtml = (html) => {
  if (!html.includes('</head>')) return html;
  return html.replace('</head>', `${envScript()}</head>`);
};

const server = http.createServer((req, res) => {
  const urlPath = rewritePath((req.url || '').split('?')[0]);
  const filePath = path.join(root, decodeURIComponent(urlPath));

  // 防止路径穿越
  if (!filePath.startsWith(root)) {
    res.statusCode = 400;
    return res.end('Bad Request');
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      return res.end('Not Found');
    }

    let target = filePath;
    if (stats.isDirectory()) {
      target = path.join(filePath, 'index.html');
    }

    fs.readFile(target, (readErr, data) => {
      if (readErr) {
        res.statusCode = 404;
        return res.end('Not Found');
      }

      const ext = path.extname(target).toLowerCase();
      const mime = mimeTypes[ext] || 'application/octet-stream';
      if (ext === '.html') {
        const injected = injectEnvToHtml(data.toString());
        res.writeHead(200, { 'Content-Type': mime });
        return res.end(injected);
      }
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    });
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});

