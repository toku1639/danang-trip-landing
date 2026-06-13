import { ScrollReveal } from "../components/ScrollReveal";
import { DayThumbPhoto, FullBleedPlaceholder, PageHeader } from "../components/trip-ui";
import { HOTEL_FEATURES } from "../data/trip";

export function HotelPage() {
  return (
    <div className="bg-cream pb-12">
      <PageHeader
        en="Accommodations"
        title="DLG Hotel Danang"
        description="DLGホテルダナン（ミーケービーチ前）。3泊4日の拠点。"
      />

      <FullBleedPlaceholder
        variant="light"
        minHeight="min-h-[72vh]"
        spLandscape
        fileName="vip-hotel-hero-room-view.jpg"
      />
      <div className="grid grid-cols-2 gap-1 lg:hidden">
        <DayThumbPhoto fileName="vip-hotel-pool-edge.jpg" rounded={false} />
        <DayThumbPhoto fileName="vip-hotel-room-three-beds.jpg" rounded={false} />
      </div>
      <div className="hidden lg:block">
        <FullBleedPlaceholder variant="light" minHeight="min-h-[55vh]" spLandscape fileName="vip-hotel-pool-edge.jpg" />
        <FullBleedPlaceholder variant="light" minHeight="min-h-[55vh]" spLandscape fileName="vip-hotel-room-three-beds.jpg" />
      </div>

      <ScrollReveal className="mx-auto max-w-lg px-4 py-10 sm:px-5">
        <h2 className="font-display text-lg font-bold text-navy">ホテルのポイント</h2>
        <ul className="mt-6 space-y-3 border-t border-black/[0.06] pt-6 text-[15px] leading-relaxed text-ink/85">
          {HOTEL_FEATURES.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-xl border border-navy/10 bg-white p-4 text-sm leading-relaxed text-ink/75">
          <p className="font-semibold text-navy">チェックインの目安</p>
          <p className="mt-2 text-pretty">Day 1 は17:30空港到着 → 18:30チェックイン。</p>
          <p className="mt-1 text-pretty">Grab でホテルへ向かい、ミーケービーチ周辺へ。</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
