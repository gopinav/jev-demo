import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "Please refund my order. It arrived broken.",
  "Thanks, the replacement arrived and works great.",
  "It's not quite what I expected. What are my options?",
];

for (const message of messages) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      wantsRefund: noul("Does the customer in `message` want a refund?"),
    },
  });

  const probability = answers.wantsRefund.noul;

  // Noul has no confidence field. How far it is from 0.5 tells you how sure it is.
  let action: string;
  if (probability >= 0.8) {
    action = "Start a refund";
  } else if (probability <= 0.2) {
    action = "No refund needed";
  } else {
    action = "Send to a person";
  }

  console.log(probability.toFixed(2), action.padEnd(18), message);
}
