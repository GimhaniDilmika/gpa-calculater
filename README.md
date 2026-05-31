# GPA Calculator

A web app to track your semester GPA (SGPA) and overall GPA (OGPA).  
Built with Next.js 14 · Data saved in localStorage (no backend needed).

## Grading Scale

| Grade | Marks Range  | GPV  | Description       |
|-------|-------------|------|-------------------|
| A+    | 85 and above| 4.00 | Excellent         |
| A     | 75 – 84     | 4.00 | Excellent         |
| A-    | 70 – 74     | 3.70 | Very Good         |
| B+    | 65 – 69     | 3.30 | Good              |
| B     | 60 – 64     | 3.00 | Good              |
| B-    | 55 – 59     | 2.70 | Satisfactory      |
| C+    | 50 – 54     | 2.30 | Pass              |
| C     | 45 – 49     | 2.00 | Pass              |
| C-    | 40 – 44     | 1.70 | Weak Pass         |
| D     | 35 – 39     | 1.30 | Conditional Pass  |
| E     | 00 – 34     | 0.00 | Fail              |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open http://localhost:3000
```

## Project Structure

```
gpa-calculator/
├── app/
│   ├── layout.jsx          # Root layout
│   ├── page.jsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── StatsBar.jsx        # OGPA / modules / credits summary
│   ├── SemesterCard.jsx    # Per-semester card with module table
│   ├── AddModuleForm.jsx   # Form to add a module
│   └── GradeReference.jsx # Collapsible grading scale table
├── lib/
│   ├── gpaCalculator.js    # SGPA / OGPA formulas + grade data
│   └── useGPA.js           # React hook for all state + localStorage
├── package.json
├── next.config.js
└── jsconfig.json
```

## Customising the Grading Scale

Edit `lib/gpaCalculator.js` — update `GRADE_POINTS` and `GRADE_DESCRIPTIONS` to match your university's scale. Everything else (SGPA, OGPA, colour coding) updates automatically.

## Deployment

```bash
npm run build
npm run start
```

Or deploy to [Vercel](https://vercel.com) for free — just push to GitHub and connect the repo.
```
git init && git add . && git commit -m "Initial commit"
# Then connect to Vercel at vercel.com/new
```
