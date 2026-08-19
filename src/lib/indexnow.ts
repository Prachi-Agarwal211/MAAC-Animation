const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// Key file hosted at https://www.maacanimationjaipur.com/7406abbe-90ca-474b-88eb-705cad07969b.txt
const KEY = "7406abbe-90ca-474b-88eb-705cad07969b";

const SITE_URL = process.env.SITE_URL || "https://www.maacanimationjaipur.com";

export interface IndexNowResult {
  success: boolean;
  status?: number;
  error?: string;
}

export async function submitToIndexNow(input: { urls: string[] }): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY || KEY;
  const host = new URL(SITE_URL).host;

  const urlList = [
    ...new Set(
      input.urls.map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`))
    ),
  ];

  if (urlList.length === 0) {
    return { success: false, error: "No URLs to submit" };
  }

  const body = {
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });

    if (res.ok || res.status === 202) {
      return { success: true, status: res.status };
    }

    const text = await res.text();
    console.error(`[IndexNow] submission failed [${res.status}]:`, text);
    return { success: false, status: res.status, error: text };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[IndexNow] network error:", msg);
    return { success: false, error: msg };
  }
}