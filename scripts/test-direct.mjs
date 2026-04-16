import { google } from 'googleapis';

const client_email = "sheet-handler@mcp-workspace-489811.iam.gserviceaccount.com";
const spreadsheetId = "1IE4nXFxIzhBRXULvWNuKg5neaMJvq7jW5-Bg6bdqHCA";
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyLOdLvcsEufqi\nOqXClclXVMKNU+jp6/uVwc+kIQ/AV+bwXrB3pSy8n1F4EsGYo7ZZ4bHEs122oP9x\nCDkEEtpbceep+wgVZwMLacj9Sfiz4I7O3roxGE6PTi7xewfAyIsOY4qiP103HyQI\nwgc2qsjw4cr5w7CzQ4aF39x9te0TrVtCO0+TQxA4V/vrzvzuTeOXx6TzBL2V0cUP\ntmvTx1KG+gySKTX759aKTwcYmALHVXR+HB/G0bGxO/vxo6CN003blusjcgxk4H9m\ncSQkmnxpLsLzFExBEYqDNZMuunJ122igPqHIIAKJAsUU6KX9pHKd2vzy/VD8024N\nA0Mgtub7AgMBAAECggEAPcecG4Mfle/2m7HCMApH2eQl4WMq65FLls2w9bQRBhx0\nkvwCLDo1nOGRGhVG02pQnDHJte6Lm/uPFt5HBsaSuApyzVmhn+osABUZ/9laRuSi\nH9DStps7Ai2V0V1bftkKfl69fyyBYc+GaxL79VSagAuKmbfk2QOc7WaFyYD/R0bL\n8mi1Zz51Ljvuw6MNM7MUCnDTzwY86OFQ20paekCYL2lg6Hf3qt//h/Y4tJlJLnXp\nk+t6hae0Fg2JdJRDqm2F/A2yP6GRPqd+5logtmh8TYbTJUkov8uUSZuV/97EzUBH\nSrSACd7BfUSVxFZKYn4OJGXMsW3WXd+UIeccf1dUYQKBgQDsZ8zO5hqJo4sU0r4+\nu+0JNKnI4RQMw8GJmdwTclykMTL/Dojy7nhhz+9sG2eXeNr4CAJk9XqLFGBv5VSj\nf7fWUDI1xdiuh0ffV1xiuGLKVsh0jE/jYyQEN0vMqr2xyI6HRauvAcBEnvCT/3FU\nmoPTHsKr1StQQL+bJTsamGq+VQKBgQDA8YqUJNiI9jaEmJ3qDoFkIEd42Boal5eg\nH4WnJJfC1qN+sLlFI238ow5wu9N68jNgjAi2tEuM1vhNbrSljvj9UTioDqbUmk8+\n+TbVVZUrcpKj4jwprbUPdBC2v/TzAvOyDLVYXTYzkn3ESujYQBviYvoFx9uO9ITR\nZtJQvt7ADwKBgBKE9yhmIkISC70v3TNw6VrFQ1+3Mijl1O2Anhrv5I4ARKxyaQwO\n3mNbNLhVVUIqd4zio71g9Z6blApv/rdoM/CYC7bmrtjNRDYc0+Hv691J+x4WN9Pq\nWlHyOv/niEC7I185d/+XtYYqpVISusAT8qvBRyLK6j+5Mslmm0C0G/iZAoGANeD9\fsMPSKfgr4RizKKCVXCCJOfL2lMsv0UuMG+ShZEklNNK2Vi8dQkfljGNK88Is9RG\n9qZAVrMNIaphfb4AH9UXii6VPddde8tiGY7NmhVjh6o8fLMKVadmp3HROC9B2B2e\nYm+dHCezQSZeAU1dvAlBom2eDTyQ/lzFLFEwqNcCgYAFzVAWu8JDLyAFMp5bNtRP\n/s01AfHR6BtSjWbDdQ7MiJNJj0zMi5TDy4ixFHSbdGaSCncjzIxzsNG4PdmCHiVf\nFv6nictKuMYSvJchAlnqsY2R5kaFL1YSpw4wP2TpQHZmrQdJ5E3kdHvFBbSKjSWy\ns5cWBe+9oWr2bCERzFSrxg==\n-----END PRIVATE KEY-----\n";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: client_email,
    private_key: private_key,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

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
    console.error('Error:', error.message);
  }
}

initSheet();
