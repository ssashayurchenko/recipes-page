import "./global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen font-sans flex flex-col justify-center items-center bg-gradient-to-br from-yellow-100 via-white to-yellow-50">
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 md:py-12 lg:py-16 text-center">
          {children}
        </main>
      </body>
    </html>
  );
}
