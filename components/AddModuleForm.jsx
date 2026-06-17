"use client";

import { useState } from "react";
import { GRADE_LIST, GRADE_DESCRIPTIONS } from "@/lib/gpaCalculator";

export default function AddModuleForm({ onAdd }) {
  const [name, setName] = useState("");
  const [credits, setCredits] = useState("");
  const [grade, setGrade] = useState("");
  const [error, setError] = useState("");

  function handleAdd() {
    if (!name.trim()) {
      setError("Enter a module name.");
      return;
    }
    if (!credits || Number(credits) < 1) {
      setError("Enter valid credits.");
      return;
    }
    if (!grade) {
      setError("Select a grade.");
      return;
    }

    setError("");
    onAdd({ name: name.trim(), credits: Number(credits), grade });
    setName("");
    setCredits("");
    setGrade("");
  }

  function handleKey(e) {
    if (e.key === "Enter") handleAdd();
  }

  return (
    <div className="module-form-wrap">
      <p className="module-form-title">Add Module</p>

      <div className="module-form-grid">
        <div>
          <label className="field-label">Module name</label>
          <input
            className="dark-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKey}
            placeholder="e.g. Engineering Mathematics"
          />
        </div>

        <div>
          <label className="field-label">Credits</label>
          <input
            className="dark-input"
            type="number"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            onKeyDown={handleKey}
            placeholder="3"
            min={1}
            max={6}
          />
        </div>

        <div>
          <label className="field-label">Grade</label>
          <select
            className="dark-input"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">Select grade</option>
            {GRADE_LIST.map((g) => (
              <option key={g} value={g}>
                {g} — {GRADE_DESCRIPTIONS[g]?.range}
              </option>
            ))}
          </select>
        </div>

        <div className="add-btn-wrap">
          <label className="field-label hidden-label">Add</label>
          <button onClick={handleAdd} className="primary-btn add-module-btn">
            + Add
          </button>
        </div>
      </div>

      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}
