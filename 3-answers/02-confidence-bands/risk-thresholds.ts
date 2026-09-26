import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "The blender stopped working. I'd like my money back, unless a replacement can ship quickly.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    intent: choice("What does the customer in `message` want?", {
      refund: "Money back for the order.",
      replacement: "A new item to replace this one.",
      information: "Information only.",
    }),
  },
});

const { choice: intent, confidence } = answers.intent;
console.log(`${intent}, confidence ${confidence.toFixed(2)}`);

// Illustrative thresholds. The riskier the action, the higher the bar.
const actions = [
  { action: `Suggest a reply about the ${intent}`, minConfidence: 0.5 },
  { action: `Issue the ${intent} automatically`, minConfidence: 0.95 },
];

for (const { action, minConfidence } of actions) {
  const allowed = confidence >= minConfidence;
  console.log(`${allowed ? "yes" : "no "}  ${action} (needs ${minConfidence})`);
}
