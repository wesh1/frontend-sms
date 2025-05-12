// src/app/layout.tsx
import './globals.css';  // Optional: Add global styles here

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Login Demo</title>
      </head>
      <body>
        {children}  {/* This will render the content of the pages */}
      </body>
    </html>
  );
}
