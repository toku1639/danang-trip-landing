import { Link } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";
import {
  AreaNav,
  AutoScrollPhotoStrip,
  FullBleedPlaceholder,
  HighlightCard,
  QuickNavCard,
  SectionDivider,
} from "../components/trip-ui";
import { NAV_ITEMS } from "../config/navigation";
import { HIGHLIGHTS, TRIP_DATES } from "../data/trip";

export function HomePage() {
  const quickNav = NAV_ITEMS.filter((item) => item.to !== "/");

  return (
    <>
      <section className="relative min-h-[100dvh] min-h-[100svh]">
        <div className="absolute inset-0">
          <FullBleedPlaceholder
            bleed={false}
            variant="dark"
            minHeight="min-h-full"
            className="h-full min-h-[100dvh] min-h-[100svh]"
            priority
            fileName="vip-hero-welcome-banner.jpg"
            overlay={
              <div className="px-4 pb-16 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4rem))] text-center sm:px-5 sm:pb-20">
                <p className="font-en text-[clamp(1.65rem,8vw,3.25rem)] font-semibold leading-[1.12] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]">
                  Welcome to
                  <br />
                  <span className="italic text-amber-100">Da Nang</span>
                </p>
                <h1 className="mx-auto mt-6 max-w-xl text-balance font-display text-[clamp(1.05rem,4.5vw,1.5rem)] font-bold leading-snug tracking-wide text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                  学生最後の夏、
                  <br />
                  全力で楽しむ東南アジア旅行
                  <br />
                  <span className="text-[0.92em] text-white/95">in Da Nang</span>
                </h1>
                <p className="mt-5 text-pretty text-xs font-medium tracking-[0.28em] text-white/90 sm:text-sm">{TRIP_DATES}</p>
                <Link
                  to="/schedule"
                  className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/30 bg-white/15 px-6 text-sm font-semibold text-white backdrop-blur-sm active:bg-white/25"
                >
                  スケジュールを見る
                </Link>
              </div>
            }
          />
        </div>
      </section>

      <ScrollReveal className="bg-cream">
        <div className="lg:hidden">
          <FullBleedPlaceholder variant="light" minHeight="min-h-[42vh]" spLandscape fileName="vip-intro-hotel-lobby.jpg" />
          <div className="mx-auto max-w-xl px-4 py-8">
            <p className="font-en text-xs font-semibold uppercase tracking-[0.3em] text-gold">Welcome</p>
            <h2 className="mt-2 font-display text-xl font-bold text-navy">豪遊旅へようこそ</h2>
            <p className="mt-4 text-pretty text-left text-[15px] leading-[1.85] text-ink/85">
              移動と遊びのバランスを最適化した行程。
              <br className="sm:hidden" />
              海も夜景も絶景も、無理のないリズムで回せる設計です。
            </p>
          </div>
        </div>
        <div className="hidden lg:block">
          <FullBleedPlaceholder
            variant="light"
            minHeight="min-h-[78vh]"
            fileName="vip-intro-hotel-lobby.jpg"
            overlayPlacement="center"
            overlay={
              <div className="mx-auto w-full max-w-lg px-3 text-center sm:px-5">
                <h2 className="font-display text-xl font-bold text-white md:text-2xl">豪遊旅へようこそ</h2>
                <p className="mt-4 text-[15px] leading-[1.9] text-white">
                  「歩き疲れない」リゾート滞在型の、男旅の完成形。
                </p>
              </div>
            }
          />
        </div>
      </ScrollReveal>

      <AutoScrollPhotoStrip
        slides={[
          { fileName: "vip-pool-strip-01.jpg" },
          { fileName: "vip-pool-strip-02.jpg" },
          { fileName: "vip-pool-strip-03.jpg" },
          { fileName: "vip-pool-strip-04.jpg" },
          { fileName: "vip-pool-strip-05.jpg" },
          { fileName: "vip-pool-strip-06.jpg" },
        ]}
      />

      <section className="bg-cream px-4 py-10 sm:px-5">
        <p className="font-en text-xs font-semibold uppercase tracking-[0.35em] text-gold">Pages</p>
        <h2 className="mt-2 font-display text-xl font-bold text-navy">旅の情報一覧</h2>
        <p className="mt-2 text-sm text-ink/65">メニュー（≡）からも各ページへ移動できます。</p>
        <div className="mt-5 grid gap-3">
          {quickNav.map((item) => (
            <QuickNavCard key={item.to} to={item.to} label={item.label} description={item.description} />
          ))}
        </div>
      </section>

      <SectionDivider label="Highlights" />

      <section className="bg-cream pb-10">
        <ScrollReveal className="mx-auto max-w-lg px-4 sm:px-5">
          <h2 className="text-center font-display text-xl font-bold text-navy">3つのハイライト</h2>
          <p className="mt-2 text-center text-sm text-ink/65">ホテル・絶景・夜遊び。</p>
        </ScrollReveal>
        <AreaNav active={2} />
        <div className="mx-auto flex flex-col gap-4 px-4 pt-2 sm:px-5 lg:grid lg:max-w-6xl lg:grid-cols-3 lg:gap-6 lg:px-6">
          {HIGHLIGHTS.map((h) => (
            <HighlightCard key={h.n} {...h} />
          ))}
        </div>
      </section>

      <FullBleedPlaceholder
        variant="dark"
        minHeight="min-h-[55vh]"
        spLandscape
        fileName="vip-footer-group-celebration-wide.jpg"
        overlay={
          <div className="px-4 py-12 text-center">
            <p className="font-en text-xl font-semibold italic text-white sm:text-2xl">Welcome to Da Nang</p>
            <p className="mt-3 font-display text-sm font-semibold text-white/95">この旅で、学生最後の夏を締めくくろう。</p>
            <Link
              to="/guide"
              className="mt-6 inline-flex min-h-[44px] items-center rounded-full border border-white/25 px-5 text-sm font-semibold text-white active:bg-white/10"
            >
              持ち物・Tips を確認
            </Link>
          </div>
        }
      />
    </>
  );
}
