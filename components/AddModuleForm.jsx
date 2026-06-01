"use client";
import { useState } from "react";
import { GRADE_LIST, GRADE_META } from "@/lib/gpaCalculator";

const inp = {
  background: "var(--bg)", border: "1px solid var(--border2)",
  borderRadius: "var(--radius-sm)", color: "var(--text)",
  padding: "9px 12px", fontSize: 14, width: "100%", transition: "border-color 0.2s",
};

export default function AddModuleForm({ semId, onAdd }) {
  const [name, setName]       = useState("");
  const [credits, setCredits] = useState("");
  const [grade, setGrade]     = useState("");
  const [error, setError]     = useState("");

  function handleAdd() {
    if (!name.trim())                    { setError("Enter a module name."); return; }
    if (!credits || Number(credits) < 1) { setError("Enter valid credits (1–6)."); return; }
    if (!grade)                          { setError("Select a grade."); return; }
    setError("");
    onAdd({ name: name.trim(), credits: Number(credits), grade });
    setName(""); setCredits(""); setGrade("");
  }

  return (
    <div style={{ borderTop: "1px solid var(--border)", padding: "1rem 1.25rem", background: "var(--bg)" }}>
      <p style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
        Add Module
      </p>
      <div className="module-form-grid">
        <div className="module-form-name">
          <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 5 }}>Module name</label>
          <input value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            placeholder="e.g. Engineering Mathematics I" style={inp} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 5 }}>Credits</label>
          <input type="number" value={credits} onChange={e => setCredits(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            placeholder="3" min={1} max={6} style={inp} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 5 }}>Grade</label>
          <select value={grade} onChange={e => setGrade(e.target.value)} style={{ ...inp, cursor: "pointer" }}>
            <option value="">Select grade</option>
            {GRADE_LIST.map(g => (
              <option key={g} value={g}>{g} — {GRADE_META[g]?.range} ({GRADE_META[g]?.label})</option>
            ))}
          </select>
        </div>
        <div className="module-form-btn">
          <label style={{ fontSize: 12, color: "transparent", display: "block", marginBottom: 5 }}>–</label>
          <button onClick={handleAdd} className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>
            + Add
          </button>
        </div>
      </div>
      {error && <p style={{ color: "var(--red)", fontSize: 12, marginTop: 8 }}>⚠ {error}</p>}
    </div>
  );
}