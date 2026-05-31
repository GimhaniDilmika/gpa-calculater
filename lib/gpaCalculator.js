export const GRADE_POINTS = {
  "A+": 4.00, "A": 4.00, "A-": 3.70,
  "B+": 3.30, "B": 3.00, "B-": 2.70,
  "C+": 2.30, "C": 2.00, "C-": 1.70,
  "D":  1.30, "E": 0.00,
};

export const GRADE_LIST = Object.keys(GRADE_POINTS);

export const GRADE_META = {
  "A+": { label: "Excellent",        range: "85 and above", color: "#22d3a0" },
  "A":  { label: "Excellent",        range: "75 – 84",      color: "#22d3a0" },
  "A-": { label: "Very Good",        range: "70 – 74",      color: "#4ade80" },
  "B+": { label: "Good",             range: "65 – 69",      color: "#86efac" },
  "B":  { label: "Good",             range: "60 – 64",      color: "#a3e635" },
  "B-": { label: "Satisfactory",     range: "55 – 59",      color: "#facc15" },
  "C+": { label: "Pass",             range: "50 – 54",      color: "#fb923c" },
  "C":  { label: "Pass",             range: "45 – 49",      color: "#f97316" },
  "C-": { label: "Weak Pass",        range: "40 – 44",      color: "#ef4444" },
  "D":  { label: "Conditional Pass", range: "35 – 39",      color: "#dc2626" },
  "E":  { label: "Fail",             range: "00 – 34",      color: "#991b1b" },
};

export function calcSGPA(modules) {
  if (!modules || modules.length === 0) return null;
  const tc = modules.reduce((s, m) => s + Number(m.credits), 0);
  if (!tc) return null;
  const tp = modules.reduce((s, m) => s + Number(m.credits) * (GRADE_POINTS[m.grade] ?? 0), 0);
  return tp / tc;
}

export function calcOGPA(semesters) {
  return calcSGPA(semesters.flatMap(s => s.modules));
}

export function gpaColor(gpa) {
  if (gpa === null) return "#55556a";
  if (gpa >= 3.70) return "#22d3a0";
  if (gpa >= 3.30) return "#4ade80";
  if (gpa >= 3.00) return "#a3e635";
  if (gpa >= 2.00) return "#facc15";
  if (gpa >= 1.30) return "#fb923c";
  return "#ef4444";
}

export function gpaClassification(ogpa) {
  if (ogpa === null) return null;
  if (ogpa >= 3.70) return "First Class";
  if (ogpa >= 3.30) return "Second Upper";
  if (ogpa >= 3.00) return "Second Lower";
  if (ogpa >= 2.00) return "Pass";
  return "Fail";
}

export function getLetterGrade(gpa) {
  if (gpa >= 3.85) return "A+";
  if (gpa >= 3.50) return "A";
  if (gpa >= 3.15) return "A-";
  if (gpa >= 2.85) return "B+";
  if (gpa >= 2.50) return "B";
  if (gpa >= 2.15) return "B-";
  if (gpa >= 1.85) return "C+";
  if (gpa >= 1.50) return "C";
  if (gpa >= 1.15) return "C-";
  if (gpa >= 0.65) return "D";
  return "E";
}
