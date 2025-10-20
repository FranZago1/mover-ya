// src/app/configuracion/page.js
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bell, Moon, Sun, Monitor, Download, Trash2, MapPin, Mail, Shield, ChevronLeft } from "lucide-react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

const DEFAULT_PREFS = {
  notificaciones: true,
  tema: "system", // system | light | dark
  unidades: "metric", // metric | imperial
  compartirUbicacion: false,
  emailUpdates: true,
};

export default function Configuracion() {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [notifStatus, setNotifStatus] = useState("desconocido"); // granted | denied | prompt | desconocido

  // Cargar preferencias
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("prefs") || "{}");
      setPrefs({ ...DEFAULT_PREFS, ...saved });
    } catch {}
  }, []);

  // Persistir preferencias
  useEffect(() => {
    try {
      localStorage.setItem("prefs", JSON.stringify(prefs));
    } catch {}
  }, [prefs]);

  // Estado de notificaciones del navegador
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotifStatus(Notification.permission);
    }
  }, []);

  // Aplicar tema (demo simple)
  useEffect(() => {
    const root = document.documentElement;
    const sysDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const target =
      prefs.tema === "system" ? (sysDark ? "dark" : "light") : prefs.tema;
    root.dataset.theme = target; // por si tu tailwind usa data-theme
    root.classList.toggle("dark", target === "dark"); // si usás modo dark por clase
  }, [prefs.tema]);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) return alert("Este navegador no soporta notificaciones.");
    try {
      const res = await Notification.requestPermission();
      setNotifStatus(res);
      if (res === "granted") {
        new Notification("Notificaciones activadas", {
          body: "Te avisaremos cuando encontremos un retorno compatible.",
        });
      }
    } catch {}
  };

  const exportarDatos = () => {
    const dump = {
      prefs,
      misEnvios: safeParse("misEnvios"),
      solicitudesPendientes: safeParse("solicitudesPendientes"),
      chats: Object.keys(localStorage)
        .filter((k) => k.startsWith("chat_"))
        .reduce((acc, k) => ({ ...acc, [k]: safeParse(k) }), {}),
      exportadoEn: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mover-ya-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const borrarDatosLocales = () => {
    const ok = confirm("Esto eliminará datos guardados localmente (envíos, chats, preferencias). ¿Continuar?");
    if (!ok) return;
    try {
      localStorage.removeItem("misEnvios");
      localStorage.removeItem("solicitudesPendientes");
      Object.keys(localStorage).forEach((k) => k.startsWith("chat_") && localStorage.removeItem(k));
      localStorage.removeItem("prefs");
      setPrefs(DEFAULT_PREFS);
      alert("Datos locales eliminados.");
    } catch {}
  };

  const temaIcon = useMemo(() => {
    if (prefs.tema === "system") return <Monitor className="w-4 h-4" />;
    if (prefs.tema === "dark") return <Moon className="w-4 h-4" />;
    return <Sun className="w-4 h-4" />;
  }, [prefs.tema]);

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      <main
        className="flex-1 pb-28"
        style={{ paddingBottom: "calc(6.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto max-w-md px-4 py-4 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/perfil" className="inline-flex items-center gap-1 hover:underline">
              <ChevronLeft className="w-4 h-4" /> Volver
            </Link>
          </div>

          <h1 className="text-lg font-bold">Configuración</h1>

          {/* Notificaciones */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-soft p-4">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold">Notificaciones</div>
                <div className="text-xs text-gray-600">
                  Estado del navegador: <b>{notifStatus}</b>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm">Recibir alertas de match y estado de envíos</div>
                  <button
                    onClick={() => setPrefs((p) => ({ ...p, notificaciones: !p.notificaciones }))}
                    className={`w-12 h-7 rounded-full transition relative ${
                      prefs.notificaciones ? "bg-brand-700" : "bg-gray-300"
                    }`}
                    aria-pressed={prefs.notificaciones}
                  >
                    <span
                      className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition ${
                        prefs.notificaciones ? "right-0.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
                {prefs.notificaciones && notifStatus !== "granted" && (
                  <button
                    onClick={requestNotificationPermission}
                    className="mt-3 text-xs font-semibold text-brand-700 hover:underline"
                  >
                    Conceder permiso del navegador
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Apariencia y unidades */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-soft p-4">
            <div className="flex items-center gap-2">
              {temaIcon}
              <div className="font-semibold">Apariencia</div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
              {["system", "light", "dark"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPrefs((p) => ({ ...p, tema: opt }))}
                  className={`rounded-xl2 border px-3 py-2 ${
                    prefs.tema === opt ? "border-brand-600 bg-brand-50" : "border-gray-200"
                  }`}
                >
                  {opt === "system" ? "Sistema" : opt === "light" ? "Claro" : "Oscuro"}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <div className="font-semibold">Unidades</div>
              </div>
              <select
                value={prefs.unidades}
                onChange={(e) => setPrefs((p) => ({ ...p, unidades: e.target.value }))}
                className="border border-gray-300 rounded-xl2 px-2 py-1 text-sm bg-white"
              >
                <option value="metric">Métricas (kg, m³)</option>
                <option value="imperial">Imperiales (lb, ft³)</option>
              </select>
            </div>
          </section>

          {/* Privacidad */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-soft p-4 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <div className="font-semibold">Privacidad</div>
            </div>
            <RowToggle
              label="Compartir ubicación con el transporte durante retiro/entrega"
              checked={prefs.compartirUbicacion}
              onChange={(v) => setPrefs((p) => ({ ...p, compartirUbicacion: v }))}
            />
            <RowToggle
              icon={<Mail className="w-4 h-4" />}
              label="Recibir novedades por email"
              checked={prefs.emailUpdates}
              onChange={(v) => setPrefs((p) => ({ ...p, emailUpdates: v }))}
            />
          </section>

          {/* Utilidades */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-soft p-4 space-y-3">
            <div className="font-semibold">Tus datos</div>
            <button
              onClick={exportarDatos}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl2 border border-gray-200 bg-white py-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Exportar (JSON)
            </button>
            <button
              onClick={borrarDatosLocales}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl2 bg-rose-50 text-rose-700 border border-rose-200 py-2 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Borrar datos locales
            </button>
          </section>

          {/* Enlaces útiles */}
          <section className="grid grid-cols-2 gap-3">
            <Link
              href="/perfil"
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white shadow-soft py-3"
            >
              Perfil
            </Link>
            <Link
              href="/mis-envios"
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white shadow-soft py-3"
            >
              Mis envíos
            </Link>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function RowToggle({ label, checked, onChange, icon }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-sm">{label}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-7 rounded-full transition relative ${
          checked ? "bg-brand-700" : "bg-gray-300"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition ${
            checked ? "right-0.5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function safeParse(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}
