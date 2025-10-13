"use client";

import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

export default function MisEnvios() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("misEnvios") || "[]");
      setItems(saved);
    } catch {}
  }, []);

  return (
    <div className="min-h-screen pb-28">
      <Header />
      <main className="mx-auto max-w-md px-4 py-4 space-y-3">
        <h1 className="text-lg font-bold">Mis Envíos</h1>
        {items.length === 0 ? (
          <p className="text-sm text-gray-600">Todavía no hay envíos confirmados.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.id} className="bg-white border border-gray-200 rounded-xl2 p-3 shadow-soft">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{it.empresa}</div>
                  <div className="text-sm text-brand-900 font-bold">${it.costo.toLocaleString()}</div>
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  {it.vehiculoTipo} · Patente {it.patente}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(it.fecha).toLocaleString()}
                </div>
                <div className="mt-2 inline-flex items-center rounded-full bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5">
                  {it.estado}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
