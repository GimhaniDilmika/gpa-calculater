"use client";
import { useRef } from "react";
import { useGPA } from "@/lib/useGPA";
import StatsBar from "@/components/StatsBar";
import SemesterCard from "@/components/SemesterCard";
import GradeReference from "@/components/GradeReference";
import Sidebar from "@/components/Sidebar";

export default function HomePage() {
  const {
    semesters, loaded, ogpa, totalModules, totalCredits,
    addSemester, deleteSemester, renameSemester,
    toggleSemester, addModule, deleteModule, calcSGPA,
  } = useGPA();
  const semRefs = useRef({});

  function scrollTo(id) {
    semRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!loaded) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⟳</div>
        <p style={{ color: "var(--text3)" }}>Loading your data…</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Top nav */}
      <nav style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(10,10,15,0.8)",
        backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg, var(--accent), #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14,
            }}>📊</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>GPA Tracker</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "var(--text3)", padding: "3px 10px", border: "1px solid var(--border)", borderRadius: 99 }}>
              {semesters.length} semester{semesters.length !== 1 ? "s" : ""}
            </span>
            <button onClick={() => addSemester()} style={{
              background: "var(--accent)", color: "#fff", border: "none",
              borderRadius: "var(--radius-sm)", padding: "7px 16px",
              fontSize: 13, fontWeight: 600, letterSpacing: "0.01em",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--accent2)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--accent)"}>
              + New Semester
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem", display: "flex", gap: 28, alignItems: "flex-start" }}>
        {/* Left column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Page title */}
          <div style={{ marginBottom: "1.75rem" }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>Academic Dashboard</h1>
            <p style={{ fontSize: 14, color: "var(--text3)", marginTop: 4 }}>Track your modules, SGPA per semester, and cumulative OGPA.</p>
          </div>

          <StatsBar ogpa={ogpa} totalModules={totalModules} totalCredits={totalCredits} semesterCount={semesters.length} />
          <GradeReference />

          {/* Semester section header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>Semesters</h2>
            {semesters.length > 0 && (
              <span style={{ fontSize: 12, color: "var(--text3)" }}>
                Click a semester to expand / collapse
              </span>
            )}
          </div>

          {semesters.length === 0 ? (
            <div style={{
              border: "1px dashed var(--border2)", borderRadius: "var(--radius)",
              padding: "4rem 2rem", textAlign: "center",
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎓</div>
              <p style={{ fontSize: 16, fontWeight: 600, color: "var(--text2)", marginBottom: 6 }}>No semesters yet</p>
              <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 20 }}>Add your first semester to start tracking your GPA.</p>
              <button onClick={() => addSemester()} style={{
                background: "var(--accent)", color: "#fff", border: "none",
                borderRadius: "var(--radius-sm)", padding: "10px 24px",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}>+ Add First Semester</button>
            </div>
          ) : (
            semesters.map(sem => (
              <div key={sem.id} ref={el => semRefs.current[sem.id] = el}>
                <SemesterCard
                  semester={sem}
                  sgpa={calcSGPA(sem.modules)}
                  onToggle={toggleSemester}
                  onDelete={deleteSemester}
                  onRename={renameSemester}
                  onAddModule={addModule}
                  onDeleteModule={deleteModule}
                />
              </div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <Sidebar semesters={semesters} ogpa={ogpa} onScrollTo={scrollTo} />
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "1.5rem", textAlign: "center", marginTop: "2rem" }}>
        <p style={{ fontSize: 12, color: "var(--text3)" }}>
          Data saved locally in your browser · Built with Next.js ·{" "}
          <span style={{ color: "var(--accent)" }}>GPA Tracker</span>
        </p>
      </footer>
    </div>
  );
}
