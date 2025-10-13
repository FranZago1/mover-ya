"use client";

export default function ImpactCard({ kg }) {
  return (
    <div className="container max-w-md mt-4">
      <div className="card p-4">
        <p className="text-sm font-semibold flex items-center gap-2">
          <span className="inline-flex w-5 h-5 rounded-full bg-accent/30" /> 🌱 Tu Impacto Verde
        </p>
        <p className="text-[15px] text-ink mt-1">
          Reducimos los viajes vacíos. Has ahorrado <b>{kg} kg de CO₂</b> este mes.
        </p>
      </div>
    </div>
  );
}
