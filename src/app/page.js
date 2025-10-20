// src/app/page.js
"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterCards from "../components/FilterCards";
import ImpactCard from "../components/ImpactCard";
import BottomNav from "../components/BottomNav";
import MatchModal from "../components/MatchModal";
import ReturnToggle from "../components/ReturnToggle";
import ReturnList from "../components/ReturnList";
import {
  simulateCO2SavedKg,
  simulateMatch,
  simulateReturnOffers,
} from "../lib/mockData";

const MapNoSSR = dynamic(() => import("../components/MapClient"), { ssr: false });

export default function HomePage() {
  const [onlyReturns, setOnlyReturns] = useState(true);
  const [impact] = useState(simulateCO2SavedKg());
  const offers = useMemo(() => simulateReturnOffers(), []);
  const [matchOpen, setMatchOpen] = useState(false);
  const [matchData, setMatchData] = useState(null);
  const [notice, setNotice] = useState(null); // aviso cuando no hay match

  const openMatchForCategory = (categoria) => {
    const m = simulateMatch(categoria);
    setMatchData(m);
    setMatchOpen(true);
  };

  const openMatchFromOffer = (offer) => {
    setMatchData(offer);
    setMatchOpen(true);
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      {/* Contenido principal centrado y con espacio para la BottomNav fija */}
      <main
        className="flex-1 pb-28"
        style={{ paddingBottom: "calc(6.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto w-full max-w-[420px] px-3 space-y-4">
          <SearchBar
            onSubmit={({ data, outcome }) => {
              if (outcome === "found") {
                // Podés usar data.what / data.from / data.to para elegir categoría.
                // Para la demo, abrimos un match "mediana".
                openMatchForCategory("mediana");
              } else {
                setNotice(
                  "Guardamos tu solicitud. Te avisaremos con una notificación si encontramos un retorno compatible."
                );
                // limpiar aviso automático
                setTimeout(() => setNotice(null), 4000);
              }
            }}
          />

          {notice && (
            <div
              className="rounded-xl2 border border-blue-200 bg-blue-50 text-blue-800 text-sm px-3 py-2"
              role="status"
              aria-live="polite"
            >
              {notice}
            </div>
          )}

          <ReturnToggle checked={onlyReturns} onChange={setOnlyReturns} />
          <FilterCards onSelect={openMatchForCategory} />
          <MapNoSSR />
          <ReturnList offers={offers} onPick={openMatchFromOffer} />
          <ImpactCard kg={impact} />
        </div>
      </main>

      {/* Fija al fondo (definida con fixed en el componente) */}
      <BottomNav />

      <MatchModal
        open={matchOpen}
        onClose={() => setMatchOpen(false)}
        data={
          matchData || {
            empresa: "",
            vehiculo: { tipo: "", patente: "" },
            costo: 0,
            etaMin: 0,
          }
        }
      />
    </div>
  );
}
