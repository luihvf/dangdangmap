"use client";
import { Place, CATEGORY_META, SIZE_LABEL } from "@/lib/data";

interface Props { place: Place; onClose: () => void; }

function PolicyItem({ label, value }: { label: string; value: string }) {
  return (<div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 font-medium" style={{fontSize:"11px"}}>{label}</p><p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p></div>);
}
function EnvBadge({ emoji, label }: { emoji: string; label: string }) {
  return (<div className="bg-green-50 rounded-xl p-3 text-center"><p className="text-xl">{emoji}</p><p className="font-medium text-gray-600 mt-1" style={{fontSize:"11px"}}>{label}</p></div>);
}

export default function PlaceDetail({ place, onClose }: Props) {
  const meta = CATEGORY_META[place.category];
  const pct = Math.min(100, place.verificationScore);
  return (
    <div className="bg-white rounded-t-3xl shadow-2xl slide-up max-h-[70vh] overflow-y-auto">
      <div className="sticky top-0 bg-white/90 backdrop-blur-lg z-10 px-5 pt-4 pb-3 border-b border-gray-100">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{meta.emoji}</span>
              <h2 className="text-xl font-bold text-gray-900">{place.name}</h2>
              {place.verificationScore >= 50 && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">✓ 인증</span>}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span style={{ color: meta.color }} className="font-medium">{meta.label}</span>
              <span>⭐ {place.rating}</span>
              <span>리뷰 {place.reviewCount}개</span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200">✕</button>
        </div>
      </div>
      <div className="p-5 space-y-5">
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">🐾 반려견 정책</h3>
          <div className="grid grid-cols-2 gap-2">
            <PolicyItem label="허용 크기" value={place.petPolicy.allowedSizes.map(s => SIZE_LABEL[s]).join(", ")} />
            <PolicyItem label="최대 체중" value={place.petPolicy.maxWeight + "kg"} />
            <PolicyItem label="실내 출입" value={place.petPolicy.indoorAllowed ? "가능 ✅" : "불가 ❌"} />
            <PolicyItem label="리쉬 필수" value={place.petPolicy.leashRequired ? "필수 🔗" : "자유"} />
            <PolicyItem label="케이지 필수" value={place.petPolicy.cageRequired ? "필수 📦" : "불필요"} />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">🌿 환경 정보</h3>
          <div className="grid grid-cols-3 gap-2">
            <EnvBadge emoji={place.environment.noiseLevel === "quiet" ? "🤫" : place.environment.noiseLevel === "moderate" ? "🔉" : "🔊"}
              label={place.environment.noiseLevel === "quiet" ? "조용함" : place.environment.noiseLevel === "moderate" ? "보통" : "시끌벅적"} />
            <EnvBadge emoji={place.environment.hasWaterBowl ? "💧" : "🚫"} label={place.environment.hasWaterBowl ? "식수대 있음" : "식수대 없음"} />
            <EnvBadge emoji={place.environment.tableSpacing === "wide" ? "↔️" : "↕️"}
              label={"간격 " + (place.environment.tableSpacing === "wide" ? "넓음" : place.environment.tableSpacing === "normal" ? "보통" : "좁음")} />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">🛡️ 커뮤니티 신뢰도</h3>
          <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: pct + "%", backgroundColor: pct >= 70 ? "#22C55E" : pct >= 40 ? "#F97316" : "#EF4444" }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">검증 점수 {place.verificationScore}점 · {place.reviewCount}명 참여</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {place.tags.map(tag => <span key={tag} className="bg-orange-50 text-orange-700 text-xs font-medium px-3 py-1 rounded-full">#{tag}</span>)}
        </div>
        <div className="flex gap-3">
          <button className="flex-1 bg-orange-500 text-white font-bold py-3 rounded-2xl hover:bg-orange-600 transition-colors shadow-lg">📝 리뷰 작성</button>
          <button className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-2xl hover:bg-gray-200 transition-colors">📍 방문 인증</button>
        </div>
      </div>
    </div>
  );
}
