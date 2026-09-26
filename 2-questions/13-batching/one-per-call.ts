import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "I was charged twice this month. Please refund one of the charges.",
};

const questions = {
  team: choice("Which team should handle `message`?", {
    billing: "Charges, invoices, refunds, or subscriptions.",
    technical: "Bugs, errors, or integration problems.",
    sales: "Pricing, plans, or buying questions.",
  }),
  isUrgent: noul("Does `message` convey urgency?"),
  frustration: score("How frustrated is the customer in `message`?", [
    "Calm and neutral.",
    "Frustrated but civil.",
    "Very angry.",
  ]),
  refundRequested: noul("Does `message` request a refund?"),
  bugSeverity: score("If `message` reports a bug, how severe is it?", [
    "Cosmetic issue. Everything still works.",
    "A feature is broken, but a workaround exists.",
    "A feature is broken with no workaround.",
  ]),
  hasReproSteps: noul("If `message` reports a bug, does it include steps to reproduce it?"),
};

const startedAt = performance.now();

for (const [name, question] of Object.entries(questions)) {
  await client.systemOne({ state, questions: { [name]: question } });
}

const elapsedMs = performance.now() - startedAt;

console.log("Requests:", Object.keys(questions).length);
console.log(`Elapsed: ${elapsedMs.toFixed(0)} ms`);
