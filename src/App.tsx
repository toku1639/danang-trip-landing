import { type ReactNode, useState } from "react";
import { ScrollReveal } from "./components/ScrollReveal";

function IconCamera({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 8h3l1.5-2h7L17 8h3a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2z" />
      <circle cx="12" cy="14" r="3.5" />
    </svg>
  );
}

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** ハイライトカード専用サムネ。`public/images/{fileName}` → なければ `public/{fileName}`。無ければプレースホルダー。 */
function PlaceholderFrame({
  aspect = "aspect-[4/3]",
  className = "",
  fileName,
}: {
  aspect?: string;
  className?: string;
  fileName?: string;
}) {
  const [attempt, setAttempt] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const src = fileName && !imgFailed ? (attempt === 0 ? `/images/${fileName}` : `/${fileName}`) : null;

  return (
    <div
      className={`relative w-full overflow-hidden bg-sand ${aspect} border border-black/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ${className}`}
    >
      {src ? (
        <img
          key={attempt}
          src={src}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => {
            if (attempt === 0) setAttempt(1);
            else setImgFailed(true);
          }}
        />
      ) : null}
      {!src ? (
        <>
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(145deg,rgba(255,255,255,0.35),transparent_45%)]" />
          <div className="absolute inset-0 z-[1] flex items-center justify-center">
            <IconCamera className="h-12 w-12 text-navy/25" />
          </div>
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(145deg,rgba(255,255,255,0.35),transparent_45%)]" />
      )}
      <span className="absolute bottom-2 left-2 right-2 z-[2] rounded border border-navy/10 bg-white/90 px-2 py-1 text-[9px] font-medium leading-tight text-navy/70">
        <span className="block text-[8px] font-semibold uppercase tracking-wider text-navy/45">PHOTO</span>
        {fileName ? <span className="mt-0.5 block font-mono text-[9px] text-navy/90">{fileName}</span> : null}
      </span>
    </div>
  );
}

/**
 * 画面いっぱいの写真エリア（ミキ／ディズニーLPの全面ビジュアル風）
 * 表示順: `public/images/{fileName}` → なければ `public/{fileName}`（直下）。どちらも無ければプレースホルダー。
 */
function FullBleedPlaceholder({
  variant = "light",
  minHeight = "min-h-[62vh]",
  fileName,
  overlay,
  overlayPlacement = "end",
  bleed = true,
  className = "",
  priority = false,
}: {
  variant?: "light" | "dark";
  minHeight?: string;
  /** 画像ファイル名（推奨: `public/images/`。`public/` 直下でも可） */
  fileName: string;
  overlay?: ReactNode;
  /** オーバーレイの縦位置（center = FV風・写真の上に載せる） */
  overlayPlacement?: "end" | "center" | "start";
  /** false: max-w 内や absolute 塗りつぶし用（ネガティブマージンなし） */
  bleed?: boolean;
  className?: string;
  /** ファーストビュー向け（eager / fetchPriority） */
  priority?: boolean;
}) {
  /** 0: /images/name, 1: /name（public 直下） */
  const [srcAttempt, setSrcAttempt] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const base =
    variant === "dark"
      ? "from-[#1a1f2e] via-[#121826] to-navy-deep"
      : "from-[#dfe6e9] via-sand to-[#cfd8dc]";
  const bleedCls = bleed ? "full-bleed" : "relative w-full";
  const imgSrc = srcAttempt === 0 ? `/images/${fileName}` : `/${fileName}`;
  return (
    <div className={`${bleedCls} relative ${minHeight} overflow-hidden ${className}`}>
      {!imgFailed ? (
        <img
          key={srcAttempt}
          src={imgSrc}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => {
            if (srcAttempt === 0) setSrcAttempt(1);
            else setImgFailed(true);
          }}
          {...(priority ? { fetchPriority: "high" as const } : {})}
        />
      ) : null}
      {imgFailed ? (
        <>
          <div className={`absolute inset-0 z-0 bg-gradient-to-br ${base}`} aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
            }}
          />
          <div className="absolute inset-0 z-[1] flex items-center justify-center">
            <IconCamera
              className={`h-[min(22vw,7rem)] w-[min(22vw,7rem)] ${variant === "dark" ? "text-white/12" : "text-navy/18"}`}
            />
          </div>
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
          }}
        />
      )}
      {/* 下方向へ読みやすいグラデ（キャプション＆オーバーレイ用） */}
      <div
        className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t ${
          variant === "dark"
            ? "from-black/80 via-black/25 to-black/30"
            : "from-black/55 via-black/10 to-white/10"
        }`}
      />
      {overlay ? (
        <div
          className={`absolute inset-0 z-10 flex flex-col ${
            overlayPlacement === "center"
              ? "items-center justify-center px-4 pb-32 pt-20"
              : overlayPlacement === "start"
                ? "items-center justify-start px-4 pt-24 sm:pt-28"
                : "justify-end"
          }`}
        >
          {overlay}
        </div>
      ) : null}
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 bg-cream py-14 text-center">
      <p className="font-en text-lg italic tracking-wide text-navy/70">{label}</p>
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
      <IconChevronDown className="h-6 w-6 animate-bounce-slow text-navy/45" />
    </div>
  );
}

function AreaNav({ active }: { active: number }) {
  const nums = [1, 2, 3];
  return (
    <div className="flex items-center justify-center gap-3 bg-cream py-6 text-sm font-en tracking-[0.2em] text-navy/35">
      <span className="text-xs font-semibold uppercase tracking-widest text-navy/45">Highlight</span>
      {nums.map((n) => (
        <span
          key={n}
          className={`font-semibold transition ${active === n ? "text-navy" : "text-navy/25"}`}
        >
          0{n}
        </span>
      ))}
    </div>
  );
}

/** 横スクロール帯の1枚。`public/images/{fileName}` → なければ `public/{fileName}`。どちらも無ければプレースホルダー。 */
function StripSlideCard({ fileName, photoNote }: { fileName: string; photoNote: string }) {
  const [attempt, setAttempt] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const src = imgFailed ? null : attempt === 0 ? `/images/${fileName}` : `/${fileName}`;

  return (
    <div className="relative h-[min(42vh,300px)] w-[min(88vw,520px)] shrink-0 overflow-hidden bg-gradient-to-br from-[#dfe6e9] via-sand to-[#cfd8dc]">
      {src ? (
        <img
          key={attempt}
          src={src}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => {
            if (attempt === 0) setAttempt(1);
            else setImgFailed(true);
          }}
        />
      ) : null}
      {imgFailed ? (
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <IconCamera className="h-14 w-14 text-navy/20 sm:h-20 sm:w-20" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(145deg,rgba(255,255,255,0.35),transparent_45%)]" />
      <div className="absolute bottom-0 left-0 right-0 z-[2] bg-gradient-to-t from-black/45 to-transparent px-3 pb-3 pt-10">
        <p className="font-mono text-[9px] font-semibold text-amber-100/95 sm:text-[10px]">PHOTO · {fileName}</p>
        <p className="mt-1 text-[10px] leading-snug text-white/90 sm:text-[11px]">{photoNote}</p>
      </div>
    </div>
  );
}

/**
 * ミキLP風：隙間なし横並び。
 * 横移動は **CSS**（`public/strip-animation.css` の `@keyframes strip-scroll`）による **自動・無限ループ**。
 */
function AutoScrollPhotoStrip({
  slides,
  caption,
}: {
  slides: { fileName: string; photoNote: string }[];
  caption: string;
}) {
  if (slides.length === 0) return null;
  const loop = [...slides, ...slides];
  return (
    <section className="bg-cream" aria-label="プールデッキ イメージギャラリー">
      <div className="full-bleed isolate overflow-hidden border-y border-black/[0.06] [contain:paint]">
        <div className="flex w-max animate-strip-scroll">
          {loop.map((item, i) => (
            <StripSlideCard key={`${item.fileName}-${i}`} fileName={item.fileName} photoNote={item.photoNote} />
          ))}
        </div>
      </div>
      <p className="mx-auto max-w-xl px-4 py-8 text-center text-sm leading-relaxed text-ink/70 sm:px-5">{caption}</p>
    </section>
  );
}

export default function App() {
  return (
    <div className="overflow-x-hidden">
      {/* トップバー */}
      <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-center border-b border-black/[0.06] bg-cream/90 px-4 py-3 backdrop-blur-md sm:justify-start">
        <p className="font-display text-sm font-semibold tracking-wider text-navy">VIP TRIP</p>
      </header>

      {/* ヒーロー：全面写真＋オーバーレイ（Welcome） */}
      <section className="relative min-h-[100dvh]">
        <div className="absolute inset-0">
          <FullBleedPlaceholder
            bleed={false}
            variant="dark"
            minHeight="min-h-full"
            className="h-full min-h-[100dvh]"
            priority
            fileName="vip-hero-welcome-banner.jpg"
            overlay={
              <div className="px-5 pb-28 pt-28 text-center sm:pb-36">
                <p className="font-en text-[clamp(1.85rem,7vw,3.25rem)] font-semibold leading-[1.1] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]">
                  Welcome to
                  <br />
                  <span className="italic text-amber-100">Da Nang VIP</span>
                </p>
                <h1 className="mx-auto mt-8 max-w-xl font-display text-[clamp(1.15rem,4vw,1.5rem)] font-bold leading-snug tracking-wide text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                  学生最後の夏、全力で楽しむ東南アジア旅行
                  <br />
                  in Da Nang
                </h1>
                <p className="mt-6 text-sm font-medium tracking-[0.35em] text-white/90">2026.09.01 — 09.04</p>
              </div>
            }
          />
        </div>
      </section>

      {/* 導入：セカンドFV（写真全面＋その上にコピー）→ 全面写真 → コピー */}
      <ScrollReveal className="bg-cream">
        <FullBleedPlaceholder
          variant="light"
          minHeight="min-h-[78vh]"
          fileName="vip-intro-hotel-lobby.jpg"
          overlayPlacement="center"
          overlay={
            <div className="mx-auto w-full max-w-lg px-3 text-center sm:px-5">
              <h2 className="font-display text-xl font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.85),0_0_28px_rgba(0,0,0,0.5)] md:text-2xl">
                VIP豪遊旅へようこそ
              </h2>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.8),0_0_20px_rgba(0,0,0,0.45)]">
                そこにあるのは、
                <br />
                <span className="text-amber-100">「歩き疲れない」リゾート滞在型の、男旅の完成形。</span>
              </h3>
              <p className="mt-4 text-justify text-[15px] leading-[1.9] text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.85),0_0_18px_rgba(0,0,0,0.4)]">
                移動と遊びのバランスを最適化した行程。海も夜景も絶景も、無理のないリズムで回せる設計です。広大な観光地を走り回るだけの旅ではなく、ホテルに戻ればすぐにプールと冷えたビール——目覚めればまた、透明な海とクラブの灯りが待っています。
              </p>
            </div>
          }
        />
      </ScrollReveal>

      {/* ScrollReveal なし：親の translateY フェードと子の translateX が重なるとカクつきやすい */}
      <AutoScrollPhotoStrip
        slides={[
          {
            fileName: "vip-pool-strip-01.jpg",
            photoNote: "プール俯瞰。タオル・ドリンク・青空。",
          },
          {
            fileName: "vip-pool-strip-02.jpg",
            photoNote: "デッキチェアとパラソル。昼のリゾート感。",
          },
          {
            fileName: "vip-pool-strip-03.jpg",
            photoNote: "プールサイドから海方向。ワイド。",
          },
          {
            fileName: "vip-pool-strip-04.jpg",
            photoNote: "インフィニティラインと波打ち際。",
          },
          {
            fileName: "vip-pool-strip-05.jpg",
            photoNote: "カクテルとサンセットの反射。",
          },
          {
            fileName: "vip-pool-strip-06.jpg",
            photoNote: "ナイトプール／照明と水面。",
          },
        ]}
        caption="プールデッキのイメージ（6カットを横に流す）。リゾートの余裕と開放感。"
      />

      <ScrollReveal className="bg-cream">
        <div className="mx-auto max-w-xl px-4 py-14 sm:px-5">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink">
            お財布を気にしすぎない、
            <br />
            <span className="text-navy">「予算が読める」豪遊。</span>
          </h3>
          <p className="mt-4 text-left text-[15px] leading-[1.9] text-ink/80">
            宿泊はDLGでまとめて快適に。食事はBBQにクラブ、部屋飲みまで含めて総額感を先に握れるから、現地で迷わない。余裕が出たら、その分をビールに回す——それがこの旅のルールです。
          </p>
        </div>
      </ScrollReveal>

      <SectionDivider label="Scroll Down" />

      {/* ハイライト：従来どおりカード＋カード内サムネ */}
      <section id="highlights" className="scroll-mt-24 bg-cream">
        <ScrollReveal className="mx-auto max-w-lg px-5 pt-4">
          <p className="text-center font-en text-sm font-semibold uppercase tracking-[0.35em] text-gold">Highlights</p>
          <h2 className="mt-3 text-center font-display text-xl font-bold text-navy">3つのハイライト</h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-ink/65">
            ホテル・絶景・夜遊び。あなたの楽しみを最大限に。
          </p>
        </ScrollReveal>

        <AreaNav active={2} />

        <div className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-5 pb-8 pt-2 hide-scrollbar lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-6 lg:snap-none">
          <HighlightCard
            n="01"
            en="Five-Star Base"
            title="5つ星ホテル連泊"
            body="DLG Hotel Danang — インフィニティプール付き、ベッド3台の部屋で男旅の拠点。"
            href="#day1"
            photoFileName="vip-highlight-01-hotel-dlg-pool.jpg"
            photoComment="DLGのプールデッキで3人のシルエット、夕方のグラデーション空。ラグジュアリーと仲間感。"
          />
          <HighlightCard
            n="02"
            en="Ocean & Icons"
            title="絶景建築＆透明な海"
            body="ゴールデンブリッジ、ソンチャ半島でシュノーケル。青のグラデーション全開。"
            href="#day2"
            photoFileName="vip-highlight-02-ocean-snorkel.jpg"
            photoComment="シュノーケル中の水中ショット or ボートから見たエメラルドグリーンの海。"
          />
          <HighlightCard
            n="03"
            en="Night & Feast"
            title="夜遊び＆爆食い"
            body="ビーチクラブ、海鮮BBQ、部屋でピザ＆ビール。夜は止まらない。"
            href="#day3"
            photoFileName="vip-highlight-03-beach-club-night.jpg"
            photoComment="ビーチクラブのネオンとDJブース、グラスを掲げる手元のクローズアップ。"
          />
        </div>
      </section>

      <SectionDivider label="Start to Scroll" />

      {/* Legendary 風：全面写真＋大見出し（エンタメ帯の代替） */}
      <FullBleedPlaceholder
        variant="dark"
        minHeight="min-h-[78vh]"
        fileName="vip-journey-legendary-nightpool.jpg"
        overlay={
          <div className="px-6 pb-16 pt-24 text-center">
            <p className="font-en text-sm font-semibold uppercase tracking-[0.45em] text-amber-200/90">Legendary Journey</p>
            <h2 className="mx-auto mt-5 max-w-md font-display text-2xl font-bold leading-snug text-white drop-shadow-lg md:text-3xl">
              忘れられない4日間に
              <br />
              かかる。
            </h2>
            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/80">
              海・絶景・クラブ。写真で先に体験して、現地は余韻だけ持っていけばいい。
            </p>
          </div>
        }
      />

      {/* 中間 Welcome：全面×2（旧2カラムをフルブリード化） */}
      <ScrollReveal className="bg-cream">
        <div className="mx-auto max-w-lg px-5 py-12 text-center">
          <p className="font-en text-2xl font-semibold italic text-navy">Welcome to Da Nang VIP</p>
          <p className="mt-3 font-display text-base font-semibold text-ink">最高の4日間を、ここから始めよう。</p>
        </div>
      </ScrollReveal>
      <FullBleedPlaceholder
        variant="light"
        minHeight="min-h-[62vh]"
        fileName="vip-mid-night-city-pool.jpg"
      />
      <FullBleedPlaceholder
        variant="light"
        minHeight="min-h-[58vh]"
        fileName="vip-mid-airport-arrival-sunset.jpg"
      />

      {/* タイムライン */}
      <section id="itinerary" className="scroll-mt-16 bg-navy-deep">
        <ScrollReveal className="relative">
          <FullBleedPlaceholder
            variant="dark"
            minHeight="min-h-[56vh]"
            fileName="vip-itinerary-section-bana-cable.jpg"
            overlay={
              <div className="px-5 pb-14 pt-20">
                <p className="text-center font-en text-sm font-semibold uppercase tracking-[0.35em] text-gold/90">Itinerary</p>
                <h2 id="timeline-heading" className="mt-4 text-center font-display text-2xl font-bold drop-shadow-md">
                  タイムライン（行程）
                </h2>
                <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-white/80">
                  スクロールしながら、4日間の流れをイメージしてください。
                </p>
              </div>
            }
          />
        </ScrollReveal>

        <DayBlock
          id="day1"
          day="Day 1"
          title="到着 & ナイトライフ解禁"
          intro="ダナンに着地したら、まずはホテルで荷物を置いて身軽に。夕方の空気はまだ夏の熱を残しているのに、潮風が日本とは違う「旅に来た感」を一気に持ってくる。ここからは、学生最後の夏をちゃんと祝う番だ。"
          closing="海鮮バーベキューで腹を満たしたら、ビーチクラブへ。音も光も、初日の勢いに合わせて最大音量で。乾杯の回数は、翌朝の自分の体力を信じて決めよう。"
          bullets={["海鮮BBQ", "ビーチクラブで乾杯"]}
          placeholders={[
            {
              file: "vip-day1-kv-beach-road-dusk.jpg",
              desc: "夕方のビーチロード、バイクのヘッドライトの流れ。到着のワクワク。",
            },
            {
              file: "vip-day1-bbq-seafood.jpg",
              desc: "テーブルに並ぶ焼きたてシーフードと炭火の炎。湯気とスパイス感。",
            },
            {
              file: "vip-day1-beach-club-lasers.jpg",
              desc: "クラブのレーザーと砂浜、足元に波。ナイトキックオフの瞬間。",
            },
          ]}
        />
        <DayBlock
          id="day2"
          day="Day 2"
          title="ダイナミックな海 & クラブ"
          intro="ソンチャの海は透明度が勝負。シュノーケルで魚やサンゴを追いかけたあとは、プールで「勝ち組の休憩」を取る。泳いで、飲んで、昼寝して、夜は別ジャンルの熱量に切り替える。"
          closing="New Phuong Dong Club は、音圧と照明で「旅に来た実感」を仕上げる場所。足が痛くなるまで踊いていい。翌日の写真が残るかどうかは、そこは各自の自己責任で。"
          bullets={["ソンチャでシュノーケル", "プールでチル", "New Phuong Dong Club"]}
          placeholders={[
            {
              file: "vip-day2-kv-underwater-snorkel.jpg",
              desc: "マスク越しの熱帯魚とサンゴ。色をはっきり出す水中マクロ。",
            },
            {
              file: "vip-day2-pool-chill-drinks.jpg",
              desc: "プールサイドのサングラスとドリンク、青空の反射。",
            },
            {
              file: "vip-day2-club-strobes.jpg",
              desc: "クラブの巨大スピーカーとストロボ、踊るシルエット（顔は控えめ）。",
            },
          ]}
        />
        <DayBlock
          id="day3"
          day="Day 3"
          title="絶景 & フィナーレ"
          intro="バナヒルズは雲海と巨大な手のモニュメントで、写真の空気感が一気に変わる。ホイアンは夕方が一番しっくりくる。提灯が増えていく時間に合わせて歩けば、路地も川面の反射も、全部フィルムが勝手にかかる。"
          closing="締めは部屋でピザ宅配パーティー。チキン・フィッシュ・マヨのどれが届くかは運命のルーレット。ビールは冷えている前提で、笑いが増える夜にしよう。"
          bullets={[
            "バナヒルズ / ゴールデンブリッジ",
            "ホイアン散策",
            "部屋でピザ宅配パーティー（チキン・フィッシュ・マヨのどれが届くか運命のルーレットｗ）",
          ]}
          placeholders={[
            {
              file: "vip-day3-kv-golden-bridge-fog.jpg",
              desc: "ケーブルカーから見下ろす雲海と山。手のモニュメントは中央構図。",
            },
            {
              file: "vip-day3-hoi-an-lanterns.jpg",
              desc: "ホイアンの提灯が連なる夕暮れ、川面の反射。",
            },
            {
              file: "vip-day3-pizza-party-room.jpg",
              desc: "ホテルベッドの上にピザ箱3枚、ビール缶、笑い顔の手元だけ。ジョーク感を演出。",
            },
          ]}
        />
        <DayBlock
          id="day4"
          day="Day 4"
          title="リカバリー & 帰国"
          intro="最終日は「この旅、ちゃんと来た」を証明するお揃いTシャツを市場で調達して、スパで身体を整える。旅の疲れを残すか消すかは、オイルと施術の強さに少しだけ委ねていい。"
          closing="空港へ向かう直前まで、無理に詰め込まない。帰路は「また来る」前提の余韻で十分。学生最後の夏の締めは、空港のゲート前で勝手に決めよう。"
          bullets={["お揃いTシャツを市場で調達", "スパで整える", "出発"]}
          placeholders={[
            {
              file: "vip-day4-kv-market-shirts.jpg",
              desc: "市場で色違いTシャツを掲げる3人、賑やかな背景ボケ。",
            },
            {
              file: "vip-day4-spa-relax.jpg",
              desc: "スパの静かな照明とハーブティ、リラックスの空気感。",
            },
            {
              file: "vip-day4-airport-departure.jpg",
              desc: "空港の出発ゲート看板、バックパックのワンショット。余韻。",
            },
          ]}
          isLast
        />
      </section>

      <SectionDivider label="Keep Scrolling" />

      {/* ホテル：全面ギャラリー → テキスト */}
      <ScrollReveal className="bg-cream" id="hotel">
        <FullBleedPlaceholder
          variant="light"
          minHeight="min-h-[72vh]"
          fileName="vip-hotel-hero-room-view.jpg"
          overlay={
            <div className="px-6 pb-14 pt-24">
              <p className="text-center font-en text-sm font-semibold uppercase tracking-[0.35em] text-white drop-shadow">
                Accommodations
              </p>
              <h2 className="mt-4 text-center font-display text-2xl font-bold text-white drop-shadow md:text-3xl">
                ホテル特集：DLG Hotel
              </h2>
            </div>
          }
        />
        <FullBleedPlaceholder
          variant="light"
          minHeight="min-h-[55vh]"
          fileName="vip-hotel-pool-edge.jpg"
        />
        <FullBleedPlaceholder
          variant="light"
          minHeight="min-h-[55vh]"
          fileName="vip-hotel-room-three-beds.jpg"
        />
        <div className="mx-auto max-w-lg px-5 py-14">
          <p className="text-center text-sm leading-relaxed text-ink/70">
            最高の快適さと利便性を追求した拠点で、旅を満喫。
          </p>
          <ul className="mt-10 space-y-3 border-t border-black/[0.06] pt-8 text-[15px] leading-relaxed text-ink/85">
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              インフィニティプールで朝も夜も「勝ち組」ムード
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              眺望バッチリ — 写真が勝手に映える
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              3ベッド体制で寝相もプライバシーも確保（たぶん）
            </li>
          </ul>
        </div>
      </ScrollReveal>

      {/* 予算：全面背景＋ガラスカード */}
      <section className="relative min-h-[85vh]" id="budget">
        <div className="absolute inset-0 z-0">
          <FullBleedPlaceholder
            bleed={false}
            variant="dark"
            minHeight="min-h-full"
            className="h-full min-h-[85vh]"
            fileName="vip-budget-table-top-flatlay.jpg"
          />
        </div>
        <div className="relative z-10 flex min-h-[85vh] items-center justify-center px-4 py-20">
          <ScrollReveal className="w-full max-w-lg">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md md:p-8">
              <p className="text-center font-en text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/90">Budget</p>
              <h2 className="mt-3 text-center font-display text-2xl font-bold text-white">予算イメージ（内訳）</h2>
              <p className="mt-3 text-center text-sm text-white/75">合計 約11.5万円想定。余ればビールが増える。</p>
              <div className="mt-8 rounded-xl border border-white/10 bg-navy-deep/40 p-5">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Total</p>
                    <p className="font-display text-3xl font-bold text-amber-100">約11.5万円</p>
                  </div>
                  <p className="max-w-[13rem] text-right text-xs font-semibold leading-snug text-amber-200">
                    予算内＝ビール代が増える🔥
                  </p>
                </div>
                <BudgetRow label="航空券（目安）" pct={52} amount="6万" dark />
                <BudgetRow label="ホテル（DLG・3泊）" pct={13} amount="1.5万" dark />
                <BudgetRow label="食事・飲み（BBQ/クラブ等）" pct={17} amount="〜2万" dark />
                <BudgetRow label="アクティビティ（バナ等）" pct={13} amount="〜1.5万" dark />
                <BudgetRow label="予備・交通・雑費" pct={5} amount="〜0.5万" dark accent />
                <p className="mt-5 text-xs leading-relaxed text-white/55">
                  ※為替・予約時期で変動。最終は確定見積もりでロックしよう。
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 締め：全面写真＋Welcome（著作表記まで同一ブロック）。下端までクリームが見えないよう min-h 確保 */}
      <section className="relative min-h-[100dvh] bg-navy-deep">
        <div className="absolute inset-0 z-0">
          <FullBleedPlaceholder
            bleed={false}
            variant="dark"
            minHeight="min-h-full"
            className="h-full min-h-[100dvh]"
            fileName="vip-footer-group-celebration-wide.jpg"
          />
        </div>
        <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24 text-center">
          <p className="font-en text-2xl font-semibold italic text-white">Welcome to Da Nang VIP</p>
          <p className="mt-2 font-display text-sm font-semibold text-white/90">この旅で、学生最後の夏を締めくくろう。</p>
          <p className="mt-10 font-en text-[11px] tracking-widest text-white/50">Da Nang VIP · 2026</p>
        </div>
      </section>
    </div>
  );
}

function HighlightCard({
  n,
  en,
  title,
  body,
  href,
  photoFileName,
  photoComment,
}: {
  n: string;
  en: string;
  title: string;
  body: string;
  href: string;
  photoFileName: string;
  photoComment: string;
}) {
  return (
    <article className="flex min-w-[88%] shrink-0 snap-center flex-col self-stretch sm:min-w-[300px] lg:min-w-0 lg:w-auto lg:max-w-none lg:shrink">
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_24px_80px_-40px_rgba(15,31,53,0.35)]">
        <div className="relative shrink-0">
          <PlaceholderFrame aspect="aspect-[5/4]" fileName={photoFileName} />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 font-en text-xs font-bold tracking-widest text-navy shadow-sm">
            {n}
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col p-5">
          <p className="shrink-0 font-en text-sm font-semibold italic text-gold">{en}</p>
          <h3 className="mt-2 shrink-0 font-display text-lg font-bold text-navy">{title}</h3>
          <p className="mt-3 grow text-sm leading-relaxed text-ink/75">{body}</p>
          <p className="mt-3 shrink-0 text-[11px] leading-snug text-ink/45">
            <span className="font-mono text-[10px] text-navy/70">PHOTO · {photoFileName}</span>
            <span className="mt-1 block text-ink/40">{photoComment}</span>
          </p>
          <a
            href={href}
            className="mt-5 inline-flex shrink-0 items-center gap-2 self-start border-b border-navy pb-0.5 text-sm font-semibold text-navy"
          >
            詳しく見る
            <span aria-hidden className="font-en text-xs">
              →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

function DayBlock({
  id,
  day,
  title,
  intro,
  closing,
  bullets,
  placeholders,
  isLast,
}: {
  id: string;
  day: string;
  title: string;
  intro: string;
  closing: string;
  bullets: string[];
  placeholders: [{ file: string; desc: string }, { file: string; desc: string }, { file: string; desc: string }];
  isLast?: boolean;
}) {
  const num = day.replace("Day ", "0");
  const [p1, p2, p3] = placeholders;
  return (
    <ScrollReveal className={isLast ? "" : ""}>
      <div id={id} className="scroll-mt-28">
        <FullBleedPlaceholder
          variant="dark"
          minHeight="min-h-[72vh]"
          fileName={p1.file}
          overlay={
            <div className="px-6 pb-14 pt-24">
              <p className="font-en text-5xl font-semibold text-white/20">{num}</p>
              <h3 className="-mt-2 font-display text-2xl font-bold text-white drop-shadow-lg">{title}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/90">{day}</p>
            </div>
          }
        />
        {/* 白文字は親のクリーム背景で消えるため、常にクリーム帯＋濃色字 */}
        <div className="full-bleed bg-cream">
          <div className="mx-auto max-w-lg px-5 py-12 sm:py-16">
            <p className="text-justify text-[15px] leading-[1.95] text-ink/90">{intro}</p>
            <div className="mt-12 border-t border-navy/10 pt-10">
              <p className="font-display text-sm font-medium text-navy/75">この日のメイン</p>
              <ul className="mt-5 list-none space-y-3 text-[15px] leading-relaxed text-ink/88">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="select-none text-navy/35" aria-hidden>
                      —
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-12 text-justify text-[15px] leading-[1.95] text-ink/78">{closing}</p>
          </div>
        </div>
        <FullBleedPlaceholder variant="dark" minHeight="min-h-[56vh]" fileName={p2.file} />
        <div className={isLast ? "pb-16" : ""}>
          <FullBleedPlaceholder variant="dark" minHeight="min-h-[56vh]" fileName={p3.file} />
        </div>
        {!isLast ? <div className="h-px w-full bg-white/10" /> : null}
      </div>
    </ScrollReveal>
  );
}

function BudgetRow({
  label,
  pct,
  amount,
  accent,
  dark,
}: {
  label: string;
  pct: number;
  amount: string;
  accent?: boolean;
  dark?: boolean;
}) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
        <span className={dark ? "text-white/85" : "text-ink/80"}>{label}</span>
        <span className={`shrink-0 font-semibold ${accent ? "text-amber-200" : dark ? "text-white" : "text-navy"}`}>
          {amount}
        </span>
      </div>
      <div className={`h-2 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-sand"}`}>
        <div
          className={`h-full rounded-full ${accent ? "bg-amber-300" : dark ? "bg-amber-100/90" : "bg-navy/80"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
