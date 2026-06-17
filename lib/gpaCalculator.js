// Grading scale — update this object if your university changes its scale
export const GRADE_POINTS = {
  "A+": 4.00,
  "A":  4.00,
  "A-": 3.70,
  "B+": 3.30,
  "B":  3.00,
  "B-": 2.70,
  "C+": 2.30,
  "C":  2.00,
  "C-": 1.70,
  "D":  1.30,
  "E":  0.00,
};

export const GRADE_LIST = Object.keys(GRADE_POINTS);

export const GRADE_DESCRIPTIONS = {
  "A+": { label: "Excellent",          range: "85 and above" },
  "A":  { label: "Excellent",          range: "75 – 84"      },
  "A-": { label: "Very Good",          range: "70 – 74"      },
  "B+": { label: "Good",               range: "65 – 69"      },
  "B":  { label: "Good",               range: "60 – 64"      },
  "B-": { label: "Satisfactory",       range: "55 – 59"      },
  "C+": { label: "Pass",               range: "50 – 54"      },
  "C":  { label: "Pass",               range: "45 – 49"      },
  "C-": { label: "Weak Pass",          range: "40 – 44"      },
  "D":  { label: "Conditional Pass",   range: "35 – 39"      },
  "E":  { label: "Fail",               range: "00 – 34"      },
};

/**
 * Calculate SGPA for a single semester's modules.
 * @param {Array<{credits: number, grade: string}>} modules
 * @returns {number|null}
 */
export function calcSGPA(modules) {
  if (!modules || modules.length === 0) return null;
  const totalCredits = modules.reduce((sum, m) => sum + Number(m.credits), 0);
  if (totalCredits === 0) return null;
  const totalPoints = modules.reduce(
    (sum, m) => sum + Number(m.credits) * (GRADE_POINTS[m.grade] ?? 0),
    0
  );
  return totalPoints / totalCredits;
}

/**
 * Calculate OGPA across all semesters (weighted by credits).
 * @param {Array<{modules: Array}>} semesters
 * @returns {number|null}
 */
export function calcOGPA(semesters) {
  const allModules = semesters.flatMap((s) => s.modules);
  return calcSGPA(allModules);
}

/**
 * Returns a CSS-friendly color class based on GPA value.
 */
export function gpaClass(gpa) {
  if (gpa === null) return "neutral";
  if (gpa >= 3.70) return "excellent";
  if (gpa >= 3.00) return "good";
  if (gpa >= 2.00) return "pass";
  if (gpa >= 1.30) return "weak";
  return "fail";
}

/**
 * Returns a letter classification based on OGPA.
 */
export function gpaClassification(ogpa) {
  if (ogpa === null) return null;
  if (ogpa >= 3.70) return "First Class";
  if (ogpa >= 3.30) return "Second Class Upper";
  if (ogpa >= 3.00) return "Second Class Lower";
  if (ogpa >= 2.00) return "Pass";
  return "Fail";
}
