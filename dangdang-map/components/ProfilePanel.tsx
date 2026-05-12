"use client";
import { USER_BADGES } from "@/lib/data";

interface Props { onClose: () => void; }

export default function ProfilePanel({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md slide-up" onClick={e => e.stopPropagation()}>
        <div className="px-5 pt-4 pb-5">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl">🐕</div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">댕댕이 집사</h2>
              <p className="text-sm text-orange-500 font-medium">⭐ 로컬 가이드 Lv.3</p>
              <p className="text-xs text-gray-400">공헌도 1,240점</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[["리뷰","32"],["제보","8"],["인증","45"]].map(([l,v]) => (
              <div key={l} className="bg-gray-50 rounded-xl p-3 text-center"><p className="text-xl font-bold text-gray-900">{v}</p><p className="text-xs text-gray-500">{l}</p></div>
            ))}
          </div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">🏅 디지털 배지</h3>
          <div className="space-y-2 mb-4">
            {USER_BADGES.map(b => (
              <div key={b.id} className={"flex items-center gap-3 p-3 rounded-xl " + (b.earned ? "bg-orange-50" : "bg-gray-50 opacity-50")}>
                <span className="text-2xl">{b.emoji}</span>
                <div><p className="text-sm font-bold text-gray-800">{b.name}</p><p className="text-xs text-gray-500">{b.desc}</p></div>
                {b.earned && <span className="ml-auto text-green-500 text-xs font-bold">획득!</span>}
              </div>
            ))}
          </div>
          <button onClick={onClose} className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-2xl">닫기</button>
        </div>
      </div>
    </div>
  );
}
