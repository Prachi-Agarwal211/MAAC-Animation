import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
let content = fs.readFileSync(envPath, 'utf8');

// Find the private key line
const match = content.match(/GOOGLE_PRIVATE_KEY="([^"]+)"/);
if (match) {
  let rawKey = match[1];
  
  // Replace actual line breaks with \n string literal
  let cleanKey = rawKey.replace(/\r?\n/g, '\\n');
  
  // Remove any duplicate \n that might have been created
  cleanKey = cleanKey.replace(/(\\n)+/g, '\\n');
  
  const newContent = content.replace(/GOOGLE_PRIVATE_KEY="[^"]+"/, `GOOGLE_PRIVATE_KEY="${cleanKey}"`);
  fs.writeFileSync(envPath, newContent);
  console.log('Fixed private key formatting in .env.local');
} else {
  console.log('Could not find GOOGLE_PRIVATE_KEY in .env.local');
}
