'use client';

import { PetSize, Category, CATEGORY_META, SIZE_LABEL } from '@/lib/data';

interface Props {
  filters: { sizes: PetSize[]; categories: Category[]; showHazards: boolean };
  onChange: (f: any) => void;
}

export default function FilterPanel({ filters, onChange }: Props) {
  const toggleSize = (s: PetSize) => {
    const sizes = filters.sizes.includes(s) ? filters.sizes.filter(x => x !== s) : [...filters.sizes, s];
    onChange({ ...filters, sizes });
  };
  const toggleCat = (c: Category) => {
    const categories = filters.categories.includes(c) ? filters.categories.filter(x => x !== c) : [...filters.categories, c];
    onChange({ ...filters, categories });
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-4 space-y-4 border border-gray-100">
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">견종 크기</h3>
        <div className="flex gap-2">
          {(["small","medium","large"] as PetSize[]).map(s => (
            <button key={s} onClick={() => toggleSize(s)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                filters.sizes.includes(s)
                  ? 'bg-brand-500 text-white shadow-md shadow-orange-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {s === 'small' ? '🐕' : s === 'medium' ? '🦮' : '🐕‍🦺'} {SIZE_LABEL[s]}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">장소 유형</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(CATEGORY_META)).map(([key, meta]) => (
            <button key={key} onClick={() => toggleCat(key as Category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                filters.categories.includes(key as Category)
                  ? 'text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={filters.categories.includes(key as Category) ? { backgroundColor: meta.color } : {}}>
              {meta.emoji} {meta.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">⚠️ 위험 요소 표시</span>
        <button onClick={() => onChange({ ...filters, showHazards: !filters.showHazards })}
          className={`w-11 h-6 rounded-full transition-all relative ${filters.showHazards ? 'bg-red-500' : 'bg-gray-300'}`}>
          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${filters.showHazards ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
      </div>
    </div>
  );
}
