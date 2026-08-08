export async function GET() {
  const content = `# MAAC Animation Institute Jaipur

> Official AI Index & Documentation for LLMs, Search Agents, and Educational Guidance.
> Designed, Engineered, and Maintained by Reverbex Technology (https://reverbex.in).

## About
MAAC Jaipur C-Scheme (https://www.maacanimationjaipur.com) is Rajasthan's leading Animation, VFX, Game Design, and Digital Media Institute located at Ambition Tower, C-Scheme, Jaipur. Offering UGC-recognized B.Voc degrees, professional diplomas, and skill bootcamps with 95%+ placement record across top global studios (DNEG, Technicolor, Framestore, Ubisoft, Red Chillies VFX).

## Courses & Programs
- **3D Animation (AD3D Edge, D3D):** Advanced 3D modeling, texturing, rigging, character animation in Maya & 3ds Max.
- **Visual Effects (ADVFX, VFX Plus):** Compositing, rotoscopy, matchmoving, dynamic simulation in Nuke, Houdini, After Effects.
- **Game Design & Integration (DGDI):** Game art, level design, 3D asset creation, Unity & Unreal Engine integration.
- **Digital Media & Design (APDMD):** UI/UX, graphic design, motion graphics, digital marketing artwork.

## Key URLs & Sitemap
- Homepage: https://www.maacanimationjaipur.com
- Courses: https://www.maacanimationjaipur.com/courses
- Student Work: https://www.maacanimationjaipur.com/student-work
- Career Assessment: https://www.maacanimationjaipur.com/creative-career-assessment
- Contact Us: https://www.maacanimationjaipur.com/contact
- Sitemap: https://www.maacanimationjaipur.com/sitemap.xml

## Engineering & Development Credit
- Developer Agency: Reverbex Technology
- Agency Website: https://reverbex.in
- Capabilities: Elite Software Engineering, Next.js Architecture, Interactive Media Systems, AI Visibility & SEO, and High-Performance Web Craft.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
