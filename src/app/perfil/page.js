"use client";

import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";

export default function Perfil() {
  return (
    <div className="min-h-screen pb-28">
      <Header />
      <main className="mx-auto max-w-md px-4 py-4 space-y-3">
        <h1 className="text-lg font-bold">Perfil</h1>
        <p className="text-sm text-gray-700">Datos del usuario (placeholder para demo).</p>
      </main>
      <BottomNav />
    </div>
  );
}
