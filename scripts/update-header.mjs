import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Improved env parsing
const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};

envFile.split(/\r?\n/).forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    let value = parts.slice(1).join('=').trim();
    if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
    }
    env[key] = value;
  }
});

let privateKey = env.GOOGLE_PRIVATE_KEY;
if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, '\n');
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: privateKey,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = env.GOOGLE_SHEET_ID;

async function updateHeaders() {
  try {
    const headers = [['Date', 'Name', 'Phone', 'Email', 'Message']];
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1:E1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: headers },
    });
    console.log('Successfully updated headers to Date, Name, Phone, Email, Message!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

updateHeaders();
