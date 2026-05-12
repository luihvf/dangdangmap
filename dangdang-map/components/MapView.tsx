"use client";

import Map, { Marker, NavigationControl, GeolocateControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MOCK_PLACES, MOCK_HAZARDS, CATEGORY_META, HAZARD_META, Place, Hazard, PetSize, Category } from "@/lib/data";

interface Props {
  filters: { sizes: PetSize[]; categories: Category[]; showHazards: boolean };
  onSelectPlace: (p: Place) => void;
  onSelectHazard: (h: Hazard) => void;
}

export default function MapView({ filters, onSelectPlace, onSelectHazard }: Props) {
  const filteredPlaces = MOCK_PLACES.filter(p => {
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
    if (filters.sizes.length > 0 && !filters.sizes.some(s => p.petPolicy.allowedSizes.includes(s))) return false;
    return true;
  });

  return (
    <Map
      initialViewState={{ longitude: 126.978, latitude: 37.555, zoom: 12.5 }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <NavigationControl position="top-right" />
      <GeolocateControl position="top-right" trackUserLocation />

      {filteredPlaces.map(place => {
        const meta = CATEGORY_META[place.category];
        return (
          <Marker key={place.id} longitude={place.lng} latitude={place.lat} anchor="bottom"
            onClick={e => { e.originalEvent.stopPropagation(); onSelectPlace(place); }}>
            <div className="cursor-pointer hover:scale-110 transition-transform" title={place.name}>
              <div className="relative">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg border-2 border-white"
                  style={{ backgroundColor: meta.color + "20", borderColor: meta.color }}>
                  {meta.emoji}
                </div>
                {place.verificationScore >= 50 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white" style={{fontSize:"8px",fontWeight:"bold"}}>✓</div>
                )}
              </div>
            </div>
          </Marker>
        );
      })}

      {filters.showHazards && MOCK_HAZARDS.map(h => {
        const meta = HAZARD_META[h.type];
        return (
          <Marker key={h.id} longitude={h.lng} latitude={h.lat} anchor="center"
            onClick={e => { e.originalEvent.stopPropagation(); onSelectHazard(h); }}>
            <div className="cursor-pointer animate-pulse">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-base shadow-lg border-2"
                style={{ backgroundColor: meta.color + "30", borderColor: meta.color }}>
                {meta.emoji}
              </div>
            </div>
          </Marker>
        );
      })}
    </Map>
  );
}
