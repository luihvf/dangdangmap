"use client";
import { Hazard, HAZARD_META } from "@/lib/data";

interface Props { hazard: Hazard; onClose: () => void; }

export default function HazardDetail({ hazard, onClose }: Props) {
  const meta = HAZARD_META[hazard.type];
  return (
    <div className="bg-white rounded-t-3xl shadow-2xl slide-up">
      <div className="px-5 pt-4 pb-5">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: meta.color + "20" }}>{meta.emoji}</div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">⚠️ {meta.label}</h2>
              <p className="text-sm text-red-500 font-medium">위험 요소 제보</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">✕</button>
        </div>
        <div className="bg-red-50 rounded-2xl p-4 mb-4">
          <p className="text-sm text-gray-800">{hazard.description}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span>👥 {hazard.confirmCount}명 확인</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 bg-red-500 text-white font-bold py-3 rounded-2xl hover:bg-red-600">✅ 아직 위험해요</button>
          <button className="flex-1 bg-green-500 text-white font-bold py-3 rounded-2xl hover:bg-green-600">🙆 해결됐어요</button>
        </div>
      </div>
    </div>
  );
}
