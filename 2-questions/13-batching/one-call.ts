import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "I was charged twice this month. Please refund one of the charges.",
};

const startedAt = performance.now();

const { answers } = await client.systemOne({
  state,
  questions: {
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
  },
});

const elapsedMs = performance.now() - startedAt;

console.log("Requests: 1");
console.log(`Elapsed: ${elapsedMs.toFixed(0)} ms`);
console.log("team:", answers.team.choice);

if (answers.team.choice === "technical") {
  console.log("bugSeverity:", answers.bugSeverity.score.toFixed(2));
  console.log("hasReproSteps:", answers.hasReproSteps.noul.toFixed(2));
} else if (answers.team.choice === "billing") {
  console.log("refundRequested:", answers.refundRequested.noul.toFixed(2));
  console.log("Not a bug, so bugSeverity and its confidence are ignored.");
}
