// src/components/ReturnToggle.js
"use client";

export default function ReturnToggle({ checked = true, onChange }) {
  return (
    <div className="container max-w-md mt-3 flex items-center gap-2 text-sm">
      <input
        id="retornos"
        type="checkbox"
        className="accent-accent w-4 h-4"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label htmlFor="retornos" className="font-semibold">
        Solo retornos disponibles
      </label>
    </div>
  );
}
