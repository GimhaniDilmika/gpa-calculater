"use client";

import { useState } from "react";
import { GRADE_POINTS, gpaClass } from "@/lib/gpaCalculator";
import AddModuleForm from "./AddModuleForm";

const chipMap = {
  excellent: "grade-chip excellent",
  good: "grade-chip good",
  pass: "grade-chip pass",
  weak: "grade-chip weak",
  fail: "grade-chip fail",
  neutral: "grade-chip neutral",
};

export default function SemesterCard({
  semester,
  semesterNumber,
  sgpa,
  onToggle,
  onDelete,
  onAddModule,
  onDeleteModule,
  onRename,
}) {
  const [editing, setEditing] = useState(false);
  const [nameVal, setNameVal] = useState(semester.name);

  const totalCredits = semester.modules.reduce((sum, item) => sum + Number(item.credits), 0);

  function handleRename() {
    if (nameVal.trim()) {
      onRename(semester.id, nameVal.trim());
    }
    setEditing(false);
  }

  return (
    <section id={`semester-${semester.id}`} className="semester-card">
      <div className="semester-accent-line" />

      <div className="semester-head" onClick={() => onToggle(semester.id)}>
        <div className="semester-head-left">
          <div className="semester-index">{semesterNumber}</div>

          <div className="semester-meta">
            {editing ? (
              <input
                autoFocus
                className="rename-input"
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename();
                  e.stopPropagation();
                }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h4>{semester.name}</h4>
            )}

            <p>
              {semester.modules.length} module{semester.modules.length !== 1 ? "s" : ""} · {totalCredits} credits
            </p>
          </div>
        </div>

        <div className="semester-head-right">
          <div className="sgpa-box">
            <strong>{sgpa !== null ? sgpa.toFixed(2) : "—"}</strong>
            <span>SGPA</span>
          </div>

          <button
            className="icon-btn"
            title="Rename semester"
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
              setNameVal(semester.name);
            }}
          >
            ✏️
          </button>

          <button
            className="icon-btn"
            title="Delete semester"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Delete this semester?")) onDelete(semester.id);
            }}
          >
            🗑️
          </button>

          <span className={`caret ${semester.open ? "open" : ""}`}>▲</span>
        </div>
      </div>

      {semester.open && (
        <div className="semester-body">
          {semester.modules.length > 0 ? (
            <div className="table-scroll">
              <table className="dark-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Module</th>
                    <th>Credits</th>
                    <th>Grade</th>
                    <th>GP</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {semester.modules.map((module, index) => {
                    const gp = GRADE_POINTS[module.grade] ?? 0;
                    return (
                      <tr key={module.id}>
                        <td>{index + 1}</td>
                        <td className="table-main-cell">{module.name}</td>
                        <td>{module.credits}</td>
                        <td>
                          <span className={chipMap[gpaClass(gp)]}>{module.grade}</span>
                        </td>
                        <td className="gp-value">{gp.toFixed(2)}</td>
                        <td>
                          <button
                            className="remove-btn"
                            title="Remove module"
                            onClick={() => onDeleteModule(semester.id, module.id)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-inline">No modules yet — add one below.</div>
          )}

          <AddModuleForm onAdd={(module) => onAddModule(semester.id, module)} />
        </div>
      )}
    </section>
  );
}
