import { Link } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";
import { DayBlock, FullBleedPlaceholder, PageHeader } from "../components/trip-ui";
import { ITINERARY_DAYS } from "../data/trip";

export function ItineraryPage() {
  return (
    <div className="bg-navy-deep">
      <div className="bg-cream">
        <PageHeader
          en="Itinerary"
          title="行程ガイド"
          description="日ごとの流れ・写真・メインアクティビティ。時刻表はスケジュールページを参照。"
        />
        <div className="border-b border-black/[0.06] px-4 pb-6 sm:px-5">
          <Link
            to="/schedule"
            className="inline-flex min-h-[44px] items-center text-sm font-semibold text-navy underline-offset-4 hover:underline"
          >
            時刻付きスケジュールを見る →
          </Link>
        </div>
      </div>

      <ScrollReveal className="relative">
        <FullBleedPlaceholder
          variant="dark"
          minHeight="min-h-[68vh]"
          spLandscape
          fileName="vip-itinerary-section-bana-cable.jpg"
          overlay={
            <div className="px-4 pb-10 pt-8 sm:px-5">
              <p className="text-center font-en text-xs font-semibold uppercase tracking-[0.35em] text-white sm:text-sm">
                3 Nights · 4 Days
              </p>
              <h2 className="mt-3 text-balance text-center font-display text-xl font-bold text-white sm:text-2xl">
                3泊4日の流れ
              </h2>
            </div>
          }
        />
      </ScrollReveal>

      {ITINERARY_DAYS.map((day, i) => (
        <DayBlock
          key={day.id}
          id={day.id}
          day={day.day}
          date={day.date}
          title={day.title}
          intro={day.intro}
          closing={day.closing}
          bullets={day.bullets}
          placeholders={day.placeholders}
          isLast={i === ITINERARY_DAYS.length - 1}
        />
      ))}
    </div>
  );
}
