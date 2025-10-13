// src/components/ReturnList.js
"use client";

export default function ReturnList({ offers = [], onPick }) {
  if (!offers.length) return null;

  return (
    <div className="container max-w-md mt-4 space-y-3">
      {offers.map((o) => (
        <div key={o.id} className="card p-3">
          <div className="text-sm font-semibold">
            {o.vehiculo.tipo} volviendo {o.route.from} → {o.route.to}
          </div>
          <div className="text-xs text-ink-soft mt-0.5">
            Ventana: {o.window} · Capacidad: {o.capacity.kg} kg / {o.capacity.m3} m³
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-brand-900 font-bold text-sm">${o.costo.toLocaleString()}</div>
            <button
              onClick={() => onPick?.(o)}
              className="rounded-full bg-accent text-brand-900 text-xs font-semibold px-3 py-1.5 hover:bg-accent-600 transition"
            >
              Aprovechar retorno
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
