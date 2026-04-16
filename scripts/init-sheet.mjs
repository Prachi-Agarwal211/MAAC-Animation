import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Manual env parsing with aggressive cleaning
const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};

envFile.split(/\r?\n/).forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    let value = parts.slice(1).join('=').trim();
    
    // Remove surrounding quotes if they exist
    if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1);
    }
    
    env[key] = value;
  }
});

// CRITICAL: Repair the private key string
// Convert the literal string "\n" into actual newline characters
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

async function initSheet() {
  try {
    console.log('Initializing headers for sheet:', spreadsheetId);
    
    const headers = [['Timestamp', 'Name', 'Phone', 'Email', 'Course', 'City', 'Message', 'Source']];
    
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1:H1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: headers,
      },
    });
    
    console.log('Successfully added headers!');
  } catch (error) {
    console.error('Error initializing sheet:', error.message);
    if (error.response?.data?.error) {
       console.error('Details:', JSON.stringify(error.response.data.error, null, 2));
    }
  }
}

initSheet();
