"use client";
import Link from "next/link";
import { Home, Package, User, Leaf } from "lucide-react";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/mis-envios", label: "Mis Envíos", icon: Package },
  { href: "/perfil", label: "Perfil", icon: User },
  { href: "/impacto-verde", label: "Sustentabilidad", icon: Leaf },
];

export default function BottomNav() {
  const pathname = usePathname();
  // Ocultar en /bienvenido si querés mantener la pantalla limpia
  if (pathname.startsWith("/bienvenido")) return null;

  return (
    <nav className="sticky bottom-0 z-30">
      {/* Barra dentro del shell: card con borde y radio */}
      <div className="mx-auto max-w-[420px] px-3">
        <div className="bg-white border border-gray-200 rounded-t-2xl shadow-card">
          <div className="grid grid-cols-4">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = pathname === t.href;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className="relative flex flex-col items-center justify-center py-2.5"
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={`w-5 h-5 ${active ? "text-brand-700" : "text-ink/60"}`} aria-hidden="true" />
                  <span className={`text-[11px] mt-0.5 ${active ? "text-brand-700 font-semibold" : "text-ink/60"}`}>
                    {t.label}
                  </span>
                  {active && <span className="absolute -top-[2px] h-1 w-8 rounded-full bg-accent" />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
