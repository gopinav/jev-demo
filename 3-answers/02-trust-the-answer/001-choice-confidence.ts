import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "My return was delivered to your warehouse. Where's my refund?",
  "Something's wrong with my order and my account. Can someone help?",
  "I returned my charging case two weeks ago. Has it arrived yet, and when do I see the refund?",
];

for (const message of messages) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      team: choice("Which team should handle `message`?", {
        billing: {
          covers: "Charges, invoices, refunds, or payment methods",
          not_for: "Sending an item back or getting a return label",
          examples: ["I was charged twice", "When will my refund arrive?"],
        },
        orders: {
          covers: "Order status, delivery, returns, or replacements",
          not_for: "The status of a refund or a charge",
          examples: ["Where is my package?", "How do I send this back?"],
        },
        account: {
          covers: "Login, password, or account settings",
          not_for: "Charges or deliveries",
          examples: ["I can't log in", "Change my email address"],
        },
        product: {
          covers: "Problems using a product, such as pairing, charging, or sound quality",
          not_for: "Deliveries or refunds",
          examples: ["My headphones won't pair", "The left side is quiet"],
        },
      }),
    },
  });

  const { choice: team, confidence } = answers.team;

  // Example thresholds. Choose yours by testing your own messages.
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
