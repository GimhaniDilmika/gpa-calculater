"use client";
import { useState } from "react";
import { GRADE_LIST, GRADE_META, GRADE_POINTS } from "@/lib/gpaCalculator";

export default function GradeReference() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <button onClick={() => setOpen(!open)} style={{
        background: "none", border: "1px solid var(--border2)",
        borderRadius: "var(--radius-sm)", padding: "7px 16px",
        fontSize: 13, color: "var(--text2)", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 8, transition: "border-color 0.2s, color 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; }}>
        <span style={{ transition: "transform 0.2s", display: "inline-block", transform: open ? "rotate(90deg)" : "none" }}>▶</span>
        Grading reference
      </button>

      {open && (
        <div style={{ marginTop: 12, border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", background: "var(--bg2)" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Grading Scale</p>
            <span style={{ fontSize: 11, color: "var(--text3)" }}>— configured for your university</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 1, background: "var(--border)" }}>
            {GRADE_LIST.map(g => {
              const c = GRADE_META[g]?.color ?? "#888";
              return (
                <div key={g} style={{ background: "var(--bg2)", padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: c }}>{g}</span>
                    <span style={{ fontSize: 12, color: "var(--text3)" }}>{GRADE_POINTS[g].toFixed(2)} GP</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text2)", marginBottom: 2 }}>{GRADE_META[g]?.range}%</p>
                  <p style={{ fontSize: 11, color: c, opacity: 0.8 }}>{GRADE_META[g]?.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
