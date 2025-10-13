// src/app/page.js
"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterCards from "../components/FilterCards"; // o FilterCard según tu nombre
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
  const [query, setQuery] = useState("");
  const [onlyReturns, setOnlyReturns] = useState(true);
  const [impact] = useState(simulateCO2SavedKg());
  const offers = useMemo(() => simulateReturnOffers(), []);
  const [matchOpen, setMatchOpen] = useState(false);
  const [matchData, setMatchData] = useState(null);

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
    <div className="min-h-screen pb-28">
      <Header />
      <main className="safe-bottom">
        <SearchBar value={query} onChange={setQuery} onSubmit={() => openMatchForCategory("mediana")} />
        <ReturnToggle checked={onlyReturns} onChange={setOnlyReturns} />
        <FilterCards onSelect={openMatchForCategory} />
        <MapNoSSR />
        <ReturnList offers={offers} onPick={openMatchFromOffer} />
        <ImpactCard kg={impact} />
      </main>
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
