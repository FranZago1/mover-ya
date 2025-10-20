// src/components/MatchModal.js
"use client";

import { X, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MatchModal({ open, onClose, data }) {
  const router = useRouter();
  if (!open || !data) return null;

  const confirmar = () => {
    try {
      const prev = JSON.parse(localStorage.getItem("misEnvios") || "[]");
      const nuevo = {
        id: data.id || Date.now(),
        empresa: data.empresa,
        vehiculoTipo: data.vehiculo?.tipo,
        patente: data.vehiculo?.patente,
        costo: data.costo,
        estado: "Confirmado",
        fecha: new Date().toISOString(),
        route: data.route,
        window: data.window,
        capacity: data.capacity,
        co2SavedKg: data.co2SavedKg,
        isReturn: data.isReturn,
      };
      localStorage.setItem("misEnvios", JSON.stringify([nuevo, ...prev]));
    } catch {}
    onClose?.();
    router.push("/mis-envios");
  };

  return (
    // ⬇️ z-index MUY alto para quedar arriba de panes de Leaflet
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-xl2 sm:shadow-soft sm:border sm:border-gray-200 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-accent" aria-hidden="true" />
            <h2 className="text-lg font-bold">Match Encontrado</h2>
          </div>
          <button aria-label="Cerrar" onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 space-y-2 text-sm">
          <div><span className="font-semibold">Empresa Aliada:</span> {data.empresa}</div>
          <div>
            <span className="font-semibold">Vehículo Asignado:</span> {data.vehiculo?.tipo} · Patente {data.vehiculo?.patente}
          </div>
          {data.route && (
            <div>
              <span className="font-semibold">Ruta (retorno):</span> {data.route.from} → {data.route.to} {data.window ? `· ${data.window}` : ""}
            </div>
          )}
          {data.capacity && (
            <div>
              <span className="font-semibold">Capacidad disponible:</span> {data.capacity.kg} kg / {data.capacity.m3} m³
            </div>
          )}
          {typeof data.co2SavedKg === "number" && (
            <div><span className="font-semibold">Ahorro CO₂ estimado:</span> {data.co2SavedKg} kg</div>
          )}
          <div><span className="font-semibold">ETA:</span> {data.etaMin} min</div>
          <div>
            <span className="font-semibold">Costo Total Estimado:</span>{" "}
            <span className="text-brand-900 font-bold">${data.costo?.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={confirmar} className="flex-1 bg-accent text-brand-900 font-semibold py-2 rounded-xl2">
            Confirmar Envío
          </button>
          <button onClick={onClose} className="flex-1 bg-gray-100 text-brand-900 font-semibold py-2 rounded-xl2">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
