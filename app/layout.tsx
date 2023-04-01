import Navbar from "@components/Navbar";
import { Providers } from "./providers";
import "../styles/globals.css"

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>NxtNews</title>
      </head>
      <body className="overflow-y-scroll bg-[url('/grid.svg')] bg-gray-1100">
        <Providers>
          <Navbar />
          <div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

