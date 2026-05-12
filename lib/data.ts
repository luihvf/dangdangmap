export type PetSize = "small" | "medium" | "large";
export type Category = "cafe" | "restaurant" | "hospital" | "park" | "playground";

export interface Place {
  id: string; name: string; category: Category; lat: number; lng: number;
  petPolicy: { maxWeight: number; leashRequired: boolean; indoorAllowed: boolean; cageRequired: boolean; allowedSizes: PetSize[]; };
  environment: { noiseLevel: "quiet" | "moderate" | "loud"; hasWaterBowl: boolean; tableSpacing: "narrow" | "normal" | "wide"; };
  verificationScore: number; reviewCount: number; rating: number; tags: string[];
}

export interface Hazard {
  id: string; type: "poison" | "glass" | "aggressive_dog" | "toxic_plant" | "construction";
  lat: number; lng: number; reportedAt: string; expiresAt: string; description: string; confirmCount: number;
}

export const CATEGORY_META: Record<Category, { label: string; emoji: string; color: string }> = {
  cafe: { label: "카페", emoji: "☕", color: "#F97316" },
  restaurant: { label: "식당", emoji: "🍽️", color: "#EF4444" },
  hospital: { label: "병원", emoji: "🏥", color: "#3B82F6" },
  park: { label: "산책로", emoji: "🌳", color: "#22C55E" },
  playground: { label: "운동장", emoji: "🎾", color: "#A855F7" },
};

export const HAZARD_META: Record<string, { label: string; emoji: string; color: string }> = {
  poison: { label: "쥐약/살충제", emoji: "☠️", color: "#DC2626" },
  glass: { label: "유리 파편", emoji: "🔺", color: "#EA580C" },
  aggressive_dog: { label: "맹견 출몰", emoji: "🐕", color: "#B91C1C" },
  toxic_plant: { label: "독성 식물", emoji: "🌿", color: "#7C3AED" },
  construction: { label: "공사 구간", emoji: "🚧", color: "#D97706" },
};

export const SIZE_LABEL: Record<PetSize, string> = { small: "소형", medium: "중형", large: "대형" };

export const MOCK_PLACES: Place[] = [
  { id:"p1", name:"멍멍다방", category:"cafe", lat:37.5665, lng:126.978,
    petPolicy:{maxWeight:30,leashRequired:true,indoorAllowed:true,cageRequired:false,allowedSizes:["small","medium","large"]},
    environment:{noiseLevel:"quiet",hasWaterBowl:true,tableSpacing:"wide"}, verificationScore:72, reviewCount:28, rating:4.7, tags:["대형견OK","전용식수대","넓은테라스"] },
  { id:"p2", name:"왈왈 브런치", category:"restaurant", lat:37.5645, lng:126.975,
    petPolicy:{maxWeight:10,leashRequired:true,indoorAllowed:false,cageRequired:true,allowedSizes:["small"]},
    environment:{noiseLevel:"moderate",hasWaterBowl:false,tableSpacing:"narrow"}, verificationScore:15, reviewCount:12, rating:4.2, tags:["소형견전용","야외석"] },
  { id:"p3", name:"반려견 놀이터 서울숲", category:"playground", lat:37.5445, lng:127.038,
    petPolicy:{maxWeight:99,leashRequired:false,indoorAllowed:false,cageRequired:false,allowedSizes:["small","medium","large"]},
    environment:{noiseLevel:"loud",hasWaterBowl:true,tableSpacing:"wide"}, verificationScore:87, reviewCount:156, rating:4.9, tags:["오프리쉬","대형운동장","분리운동장"] },
  { id:"p4", name:"24시 해피독 동물병원", category:"hospital", lat:37.5605, lng:126.985,
    petPolicy:{maxWeight:99,leashRequired:true,indoorAllowed:true,cageRequired:false,allowedSizes:["small","medium","large"]},
    environment:{noiseLevel:"quiet",hasWaterBowl:true,tableSpacing:"normal"}, verificationScore:63, reviewCount:89, rating:4.8, tags:["24시간","응급진료","주차가능"] },
  { id:"p5", name:"여의도 한강 산책로", category:"park", lat:37.5283, lng:126.9346,
    petPolicy:{maxWeight:99,leashRequired:true,indoorAllowed:false,cageRequired:false,allowedSizes:["small","medium","large"]},
    environment:{noiseLevel:"moderate",hasWaterBowl:true,tableSpacing:"wide"}, verificationScore:55, reviewCount:203, rating:4.6, tags:["한강뷰","야간산책","가로등밝음"] },
  { id:"p6", name:"퍼피 가든 카페", category:"cafe", lat:37.5575, lng:126.969,
    petPolicy:{maxWeight:15,leashRequired:true,indoorAllowed:true,cageRequired:false,allowedSizes:["small","medium"]},
    environment:{noiseLevel:"quiet",hasWaterBowl:true,tableSpacing:"wide"}, verificationScore:38, reviewCount:45, rating:4.5, tags:["중형견OK","조용한분위기","간식판매"] },
  { id:"p7", name:"보라매공원 반려견 운동장", category:"playground", lat:37.4935, lng:126.9156,
    petPolicy:{maxWeight:99,leashRequired:false,indoorAllowed:false,cageRequired:false,allowedSizes:["small","medium","large"]},
    environment:{noiseLevel:"loud",hasWaterBowl:true,tableSpacing:"wide"}, verificationScore:71, reviewCount:134, rating:4.7, tags:["오프리쉬","소대형분리","배변봉투비치"] },
];

export const MOCK_HAZARDS: Hazard[] = [
  { id:"h1", type:"poison", lat:37.5655, lng:126.976, reportedAt:"2024-05-20T09:30:00", expiresAt:"2024-05-21T09:30:00", description:"골목길 구석에 쥐약 살포 흔적 발견", confirmCount:5 },
  { id:"h2", type:"glass", lat:37.5630, lng:126.980, reportedAt:"2024-05-20T14:00:00", expiresAt:"2024-05-20T20:00:00", description:"인도 가장자리 깨진 유리병 조각", confirmCount:3 },
  { id:"h3", type:"aggressive_dog", lat:37.5590, lng:126.973, reportedAt:"2024-05-20T11:00:00", expiresAt:"2024-05-20T17:00:00", description:"목줄 없는 대형견 배회 중 (진돗개 추정)", confirmCount:7 },
];

export const USER_BADGES = [
  { id:"b1", name:"첫 발자국", emoji:"🐾", desc:"첫 리뷰 작성", earned:true },
  { id:"b2", name:"안전 지킴이", emoji:"🛡️", desc:"위험 요소 최초 제보", earned:true },
  { id:"b3", name:"로컬 가이드 Lv.3", emoji:"⭐", desc:"리뷰 30개 달성", earned:true },
  { id:"b4", name:"인증 전문가", emoji:"✅", desc:"GPS 방문 인증 50회", earned:false },
  { id:"b5", name:"탐험가", emoji:"🗺️", desc:"5개 구 이상 방문", earned:false },
];
