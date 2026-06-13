export type ItineraryDay = {
  id: string;
  day: string;
  date: string;
  title: string;
  intro: string;
  closing: string;
  bullets: string[];
  placeholders: [{ file: string; desc: string }, { file: string; desc: string }, { file: string; desc: string }];
};

export const TRIP_DATES = "2026.09.01 — 09.05（3泊4日・9/4夜発）";
export const TRIP_DATES_HEADER = { range: "2026.09.01 — 09.05", note: "3泊4日" } as const;

export const TRIP_BASICS = {
  title: "ダナン男3人旅 3泊4日 スケジュール概要",
  period: "9月1日（火）～9月5日（土）",
  stay: "3泊4日（9月4日夜発）",
  hotel: "DLGホテルダナン（ミーケービーチ前）",
  flights: {
    outbound: { label: "行き", date: "9月1日", time: "10:00 〜 17:30" },
    inbound: {
      label: "帰り",
      date: "9月4日",
      depart: "20:25",
      arriveDate: "9月5日",
      arrive: "07:35",
    },
  },
} as const;

export const SCHEDULE_PAGE_DESC = "3泊4日の時刻表。基本情報と日ごとの流れ。";

export const TRAVEL_SMOOTH_TIPS = [
  "移動：現地での移動は配車アプリ（Grabなど）が安全かつ明朗会計で一番おすすめです。",
  "予約：シュノーケリングツアーやバーナヒルズの入場券は事前予約がスムーズです。",
] as const;

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    id: "day1",
    day: "1日目",
    date: "9月1日（火）",
    title: "到着＆ビーチエリアのパブで乾杯",
    intro:
      "17:30にダナン国際空港へ到着。Grab等でホテルへ向かい、18:30チェックイン。初日は無理せず、ミーケービーチ周辺のローカルシーフードで腹を満たしてから、ビーチ沿いの欧米風パブやビーチバーで夜風を感じながら乾杯する。",
    closing:
      "長いフライトのあとも、潮風とビールで「来たな」感を一気に味わう。翌日は早めスタートなので、飲みすぎ注意は各自の良心に委ねよう。",
    bullets: ["17:30 空港到着 → ホテル", "19:30 ローカルシーフード", "21:00 ビーチ周辺パブ・ビーチバー"],
    placeholders: [
      { file: "vip-day1-kv-beach-road-dusk.jpg", desc: "夕方のビーチロード。到着日のワクワク。" },
      { file: "vip-day1-bbq-seafood.jpg", desc: "ローカルシーフード店。焼きたての海の幸。" },
      { file: "vip-day1-beach-club-lasers.jpg", desc: "ビーチバーで夜風を感じながらの乾杯。" },
    ],
  },
  {
    id: "day2",
    day: "2日目",
    date: "9月2日（水）",
    title: "絶景・海アクティビティ・夜遊びの黄金ルート",
    intro:
      "09:30ホテル出発でバーナヒルズへ。ゴールデンブリッジ（神の手）と山頂テーマパークを満喫したあと、15:30頃は自由時間（体力があればホテル前ビーチでパラセーリングも）。夜はローカル焼肉・BBQ、初心者向けカジノ、自由時間と男旅フルコース。",
    closing:
      "昼は絶景、夕方はビーチで自由時間、夜はスタミナ補給からエンタメまで。1日で「ダナン来た」を全部詰め込む日。",
    bullets: [
      "バーナヒルズ / ゴールデンブリッジ",
      "自由時間（体力があればパラセーリング）",
      "BBQ → カジノ → 自由時間",
    ],
    placeholders: [
      { file: "vip-day3-kv-golden-bridge-fog.jpg", desc: "ゴールデンブリッジと雲海。バーナヒルズの主役。" },
      { file: "vip-day2-pool-chill-drinks.jpg", desc: "ビーチ帰り。海風とドリンク、開放感。" },
      { file: "vip-day4-spa-relax.jpg", desc: "1日の締めは自由時間。" },
    ],
  },
  {
    id: "day3",
    day: "3日目",
    date: "9月3日（木）",
    title: "シュノーケリングと夜のホイアン飲み歩き",
    intro:
      "この日だけ08:00出発のチャム島シュノーケリングツアー。14:30ホテル帰還後はシャワー＆休憩。16:30からホイアン旧市街へ。提灯が灯る夕暮れから、川沿いの屋台やバーでハシゴ酒。21:00ダナンへ帰還。",
    closing:
      "海の透明度と旧市街のランタン、昼と夜で全く違う顔を見せる1日。ハシゴはペース配分が勝負。",
    bullets: ["08:00 チャム島シュノーケル", "18:00 ホイアン旧市街・提灯", "19:00 川沿いハシゴ酒"],
    placeholders: [
      { file: "vip-day2-kv-underwater-snorkel.jpg", desc: "チャム島のシュノーケル。熱帯魚とサンゴ。" },
      { file: "vip-day3-hoi-an-lanterns.jpg", desc: "ホイアンの提灯が増える夕暮れ。" },
      { file: "vip-mid-night-city-pool.jpg", desc: "ホイアンから戻ったあとの夜のダナン。" },
    ],
  },
  {
    id: "day4",
    day: "4日目",
    date: "9月4日（金）",
    title: "遺跡探訪とお土産探し、帰国の途へ",
    intro:
      "09:30ミーソン遺跡観光（前日の疲れがあればホテルプールでのんびりも可）。14:00ハン市場でお土産のまとめ買い＆値切り交渉。16:00クラフトビール店で最後の乾杯、または旅の締めマッサージ。17:30空港へ、20:25出発。",
    closing:
      "最終日は無理のない動きで締める。機内泊を経て9/5（土）07:35日本着。学生最後の夏、ここで一旦フィナーレ。",
    bullets: ["ミーソン遺跡（またはプール休養）", "ハン市場でお土産", "20:25 ダナン出発（機内泊）"],
    placeholders: [
      { file: "vip-itinerary-section-bana-cable.jpg", desc: "ミーソン遺跡またはダナン周辺の遺跡・絶景イメージ。" },
      { file: "vip-day4-kv-market-shirts.jpg", desc: "ハン市場でのお土産探し・値切り交渉。" },
      { file: "vip-day4-airport-departure.jpg", desc: "空港へ向かう帰路。余韻を胸に。" },
    ],
  },
];

export type ScheduleSlot = {
  time: string;
  title: string;
  note?: string;
};

export type ScheduleDay = {
  day: string;
  date: string;
  theme: string;
  slots: ScheduleSlot[];
};

export const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    day: "1日目",
    date: "9月1日（火）",
    theme: "到着＆ビーチエリアのパブで乾杯",
    slots: [
      { time: "17:30", title: "ダナン国際空港 到着", note: "Grab等でホテルへ移動" },
      { time: "18:30", title: "ホテルチェックイン", note: "DLGホテルダナン" },
      { time: "19:30", title: "ローカルシーフードで夕食", note: "ミーケービーチ周辺" },
      { time: "21:00", title: "ビーチ周辺の欧米風パブ・ビーチバー", note: "夜風を感じながら飲み会" },
    ],
  },
  {
    day: "2日目",
    date: "9月2日（水）",
    theme: "絶景・海アクティビティ・夜遊びの黄金ルート",
    slots: [
      { time: "09:30", title: "ホテル出発 → バーナヒルズ", note: "車で約45分" },
      { time: "10:30", title: "ゴールデンブリッジ（神の手）＆山頂テーマパーク", note: "" },
      { time: "15:30", title: "自由時間", note: "体力があればパラセーリングに行こう！" },
      { time: "18:00", title: "ローカル焼肉・BBQ", note: "スタミナ補給" },
      { time: "19:30", title: "初心者向けカジノ", note: "ゲームやスロットに挑戦" },
      { time: "22:00", title: "自由時間", note: "各自で過ごす" },
    ],
  },
  {
    day: "3日目",
    date: "9月3日（木）",
    theme: "シュノーケリングと夜のホイアン飲み歩き",
    slots: [
      { time: "08:00", title: "チャム島シュノーケリングツアー出発", note: "※この日だけ早起き" },
      { time: "14:30", title: "ホテル帰還", note: "シャワー＆休憩" },
      { time: "16:30", title: "ホイアン旧市街へ移動", note: "車で約40分" },
      { time: "18:00", title: "ランタンが灯る旧市街を散策", note: "" },
      { time: "19:00", title: "川沿いの屋台・バーでハシゴ酒", note: "ローカルビールや名物料理" },
      { time: "21:00", title: "ダナンへ帰還", note: "" },
    ],
  },
  {
    day: "4日目",
    date: "9月4日（金）",
    theme: "遺跡探訪とお土産探し、帰国の途へ",
    slots: [
      { time: "09:30", title: "ミーソン遺跡観光", note: "疲れがあればホテルプールでのんびりでも可" },
      { time: "14:00", title: "ハン市場周辺でお土産", note: "まとめ買い＆値切り交渉" },
      { time: "16:00", title: "クラフトビール店で最後の乾杯", note: "または旅の締めマッサージ" },
      { time: "17:30", title: "ダナン国際空港へ移動", note: "" },
      { time: "20:25", title: "ダナン出発", note: "機内泊" },
    ],
  },
  {
    day: "5日目",
    date: "9月5日（土）",
    theme: "帰国",
    slots: [{ time: "07:35", title: "日本着・解散", note: "" }],
  },
];

export const BUDGET_META = {
  total: "約11.5万円",
  perPerson: "約3.8万円/人",
  travelers: 3,
  tagline: "余ればビール代が増える。",
  footnote: "※為替・予約時期で変動します。最終は確定見積もりで調整してください。",
} as const;

export const BUDGET_ITEMS = [
  { label: "航空券（目安）", pct: 52, amount: "6万", bar: "bg-navy" },
  { label: "ホテル（DLG・3泊）", pct: 13, amount: "1.5万", bar: "bg-navy/70" },
  { label: "食事・飲み（BBQ/パブ等）", pct: 17, amount: "〜2万", bar: "bg-gold" },
  { label: "アクティビティ（バーナ・シュノーケル等）", pct: 13, amount: "〜1.5万", bar: "bg-navy/45" },
  { label: "予備・交通・雑費", pct: 5, amount: "〜0.5万", bar: "bg-amber-300", accent: true },
] as const;

export const HOTEL_FEATURES = [
  "ミーケービーチ前 — 海まで歩いてすぐ",
  "インフィニティプールで朝も夜も「勝ち組」ムード",
  "3ベッド体制で男3人旅の拠点として最適",
];

export const GUIDE_SECTIONS = [
  {
    title: "旅行をスムーズにするポイント",
    items: [...TRAVEL_SMOOTH_TIPS],
  },
  {
    title: "持ち物チェック",
    items: [
      "パスポート（残存6ヶ月以上）・航空券（eチケット）",
      "海外旅行保険の証書（スマホPDFでも可）",
      "水着・サンダル・日焼け止め・サングラス（パラセーリング・シュノーケル用）",
      "モバイルバッテリー・変換プラグ（C型が多い）",
      "常備薬・絆創膏・虫よけ（任意）",
      "現金（ドン）＋クレジットカード",
    ],
  },
  {
    title: "現地Tips",
    items: [
      "Grab アプリを事前にインストールしておく",
      "バーナヒルズ・チャム島ツアーは事前予約推奨",
      "3日目は08:00出発 — 前日は早めにホテルへ",
      "9/4は20:25出発 — 17:30空港到着を目安に",
      "カジノ・マッサージは身分証（パスポート）があるとスムーズ",
    ],
  },
  {
    title: "連絡・安全",
    items: [
      "ホテル名・住所をメモ（Grab用）",
      "日本の緊急連絡先を共有",
      "2日目・3日目は行程が長め — 水分補給と睡眠を確保",
      "貴重品はホテルセーフティボックスへ",
    ],
  },
];

export const HIGHLIGHTS = [
  {
    n: "01",
    en: "Beach Base",
    title: "DLG × ミーケービーチ",
    body: "ミーケービーチ前のDLGホテル。到着日からパブ、2日目もビーチまですぐ。",
    to: "/hotel",
    photoFileName: "vip-highlight-01-hotel-dlg-pool.jpg",
  },
  {
    n: "02",
    en: "Icons & Sky",
    title: "バーナヒルズ＆絶景",
    body: "ゴールデンブリッジからビーチの自由時間まで、2日目に凝縮。",
    to: "/itinerary#day2",
    photoFileName: "vip-highlight-02-ocean-snorkel.jpg",
  },
  {
    n: "03",
    en: "Sea & Old Town",
    title: "チャム島＆ホイアン",
    body: "昼はシュノーケル、夜は提灯の旧市街でハシゴ酒。",
    to: "/itinerary#day3",
    photoFileName: "vip-highlight-03-beach-club-night.jpg",
  },
] as const;

export type AttractionSpot = {
  id: string;
  name: string;
  area: string;
  description: string;
  tip?: string;
};

export type AttractionCategory = {
  id: string;
  title: string;
  subtitle?: string;
  spots: AttractionSpot[];
};

/** 行程外・自由時間向けの観光スポットまとめ */
export const ATTRACTION_CATEGORIES: AttractionCategory[] = [
  {
    id: "riverside",
    title: "ハン川・市内ナイト",
    subtitle: "ホテルからGrabで短時間。夜の定番スポット。",
    spots: [
      {
        id: "dragon-bridge",
        name: "ドラゴンブリッジ",
        area: "ハン川東側",
        description: "週末夜に火と水のショーが行われる象徴的な橋。川沿いの散策とセットで楽しめる。",
        tip: "土日 21:00頃が目安。人混みは早めに確保",
      },
      {
        id: "han-river-bridge",
        name: "ロータリー橋（ハン川大橋）",
        area: "ハン川",
        description: "夜に中央部が回転する珍しい橋。ドラゴンブリッジ近くでまとめて見られる。",
        tip: "回転は不定期のことがある — 近くでビールしながら待つのもアリ",
      },
      {
        id: "love-bridge",
        name: "恋人の橋",
        area: "ハン川東岸",
        description: "ハート型のラブロックが並ぶ歩行者橋。夜景と写真スポット。",
      },
      {
        id: "carp-fountain",
        name: "バーハーチャオ（鯱の口噴水）",
        area: "ハン川東岸",
        description: "川に向かって水を吐くドラゴン像。ドラゴンブリッジ周辺の散策ルートに組み込みやすい。",
      },
    ],
  },
  {
    id: "city",
    title: "ダナン市内・半日",
    subtitle: "雨の日や午前の空き時間にも。",
    spots: [
      {
        id: "marble-mountains",
        name: "五行山（マーブルマウンテン）",
        area: "市内南部",
        description: "石灰岩の丘と洞窟・仏像が見どころ。エレベーター利用可で登りやすい。",
        tip: "サンダルよりスニーカー推奨。半日ほど見て回れる",
      },
      {
        id: "pink-church",
        name: "ダナン大聖堂（ピンク教会）",
        area: "市内中心",
        description: "ピンク色の外観が目を引くカトリック教会。外観写真の定番。",
        tip: "礼拝時間は内部入場できないことがある",
      },
      {
        id: "cham-museum",
        name: "チャム彫刻博物館",
        area: "ハン市場付近",
        description: "チャム遺跡由来の彫刻を集めた博物館。ミーソン遺跡の予習にも。",
        tip: "雨の日・暑い昼間の室内枠として便利",
      },
      {
        id: "han-market",
        name: "ハン市場",
        area: "市内中心",
        description: "4日目に予定のお土産スポット。フルーツ・コーヒー・雑貨の値切り交渉もここ。",
        tip: "行程の最終日にまとめ買いする想定",
      },
    ],
  },
  {
    id: "daytrip",
    title: "余裕があれば",
    subtitle: "行程に入っていないが、有名な定番。",
    spots: [
      {
        id: "lady-buddha",
        name: "リンウン寺・巨大観音像",
        area: "ソンチャ半島",
        description: "高さ約67mの白い観音像。半島の展望と合わせて人気のドライブスポット。",
        tip: "バイク・Grabで行く人が多い。夕方は景色がきれい",
      },
      {
        id: "asia-park",
        name: "アジアパーク（Sun World）",
        area: "市内南部",
        description: "観覧車やアトラクションのあるテーマパーク。夜はライトアップも。",
        tip: "丸一日取ると他の行程とぶつかりやすい — 優先度は低めでOK",
      },
      {
        id: "hai-van-pass",
        name: "ハイヴァン峠",
        area: "ダナン〜フエ間",
        description: "海と山の絶景が続く峠道。バイクツアーやドライブで人気の写真スポット。",
        tip: "時間に余裕と移動手段がある場合向け",
      },
    ],
  },
];

export const ATTRACTION_SCHEDULED_NOTE = {
  title: "すでに行程に入っている定番",
  items: [
    "バーナヒルズ・ゴールデンブリッジ（2日目）",
    "ミーケービーチ・パラセーリング（2日目・任意）",
    "チャム島シュノーケリング（3日目）",
    "ホイアン旧市街（3日目）",
    "ミーソン遺跡（4日目）",
  ],
} as const;
