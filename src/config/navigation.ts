export type NavItem = {
  to: string;
  label: string;
  description: string;
};

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "トップ", description: "旅の概要・ハイライト" },
  { to: "/schedule", label: "スケジュール", description: "時刻付きの行程表" },
  { to: "/itinerary", label: "行程ガイド", description: "日別の詳しい流れ" },
  { to: "/hotel", label: "ホテル", description: "DLG Hotel の情報" },
  { to: "/budget", label: "予算", description: "費用の内訳イメージ" },
  { to: "/spots", label: "観光スポット", description: "自由時間で回れる名所まとめ" },
  { to: "/guide", label: "持ち物・Tips", description: "現地で困らない準備" },
];
