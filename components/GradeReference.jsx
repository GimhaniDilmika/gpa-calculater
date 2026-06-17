"use client";

import { useState } from "react";
import { GRADE_LIST, GRADE_DESCRIPTIONS, GRADE_POINTS } from "@/lib/gpaCalculator";

export default function GradeReference() {
  const [open, setOpen] = useState(false);

  return (
    <div className="reference-block">
      <button onClick={() => setOpen(!open)} className="ghost-btn">
        {open ? "▼ Hide" : "▶ Show"} grading reference
      </button>

      {open && (
        <div className="reference-card table-scroll">
          <table className="dark-table">
            <thead>
              <tr>
                {['Grade', 'Marks Range', 'Grade Points', 'Description'].map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRADE_LIST.map((grade) => (
                <tr key={grade}>
                  <td><strong>{grade}</strong></td>
                  <td>{GRADE_DESCRIPTIONS[grade]?.range}</td>
                  <td>{GRADE_POINTS[grade].toFixed(2)}</td>
                  <td>{GRADE_DESCRIPTIONS[grade]?.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
