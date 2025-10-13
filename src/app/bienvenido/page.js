// src/app/bienvenido/page.js
"use client";

import Link from "next/link";
import { ArrowRight, Truck, PackageSearch } from "lucide-react";

export default function Bienvenido() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FB]">
      {/* Branding */}
      <header className="pt-10">
        <div className="container max-w-md text-center">
          <div className="text-[28px] font-black tracking-tight">
            <span className="text-brand-900">MOVER </span>
            <span className="text-accent">YA</span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            Bienvenido/a — optimizamos retornos para reducir costos y CO₂.
          </p>
        </div>
        <div className="mt-4 h-1 w-full bg-gradient-to-r from-accent via-accent/70 to-accent/40" />
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="container max-w-md text-center">
          <h1 className="text-2xl font-extrabold text-brand-900">¡Bienvenido a MOVER YA!</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Conectamos cargas con camiones que vuelven vacíos.
          </p>

          <div className="mt-6 grid gap-3">
            {/* CTA 1: Quiero enviar (Solicitante) */}
            <Link
              href="/"
              className="card p-4 rounded-xl2 text-left hover:shadow-soft transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="icon-badge">
                  <PackageSearch className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-brand-900">Quiero enviar</div>
                  <div className="text-xs text-ink-soft">Publica tu carga y aprovecha un retorno</div>
                </div>
                <ArrowRight className="w-5 h-5 text-ink/70" />
              </div>
            </Link>

            {/* CTA 2: Soy transportista */}
            <Link
              href="/"
              className="card p-4 rounded-xl2 text-left hover:shadow-soft transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="icon-badge">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-brand-900">Soy transportista</div>
                  <div className="text-xs text-ink-soft">Completa tu retorno con una carga</div>
                </div>
                <ArrowRight className="w-5 h-5 text-ink/70" />
              </div>
            </Link>
          </div>

          <p className="mt-6 text-[11px] text-ink-soft">
            Al continuar aceptas nuestras condiciones y política de privacidad.
          </p>
        </div>
      </main>

      {/* Footer mini */}
      <footer className="pb-6">
        <div className="container max-w-md text-center text-xs text-ink-soft">
          © {new Date().getFullYear()} MOVER YA
        </div>
      </footer>
    </div>
  );
}
