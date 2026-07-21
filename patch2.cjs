const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');
code = code.replace(/const generatedResult = await generateRPM\(formData, apiKey\);\n\s*setResult\(generatedResult\);/g, 
`await generateRPM(formData, apiKey, (text) => {
        setResult(text);
      });`);
fs.writeFileSync('src/App.tsx', code);
