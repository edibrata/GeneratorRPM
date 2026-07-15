const fs = require('fs');
const content = fs.readFileSync('server.ts', 'utf-8');

const startMatch = content.indexOf('const {\n        namaSekolah,');
const endMatch = content.indexOf('res.json({ result: response.text });');

let body = content.substring(startMatch, endMatch);
body = body.replace('req.body', 'formData');
body = body.replace(/return res\.status\(\d+\)\.json\(\{ error: (.*?) \}\);/g, 'throw new Error($1);');

const newContent = `import { GoogleGenAI } from '@google/genai';

export async function generateRPM(formData: any) {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (!key) {
        throw new Error('VITE_GEMINI_API_KEY belum diatur di environment.');
    }
    const ai = new GoogleGenAI({ apiKey: key });

    ${body}
    return response.text;
}
`;

fs.writeFileSync('src/lib/gemini.ts', newContent);
console.log('Fixed src/lib/gemini.ts');
