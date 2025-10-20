// src/app/impacto-verde/page.js
"use client";

import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import { simulateCO2SavedKg } from "../../lib/mockData";
import { useMemo, useState } from "react";

export default function ImpactoVerde() {
  // Valor demo actual
  const kg = useMemo(() => simulateCO2SavedKg(), []);
  // Meta mensual demo (ajustable)
  const monthlyGoal = 1000; // kg CO₂
  const progress = Math.min(100, Math.round((kg / monthlyGoal) * 100));

  // Equivalencias (valores de referencia, demo):
  // 1 árbol maduro ~21 kg CO₂/año (estimado simple)
  // 1 km en flete medio ~0.20 kg CO₂ (estimado simple)
  const trees = Math.max(1, Math.round(kg / 21));
  const kmAvoided = Math.max(1, Math.round(kg / 0.2));

  // Tendencia demo (últimos 7 días)
  const trend = useMemo(() => {
    // genera 7 puntos suaves con pico cerca del actual
    const base = Math.max(20, Math.round(kg / 10));
    return Array.from({ length: 7 }, (_, i) => {
      const jitter = Math.round((Math.sin(i) + 1) * (base / 6));
      return base + jitter + (i === 6 ? Math.round(kg * 0.05) : 0);
    });
  }, [kg]);

  // Donut SVG
  const R = 42;
  const C = 2 * Math.PI * R;
  const dash = (progress / 100) * C;

  // Acordeón simple
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main
        className="flex-1 pb-28"
        style={{ paddingBottom: "calc(6.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto max-w-md px-4 py-4 space-y-4">
          <div>
            <h1 className="text-lg font-bold">Impacto Verde</h1>
            <p className="text-xs text-gray-600 mt-0.5">
              Reducción de emisiones por optimización de retornos (demo).
            </p>
          </div>

          {/* Donut + dato principal */}
          <section className="bg-white border border-gray-200 rounded-2xl shadow-soft p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 120 120" className="block">
                  <circle
                    cx="60"
                    cy="60"
                    r={R}
                    stroke="#E5E7EB"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={R}
                    stroke="#15C39A"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${C - dash}`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xl font-extrabold text-brand-900">{progress}%</div>
                  <div className="text-[11px] text-gray-500">de la meta</div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-700">
                  Este mes evitaste
                </div>
                <div className="text-3xl font-extrabold text-brand-900 leading-tight">
                  {kg.toLocaleString()} kg CO₂
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Meta mensual: {monthlyGoal.toLocaleString()} kg
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl2 border border-gray-200 p-2">
                    <div className="font-semibold text-gray-800">{trees.toLocaleString()}</div>
                    <div className="text-gray-600">árboles/año equivalentes</div>
                  </div>
                  <div className="rounded-xl2 border border-gray-200 p-2">
                    <div className="font-semibold text-gray-800">{kmAvoided.toLocaleString()} km</div>
                    <div className="text-gray-600">de retorno evitados</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sparkline de tendencia */}
          <section className="bg-white border border-gray-200 rounded-2xl shadow-soft p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Tendencia semanal</h2>
              <span className="text-xs text-gray-500">kg CO₂/día</span>
            </div>
            <Sparkline data={trend} height={64} className="mt-3" />
            <div className="mt-2 text-xs text-gray-600">
              Incrementos diarios asociados a consolidación de cargas y menor ociosidad de flota.
            </div>
          </section>

          {/* Acordeón metodología */}
          <section className="bg-white border border-gray-200 rounded-2xl shadow-soft">
            <button
              className="w-full px-4 py-3 text-left flex items-center justify-between"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              <span className="text-sm font-semibold">Metodología (demo)</span>
              <span className="text-xs text-gray-500">{open ? "Ocultar" : "Ver"}</span>
            </button>
            {open && (
              <div className="px-4 pb-4 text-xs text-gray-700 space-y-2">
                <p>
                  El cálculo de CO₂ evita viajes en vacío estimando <b>kg CO₂</b> por km y
                  consolidación de carga en retornos. Los factores usados aquí son de demostración:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><b>Árboles</b>: 1 árbol maduro ≈ 21 kg CO₂/año.</li>
                  <li><b>Emisión vial</b>: 1 km de flete medio ≈ 0.20 kg CO₂.</li>
                  <li>Los valores se redondean para facilitar la lectura.</li>
                </ul>
                <p>
                  En producción, integrá factores por tipo de vehículo, combustible, carga útil y
                  telemetría real para mayor precisión.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

/** Pequeño sparkline SVG sin librerías */
function Sparkline({ data, width = 320, height = 64, className = "" }) {
  if (!data?.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pad = 6;
  const W = width;
  const H = height;
  const dx = (W - pad * 2) / (data.length - 1);
  const norm = (v) => {
    if (max === min) return H / 2;
    // invertimos para que valores altos vayan hacia arriba
    return pad + (H - pad * 2) * (1 - (v - min) / (max - min));
  };
  const d = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${pad + dx * i} ${norm(v)}`)
    .join(" ");

  // Área bajo la curva (suave)
  const area = `${d} L ${pad + dx * (data.length - 1)} ${H - pad} L ${pad} ${H - pad} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} className={className}>
      <rect x="0" y="0" width={W} height={H} rx="10" ry="10" fill="white" />
      <path d={area} fill="#15C39A22" />
      <path d={d} fill="none" stroke="#15C39A" strokeWidth="2.5" />
      {/* puntos */}
      {data.map((v, i) => (
        <circle key={i} cx={6 + ((W - 12) / (data.length - 1)) * i} cy={norm(v)} r="2.5" fill="#15C39A" />
      ))}
    </svg>
  );
}
