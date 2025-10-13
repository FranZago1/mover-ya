import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MOVER YA - Prototipo",
  description: "Prototipo UI/UX logística de cargas medianas y grandes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} text-ink`}>
        {/* Shell centrado (simula un teléfono dentro del desktop) */}
        <div className="app-shell relative">
          {children}
        </div>
      </body>
    </html>
  );
}
