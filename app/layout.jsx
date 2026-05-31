import "./globals.css";

export const metadata = {
  title: "GPA Calculator",
  description: "Track your semester GPA and overall GPA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
