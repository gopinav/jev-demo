import { score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const tickets = [
  "The footer logo looks a bit blurry on the pricing page. Not urgent.",
  "Checkout fails for every card with error 502. We're losing sales. Steps: add any item, pay.",
  "This is the THIRD time I'm writing. Your app is useless and I want someone to call me.",
];

const judgments: { message: string; severity: number; frustration: number; clarity: number }[] = [];

for (const message of tickets) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      severity: score("How severe is the problem in `message`?", [
        "Cosmetic issue. Everything still works.",
        "A feature is broken, but a workaround exists.",
        "A feature is broken with no workaround.",
      ]),
      frustration: score("How frustrated is the customer in `message`?", [
        "Calm and neutral.",
        "Frustrated but civil.",
        "Very angry.",
      ]),
      clarity: score("How much does `message` give an engineer to work with?", [
        "No details about the problem.",
        "Describes the problem but not how to reproduce it.",
        "Describes the problem and how to reproduce it.",
      ]),
    },
  });

  // Each Score has 3 levels (0 to 2), so divide by 2 to get 0 to 1.
  judgments.push({
    message,
    severity: answers.severity.score / 2,
    frustration: answers.frustration.score / 2,
    clarity: answers.clarity.score / 2,
  });
}

function rank(weights: { severity: number; frustration: number; clarity: number }) {
  return judgments
    .map((j) => ({
      message: j.message,
      priority:
        j.severity * weights.severity +
        j.frustration * weights.frustration +
        j.clarity * weights.clarity,
    }))
    .sort((a, b) => b.priority - a.priority);
}

console.log("Engineering priorities:");
for (const { message, priority } of rank({ severity: 0.6, frustration: 0.1, clarity: 0.3 })) {
  console.log(" ", priority.toFixed(2), message);
}

// New priorities, same answers. No new Jev calls.
console.log("Customer-care priorities:");
for (const { message, priority } of rank({ severity: 0.3, frustration: 0.6, clarity: 0.1 })) {
  console.log(" ", priority.toFixed(2), message);
}
