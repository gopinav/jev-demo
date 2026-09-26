import { score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const reports = [
  "The footer logo is slightly blurry on the pricing page.",
  "Export to PDF fails in Safari. It works in Chrome, but some customers only use Safari.",
  "Nobody can check out. The payment page shows an error for every card.",
];

const results = [];

for (const report of reports) {
  const { answers } = await client.systemOne({
    state: { report },
    questions: {
      severity: score("How severe is the bug in `report`?", [
        "Cosmetic issue. Everything still works.",
        "A feature is broken, but a workaround exists.",
        "A feature is broken with no workaround.",
      ]),
    },
  });

  results.push({ report, severity: answers.severity.score });
}

results.sort((a, b) => b.severity - a.severity);

for (const { report, severity } of results) {
  console.log(severity.toFixed(2), "", report);
}
