"use client";

import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import { simulateCO2SavedKg } from "../../lib/mockData";
import { useMemo } from "react";

export default function ImpactoVerde() {
  const kg = useMemo(() => simulateCO2SavedKg(), []);
  return (
    <div className="min-h-screen pb-28">
      <Header />
      <main className="mx-auto max-w-md px-4 py-4 space-y-4">
        <h1 className="text-lg font-bold">Impacto Verde</h1>
        <div className="bg-white border border-gray-200 rounded-xl2 shadow-soft p-4">
          <p className="text-sm">
            Este mes, tus envíos coordinados vía <b>MOVER YA</b> ayudaron a reducir viajes vacíos y optimizar rutas.
          </p>
          <p className="text-2xl font-extrabold mt-2 text-brand-900">{kg} kg de CO₂</p>
          <p className="text-xs text-gray-600 mt-1">
            Métrica simulada a modo de demostración.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl2 shadow-soft p-3">
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Consolidación de cargas medianas y grandes.</li>
            <li>Priorización de vehículos con alta ocupación.</li>
            <li>Rutas optimizadas para menor huella de carbono.</li>
          </ul>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
