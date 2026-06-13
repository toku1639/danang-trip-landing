import { Link } from "react-router-dom";
import { PageHeader } from "../components/trip-ui";
import { ATTRACTION_CATEGORIES, ATTRACTION_SCHEDULED_NOTE } from "../data/trip";

function SpotCard({ name, area, description, tip }: { name: string; area: string; description: string; tip?: string }) {
  return (
    <article className="rounded-xl border border-navy/[0.08] bg-white px-4 py-4 shadow-[0_8px_24px_-22px_rgba(15,31,53,0.35)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="font-display text-base font-bold text-navy">{name}</h3>
        <p className="text-xs font-medium text-navy/50">{area}</p>
      </div>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-ink/85">{description}</p>
      {tip ? (
        <p className="mt-2 rounded-lg bg-sand/80 px-3 py-2 text-pretty text-xs leading-relaxed text-ink/70">
          <span className="font-semibold text-navy/70">Tip</span> {tip}
        </p>
      ) : null}
    </article>
  );
}

export function SpotsPage() {
  return (
    <div className="bg-cream pb-12">
      <PageHeader
        en="Spots"
        title="その他の観光スポット"
        description="行程に入っていない名所のまとめ。自由時間や雨の日の参考に。"
      />

      <div className="mx-auto max-w-lg space-y-10 px-4 py-8 sm:px-5">
        <section className="rounded-xl border border-navy/10 bg-navy/[0.04] p-4">
          <h2 className="font-display text-sm font-bold text-navy">{ATTRACTION_SCHEDULED_NOTE.title}</h2>
          <ul className="mt-3 space-y-2">
            {ATTRACTION_SCHEDULED_NOTE.items.map((item) => (
              <li key={item} className="flex gap-2 text-pretty text-sm leading-relaxed text-ink/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-ink/55">
            詳しい時刻は
            <Link to="/schedule" className="mx-1 font-semibold text-navy hover:underline">
              スケジュール
            </Link>
            を参照。
          </p>
        </section>

        {ATTRACTION_CATEGORIES.map((category) => (
          <section key={category.id}>
            <h2 className="font-display text-lg font-bold text-navy">{category.title}</h2>
            {category.subtitle ? <p className="mt-1 text-pretty text-sm text-ink/60">{category.subtitle}</p> : null}
            <div className="mt-4 space-y-3">
              {category.spots.map((spot) => (
                <SpotCard key={spot.id} {...spot} />
              ))}
            </div>
          </section>
        ))}

        <div className="rounded-xl border border-navy/10 bg-white p-4 text-pretty text-sm leading-relaxed text-ink/75">
          2日目・4日目の
          <span className="font-semibold text-navy">自由時間</span>
          や、早めにホテルに戻ったときにGrabで気軽に行けるのが、ドラゴンブリッジ周辺と市内スポットです。
        </div>
      </div>
    </div>
  );
}
