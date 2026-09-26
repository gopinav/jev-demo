import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

function monthsBetween(from: string, to: string) {
  const start = new Date(from);
  const end = new Date(to);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

const purchaseDates = ["2026-07-10", "2025-11-02", "2025-08-14"];

for (const purchasedOn of purchaseDates) {
  const months = monthsBetween(purchasedOn, "2026-09-26");

  const { answers } = await client.systemOne({
    state: {
      customer: {
        name: "Maya Chen",
        plan: "Plus",
        plan_benefits: "Free replacement for faulty items within one year of purchase.",
      },
      order: { item: "Aria wireless headphones", price_usd: 129, purchased: `${months} months ago` },
      message: "My headphones stopped charging. Can you replace them?",
    },
    questions: {
      coveredByPlan: noul("Is `order.item` still covered by `customer.plan_benefits`?"),
    },
  });

  console.log(`Purchased ${months} months ago:`, answers.coveredByPlan.noul.toFixed(2));
}
