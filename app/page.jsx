"use client";

import { useGPA } from "@/lib/useGPA";
import StatsBar from "@/components/StatsBar";
import SemesterCard from "@/components/SemesterCard";
import GradeReference from "@/components/GradeReference";

export default function HomePage() {
  const {
    semesters,
    loaded,
    ogpa,
    totalModules,
    totalCredits,
    addSemester,
    deleteSemester,
    renameSemester,
    toggleSemester,
    addModule,
    deleteModule,
    calcSGPA,
  } = useGPA();

  if (!loaded) {
    return (
      <main className="page-shell">
        <div className="loading-state">Loading your GPA dashboard...</div>
      </main>
    );
  }

  const semesterCount = semesters.length;

  const scrollToSemester = (id) => {
    const element = document.getElementById(`semester-${id}`);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="page-shell">
      <div className="app-topbar">
        <div className="brand-block">
          <div className="brand-logo">🎓</div>
          <div>
            <h1 className="brand-title">GPA Tracker</h1>
            <p className="brand-subtitle">Smart academic performance dashboard</p>
          </div>
        </div>

        <div className="topbar-actions">
          <span className="pill-badge">{semesterCount} Semester{semesterCount !== 1 ? "s" : ""}</span>
          <button className="primary-btn" onClick={() => addSemester()}>
            + New Semester
          </button>
        </div>
      </div>

      <section className="hero-section">
        <div>
          <h2 className="hero-title">Academic Dashboard</h2>
          <p className="hero-description">
            Track your modules, SGPA per semester, and cumulative OGPA in one clean view.
          </p>
        </div>
      </section>

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <StatsBar
            ogpa={ogpa}
            totalModules={totalModules}
            totalCredits={totalCredits}
            semesterCount={semesterCount}
          />

          <GradeReference />

          <div className="section-head">
            <h3 className="section-title">Semesters</h3>
            <p className="section-hint">Click a semester to expand or collapse</p>
          </div>

          {semesters.length === 0 ? (
            <div className="empty-card">
              <div className="empty-icon">📘</div>
              <h4>No semesters yet</h4>
              <p>Add your first semester to start tracking GPA, modules, and credits.</p>
              <button className="primary-btn" onClick={() => addSemester()}>
                Add First Semester
              </button>
            </div>
          ) : (
            <div className="semester-stack">
              {semesters.map((sem, index) => (
                <SemesterCard
                  key={sem.id}
                  semester={sem}
                  semesterNumber={index + 1}
                  sgpa={calcSGPA(sem.modules)}
                  onToggle={toggleSemester}
                  onDelete={deleteSemester}
                  onRename={renameSemester}
                  onAddModule={addModule}
                  onDeleteModule={deleteModule}
                />
              ))}
            </div>
          )}

          <p className="app-footer">Your data is saved in your browser · Built with Next.js</p>
        </div>

        <aside className="dashboard-side">
          <div className="side-card">
            <p className="side-label">Quick Nav</p>

            {semesters.length === 0 ? (
              <p className="side-empty">Semester links will appear here.</p>
            ) : (
              <div className="quick-list">
                {semesters.map((sem, index) => {
                  const sgpa = calcSGPA(sem.modules);
                  return (
                    <button
                      key={sem.id}
                      className="quick-item"
                      onClick={() => scrollToSemester(sem.id)}
                    >
                      <span>{sem.name || `Semester ${index + 1}`}</span>
                      <strong>{sgpa !== null ? sgpa.toFixed(2) : "—"}</strong>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="ogpa-summary">
              <span>OGPA</span>
              <strong>{ogpa !== null ? ogpa.toFixed(2) : "—"}</strong>
              <small>{ogpa !== null && ogpa >= 2.0 ? "Pass" : ogpa === null ? "No data" : "Needs improvement"}</small>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
