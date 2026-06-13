import { Link } from "react-router-dom";
import { PageHeader, ResponsiveJapaneseTitle } from "../components/trip-ui";
import { SCHEDULE_DAYS, SCHEDULE_PAGE_DESC, TRAVEL_SMOOTH_TIPS, TRIP_BASICS } from "../data/trip";

export function SchedulePage() {
  return (
    <div className="bg-cream pb-12">
      <PageHeader
        en="Schedule"
        title="スケジュール"
        description={SCHEDULE_PAGE_DESC}
      />

      <div className="mx-auto max-w-lg px-4 py-8 sm:px-5">
        <section className="mb-10 rounded-xl border border-navy/10 bg-white p-4 sm:p-5">
          <h2 className="font-display text-base font-bold text-navy">基本情報</h2>
          <dl className="mt-4 space-y-3 text-sm leading-relaxed text-ink/85">
            <div>
              <dt className="text-xs font-semibold text-navy/55">日程</dt>
              <dd className="mt-0.5">
                {TRIP_BASICS.period}
                <br className="sm:hidden" />
                <span className="text-ink/65 sm:ml-1">※{TRIP_BASICS.stay}</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-navy/55">ホテル</dt>
              <dd className="mt-0.5">{TRIP_BASICS.hotel}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-navy/55">フライト</dt>
              <dd className="mt-1 space-y-1">
                <p>
                  ［{TRIP_BASICS.flights.outbound.label}］{TRIP_BASICS.flights.outbound.date}{" "}
                  {TRIP_BASICS.flights.outbound.time}
                </p>
                <p>
                  ［{TRIP_BASICS.flights.inbound.label}］{TRIP_BASICS.flights.inbound.date}{" "}
                  {TRIP_BASICS.flights.inbound.depart} 出発
                  <br />
                  <span className="text-ink/65">
                    → {TRIP_BASICS.flights.inbound.arriveDate} {TRIP_BASICS.flights.inbound.arrive} 日本着
                  </span>
                </p>
              </dd>
            </div>
          </dl>
        </section>

        {SCHEDULE_DAYS.map((day) => (
          <section key={day.day} className="mb-10 last:mb-0">
            <div className="border-b border-navy/10 pb-3">
              <p className="font-en text-xs font-semibold tracking-widest text-gold">{day.day}</p>
              <h2 className="font-display text-lg font-bold text-navy">{day.date}</h2>
              <p className="mt-1.5 text-pretty text-sm font-medium leading-relaxed text-navy/70">
                <ResponsiveJapaneseTitle text={day.theme} breakAt="md" />
              </p>
            </div>
            <ol className="relative mt-4 space-y-0 border-l-2 border-navy/10 pl-5">
              {day.slots.map((slot, i) => (
                <li key={`${slot.time}-${slot.title}`} className="relative pb-6 last:pb-0">
                  <span
                    className="absolute -left-[calc(0.625rem+1px)] top-1.5 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-cream"
                    aria-hidden
                  />
                  <p className="font-en text-sm font-semibold tabular-nums text-navy">{slot.time}</p>
                  <p className="mt-0.5 text-pretty font-display text-base font-bold leading-snug text-ink">{slot.title}</p>
                  {slot.note ? <p className="mt-1 text-sm leading-relaxed text-ink/65">{slot.note}</p> : null}
                  {i === day.slots.length - 1 ? null : null}
                </li>
              ))}
            </ol>
          </section>
        ))}

        <section className="mt-10 rounded-xl border border-navy/10 bg-navy/[0.04] p-4">
          <h2 className="font-display text-base font-bold text-navy">旅行をスムーズにするポイント</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
            {TRAVEL_SMOOTH_TIPS.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 rounded-xl border border-navy/10 bg-white p-4">
          <p className="text-pretty text-sm leading-relaxed text-ink/75">
            各日の写真付きストーリーは
            <Link to="/itinerary" className="mx-1 font-semibold text-navy underline-offset-2 hover:underline">
              行程ガイド
            </Link>
            を参照してください。
          </p>
        </div>
      </div>
    </div>
  );
}
