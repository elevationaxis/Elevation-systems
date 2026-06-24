import { useEffect, useState } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "done">("in");

  useEffect(() => {
    // Fade in over 0.8s, hold, then fade out
    const holdTimer = setTimeout(() => setPhase("out"), 2200);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3000);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.8s ease",
        opacity: phase === "out" ? 0 : 1,
        pointerEvents: "none",
      }}
    >
      <p
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
          color: "#f5f0e8",
          textAlign: "center",
          maxWidth: "600px",
          lineHeight: 1.6,
          letterSpacing: "0.01em",
          padding: "0 2rem",
          transition: "opacity 0.8s ease",
          opacity: phase === "in" ? 1 : 1,
        }}
      >
        Is your website an asset — or a liability?
      </p>
      <p
        style={{
          marginTop: "1.5rem",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "#C9A84C",
          textTransform: "uppercase" as const,
        }}
      >
        Elevation Axis
      </p>
    </div>
  );
}
