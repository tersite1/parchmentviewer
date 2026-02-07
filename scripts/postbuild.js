const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Add global error handler before other scripts
const errorScript = `<script>
window.onerror = function(msg, url, line, col, err) {
  var el = document.createElement('div');
  el.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#1a1a1a;color:#f5f5f0;padding:40px;font-family:monospace;z-index:99999;overflow:auto';
  el.innerHTML = '<h2 style="color:#ff6b6b">Runtime Error</h2><pre>' + msg + '\\n\\nFile: ' + url + '\\nLine: ' + line + ':' + col + '\\n\\n' + (err && err.stack ? err.stack : '') + '</pre>';
  document.body.appendChild(el);
};
window.addEventListener('unhandledrejection', function(e) {
  var el = document.createElement('div');
  el.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#1a1a1a;color:#f5f5f0;padding:40px;font-family:monospace;z-index:99999;overflow:auto';
  el.innerHTML = '<h2 style="color:#ff6b6b">Unhandled Promise Rejection</h2><pre>' + (e.reason && e.reason.stack ? e.reason.stack : e.reason) + '</pre>';
  document.body.appendChild(el);
});
</script>`;

html = html.replace('<div id="root"></div>', '<div id="root"></div>' + errorScript);

fs.writeFileSync(indexPath, html);
console.log('Postbuild: error handler injected into index.html');
