"use client";
import { gpaColor, gpaClassification } from "@/lib/gpaCalculator";

export default function StatsBar({ ogpa, totalModules, totalCredits, semesterCount }) {
  const color = gpaColor(ogpa);
  const classification = gpaClassification(ogpa);
  const pct = ogpa !== null ? ((ogpa / 4) * 100).toFixed(1) : 0;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 14, marginBottom: "2rem" }}>
      {/* OGPA — hero card */}
      <div style={{
        background: "var(--bg2)", border: "1px solid var(--border2)",
        borderRadius: "var(--radius)", padding: "1.5rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${color} ${pct}%, transparent ${pct}%)`,
        }} />
        <p style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Overall GPA</p>
        <p style={{ fontSize: 36, fontWeight: 700, color, letterSpacing: "-0.02em", lineHeight: 1 }}>
          {ogpa !== null ? ogpa.toFixed(2) : "—"}
        </p>
        {classification && (
          <span style={{
            display: "inline-block", marginTop: 10,
            background: `${color}18`, color, border: `1px solid ${color}40`,
            fontSize: 11, padding: "3px 10px", borderRadius: 99, fontWeight: 600, letterSpacing: "0.05em",
          }}>{classification}</span>
        )}
        <div style={{ marginTop: 14, height: 4, background: "var(--bg3)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)" }} />
        </div>
        <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>{pct}% of 4.00</p>
      </div>

      {[
        { label: "Semesters", value: semesterCount, sub: "recorded" },
        { label: "Modules", value: totalModules, sub: "completed" },
        { label: "Credits", value: totalCredits, sub: "total earned" },
      ].map(({ label, value, sub }) => (
        <div key={label} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.5rem" }}>
          <p style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{label}</p>
          <p style={{ fontSize: 36, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</p>
          <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 8 }}>{sub}</p>
        </div>
      ))}
    </div>
  );
}
