const fs = require('fs');
let code = fs.readFileSync('src/lib/gemini.ts', 'utf-8');
code = code.replace(/safetySettings: \[\s*\{ category: "HARM_CATEGORY_HATE_SPEECH" as any, threshold: "BLOCK_NONE" as any \},\s*\{ category: "HARM_CATEGORY_HARASSMENT" as any, threshold: "BLOCK_NONE" as any \},\s*\{ category: "HARM_CATEGORY_SEXUALLY_EXPLICIT" as any, threshold: "BLOCK_NONE" as any \},\s*\{ category: "HARM_CATEGORY_DANGEROUS_CONTENT" as any, threshold: "BLOCK_NONE" as any \}\s*\],/g, 
'');
fs.writeFileSync('src/lib/gemini.ts', code);
