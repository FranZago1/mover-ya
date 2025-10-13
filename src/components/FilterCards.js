"use client";
import { Package, Truck, Timer } from "lucide-react";

export default function FilterCards({ onSelect }) {
  const base = "card px-3 py-3 active:scale-[0.99] transition";
  const Title = ({ children }) => <div className="mt-2 text-[13px] font-semibold">{children}</div>;
  const Sub = ({ children }) => <div className="text-xs text-ink/70">{children}</div>;

  return (
    <div className="container max-w-md mt-4 grid grid-cols-3 gap-3" role="group" aria-label="Tipo de carga">
      <button type="button" className={`${base} text-left`} onClick={() => onSelect?.("mediana")} aria-label="Paquetería / Carga Mediana">
        <div className="icon-badge"><Package className="w-5 h-5" /></div>
        <Title>Paquetería</Title>
        <Sub>Carga mediana</Sub>
      </button>

      <button type="button" className={`${base} text-left`} onClick={() => onSelect?.("grande")} aria-label="Carga Grande / Voluminosa">
        <div className="icon-badge"><Truck className="w-5 h-5" /></div>
        <Title>Carga grande</Title>
        <Sub>Voluminosa</Sub>
      </button>

      <div className={`${base} text-left opacity-60`}>
        <div className="icon-badge"><Timer className="w-5 h-5" /></div>
        <Title>Courier</Title>
        <Sub>(Futuro)</Sub>
      </div>
    </div>
  );
}
