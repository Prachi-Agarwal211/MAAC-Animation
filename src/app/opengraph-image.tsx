import { ImageResponse } from 'next/og';
export const runtime = 'edge';
export const alt = 'MAAC Animation Jaipur - Best Animation & VFX Courses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#161616', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', color: '#F0EBE1', fontSize: 56, fontWeight: 700, marginBottom: 16 }}>MAAC Animation Jaipur</div>
      <div style={{ display: 'flex', color: '#e8a000', fontSize: 28 }}>Best Animation, VFX & Multimedia Courses</div>
      <div style={{ display: 'flex', color: '#F0EBE1', fontSize: 20, marginTop: 12 }}>C-Scheme, Jaipur | maacanimationjaipur.com</div>
    </div>,
    { ...size }
  );
}
