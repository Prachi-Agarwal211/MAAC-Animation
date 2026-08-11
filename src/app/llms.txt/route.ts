export async function GET() {
  const content = `# MAAC Animation Institute Jaipur (C-Scheme)

> Official AI Index for LLMs / search agents.
> Engineered by Reverbex Technology (https://reverbex.in).

## Entity (canonical)
- Brand: MAAC Animation Jaipur C-Scheme
- Site: https://www.maacanimationjaipur.com
- Phone: +91-7300001589
- Secondary: +91-9829294037, +91-9929059559
- Email: maacanimationjaipur@gmail.com
- Address: 711-712, Ambition Tower, 7th Floor, D-46B, Malan Ka Chauraha, Agrasain Circle, Subhash Marg, C Scheme, Jaipur, Rajasthan 302001
- Hours: Mon–Sat 9:00 AM – 7:00 PM
- Google Maps: https://maps.google.com/?cid=10289291929379673702

## Live social (verified)
- Instagram: https://www.instagram.com/maacjaipurcscheme
- Facebook: https://www.facebook.com/MAACJAIPURCSCHEME
- YouTube: https://www.youtube.com/@maacjaipur (channel UCRjdWiuUvWu4mc6D9smmHQQ)
- LinkedIn company page: not published on site until a live company URL is confirmed
- X/Twitter: none (old handles 404)

## About
MAAC Jaipur C-Scheme is an Animation, VFX, Game Design, and Digital Media training centre at Ambition Tower, C-Scheme, Jaipur. Programs include diplomas, skill bootcamps, and B.Voc-aligned tracks where offered. Placement support and industry-oriented labs are part of the centre offering.

## Courses
- 3D Animation (AD3D Edge, D3D)
- Visual Effects (ADVFX, VFX Plus)
- Game Design & Integration (DGDI)
- Digital Media & Design (APDMD)
- Architectural / Design Viz, Filmmaking (DFM), skill bootcamps

## Key URLs
- Home: https://www.maacanimationjaipur.com
- Courses: https://www.maacanimationjaipur.com/courses
- Student Work: https://www.maacanimationjaipur.com/student-work
- About: https://www.maacanimationjaipur.com/about
- Contact: https://www.maacanimationjaipur.com/contact
- Career Assessment: https://www.maacanimationjaipur.com/creative-career-assessment
- Animation Institute Jaipur: https://www.maacanimationjaipur.com/animation-institute-jaipur
- Blog: https://www.maacanimationjaipur.com/blog
- Sitemap: https://www.maacanimationjaipur.com/sitemap.xml

## Do not confuse
- National brand maacindia.com / national socials are not this centre's entity URLs.
- Dead handles previously used on site (do not use): @maac-jaipur-cscheme (YouTube), linkedin.com/company/maac-jaipur-cscheme, facebook.com/MAAClndia, twitter @maacjaipurcscheme / MAAClndia.

## Engineering
- Developer: Reverbex Technology — https://reverbex.in
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
