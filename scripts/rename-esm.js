const fs = require('fs');
const path = require('path');

// dist-esm 폴더의 모든 .js 파일을 .mjs로 변경
function renameJsToMjs(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      renameJsToMjs(fullPath);
    } else if (file.endsWith('.js')) {
      const newPath = fullPath.replace(/\.js$/, '.mjs');
      fs.renameSync(fullPath, newPath);
    }
  });
}

const distEsmPath = path.join(__dirname, '..', 'dist-esm');
if (fs.existsSync(distEsmPath)) {
  renameJsToMjs(distEsmPath);
  
  // index.mjs를 dist 폴더로 복사
  const indexMjsPath = path.join(distEsmPath, 'index.mjs');
  const distIndexMjsPath = path.join(__dirname, '..', 'dist', 'index.mjs');
  
  if (fs.existsSync(indexMjsPath)) {
    fs.copyFileSync(indexMjsPath, distIndexMjsPath);
  }
}

