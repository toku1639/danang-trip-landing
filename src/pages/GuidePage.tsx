import { Link } from "react-router-dom";
import { PageHeader } from "../components/trip-ui";
import { GUIDE_SECTIONS } from "../data/trip";

export function GuidePage() {
  return (
    <div className="bg-cream pb-12">
      <PageHeader
        en="Guide"
        title="持ち物・Tips"
        description="現地で困らないためのチェックリストと基本情報。"
      />

      <div className="mx-auto max-w-lg space-y-8 px-4 py-8 sm:px-5">
        {GUIDE_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-lg font-bold text-navy">{section.title}</h2>
            <ul className="mt-4 space-y-3">
              {section.items.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-navy/[0.08] bg-white px-4 py-3 text-pretty text-sm leading-relaxed text-ink/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="rounded-xl border border-navy/10 bg-navy/[0.04] p-4">
          <p className="text-sm leading-relaxed text-ink/75">
            行程の詳細は
            <Link to="/schedule" className="mx-1 font-semibold text-navy hover:underline">
              スケジュール
            </Link>
            と
            <Link to="/itinerary" className="mx-1 font-semibold text-navy hover:underline">
              行程ガイド
            </Link>
            を確認してください。自由時間向けの名所は
            <Link to="/spots" className="mx-1 font-semibold text-navy hover:underline">
              観光スポット
            </Link>
            も参照。
          </p>
        </div>
      </div>
    </div>
  );
}
