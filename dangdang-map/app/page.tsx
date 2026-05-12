'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import FilterPanel from '@/components/FilterPanel';
import PlaceDetail from '@/components/PlaceDetail';
import HazardDetail from '@/components/HazardDetail';
import ReportModal from '@/components/ReportModal';
import ProfilePanel from '@/components/ProfilePanel';
import { Place, Hazard, PetSize, Category } from '@/lib/data';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function Home() {
  const [filters, setFilters] = useState<{ sizes: PetSize[]; categories: Category[]; showHazards: boolean }>({
    sizes: [], categories: [], showHazards: true
  });
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedHazard, setSelectedHazard] = useState<Hazard | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="h-[100dvh] w-full relative overflow-hidden bg-gray-100">
      {/* Map */}
      <div className="absolute inset-0">
        <MapView filters={filters} onSelectPlace={p => { setSelectedPlace(p); setSelectedHazard(null); }}
          onSelectHazard={h => { setSelectedHazard(h); setSelectedPlace(null); }} />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="flex-1 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
            <span className="text-xl">🐾</span>
            <div>
              <h1 className="text-base font-extrabold text-gray-900 leading-tight">댕댕여지도</h1>
              <p className="text-[10px] text-gray-400 font-medium">PGIS 반려견 친화 공간 가이드</p>
            </div>
          </div>

          <button onClick={() => setShowFilter(!showFilter)}
            className={`w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center text-lg transition-all ${
              showFilter ? 'bg-brand-500 text-white' : 'bg-white/95 backdrop-blur-xl text-gray-600 border border-gray-100'
            }`}>
            🔍
          </button>

          <button onClick={() => setShowProfile(true)}
            className="w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-xl shadow-lg flex items-center justify-center text-lg border border-gray-100">
            👤
          </button>
        </div>

        {showFilter && (
          <div className="mt-3 pointer-events-auto">
            <FilterPanel filters={filters} onChange={setFilters} />
          </div>
        )}
      </div>

      {/* Bottom Detail */}
      {selectedPlace && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <PlaceDetail place={selectedPlace} onClose={() => setSelectedPlace(null)} />
        </div>
      )}
      {selectedHazard && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <HazardDetail hazard={selectedHazard} onClose={() => setSelectedHazard(null)} />
        </div>
      )}

      {/* FAB */}
      {!selectedPlace && !selectedHazard && (
        <button onClick={() => setShowReport(true)}
          className="absolute bottom-6 right-6 z-10 w-14 h-14 bg-brand-500 text-white rounded-2xl shadow-xl shadow-orange-300 flex items-center justify-center text-2xl hover:scale-105 transition-transform active:scale-95">
          +
        </button>
      )}

      {/* Modals */}
      {showReport && <ReportModal onClose={() => setShowReport(false)} />}
      {showProfile && <ProfilePanel onClose={() => setShowProfile(false)} />}
    </div>
  );
}
