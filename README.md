# GPA Calculator

A responsive web app to track your semester GPA (SGPA) and overall GPA (OGPA).
Built with Next.js 14. Data is saved in the browser using localStorage, so no backend is required.

## Screenshot

![GPA Calculator Dashboard](screenshots/gpa-calculator-dashboard.jpg)

## Features

* Add, rename, expand, and delete semesters
* Add modules with module name, credit value, and grade
* Automatically calculate SGPA for each semester
* Automatically calculate OGPA across all semesters
* Display total modules and total credits
* Built-in grading scale reference table
* Responsive dark dashboard UI
* Data saved locally in the browser using localStorage

## Grading Scale

| Grade | Marks Range  | GPV  | Description      |
| ----- | ------------ | ---- | ---------------- |
| A+    | 85 and above | 4.00 | Excellent        |
| A     | 75 – 84      | 4.00 | Excellent        |
| A-    | 70 – 74      | 3.70 | Very Good        |
| B+    | 65 – 69      | 3.30 | Good             |
| B     | 60 – 64      | 3.00 | Good             |
| B-    | 55 – 59      | 2.70 | Satisfactory     |
| C+    | 50 – 54      | 2.30 | Pass             |
| C     | 45 – 49      | 2.00 | Pass             |
| C-    | 40 – 44      | 1.70 | Weak Pass        |
| D     | 35 – 39      | 1.30 | Conditional Pass |
| E     | 00 – 34      | 0.00 | Fail             |

## Getting Started


# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open the app
http://localhost:3000


## Project Structure


gpa-calculator/
├── app/
│   ├── layout.jsx          # Root layout
│   ├── page.jsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── StatsBar.jsx        # OGPA / modules / credits summary
│   ├── SemesterCard.jsx    # Per-semester card with module table
│   ├── AddModuleForm.jsx   # Form to add a module
│   └── GradeReference.jsx  # Collapsible grading scale table
├── lib/
│   ├── gpaCalculator.js    # SGPA / OGPA formulas + grade data
│   └── useGPA.js           # React hook for state + localStorage
├── screenshots/
│   └── gpa-calculator-dashboard.jpg
├── package.json
├── next.config.js
└── jsconfig.json


## Customising the Grading Scale

Edit `lib/gpaCalculator.js` and update `GRADE_POINTS` and `GRADE_DESCRIPTIONS` to match your university's grading scale. The SGPA, OGPA, and colour coding will update automatically.

## Deployment

Build the project:


npm run build
npm run start


You can also deploy this project to Vercel by pushing the project to GitHub and importing the repository into Vercel.
a5555555555555
