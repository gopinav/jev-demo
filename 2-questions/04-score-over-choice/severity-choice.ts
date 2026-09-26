import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const reports = [
  "The footer logo is slightly blurry on the pricing page.",
  "Export to PDF fails in Safari. It works in Chrome, but some customers only use Safari.",
  "Nobody can check out. The payment page shows an error for every card.",
];

for (const report of reports) {
  const { answers } = await client.systemOne({
    state: { report },
    questions: {
      severity: choice("How severe is the bug in `report`?", {
        low: "Cosmetic issue. Everything still works.",
        medium: "A feature is broken, but a workaround exists.",
        high: "A feature is broken with no workaround.",
      }),
    },
  });

  console.log(answers.severity.choice.padEnd(6), report);
}
