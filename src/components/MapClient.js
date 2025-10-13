"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { partnerVehicles } from "../lib/mockData";

function vehicleIcon(emoji = "🚚") {
  return L.divIcon({
    html: `<div style="font-size:22px; line-height:22px">${emoji}</div>`,
    className: "vehicle-marker",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

export default function MapClient({ height = 260 }) {
  const center = { lat: -34.6037, lng: -58.3816 };
  return (
    <div className="container max-w-md mt-4">
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-soft">
        <MapContainer center={center} zoom={12} style={{ height, width: "100%" }} scrollWheelZoom={false}>
          <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {partnerVehicles.map((v) => (
            <Marker key={v.id} position={{ lat: v.lat, lng: v.lng }} icon={vehicleIcon(v.icon)}>
              <Popup>
                <b>{v.tipo}</b><br />Patente: {v.patente}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
