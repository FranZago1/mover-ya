"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container max-w-md">
        <div className="flex items-center justify-center py-3">
          <div className="text-[22px] font-black tracking-tight">
            <span className="text-brand-900">MOVER </span>
            <span className="text-accent">YA</span>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/70 to-accent/40" />
    </header>
  );
}
