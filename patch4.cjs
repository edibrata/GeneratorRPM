const fs = require('fs');
let code = fs.readFileSync('src/lib/gemini.ts', 'utf-8');
code = code.replace(/safetySettings: \[\s*\{ category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" \},\s*\{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" \},\s*\{ category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" \},\s*\{ category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" \}\s*\],/g, 
`safetySettings: [
            { category: "HARM_CATEGORY_HATE_SPEECH" as any, threshold: "BLOCK_NONE" as any },
            { category: "HARM_CATEGORY_HARASSMENT" as any, threshold: "BLOCK_NONE" as any },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT" as any, threshold: "BLOCK_NONE" as any },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT" as any, threshold: "BLOCK_NONE" as any }
          ],`);
fs.writeFileSync('src/lib/gemini.ts', code);
