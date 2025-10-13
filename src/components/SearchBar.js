"use client";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}
      className="container max-w-md mt-4"
      role="search"
      aria-label="Buscar envío"
    >
      <div className="bg-white border border-gray-200 rounded-full shadow-soft ps-4 pe-2 py-2.5 flex items-center gap-3">
        <Search className="w-5 h-5 text-brand-700" aria-hidden="true" />
        <input
          type="text"
          className="w-full text-[15px] placeholder:text-gray-500"
          placeholder="¿Qué, dónde y cuándo quieres mover?"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          aria-label="Campo de búsqueda de envío"
        />
        <button
          type="submit"
          className="rounded-full bg-accent text-brand-900 text-sm font-semibold px-4 py-2 hover:bg-accent-600 transition"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
