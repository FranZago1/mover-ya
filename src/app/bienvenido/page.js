// src/app/bienvenido/page.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Truck, PackageSearch } from "lucide-react";

export default function Bienvenido() {
  const [showIntro, setShowIntro] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setShowIntro(false);
      return;
    }
    const t = setTimeout(() => setShowIntro(false), 2600);
    return () => clearTimeout(t);
  }, [shouldReduceMotion]);

  return (
    <div className="min-h-dvh flex flex-col bg-[#F6F8FB]">
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}

      {/* Branding */}
      <header className="pt-10">
        <div className="container max-w-md mx-auto text-center px-4">
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
        <div className="container max-w-md mx-auto text-center px-4">
          <motion.h1
            className="text-2xl font-extrabold text-brand-900"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            ¡Bienvenido a MOVER YA!
          </motion.h1>
          <motion.p
            className="mt-2 text-sm text-ink-soft"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
          >
            Conectamos cargas con camiones que vuelven vacíos.
          </motion.p>

          <div className="mt-6 grid gap-3">
            {/* CTA 1: Quiero enviar */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.18 }}>
              <Link href="/" className="card p-4 rounded-xl2 text-left hover:shadow-soft transition active:scale-[0.99]">
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
            </motion.div>

            {/* CTA 2: Soy transportista */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.24 }}>
              <Link href="/" className="card p-4 rounded-xl2 text-left hover:shadow-soft transition active:scale-[0.99]">
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
            </motion.div>
          </div>

          <motion.p className="mt-6 text-[11px] text-ink-soft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: 0.3 }}>
            Al continuar aceptas nuestras condiciones y política de privacidad.
          </motion.p>
        </div>
      </main>

      {/* Footer mini */}
      <footer className="pb-6">
        <div className="container max-w-md mx-auto text-center text-xs text-ink-soft px-4">
          © {new Date().getFullYear()} MOVER YA
        </div>
      </footer>
    </div>
  );
}

/** Intro sin clip-path, con cortina deslizante y desmontaje limpio */
function Intro({ onFinish }) {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#0B1020] text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onFinish}
      style={{
        willChange: "opacity",
        isolation: "isolate",
        contain: "layout paint style size",
      }}
    >
      {/* marco móvil */}
      <div className="mx-auto max-w-[420px] h-full px-4 relative overflow-hidden flex items-center justify-center">
        {/* Título */}
        <div className="absolute top-[22%] left-0 right-0 text-center select-none">
          <div className="text-[34px] font-black tracking-tight text-white/20">
            MOVER <span className="text-[#15C39A]/30">YA</span>
          </div>

          {/* capa revelada (texto pleno) */}
          <div className="absolute inset-0">
            <div className="text-[34px] font-black tracking-tight">
              <span className="text-white">MOVER </span>
              <span className="text-[#15C39A]">YA</span>
            </div>
            {/* cortina: un panel del color del overlay que se corre de izq→der */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "110%" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="absolute inset-y-0 left-0"
              style={{
                width: "110%",
                background: "#0B1020",
                willChange: "transform",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />
          </div>
        </div>

        {/* Ruta + camión (sin vw, dentro del contenedor) */}
        <div className="absolute bottom-[24%] left-0 right-0">
          <div className="mx-auto max-w-[420px] px-4">
            <div className="h-1.5 bg-white/10 rounded-full relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 w-1/2"
                style={{
                  background:
                    "repeating-linear-gradient(90deg,transparent,transparent 10px,rgba(255,255,255,0.35) 10px,rgba(255,255,255,0.35) 20px)",
                  animation: "road 1.2s linear infinite",
                  willChange: "transform",
                }}
              />
            </div>

            <div className="relative h-0">
              <motion.div
                initial={{ left: "-25%" }}
                animate={{ left: "105%" }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="absolute -top-6"
                style={{
                  willChange: "left, transform",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  // que no proyecte sombras fuera del marco
                  contain: "layout paint",
                }}
              >
                {/* SVG inline (menos artefactos que iconos con fuentes) */}
                <svg className="w-14 h-14 drop-shadow-[0_4px_20px_rgba(21,195,154,0.6)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 6h11v7h2l3 3v2h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V6Z" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Ocultar totalmente al final (por si Safari deja un frame colgado) */}
      <style jsx>{`
        @keyframes road { from { transform: translateX(0); } to { transform: translateX(100%); } }
        /* cuando termina la animación de opacidad, escondemos visualmente el overlay */
        [style*="opacity: 0"] { visibility: hidden; }
      `}</style>
    </motion.div>
  );
}

