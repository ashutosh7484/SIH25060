"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const truckIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const mockTrucks = [
  { id: "T001", driver: "John Smith", status: "active", capacity: 75, lat: 20.2961, lng: 85.8245 },
  { id: "T002", driver: "Sarah Johnson", status: "active", capacity: 45, lat: 20.305, lng: 85.82 },
  { id: "T003", driver: "Mike Wilson", status: "maintenance", capacity: 0, lastPickup: "Broadway & 14th St", zone: "Zone A", lat: 20.2961, lng: 85.8245 },
  { id: "T004", driver: "Lisa Chen", status: "idle", capacity: 20, lastPickup: "Wall St & Water St", zone: "Zone C", lat: 20.2961, lng: 85.8245 },
];

export default function WasteMap() {
  return (
    <MapContainer
      center={[20.29606, 85.82454]} // Bhubaneswar
      zoom={12}
      style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {mockTrucks.map((truck) => (
        <Marker key={truck.id} position={[truck.lat, truck.lng]} icon={truckIcon}>
          <Popup>
            <strong>{truck.id}</strong> - {truck.driver} <br />
            Status: {truck.status} <br />
            Capacity: {truck.capacity}%
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}