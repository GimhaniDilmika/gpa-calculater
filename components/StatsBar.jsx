"use client";

import { gpaClass, gpaClassification } from "@/lib/gpaCalculator";

const colorMap = {
  excellent: { bar: "#38e29f", text: "#d5ffe9", badge: "rgba(56, 226, 159, 0.16)" },
  good: { bar: "#88d44f", text: "#e8ffd6", badge: "rgba(136, 212, 79, 0.16)" },
  pass: { bar: "#f0c94d", text: "#ffe7a0", badge: "rgba(240, 201, 77, 0.16)" },
  weak: { bar: "#ff9757", text: "#ffd5b8", badge: "rgba(255, 151, 87, 0.16)" },
  fail: { bar: "#ff6f6f", text: "#ffd3d3", badge: "rgba(255, 111, 111, 0.16)" },
  neutral: { bar: "#84889e", text: "#d4d7e5", badge: "rgba(132, 136, 158, 0.16)" },
};

function StatCard({ label, value, helper, accent, large, children }) {
  return (
    <div className={`stat-card ${large ? "stat-card-large" : ""}`}>
      <p className="stat-label">{label}</p>
      <div className="stat-value-row">
        <h3 className="stat-value" style={accent ? { color: accent } : undefined}>{value}</h3>
      </div>
      {helper ? <p className="stat-helper">{helper}</p> : null}
      {children}
    </div>
  );
}

export default function StatsBar({ ogpa, totalModules, totalCredits, semesterCount }) {
  const cls = gpaClass(ogpa);
  const colors = colorMap[cls];
  const classification = gpaClassification(ogpa);
  const barWidth = ogpa !== null ? ((ogpa / 4) * 100).toFixed(1) : 0;
  const passPercent = ogpa !== null ? `${((ogpa / 4) * 100).toFixed(1)}% of 4.00` : "No GPA yet";

  return (
    <div className="stats-grid">
      <StatCard label="Overall GPA" value={ogpa !== null ? ogpa.toFixed(2) : "—"} helper={passPercent} accent={colors.bar} large>
        <div className="stat-badge" style={{ color: colors.text, background: colors.badge }}>
          {classification || "Pending"}
        </div>
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${barWidth}%`, background: colors.bar }} />
        </div>
      </StatCard>

      <StatCard label="Semesters" value={semesterCount} helper="recorded" />
      <StatCard label="Modules" value={totalModules} helper="completed" />
      <StatCard label="Credits" value={totalCredits} helper="total earned" />
    </div>
  );
}
