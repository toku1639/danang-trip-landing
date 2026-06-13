import { ScrollReveal } from "../components/ScrollReveal";
import { BudgetPanel, PageHeader } from "../components/trip-ui";
import { BUDGET_META } from "../data/trip";

export function BudgetPage() {
  return (
    <div className="bg-cream pb-12">
      <PageHeader
        en="Budget"
        title="予算イメージ"
        description={`合計 ${BUDGET_META.total} 想定。${BUDGET_META.travelers}人旅の内訳目安です（為替・時期で変動）。`}
      />
      <ScrollReveal className="mx-auto max-w-lg px-4 py-8 sm:px-5">
        <BudgetPanel />
      </ScrollReveal>
    </div>
  );
}
