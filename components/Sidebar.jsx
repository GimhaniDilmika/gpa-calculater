"use client";
import { gpaColor, gpaClassification, calcSGPA } from "@/lib/gpaCalculator";

export default function Sidebar({ semesters, ogpa, onScrollTo }) {
  return (
    <aside style={{
      width: 220, flexShrink: 0,
      position: "sticky", top: 24,
      alignSelf: "flex-start",
    }}>
      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
        <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Quick Nav</p>
        </div>
        {semesters.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--text3)", padding: "1rem", textAlign: "center" }}>No semesters yet</p>
        ) : (
          <div>
            {semesters.map(sem => {
              const sgpa = calcSGPA(sem.modules);
              const color = gpaColor(sgpa);
              return (
                <button key={sem.id} onClick={() => onScrollTo(sem.id)}
                  style={{
                    width: "100%", background: "none", border: "none",
                    borderBottom: "1px solid var(--border)", padding: "10px 1rem",
                    textAlign: "left", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}>
                  <span style={{ fontSize: 13, color: "var(--text2)" }}>{sem.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color }}>{sgpa !== null ? sgpa.toFixed(2) : "—"}</span>
                </button>
              );
            })}
          </div>
        )}
        <div style={{ padding: "1rem", background: "var(--bg3)" }}>
          <p style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>OGPA</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: gpaColor(ogpa) }}>{ogpa !== null ? ogpa.toFixed(2) : "—"}</p>
          {gpaClassification(ogpa) && (
            <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{gpaClassification(ogpa)}</p>
          )}
        </div>
      </div>
    </aside>
  );
}
