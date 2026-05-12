'use client';

import { useState } from 'react';
import { CATEGORY_META, HAZARD_META, Category } from '@/lib/data';

interface Props {
  onClose: () => void;
}

export default function ReportModal({ onClose }: Props) {
  const [tab, setTab] = useState<'place' | 'hazard'>('place');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 slide-up" onClick={e => e.stopPropagation()}>
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">제보 완료!</h2>
          <p className="text-gray-500 text-sm mb-1">커뮤니티 검증 후 지도에 반영됩니다.</p>
          <p className="text-brand-500 text-sm font-bold mb-6">🐾 +10 공헌도 획득!</p>
          <button onClick={onClose} className="bg-brand-500 text-white font-bold px-8 py-3 rounded-2xl">확인</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto slide-up" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white/90 backdrop-blur-lg px-5 pt-4 pb-3 border-b border-gray-100 z-10">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">새로운 제보</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">✕</button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTab('place')}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'place' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              📍 장소 등록
            </button>
            <button onClick={() => setTab('hazard')}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'hazard' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              ⚠️ 위험 제보
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {tab === 'place' ? (
            <>
              <Input label="장소명" placeholder="예: 멍멍다방 홍대점" />
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">카테고리</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(CATEGORY_META).map(([k, v]) => (
                    <button key={k} className="px-3 py-2 rounded-xl bg-gray-100 text-sm hover:bg-brand-50 transition-colors">
                      {v.emoji} {v.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">🐾 허용 견종 크기</label>
                <div className="flex gap-2">
                  {['🐕 소형','🦮 중형','🐕‍🦺 대형'].map(s => (
                    <button key={s} className="flex-1 py-2 rounded-xl bg-gray-100 text-sm hover:bg-brand-50 transition-colors">{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">체크리스트</label>
                <div className="grid grid-cols-2 gap-2">
                  {['🔗 리쉬 필수', '🏠 실내 가능', '📦 케이지 필수', '💧 식수대 있음', '🅿️ 주차 가능', '🌙 야간 이용'].map(item => (
                    <button key={item} className="py-2 px-3 rounded-xl bg-gray-50 text-sm text-left hover:bg-brand-50 transition-colors border border-gray-200">{item}</button>
                  ))}
                </div>
              </div>
              <Input label="한줄 리뷰" placeholder="예: 넓은 테라스에서 대형견도 편하게 쉴 수 있어요" />
              <button className="w-full bg-gray-100 text-gray-500 font-medium py-4 rounded-2xl border-2 border-dashed border-gray-300 hover:bg-gray-50">
                📷 사진 첨부 (지오태깅 자동 적용)
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">위험 유형</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(HAZARD_META).map(([k, v]) => (
                    <button key={k} className="py-3 px-3 rounded-xl bg-red-50 text-sm hover:bg-red-100 transition-colors text-left">
                      {v.emoji} {v.label}
                    </button>
                  ))}
                </div>
              </div>
              <Input label="상세 설명" placeholder="예: 골목길 구석에 쥐약 살포 흔적 발견" />
              <button className="w-full bg-gray-100 text-gray-500 font-medium py-4 rounded-2xl border-2 border-dashed border-gray-300">
                📷 현장 사진 첨부
              </button>
              <p className="text-xs text-gray-400 text-center">📍 현재 GPS 위치가 자동으로 기록됩니다</p>
            </>
          )}

          <button onClick={() => setSubmitted(true)}
            className={`w-full font-bold py-4 rounded-2xl text-white transition-colors shadow-lg ${
              tab === 'place' ? 'bg-brand-500 hover:bg-brand-600 shadow-orange-200' : 'bg-red-500 hover:bg-red-600 shadow-red-200'
            }`}>
            제보하기
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
      <input type="text" placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent" />
    </div>
  );
}
