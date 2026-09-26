import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "The Aria headphones stopped working after a week. I'd like my money back, please.",
  "The Aria headphones stopped working after a week. I'd like my money back, unless a replacement can ship quickly.",
];

for (const message of messages) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      wants: choice("What does the customer in `message` want?", {
        refund: "Their money back.",
        replacement: "A new pair to replace this one.",
        information: "Information about their options.",
      }),
    },
  });

  const { choice: intent, confidence } = answers.wants;

  // Example thresholds. The riskier the action, the higher the bar.
  const actions = [
    { action: `Suggest a reply about the ${intent}`, minConfidence: 0.5 },
    { action: `Issue the ${intent} automatically`, minConfidence: 0.95 },
  ];

  console.log(message);
  console.log(`  ${intent}, confidence ${confidence.toFixed(2)}`);
  for (const { action, minConfidence } of actions) {
    const allowed = confidence >= minConfidence;
    console.log(`  ${allowed ? "yes" : "no "}  ${action} (needs ${minConfidence})`);
  }
}
