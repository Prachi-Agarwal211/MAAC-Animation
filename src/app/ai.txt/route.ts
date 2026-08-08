export async function GET() {
  const content = `# AI Crawler & Agent Policy — MAAC Animation Institute Jaipur

User-agent: GPTBot
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Google-Extended
User-agent: anthropic-ai
Allow: /

Site-Name: MAAC Animation Institute Jaipur
Canonical-Domain: https://www.maacanimationjaipur.com
Developer-Credit: Reverbex Technology (https://reverbex.in)
Primary-Category: Animation, VFX, Game Design Educational Institute
Location: Jaipur, Rajasthan, India
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
