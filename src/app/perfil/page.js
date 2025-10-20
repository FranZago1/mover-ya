// src/app/perfil/page.js
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, BadgeCheck, Truck, Leaf, Settings, LogOut, Bell } from "lucide-react";

import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";

const USER = {
  nombre: "Bautista Araujo",
  email: "bauti.araujo@example.com",
  telefono: "+54 9 11 5555-1234",
  direccion: "Av. Córdoba 1234, CABA",
  dni: "40.123.456",
  cuit: "20-40123456-7",
  verificado: true,
};

export default function Perfil() {
  const [prefs, setPrefs] = useState({ notificaciones: true });
  const [envios, setEnvios] = useState([]);

  // Cargar envíos confirmados (los que guardás en MatchModal)
  useEffect(() => {
    try {
      const arr = JSON.parse(localStorage.getItem("misEnvios") || "[]");
      setEnvios(arr);
    } catch {
      setEnvios([]);
    }
  }, []);

  // Cargar / guardar preferencias simples
  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem("prefs") || "{}");
      setPrefs({ notificaciones: p.notificaciones ?? true });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("prefs", JSON.stringify(prefs));
    } catch {}
  }, [prefs]);

  // KPIs rápidos
  const stats = useMemo(() => {
    const total = envios.length;
    const co2 = envios.reduce((acc, e) => acc + (e.co2SavedKg || 0), 0);
    const ult = envios[0]?.fecha ? new Date(envios[0].fecha) : null; // asumiendo orden desc
    const retorno = envios.filter((e) => e.isReturn).length;
    return { total, co2, ult, retorno };
  }, [envios]);

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main
        className="flex-1 pb-28"
        style={{ paddingBottom: "calc(6.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto max-w-md px-4 py-4 space-y-4">
          {/* Card de perfil */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-soft p-4">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-900 font-bold">
                {USER.nombre.split(" ").map(w => w[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg font-bold">{USER.nombre}</h1>
                  {USER.verificado && <BadgeCheck className="w-5 h-5 text-accent" aria-label="Cuenta verificada" />}
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> {USER.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {USER.telefono}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {USER.direccion}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="rounded-xl2 border border-gray-200 p-2">
                <div className="font-semibold text-gray-800">DNI</div>
                <div>{USER.dni}</div>
              </div>
              <div className="rounded-xl2 border border-gray-200 p-2">
                <div className="font-semibold text-gray-800">CUIT</div>
                <div>{USER.cuit}</div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-soft p-4">
            <h2 className="text-base font-semibold">Resumen</h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-xl2 border border-gray-200 p-3 text-center">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-xs text-gray-600">Envíos</div>
              </div>
              <div className="rounded-xl2 border border-gray-200 p-3 text-center">
                <div className="text-2xl font-bold">{stats.retorno}</div>
                <div className="text-xs text-gray-600">Retornos</div>
              </div>
              <div className="rounded-xl2 border border-gray-200 p-3 text-center">
                <div className="text-2xl font-bold">{Math.round(stats.co2)}</div>
                <div className="text-xs text-gray-600">kg CO₂</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-600">
              {stats.ult ? (
                <>Último envío: <span className="font-medium">{stats.ult.toLocaleString()}</span></>
              ) : (
                <>Todavía no confirmaste envíos</>
              )}
            </div>
          </section>

          {/* Preferencias */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-soft p-4">
            <h2 className="text-base font-semibold">Preferencias</h2>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <div>
                  <div className="text-sm font-medium">Notificaciones</div>
                  <div className="text-xs text-gray-600">Estado de envíos y novedades</div>
                </div>
              </div>
              <button
                onClick={() => setPrefs((p) => ({ ...p, notificaciones: !p.notificaciones }))}
                className={`w-12 h-7 rounded-full transition ${
                  prefs.notificaciones ? "bg-brand-700" : "bg-gray-300"
                } relative`}
                aria-pressed={prefs.notificaciones}
                aria-label="Alternar notificaciones"
              >
                <span
                  className={`absolute top-0.5 transition h-6 w-6 rounded-full bg-white ${
                    prefs.notificaciones ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Accesos rápidos */}
          <section className="grid grid-cols-2 gap-3">
            <Link
              href="/mis-envios"
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white shadow-soft py-3"
            >
              <Truck className="w-5 h-5" />
              <span className="text-sm font-semibold">Mis envíos</span>
            </Link>
            <Link
              href="/impacto-verde"
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white shadow-soft py-3"
            >
              <Leaf className="w-5 h-5" />
              <span className="text-sm font-semibold">Impacto verde</span>
            </Link>
            <Link
              href="/configuracion"
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white shadow-soft py-3"
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm font-semibold">Configuración</span>
            </Link>
            <button
              onClick={() => alert("Sesión cerrada (demo)")}
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white shadow-soft py-3"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-semibold">Cerrar sesión</span>
            </button>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
