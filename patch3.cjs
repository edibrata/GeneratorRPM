const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');
code = code.replace(/\{loading && \(/g, '{loading && !result && (');
code = code.replace(/\{result && !loading && \(/g, '{result && (');
fs.writeFileSync('src/App.tsx', code);
