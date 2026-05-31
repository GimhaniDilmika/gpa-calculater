"use client";

import { useState, useEffect, useCallback } from "react";
import { calcSGPA, calcOGPA } from "@/lib/gpaCalculator";

const STORAGE_KEY = "gpa_calculator_data";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function useGPA() {
  const [semesters, setSemesters] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setSemesters(JSON.parse(saved));
    } catch (_) {}
    setLoaded(true);
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(semesters));
  }, [semesters, loaded]);

  const addSemester = useCallback((name) => {
    setSemesters((prev) => [
      ...prev,
      {
        id: generateId(),
        name: name || `Semester ${prev.length + 1}`,
        modules: [],
        open: true,
      },
    ]);
  }, []);

  const deleteSemester = useCallback((semId) => {
    setSemesters((prev) => prev.filter((s) => s.id !== semId));
  }, []);

  const renameSemester = useCallback((semId, name) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === semId ? { ...s, name } : s))
    );
  }, []);

  const toggleSemester = useCallback((semId) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === semId ? { ...s, open: !s.open } : s))
    );
  }, []);

  const addModule = useCallback((semId, { name, credits, grade }) => {
    setSemesters((prev) =>
      prev.map((s) =>
        s.id === semId
          ? {
              ...s,
              modules: [
                ...s.modules,
                { id: generateId(), name, credits: Number(credits), grade },
              ],
            }
          : s
      )
    );
  }, []);

  const deleteModule = useCallback((semId, modId) => {
    setSemesters((prev) =>
      prev.map((s) =>
        s.id === semId
          ? { ...s, modules: s.modules.filter((m) => m.id !== modId) }
          : s
      )
    );
  }, []);

  const allModules = semesters.flatMap((s) => s.modules);
  const ogpa = calcOGPA(semesters);

  return {
    semesters,
    loaded,
    ogpa,
    totalModules: allModules.length,
    totalCredits: allModules.reduce((s, m) => s + m.credits, 0),
    addSemester,
    deleteSemester,
    renameSemester,
    toggleSemester,
    addModule,
    deleteModule,
    calcSGPA,
  };
}
