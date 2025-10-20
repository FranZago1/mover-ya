// src/components/SearchBar.js
"use client";

import { useMemo, useState } from "react";
import { Search, Loader2, CheckCircle2, Bell } from "lucide-react";

export default function SearchBar({
  defaultValues,
  onSubmit, // (payload: { data, outcome }) => void
}) {
  const [from, setFrom] = useState(defaultValues?.from || "");
  const [to, setTo] = useState(defaultValues?.to || "");
  const [date, setDate] = useState(defaultValues?.date || "");
  const [time, setTime] = useState(defaultValues?.time || "");
  const [what, setWhat] = useState(defaultValues?.what || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { type: "found" | "pending", message: string }

  const isValid = useMemo(() => {
    return from.trim() && to.trim() && date && time && what.trim();
  }, [from, to, date, time, what]);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!isValid || loading) return;

    setLoading(true);
    setResult(null);

    const data = {
      from: from.trim(),
      to: to.trim(),
      date,
      time,
      what: what.trim(),
      createdAt: new Date().toISOString(),
    };

    // Simulación de búsqueda 700–1100ms
    const delay = 700 + Math.round(Math.random() * 400);
    setTimeout(() => {
      const found = Math.random() < 0.55; // 55% “match encontrado”
      const outcome = found ? "found" : "pending";

      if (!found) {
        // guardamos solicitud pendiente en localStorage (demo)
        try {
          const prev = JSON.parse(localStorage.getItem("solicitudesPendientes") || "[]");
          localStorage.setItem("solicitudesPendientes", JSON.stringify([{ id: Date.now(), ...data }, ...prev]));
        } catch {}
      }

      if (onSubmit) {
        onSubmit({ data, outcome });
      } else {
        setResult(
          found
            ? {
                type: "found",
                message: "¡Match encontrado! Te mostramos las opciones disponibles.",
              }
            : {
                type: "pending",
                message:
                  "No encontramos match inmediato. Pondremos tu solicitud y te avisaremos con una notificación cuando haya un retorno compatible.",
              }
        );
      }

      setLoading(false);
    }, delay);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container max-w-md mt-4"
      role="search"
      aria-label="Buscar envío"
    >
      <div className="bg-white border border-gray-200 rounded-2xl shadow-soft p-3 space-y-3">
        {/* fila 1: desde / hasta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            className="w-full text-sm border border-gray-300 rounded-xl2 px-3 py-2 placeholder:text-gray-500"
            placeholder="Desde (origen)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            aria-label="Ubicación de origen"
          />
          <input
            type="text"
            className="w-full text-sm border border-gray-300 rounded-xl2 px-3 py-2 placeholder:text-gray-500"
            placeholder="Hasta (destino)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            aria-label="Ubicación de destino"
          />
        </div>

        {/* fila 2: fecha / hora */}
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            className="w-full text-sm border border-gray-300 rounded-xl2 px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Fecha"
          />
          <input
            type="time"
            className="w-full text-sm border border-gray-300 rounded-xl2 px-3 py-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            aria-label="Hora"
          />
        </div>

        {/* fila 3: qué transportás */}
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-brand-700 shrink-0" aria-hidden="true" />
          <input
            type="text"
            className="w-full text-sm placeholder:text-gray-500 border border-gray-300 rounded-xl2 px-3 py-2"
            placeholder="¿Qué necesitás transportar? (p. ej., pallets, muebles, electrodomésticos)"
            value={what}
            onChange={(e) => setWhat(e.target.value)}
            aria-label="Qué necesitás transportar"
          />
        </div>

        {/* acciones */}
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={!isValid || loading}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl2 bg-accent text-brand-900 text-sm font-semibold px-4 py-2 transition disabled:opacity-50"
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Buscando coincidencias…
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Buscar
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setFrom(""); setTo(""); setDate(""); setTime(""); setWhat(""); setResult(null);
            }}
            disabled={loading}
            className="px-3 py-2 text-sm rounded-xl2 border border-gray-300 text-gray-700 bg-white disabled:opacity-50"
          >
            Limpiar
          </button>
        </div>

        {/* resultado demo inline si no hay onSubmit */}
        {result && !onSubmit && (
          <div
            className={`mt-1 text-sm rounded-xl2 px-3 py-2 border ${
              result.type === "found"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-2">
              {result.type === "found" ? (
                <CheckCircle2 className="w-5 h-5 mt-0.5" />
              ) : (
                <Bell className="w-5 h-5 mt-0.5" />
              )}
              <p>{result.message}</p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
