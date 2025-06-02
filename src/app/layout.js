import "./global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="min-h-screen font-sans flex flex-col "
        style={{ backgroundColor: "#FFF8DC", color: "#5C3A00" }} 
      >
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 md:py-12 lg:py-16 ">
          {children}
        </main>
      </body>
    </html>
  );
}
