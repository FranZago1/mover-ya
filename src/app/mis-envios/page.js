// src/app/mis-envios/page.js
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MessageSquareText, XCircle, CheckCircle2, Truck, RefreshCw } from "lucide-react";

import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";

/* -------- Wrapper con Suspense (evita CSR bailout) -------- */
export default function MisEnviosPage() {
  return (
    <Suspense fallback={<MisEnviosSkeleton />}>
      <MisEnviosInner />
    </Suspense>
  );
}

/* -------- Componente real que usa useSearchParams -------- */
function MisEnviosInner() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const load = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("misEnvios") || "[]");
      setItems(saved);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Highlight si venimos desde una confirmación (?new=ID)
  const highlightedId = useMemo(() => {
    const v = searchParams.get("new");
    const id = v ? Number(v) : null;
    return Number.isFinite(id) ? id : null;
  }, [searchParams]);

  const persist = (next) => {
    try {
      localStorage.setItem("misEnvios", JSON.stringify(next));
    } catch {}
    setItems(next);
  };

  const cancelShipment = (id) => {
    const it = items.find((e) => e.id === id);
    if (!it || it.estado === "Cancelado") return;

    const ok = confirm("¿Seguro que querés cancelar este envío?");
    if (!ok) return;

    const next = items.map((e) =>
      e.id === id ? { ...e, estado: "Cancelado", canceladoAt: new Date().toISOString() } : e
    );
    persist(next);
  };

  const statusPill = (estado) => {
    switch (estado) {
      case "Confirmado":
        return "bg-green-100 text-green-800";
      case "En ruta":
        return "bg-blue-100 text-blue-800";
      case "Cancelado":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main
        className="flex-1 pb-28"
        style={{ paddingBottom: "calc(6.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto max-w-md px-4 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Mis Envíos</h1>
            <button
              onClick={load}
              className="inline-flex items-center gap-2 text-sm text-brand-700 hover:underline"
              title="Actualizar"
            >
              <RefreshCw className="w-4 h-4" /> Actualizar
            </button>
          </div>

          {loading ? (
            <p className="text-sm text-gray-600">Cargando…</p>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center">
              <Truck className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Todavía no hay envíos confirmados.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li
                  key={it.id}
                  className={`bg-white border border-gray-200 rounded-xl2 p-3 shadow-soft transition ${
                    highlightedId === it.id ? "ring-2 ring-accent/60" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{it.empresa}</div>
                      <div className="text-sm text-gray-700 mt-0.5 truncate">
                        {it.vehiculoTipo} · Patente {it.patente}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {new Date(it.fecha).toLocaleString()}
                      </div>
                      {it.route && (
                        <div className="text-xs text-gray-600 mt-0.5">
                          Ruta: {it.route?.from} → {it.route?.to}
                          {it.window ? ` · ${it.window}` : ""}
                        </div>
                      )}
                      <div className={`mt-2 inline-flex items-center rounded-full text-xs font-semibold px-2 py-0.5 ${statusPill(it.estado)}`}>
                        {it.estado}
                      </div>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <div className="text-sm text-brand-900 font-bold">
                        ${it.costo?.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link
                      href={`/chats?shipment=${it.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl2 bg-brand-900 text-white py-2 text-sm font-semibold"
                    >
                      <MessageSquareText className="w-4 h-4" />
                      Chatear con el transporte
                    </Link>

                    <button
                      onClick={() => cancelShipment(it.id)}
                      disabled={it.estado === "Cancelado"}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl2 py-2 text-sm font-semibold border ${
                        it.estado === "Cancelado"
                          ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                          : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                      }`}
                    >
                      <XCircle className="w-4 h-4" />
                      Cancelar envío
                    </button>
                  </div>

                  {it.estado === "Cancelado" && it.canceladoAt && (
                    <div className="mt-2 text-[11px] text-gray-500">
                      Cancelado el {new Date(it.canceladoAt).toLocaleString()}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 className="w-4 h-4" />
            Los cambios se guardan localmente (demo).
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

/* -------- Skeleton para Suspense fallback -------- */
function MisEnviosSkeleton() {
  return (
    <div className="min-h-dvh flex flex-col animate-pulse">
      <Header />
      <main className="flex-1 pb-28" style={{ paddingBottom: "calc(6.5rem + env(safe-area-inset-bottom))" }}>
        <div className="mx-auto max-w-md px-4 py-4 space-y-3">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="rounded-2xl border border-dashed border-gray-300 p-6">
            <div className="h-5 w-2/3 bg-gray-100 rounded mb-2" />
            <div className="h-4 w-1/2 bg-gray-100 rounded" />
          </div>
          <div className="h-20 bg-gray-100 rounded-2xl" />
          <div className="h-20 bg-gray-100 rounded-2xl" />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
