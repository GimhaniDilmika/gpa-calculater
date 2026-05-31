"use client";
import { useState } from "react";
import { GRADE_POINTS, GRADE_META, gpaColor, calcSGPA } from "@/lib/gpaCalculator";
import AddModuleForm from "./AddModuleForm";

export default function SemesterCard({ semester, sgpa, onToggle, onDelete, onAddModule, onDeleteModule, onRename }) {
  const [editing, setEditing] = useState(false);
  const [nameVal, setNameVal] = useState(semester.name);
  const color = gpaColor(sgpa);
  const totalCredits = semester.modules.reduce((s, m) => s + m.credits, 0);
  const pct = sgpa !== null ? ((sgpa / 4) * 100).toFixed(1) : 0;

  function handleRename() {
    if (nameVal.trim()) onRename(semester.id, nameVal.trim());
    setEditing(false);
  }

  return (
    <div style={{
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      marginBottom: 12,
      overflow: "hidden",
      background: "var(--bg2)",
      transition: "border-color 0.2s",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border2)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      {/* Colored top bar */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${color} ${pct}%, var(--bg3) ${pct}%)` }} />

      {/* Header */}
      <div style={{ padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
        onClick={() => onToggle(semester.id)}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `${color}18`, border: `1px solid ${color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color, flexShrink: 0,
          }}>
            {semester.name.replace(/[^0-9]/g, "") || "S"}
          </div>
          <div>
            {editing ? (
              <input autoFocus value={nameVal}
                onChange={e => setNameVal(e.target.value)}
                onBlur={handleRename}
                onKeyDown={e => { if (e.key === "Enter") handleRename(); e.stopPropagation(); }}
                onClick={e => e.stopPropagation()}
                style={{ fontSize: 15, fontWeight: 600, background: "var(--bg3)", border: "1px solid var(--accent)", borderRadius: 6, padding: "3px 10px", color: "var(--text)", fontFamily: "inherit" }}
              />
            ) : (
              <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{semester.name}</p>
            )}
            <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 1 }}>
              {semester.modules.length} module{semester.modules.length !== 1 ? "s" : ""} · {totalCredits} credits
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 20, fontWeight: 700, color, letterSpacing: "-0.02em" }}>
              {sgpa !== null ? sgpa.toFixed(2) : "—"}
            </p>
            <p style={{ fontSize: 11, color: "var(--text3)" }}>SGPA</p>
          </div>
          <div style={{ width: 1, height: 32, background: "var(--border)", margin: "0 4px" }} />
          <button onClick={e => { e.stopPropagation(); setEditing(true); setNameVal(semester.name); }}
            title="Rename"
            style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 16, padding: "4px 6px", borderRadius: 6, transition: "color 0.2s, background 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "var(--bg3)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text3)"; e.currentTarget.style.background = "none"; }}>
            ✏️
          </button>
          <button onClick={e => { e.stopPropagation(); if (confirm("Delete this semester and all its modules?")) onDelete(semester.id); }}
            title="Delete"
            style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 16, padding: "4px 6px", borderRadius: 6, transition: "color 0.2s, background 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--red)"; e.currentTarget.style.background = "rgba(245,99,66,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text3)"; e.currentTarget.style.background = "none"; }}>
            🗑
          </button>
          <span style={{ color: "var(--text3)", fontSize: 11, transform: semester.open ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.25s" }}>▼</span>
        </div>
      </div>

      {/* Body */}
      {semester.open && (
        <>
          {semester.modules.length > 0 ? (
            <div style={{ borderTop: "1px solid var(--border)", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "var(--bg3)" }}>
                    {["#", "Module", "Credits", "Grade", "GP", ""].map((h, i) => (
                      <th key={i} style={{
                        padding: "8px 14px", textAlign: i <= 1 ? "left" : "center",
                        fontSize: 11, color: "var(--text3)", fontWeight: 500,
                        textTransform: "uppercase", letterSpacing: "0.06em",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {semester.modules.map((mod, idx) => {
                    const gp = GRADE_POINTS[mod.grade] ?? 0;
                    const gc = GRADE_META[mod.grade]?.color ?? "#888";
                    return (
                      <tr key={mod.id} style={{ borderTop: "1px solid var(--border)", transition: "background 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td style={{ padding: "11px 14px", color: "var(--text3)", fontSize: 12, width: 36 }}>{idx + 1}</td>
                        <td style={{ padding: "11px 14px", color: "var(--text)", fontWeight: 500 }}>{mod.name}</td>
                        <td style={{ padding: "11px 14px", textAlign: "center", color: "var(--text2)" }}>{mod.credits}</td>
                        <td style={{ padding: "11px 14px", textAlign: "center" }}>
                          <span style={{
                            background: `${gc}18`, color: gc,
                            border: `1px solid ${gc}30`,
                            padding: "3px 10px", borderRadius: 99,
                            fontSize: 12, fontWeight: 600,
                          }}>{mod.grade}</span>
                        </td>
                        <td style={{ padding: "11px 14px", textAlign: "center", color: gc, fontWeight: 600 }}>{gp.toFixed(2)}</td>
                        <td style={{ padding: "11px 14px", textAlign: "center" }}>
                          <button onClick={() => onDeleteModule(semester.id, mod.id)}
                            style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 13, padding: "3px 6px", borderRadius: 4, cursor: "pointer", transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--red)"}
                            onMouseLeave={e => e.currentTarget.style.color = "var(--text3)"}>✕</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ borderTop: "1px solid var(--border)", padding: "2rem", textAlign: "center", color: "var(--text3)", fontSize: 14 }}>
              No modules yet — add one below.
            </div>
          )}
          <AddModuleForm semId={semester.id} onAdd={mod => onAddModule(semester.id, mod)} />
        </>
      )}
    </div>
  );
}
