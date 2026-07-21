const fs = require('fs');
let code = fs.readFileSync('src/lib/gemini.ts', 'utf-8');
code = code.replace(/return response\.text;/g, 
`let fullText = '';
      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullText += chunk.text;
          if (onUpdate) onUpdate(fullText);
        }
      }
      return fullText;`);
fs.writeFileSync('src/lib/gemini.ts', code);
