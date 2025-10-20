// src/app/chats/page.js
"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Truck, Phone, Info } from "lucide-react";

/* ---------- Wrapper con Suspense ---------- */
export default function ChatsPage() {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatsInner />
    </Suspense>
  );
}

/* ---------- Componente real que usa useSearchParams ---------- */
function ChatsInner() {
  const params = useSearchParams();
  const shipmentId = Number(params.get("shipment") || NaN);

  const [shipment, setShipment] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // Cargar envío para el encabezado
  useEffect(() => {
    try {
      const arr = JSON.parse(localStorage.getItem("misEnvios") || "[]");
      const s = arr.find((e) => e.id === shipmentId) || arr[0] || null;
      setShipment(s);
    } catch {
      setShipment(null);
    }
  }, [shipmentId]);

  // Clave de storage por envío
  const storageKey = shipment?.id ? `chat_${shipment.id}` : "chat_demo";

  // Cargar historial
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      setMessages(saved);
    } catch {
      setMessages([]);
    }
  }, [storageKey]);

  // Scroll al final
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;
    const newMsg = { id: Date.now(), from: "yo", body: text.trim(), ts: new Date().toISOString() };
    const next = [...messages, newMsg];

    // demo: autorrespuesta breve
    const autoReply = {
      id: Date.now() + 1,
      from: "transporte",
      body: "¡Recibido! Te avisamos cuando estemos en puerta. 🚚",
      ts: new Date(Date.now() + 2000).toISOString(),
    };

    setMessages(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setText("");

    setTimeout(() => {
      const withReply = [...next, autoReply];
      setMessages(withReply);
      localStorage.setItem(storageKey, JSON.stringify(withReply));
    }, 600);
  };

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-md px-3 py-2 flex items-center gap-2">
          <Link href="/mis-envios" className="p-2 -ml-2 rounded hover:bg-gray-100" aria-label="Volver">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-900" />
              <div className="font-semibold truncate">
                {shipment ? `${shipment.empresa} · ${shipment.vehiculoTipo}` : "Transporte"}
              </div>
            </div>
            {shipment?.patente && <div className="text-xs text-gray-600 ml-7">Patente {shipment.patente}</div>}
          </div>
          <a href="tel:+5491155551234" className="p-2 rounded hover:bg-gray-100" title="Llamar" aria-label="Llamar al transporte">
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Aviso demo */}
      <div className="mx-auto max-w-md px-3 mt-2">
        <div className="flex items-start gap-2 text-[11px] text-gray-600 bg-gray-50 border border-gray-200 rounded-xl2 p-2">
          <Info className="w-4 h-4 mt-0.5" />
          <div>Este chat es una <b>demo local</b> sin backend. Los mensajes quedan en tu navegador.</div>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 mx-auto w-full max-w-md px-3 py-3 space-y-2">
        {messages.length === 0 ? (
          <div className="text-sm text-gray-500 text-center mt-6">Inicia la conversación con el transporte.</div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                m.from === "yo" ? "ml-auto bg-brand-900 text-white" : "mr-auto bg-gray-100 text-gray-900"
              }`}
              title={new Date(m.ts).toLocaleString()}
            >
              {m.body}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input abajo */}
      <div className="sticky bottom-0 border-t border-gray-200 bg-white" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="mx-auto max-w-md px-3 py-2 flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Escribí un mensaje…"
            className="flex-1 border border-gray-300 rounded-xl2 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
          <button
            onClick={sendMessage}
            className="inline-flex items-center justify-center rounded-xl2 bg-brand-900 text-white px-3 py-2 text-sm font-semibold disabled:opacity-50"
            disabled={!text.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Skeleton para el fallback ---------- */
function ChatSkeleton() {
  return (
    <div className="min-h-dvh bg-white flex flex-col animate-pulse">
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-md px-3 py-2 flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gray-200" />
          <div className="flex-1">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-100 rounded mt-1" />
          </div>
          <div className="h-8 w-8 rounded bg-gray-200" />
        </div>
      </div>
      <div className="flex-1 mx-auto w-full max-w-md px-3 py-3 space-y-3">
        <div className="h-8 w-3/4 bg-gray-100 rounded-2xl" />
        <div className="h-8 w-2/3 bg-gray-200 rounded-2xl ml-auto" />
        <div className="h-8 w-1/2 bg-gray-100 rounded-2xl" />
      </div>
      <div className="sticky bottom-0 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-md px-3 py-2 flex items-center gap-2">
          <div className="h-9 flex-1 bg-gray-100 rounded-xl2" />
          <div className="h-9 w-16 bg-gray-200 rounded-xl2" />
        </div>
      </div>
    </div>
  );
}
