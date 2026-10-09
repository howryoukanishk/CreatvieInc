import { ImageResponse } from "next/og";

export const alt = "Vāyas Life — From Insight to Impact";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#142C25",
          color: "#F5F0E5",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#D7E2D2" }}>
          Vāyas Life · Interactive case study
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 700, lineHeight: 0.9, letterSpacing: -5 }}>
          <span>FROM INSIGHT</span>
          <span style={{ display: "flex" }}>
            TO IMPACT<span style={{ color: "#E7C45B" }}>.</span>
          </span>
        </div>
      </div>
    ),
    size,
  );
}
