import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "I was charged twice this month. Please refund one of the charges.",
  "Something's not right. Can someone help?",
  "Everything is broken.",
];

for (const message of messages) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      team: choice("Which team should handle `message`?", {
        billing: "Charges, invoices, refunds, or subscriptions.",
        orders: "Order status, delivery, cancellation, or returns.",
        account: "Login, password, profile, or security.",
      }),
    },
  });

  const { choice: team, confidence } = answers.team;

  // Illustrative thresholds. Choose yours by testing your own messages.
  let action: string;
  if (confidence >= 0.9) {
    action = `Send to ${team}`;
  } else if (confidence >= 0.6) {
    action = `Ask the customer to confirm: is this about ${team}?`;
  } else {
    action = "Send to a person to triage";
  }

  console.log(message);
  console.log(`  ${team}, confidence ${confidence.toFixed(2)} -> ${action}`);
}
