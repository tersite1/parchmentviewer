const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const jsDir = path.join(distDir, '_expo', 'static', 'js', 'web');

// 1. Fix import.meta in JS bundles (SyntaxError in non-module scripts)
if (fs.existsSync(jsDir)) {
  const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
  for (const file of jsFiles) {
    const filePath = path.join(jsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('import.meta')) {
      // Replace import.meta.url with a compatible equivalent
      content = content.replace(/import\.meta\.url/g, '(document.currentScript&&document.currentScript.src||location.href)');
      // Replace any remaining import.meta with empty object
      content = content.replace(/import\.meta/g, '({})');
      fs.writeFileSync(filePath, content);
      console.log('Fixed import.meta in:', file);
    }
  }
}

// 2. Add global error handler to index.html
const indexPath = path.join(distDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const errorScript = `<script>
function showError(title, msg) {
  var el = document.createElement('div');
  el.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#1a1a1a;color:#f5f5f0;padding:40px;font-family:monospace;z-index:99999;overflow:auto';
  var h = document.createElement('h2');
  h.style.color = '#ff6b6b';
  h.textContent = title;
  var p = document.createElement('pre');
  p.textContent = msg;
  el.appendChild(h);
  el.appendChild(p);
  document.body.appendChild(el);
}
window.onerror = function(msg, url, line, col, err) {
  showError('Runtime Error', msg + '\\n\\nFile: ' + url + '\\nLine: ' + line + ':' + col + (err && err.stack ? '\\n\\n' + err.stack : ''));
};
window.addEventListener('unhandledrejection', function(e) {
  showError('Unhandled Promise Rejection', (e.reason && e.reason.stack ? e.reason.stack : String(e.reason)));
});
</script>`;

html = html.replace('<div id="root"></div>', '<div id="root"></div>' + errorScript);
fs.writeFileSync(indexPath, html);

console.log('Postbuild complete: import.meta fixed + error handler added');
