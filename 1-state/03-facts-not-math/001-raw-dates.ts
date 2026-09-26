import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const purchaseDates = ["2026-07-10", "2025-11-02", "2025-08-14"];

for (const purchasedOn of purchaseDates) {
  const { answers } = await client.systemOne({
    state: {
      customer: {
        name: "Maya Chen",
        plan: "Plus",
        plan_benefits: "Free replacement for faulty items within one year of purchase.",
      },
      order: { item: "Aria wireless headphones", price_usd: 129, purchased_on: purchasedOn },
      today: "2026-09-26",
      message: "My headphones stopped charging. Can you replace them?",
    },
    questions: {
      coveredByPlan: noul("Is `order.item` still covered by `customer.plan_benefits`?"),
    },
  });

  console.log(`Purchased ${purchasedOn}:`, answers.coveredByPlan.noul.toFixed(2));
}
