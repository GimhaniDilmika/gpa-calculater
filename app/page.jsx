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
      <nav style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(10,10,15,0.9)",
        backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div className="nav-inner">
          <div className="nav-brand">
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg, var(--accent), #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            }}>📊</div>
            <span style={{ fontSize: 15, fontWeight: 700 }}>GPA Tracker</span>
          </div>
          <div className="nav-actions">
            <span className="nav-badge">{semesters.length} semester{semesters.length !== 1 ? "s" : ""}</span>
            <button className="btn-primary" onClick={() => addSemester()}>+ New Semester</button>
          </div>
        </div>
      </nav>

      <div className="page-layout">
        <div className="page-main">
          <div style={{ marginBottom: "1.75rem" }}>
            <h1 className="page-title">Academic Dashboard</h1>
            <p className="page-subtitle">Track your modules, SGPA per semester, and cumulative OGPA.</p>
          </div>

          <StatsBar ogpa={ogpa} totalModules={totalModules} totalCredits={totalCredits} semesterCount={semesters.length} />
          <GradeReference />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>Semesters</h2>
            {semesters.length > 0 && <span style={{ fontSize: 12, color: "var(--text3)" }}>Tap to expand</span>}
          </div>

          {semesters.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎓</div>
              <p style={{ fontSize: 16, fontWeight: 600, color: "var(--text2)", marginBottom: 6 }}>No semesters yet</p>
              <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 20 }}>Add your first semester to start tracking your GPA.</p>
              <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }} onClick={() => addSemester()}>
                + Add First Semester
              </button>
            </div>
          ) : (
            semesters.map(sem => (
              <div key={sem.id} ref={el => semRefs.current[sem.id] = el}>
                <SemesterCard
                  semester={sem} sgpa={calcSGPA(sem.modules)}
                  onToggle={toggleSemester} onDelete={deleteSemester}
                  onRename={renameSemester} onAddModule={addModule} onDeleteModule={deleteModule}
                />
              </div>
            ))
          )}
        </div>
        <Sidebar semesters={semesters} ogpa={ogpa} onScrollTo={scrollTo} />
      </div>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "1.5rem", textAlign: "center", marginTop: "2rem" }}>
        <p style={{ fontSize: 12, color: "var(--text3)" }}>
          Data saved locally in your browser · Built with Next.js · <span style={{ color: "var(--accent)" }}>GPA Tracker</span>
        </p>
      </footer>
    </div>
  );
}