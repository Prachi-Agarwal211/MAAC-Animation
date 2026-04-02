import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "MAAC Jaipur - Best Animation & VFX Institute";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0C0C0C 0%, #1a0508 50%, #0C0C0C 100%)",
          position: "relative",
        }}
      >
        {/* Background gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(227,24,55,0.15) 0%, transparent 60%)",
          }}
        />

        {/* Logo/Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #E31837, #FF6B35)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 60px rgba(227,24,55,0.3)",
            }}
          >
            <span style={{ fontSize: "48px", color: "white" }}>M</span>
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: "800",
              color: "#F0EBE1",
              letterSpacing: "-0.02em",
            }}
          >
            MAAC
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "800",
            color: "#F0EBE1",
            marginBottom: "20px",
            textAlign: "center",
            letterSpacing: "-0.03em",
            position: "relative",
            zIndex: 10,
          }}
        >
          Big Leaps Begin Here
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "32px",
            color: "#E31837",
            fontWeight: "600",
            marginBottom: "60px",
            textAlign: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          Best Animation & VFX Institute in Jaipur
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "60px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", fontWeight: "800", color: "#E31837" }}>30+</div>
            <div style={{ fontSize: "16px", color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.1em" }}>Years</div>
          </div>
          <div style={{ width: "2px", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", fontWeight: "800", color: "#E31837" }}>95%</div>
            <div style={{ fontSize: "16px", color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.1em" }}>Placement</div>
          </div>
          <div style={{ width: "2px", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", fontWeight: "800", color: "#E31837" }}>100+</div>
            <div style={{ fontSize: "16px", color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.1em" }}>Centers</div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: "18px", color: "#A8A29C" }}>NSDC / MESC Certified</span>
          <span style={{ width: "4px", height: "4px", background: "#E31837", borderRadius: "50%" }} />
          <span style={{ fontSize: "18px", color: "#A8A29C" }}>B.Voc Degree Available</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
