import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "The headphones arrived with a cracked case. Could I get a refund, please?",
  "Thanks, the replacement arrived and works perfectly.",
  "I'm not sure these are for me. Can I send them back?",
];

for (const message of messages) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      wantsRefund: noul("Does the customer in `message` want a refund?"),
    },
  });

  const probability = answers.wantsRefund.noul;

  // Example thresholds. Choose yours by testing your own messages.
  let action: string;
  if (probability >= 0.8) {
    action = "Start a refund";
  } else if (probability <= 0.2) {
    action = "No refund needed";
  } else {
    action = "Send to a person";
  }

  console.log(message);
  console.log(`  ${probability.toFixed(2)} -> ${action}`);
}
