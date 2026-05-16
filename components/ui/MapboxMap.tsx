// components/ui/MapboxMap.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import { MapPin, Waves, Coffee, Utensils, Wind, Plane } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

// ─── Shared types (imported by LocationSection) ────────────────────────────

export type POIType = "project" | "beach" | "cafe" | "restaurant" | "surf" | "airport";

export type POI = {
  label: string;
  longitude: number;
  latitude: number;
  type: POIType;
};

export type Camera = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
};

type Props = {
  camera: Camera;
  pois: POI[];
  route?: [number, number][];
};

// ─── Constants ─────────────────────────────────────────────────────────────

// ✅ Safely pulling the token from environment variables
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

// ─── Marker style map ──────────────────────────────────────────────────────

type MarkerStyle = {
  Icon: typeof MapPin;
  bg: string;
  color: string;
  iconSize: number;
  diameter: string;
  ring: boolean;
};

const MARKER: Record<POIType, MarkerStyle> = {
  project:    { Icon: MapPin,   bg: "#C9A55A",           color: "#08204D", iconSize: 16, diameter: "2.75rem", ring: true  },
  beach:      { Icon: Waves,    bg: "rgba(8,32,77,0.92)", color: "#C9A55A", iconSize: 12, diameter: "1.75rem", ring: false },
  cafe:       { Icon: Coffee,   bg: "rgba(8,32,77,0.92)", color: "#C9A55A", iconSize: 12, diameter: "1.75rem", ring: false },
  restaurant: { Icon: Utensils, bg: "rgba(8,32,77,0.92)", color: "#C9A55A", iconSize: 12, diameter: "1.75rem", ring: false },
  surf:       { Icon: Wind,     bg: "rgba(8,32,77,0.92)", color: "#C9A55A", iconSize: 12, diameter: "1.75rem", ring: false },
  airport:    { Icon: Plane,    bg: "rgba(8,32,77,0.92)", color: "#C9A55A", iconSize: 14, diameter: "2.25rem", ring: true  },
};

// ─── Component ─────────────────────────────────────────────────────────────

const routeGeoJSON = (coords: [number, number][]) => ({
  type: "Feature" as const,
  properties: {},
  geometry: { type: "LineString" as const, coordinates: coords },
});

export default function MapboxMap({ camera, pois, route }: Props) {
  const mapRef       = useRef<MapRef | null>(null);
  const [loaded, setLoaded] = useState(false);
  const skipFirst    = useRef(true);

  // Fly to new camera whenever the `camera` prop changes.
  useEffect(() => {
    if (!loaded) return;
    if (skipFirst.current) { skipFirst.current = false; return; }
    mapRef.current?.flyTo({
      center:   [camera.longitude, camera.latitude],
      zoom:     camera.zoom,
      pitch:    camera.pitch,
      bearing:  camera.bearing,
      duration: 2200,
      essential: true,
    });
  }, [camera.longitude, camera.latitude, camera.zoom, camera.pitch, camera.bearing, loaded]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: camera.longitude,
        latitude:  camera.latitude,
        zoom:      camera.zoom,
        pitch:     camera.pitch,
        bearing:   camera.bearing,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      scrollZoom={false}
      dragPan
      attributionControl={false}
      onLoad={() => setLoaded(true)}
    >
      <NavigationControl position="bottom-right" showCompass={false} />

      {/* Route line */}
      {route && loaded && (
        <Source id="route-source" type="geojson" data={routeGeoJSON(route)}>
          <Layer
            id="route-shadow"
            type="line"
            paint={{ "line-color": "#000000", "line-width": 8, "line-opacity": 0.12, "line-blur": 6 }}
            layout={{ "line-join": "round", "line-cap": "round" }}
          />
          <Layer
            id="route-line"
            type="line"
            paint={{ "line-color": "#C9A55A", "line-width": 3.5, "line-opacity": 0.9 }}
            layout={{ "line-join": "round", "line-cap": "round" }}
          />
        </Source>
      )}

      {/* Render markers ONLY after onLoad */}
      {loaded && pois.map((poi, i) => {
        const s = MARKER[poi.type];
        const Icon = s.Icon;
        return (
          <Marker
            key={`${poi.label}-${i}`}
            longitude={poi.longitude}
            latitude={poi.latitude}
            anchor="center"
          >
            <div className="relative flex items-center justify-center" title={poi.label}>
              {/* Pulsing ring for project + airport */}
              {poi.type === "project" && (
                <span
                  className="absolute rounded-full animate-ping opacity-40"
                  style={{ backgroundColor: "#C9A55A", width: s.diameter, height: s.diameter }}
                />
              )}
              <div
                style={{ backgroundColor: s.bg, width: s.diameter, height: s.diameter }}
                className={[
                  "relative flex items-center justify-center rounded-full cursor-default select-none",
                  "transition-transform duration-200 hover:scale-110",
                  poi.type === "project"
                    ? "ring-2 ring-[#C9A55A] shadow-lg shadow-[#C9A55A]/30"
                    : poi.type === "airport"
                    ? "ring-1 ring-[#C9A55A]/60 shadow-md"
                    : "ring-1 ring-[#C9A55A]/20 shadow-sm",
                ].join(" ")}
              >
                <Icon size={s.iconSize} color={s.color} strokeWidth={1.8} />
              </div>
              {/* Label below project marker */}
              {poi.type === "project" && (
                <span className="absolute top-full mt-1.5 text-[8px] tracking-[0.18em] uppercase text-[#C9A55A] whitespace-nowrap font-semibold select-none pointer-events-none"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                >
                  Allurea
                </span>
              )}
            </div>
          </Marker>
        );
      })}
    </Map>
  );
}