import { type ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";
import { displayPhotoFileName, publicImageSrc } from "../lib/assets";
import { BUDGET_ITEMS, BUDGET_META } from "../data/trip";

/** 長い見出しを句読点・中黒の自然な位置で改行（SP のみ） */
export function ResponsiveJapaneseTitle({
  text,
  className = "",
  breakAt = "sm",
}: {
  text: string;
  className?: string;
  /** sm 未満で改行 / md 未満で改行 / 常に改行 */
  breakAt?: "sm" | "md" | "always";
}) {
  const brClass = breakAt === "always" ? "" : breakAt === "md" ? "md:hidden" : "sm:hidden";
  const comma = text.indexOf("、");
  if (comma > 0 && comma < text.length - 1) {
    return (
      <span className={className}>
        {text.slice(0, comma + 1)}
        <br className={brClass} />
        {text.slice(comma + 1)}
      </span>
    );
  }
  const dot = text.lastIndexOf("・");
  if (dot > 0 && dot < text.length - 1) {
    return (
      <span className={className}>
        {text.slice(0, dot + 1)}
        <br className={brClass} />
        {text.slice(dot + 1)}
      </span>
    );
  }
  return <span className={className}>{text}</span>;
}

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
export function PlaceholderFrame({
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
  const src =
    fileName && !imgFailed ? (attempt === 0 ? publicImageSrc(fileName, true) : publicImageSrc(fileName, false)) : null;

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
      <span className="absolute bottom-2 left-2 right-2 z-[2] hidden rounded border border-navy/10 bg-white/90 px-2 py-1 text-[9px] font-medium leading-tight text-navy/70 sm:block">
        <span className="block text-[8px] font-semibold uppercase tracking-wider text-navy/45">PHOTO</span>
        {fileName ? (
          <span className="mt-0.5 block font-mono text-[9px] text-navy/90">{displayPhotoFileName(fileName)}</span>
        ) : null}
      </span>
    </div>
  );
}

/** spLandscape 時の高さ（index.css の .fb-sp-* で定義。Tailwind の動的クラスに依存しない） */
const FB_SP_LANDSCAPE: Record<string, string> = {
  "min-h-[55vh]": "fb-sp-55",
  "min-h-[68vh]": "fb-sp-68",
  "min-h-[72vh]": "fb-sp-72",
  "min-h-full": "fb-sp-full",
};

/**
 * 画面いっぱいの写真エリア（ミキ／ディズニーLPの全面ビジュアル風）
 * 表示順: `public/images/{fileName}` → なければ `public/{fileName}`（直下）。どちらも無ければプレースホルダー。
 */
export function FullBleedPlaceholder({
  variant = "light",
  minHeight = "min-h-[62vh]",
  fileName,
  overlay,
  overlayPlacement = "end",
  bleed = true,
  className = "",
  priority = false,
  /** true: max-lg は 4:3 横長、lg 以上は minHeight どおり */
  spLandscape = false,
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
  spLandscape?: boolean;
}) {
  /** 0: images/name, 1: public 直下 */
  const [srcAttempt, setSrcAttempt] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const base =
    variant === "dark"
      ? "from-[#1a1f2e] via-[#121826] to-navy-deep"
      : "from-[#dfe6e9] via-sand to-[#cfd8dc]";
  const bleedCls = bleed ? "full-bleed" : "relative w-full";
  const heightCls = spLandscape ? (FB_SP_LANDSCAPE[minHeight] ?? minHeight) : minHeight;
  const imgSrc = srcAttempt === 0 ? publicImageSrc(fileName, true) : publicImageSrc(fileName, false);
  return (
    <div className={`${bleedCls} relative ${heightCls} overflow-hidden ${className}`}>
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

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 bg-cream py-8 text-center lg:gap-3 lg:py-14">
      <p className="font-en text-base italic tracking-wide text-navy/70 lg:text-lg">{label}</p>
      <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold/80 to-transparent lg:w-16" />
      <IconChevronDown className="h-5 w-5 animate-bounce-slow text-navy/45 lg:h-6 lg:w-6" />
    </div>
  );
}

/** 行程：SP 用コンパクト写真 */
export function DayThumbPhoto({
  fileName,
  aspect = "aspect-[4/3]",
  className = "",
  rounded = true,
}: {
  fileName: string;
  aspect?: string;
  className?: string;
  rounded?: boolean;
}) {
  const [attempt, setAttempt] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const src = imgFailed ? null : attempt === 0 ? publicImageSrc(fileName, true) : publicImageSrc(fileName, false);
  return (
    <div
      className={`relative overflow-hidden bg-sand ${aspect} ${rounded ? "rounded-xl" : ""} ${className}`}
    >
      {src ? (
        <img
          key={attempt}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => {
            if (attempt === 0) setAttempt(1);
            else setImgFailed(true);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <IconCamera className="h-8 w-8 text-white/20" />
        </div>
      )}
    </div>
  );
}

export function AreaNav({ active }: { active: number }) {
  const nums = [1, 2, 3];
  return (
    <div className="hidden items-center justify-center gap-3 bg-cream py-6 text-sm font-en tracking-[0.2em] text-navy/35 lg:flex">
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
function StripSlideCard({ fileName }: { fileName: string }) {
  const [attempt, setAttempt] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const src = imgFailed ? null : attempt === 0 ? publicImageSrc(fileName, true) : publicImageSrc(fileName, false);

  return (
    <div className="relative h-[min(28vh,200px)] w-[min(68vw,360px)] shrink-0 overflow-hidden bg-gradient-to-br from-[#dfe6e9] via-sand to-[#cfd8dc] lg:h-[min(42vh,300px)] lg:w-[min(88vw,520px)]">
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
          <IconCamera className="h-10 w-10 text-navy/20 sm:h-14 sm:w-14 lg:h-20 lg:w-20" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(145deg,rgba(255,255,255,0.35),transparent_45%)]" />
    </div>
  );
}

/**
 * ミキLP風：隙間なし横並び。
 * 横移動は **CSS**（`public/strip-animation.css` の `@keyframes strip-scroll`）による **自動・無限ループ**。
 */
export function AutoScrollPhotoStrip({ slides }: { slides: { fileName: string }[] }) {
  if (slides.length === 0) return null;
  const loop = [...slides, ...slides];
  return (
    <section className="bg-cream" aria-label="プールデッキ イメージギャラリー">
      <div className="full-bleed isolate overflow-hidden border-y border-black/[0.06] [contain:paint]">
        <div className="flex w-max animate-strip-scroll">
          {loop.map((item, i) => (
            <StripSlideCard key={`${item.fileName}-${i}`} fileName={item.fileName} />
          ))}
        </div>
      </div>
    </section>
  );
}


export function HighlightCard({
  n,
  en,
  title,
  body,
  to,
  photoFileName,
  photoComment,
}: {
  n: string;
  en: string;
  title: string;
  body: string;
  to: string;
  photoFileName: string;
  photoComment?: string;
}) {
  return (
    <article className="flex w-full min-w-0 shrink-0 flex-col self-stretch">
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_16px_48px_-32px_rgba(15,31,53,0.35)] lg:shadow-[0_24px_80px_-40px_rgba(15,31,53,0.35)]">
        <div className="relative shrink-0">
          <PlaceholderFrame aspect="aspect-[16/10] lg:aspect-[5/4]" fileName={photoFileName} />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 font-en text-xs font-bold tracking-widest text-navy shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1">
            {n}
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
          <p className="shrink-0 font-en text-sm font-semibold italic text-gold">{en}</p>
          <h3 className="mt-1.5 shrink-0 font-display text-base font-bold text-navy sm:mt-2 sm:text-lg">{title}</h3>
        <p className="mt-2 grow text-pretty text-sm leading-relaxed text-ink/75 sm:mt-3">{body}</p>
          {photoComment ? (
            <p className="mt-2 hidden shrink-0 text-[11px] leading-snug text-ink/45 lg:block">
              <span className="font-mono text-[10px] text-navy/70">PHOTO · {displayPhotoFileName(photoFileName)}</span>
              <span className="mt-1 block text-ink/40">{photoComment}</span>
            </p>
          ) : null}
          <Link
            to={to}
            className="mt-4 inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start border-b border-navy pb-0.5 text-sm font-semibold text-navy sm:mt-5"
          >
            詳しく見る
            <span aria-hidden className="font-en text-xs">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function DayBlock({
  id,
  day,
  date,
  title,
  intro,
  closing,
  bullets,
  placeholders,
  isLast,
}: {
  id: string;
  day: string;
  date?: string;
  title: string;
  intro: string;
  closing: string;
  bullets: string[];
  placeholders: [{ file: string; desc: string }, { file: string; desc: string }, { file: string; desc: string }];
  isLast?: boolean;
}) {
  const num = id.replace(/^day/, "").padStart(2, "0");
  const [p1, p2, p3] = placeholders;
  const dayOverlay = (
    <div className="px-4 pb-8 pt-14 sm:px-6 sm:pb-14 sm:pt-24 lg:px-6">
      <p className="font-en text-4xl font-semibold text-white/20 sm:text-5xl">{num}</p>
      <h3 className="-mt-1 max-w-[18rem] text-balance font-display text-xl font-bold leading-snug text-white drop-shadow-lg sm:max-w-md sm:-mt-2 sm:text-2xl lg:max-w-lg">
        <ResponsiveJapaneseTitle text={title} />
      </h3>
      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-amber-200/90 sm:mt-2 sm:text-xs sm:tracking-[0.35em]">
        {date ?? day}
      </p>
    </div>
  );
  return (
    <ScrollReveal className={isLast ? "" : ""}>
      <div id={id} className="scroll-mt-24 lg:scroll-mt-28">
        <FullBleedPlaceholder
          variant="dark"
          minHeight="min-h-[68vh]"
          spLandscape
          fileName={p1.file}
          overlay={dayOverlay}
        />
        <div className="full-bleed bg-cream">
          <div className="mx-auto max-w-lg px-4 py-8 sm:px-5 sm:py-12 lg:py-16">
            <p className="text-pretty text-left text-[15px] leading-[1.85] text-ink/90">{intro}</p>
            <div className="mt-8 border-t border-navy/10 pt-6 sm:mt-12 sm:pt-10">
              <p className="font-display text-sm font-medium text-navy/75">この日のメイン</p>
              <ul className="mt-3 flex flex-wrap gap-2 sm:mt-5 sm:block sm:space-y-3">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="inline-flex max-w-full items-start gap-2 rounded-full border border-navy/10 bg-white px-3 py-1.5 text-[13px] leading-snug text-ink/88 sm:flex sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-[15px] sm:leading-relaxed"
                  >
                    <span className="hidden select-none text-navy/35 sm:inline" aria-hidden>
                      —
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 text-pretty text-left text-[15px] leading-[1.85] text-ink/78 sm:mt-12">
              {closing}
            </p>
            <div
              className="mt-8 grid grid-cols-2 gap-2 lg:hidden"
              aria-label="この日のフォト"
            >
              <DayThumbPhoto fileName={p2.file} />
              <DayThumbPhoto fileName={p3.file} />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <FullBleedPlaceholder variant="dark" minHeight="min-h-[68vh]" spLandscape fileName={p2.file} />
          <div className={isLast ? "pb-16" : ""}>
            <FullBleedPlaceholder variant="dark" minHeight="min-h-[68vh]" spLandscape fileName={p3.file} />
          </div>
        </div>
        {!isLast ? (
          <div className="full-bleed bg-cream px-4 py-8 sm:px-5 lg:py-10">
            <div className="mx-auto h-px max-w-lg bg-gradient-to-r from-transparent via-navy/12 to-transparent" />
          </div>
        ) : (
          <div className="pb-4 lg:pb-16" />
        )}
      </div>
    </ScrollReveal>
  );
}

export function BudgetRow({
  label,
  pct,
  amount,
  bar,
  accent,
}: {
  label: string;
  pct: number;
  amount: string;
  bar: string;
  accent?: boolean;
}) {
  return (
    <li className="flex items-start justify-between gap-4 px-4 py-3.5 sm:px-5 sm:py-4">
      <div className="flex min-w-0 items-start gap-3">
        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${bar}`} aria-hidden />
        <span className={`text-pretty text-sm leading-relaxed ${accent ? "font-medium text-navy" : "text-ink/85"}`}>
          {label}
        </span>
      </div>
      <div className="shrink-0 text-right">
        <p className={`font-display text-base font-bold tabular-nums ${accent ? "text-gold" : "text-navy"}`}>{amount}</p>
        <p className="text-[11px] tabular-nums text-ink/45">{pct}%</p>
      </div>
    </li>
  );
}

export function BudgetPanel() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-navy px-5 py-6 text-white sm:px-6 sm:py-7">
        <p className="font-en text-[10px] font-semibold uppercase tracking-[0.35em] text-white/55">Total estimate</p>
        <p className="mt-2 font-display text-[clamp(2rem,9vw,2.75rem)] font-bold leading-none text-amber-100">
          {BUDGET_META.total}
        </p>
        <p className="mt-3 text-sm text-white/75">
          {BUDGET_META.travelers}人で <span className="font-semibold text-white">{BUDGET_META.perPerson}</span>
          <span className="text-white/55"> · 3泊4日</span>
        </p>
        <p className="mt-4 border-t border-white/10 pt-4 text-sm text-amber-100/90">{BUDGET_META.tagline}</p>
      </section>

      <section aria-label="予算の構成比">
        <p className="mb-2 text-xs font-semibold text-navy/55">内訳の割合</p>
        <div className="flex h-2.5 overflow-hidden rounded-full bg-sand">
          {BUDGET_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`${item.bar} h-full`}
              style={{ width: `${item.pct}%` }}
              title={`${item.label} ${item.pct}%`}
            />
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_12px_40px_-32px_rgba(15,31,53,0.35)]">
        <div className="border-b border-navy/[0.06] px-4 py-3 sm:px-5">
          <h2 className="font-display text-sm font-bold text-navy">項目別の目安</h2>
        </div>
        <ul className="divide-y divide-navy/[0.06]">
          {BUDGET_ITEMS.map((item) => (
            <BudgetRow
              key={item.label}
              label={item.label}
              pct={item.pct}
              amount={item.amount}
              bar={item.bar}
              accent={"accent" in item ? item.accent : undefined}
            />
          ))}
        </ul>
      </section>

      <p className="text-xs leading-relaxed text-ink/55">{BUDGET_META.footnote}</p>
    </div>
  );
}

export function PageHeader({
  en,
  title,
  description,
}: {
  en?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="border-b border-black/[0.06] bg-cream px-4 pb-8 pt-[max(4.75rem,calc(env(safe-area-inset-top)+3.75rem))] sm:px-5">
      {en ? <p className="font-en text-xs font-semibold uppercase tracking-[0.35em] text-gold">{en}</p> : null}
      <h1 className="mt-2 font-display text-2xl font-bold text-navy">{title}</h1>
      {description ? <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-ink/70">{description}</p> : null}
    </header>
  );
}

export function QuickNavCard({ to, label, description }: { to: string; label: string; description: string }) {
  return (
    <Link
      to={to}
      className="flex min-h-[72px] items-center justify-between rounded-xl border border-navy/10 bg-white px-4 py-3 shadow-[0_8px_24px_-20px_rgba(15,31,53,0.35)] active:bg-sand/60"
    >
      <div className="min-w-0 pr-3">
        <p className="font-display text-base font-bold text-navy">{label}</p>
        <p className="mt-0.5 text-xs leading-snug text-ink/55">{description}</p>
      </div>
      <span className="shrink-0 font-en text-xl text-navy/35" aria-hidden>
        →
      </span>
    </Link>
  );
}
