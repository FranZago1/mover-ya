// src/lib/mockData.js

export const alliedCompanies = [
  "Logística Rápida S.A. vía MOVER YA",
  "Transporte Andino SRL vía MOVER YA",
  "EcoCarga Express vía MOVER YA",
  "Rutas & Cargas SAS vía MOVER YA",
];

export const partnerVehicles = [
  { id: "v1", tipo: "Furgoneta", icon: "🚐", lat: -34.6037, lng: -58.3816, patente: "AB 123 CD" },
  { id: "v2", tipo: "Camión liviano", icon: "🚚", lat: -34.6200, lng: -58.4300, patente: "EF 456 GH" },
  { id: "v3", tipo: "Furgoneta", icon: "🚐", lat: -34.5900, lng: -58.4100, patente: "IJ 789 KL" },
  { id: "v4", tipo: "Camión liviano", icon: "🚚", lat: -34.6100, lng: -58.3700, patente: "MN 012 OP" },
];

const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function simulateCO2SavedKg() {
  return Number(rand(12, 38).toFixed(1));
}

// Ofertas de retornos simuladas (para la lista bajo el mapa)
export function simulateReturnOffers() {
  const catalog = [
    {
      from: "La Plata",
      to: "CABA",
      tipo: "Camión liviano",
      capacidadKg: 2200,
      volumenM3: 10,
      ventana: "18:30–20:00",
      base: 28500,
    },
    {
      from: "Quilmes",
      to: "Pilar",
      tipo: "Camión liviano",
      capacidadKg: 2500,
      volumenM3: 12,
      ventana: "17:00–19:00",
      base: 29500,
    },
    {
      from: "San Isidro",
      to: "Moreno",
      tipo: "Furgoneta",
      capacidadKg: 850,
      volumenM3: 6,
      ventana: "16:30–18:00",
      base: 18000,
    },
  ];

  return catalog.map((c) => {
    const empresa = pick(alliedCompanies);
    const vehiculo = pick(
      partnerVehicles.filter((v) => v.tipo === c.tipo)
    );
    const costo = Math.round(c.base * rand(0.95, 1.2));
    const etaMin = Math.round(rand(12, 35));
    const co2SavedKg = Number(rand(3.5, 9.5).toFixed(1));

    return {
      id: cryptoRandomId(),
      empresa,
      vehiculo, // { tipo, patente }
      costo,
      etaMin,
      route: { from: c.from, to: c.to },
      window: c.ventana,
      capacity: { kg: c.capacidadKg, m3: c.volumenM3 },
      co2SavedKg,
      isReturn: true,
    };
  });
}

export function simulateMatch(categoria /* 'mediana' | 'grande' */) {
  const empresa = pick(alliedCompanies);
  const candidatos = partnerVehicles.filter(v =>
    categoria === "mediana" ? v.tipo === "Furgoneta" : v.tipo === "Camión liviano"
  );
  const vehiculo = pick(candidatos);
  const base = categoria === "mediana" ? 18000 : 28000;
  const costo = Math.round(base * rand(0.95, 1.25));

  // Datos tipo retorno (simulados) para reforzar el caso
  const posiblesRutas = [
    { from: "Quilmes", to: "Pilar" },
    { from: "La Plata", to: "CABA" },
    { from: "San Isidro", to: "Moreno" },
  ];
  const route = pick(posiblesRutas);
  const window = pick(["16:30–18:00", "17:00–19:00", "18:30–20:00"]);
  const capacity =
    categoria === "mediana"
      ? { kg: Math.floor(rand(600, 900)), m3: 6 }
      : { kg: Math.floor(rand(1800, 2600)), m3: 10 };
  const co2SavedKg = Number(rand(4.0, 10.5).toFixed(1));
  const etaMin = Math.round(rand(15, 40));

  return {
    id: cryptoRandomId(),
    empresa,
    vehiculo,
    costo,
    etaMin,
    route,
    window,
    capacity,
    co2SavedKg,
    isReturn: true,
  };
}

function cryptoRandomId() {
  // id simple sin dependencias
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}
