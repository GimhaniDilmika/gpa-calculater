"use client";
import { gpaColor, gpaClassification } from "@/lib/gpaCalculator";

export default function StatsBar({ ogpa, totalModules, totalCredits, semesterCount }) {
  const color = gpaColor(ogpa);
  const classification = gpaClassification(ogpa);
  const pct = ogpa !== null ? ((ogpa / 4) * 100).toFixed(1) : 0;

  return (
    <div className="stats-grid">
      <div className="stat-card stat-card-hero">
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${color} ${pct}%, transparent ${pct}%)`,
        }} />
        <p className="stat-label">Overall GPA</p>
        <p className="stat-value" style={{ color }}>{ogpa !== null ? ogpa.toFixed(2) : "—"}</p>
        {classification && (
          <span style={{
            display: "inline-block", marginTop: 10,
            background: `${color}18`, color, border: `1px solid ${color}40`,
            fontSize: 11, padding: "3px 10px", borderRadius: 99, fontWeight: 600,
          }}>{classification}</span>
        )}
        <div style={{ marginTop: 14, height: 4, background: "var(--bg3)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.6s" }} />
        </div>
        <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>{pct}% of 4.00</p>
      </div>

      {[
        { label: "Semesters", value: semesterCount, sub: "recorded" },
        { label: "Modules",   value: totalModules,  sub: "completed" },
        { label: "Credits",   value: totalCredits,  sub: "total earned" },
      ].map(({ label, value, sub }) => (
        <div key={label} className="stat-card">
          <p className="stat-label">{label}</p>
          <p className="stat-value" style={{ color: "var(--text)" }}>{value}</p>
          <p className="stat-sub">{sub}</p>
        </div>
      ))}
    </div>
  );
}