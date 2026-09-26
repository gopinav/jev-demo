import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "I returned my charging case two weeks ago. Has it arrived yet, and when do I see the refund?",
  "My return was delivered to your warehouse. Where's my refund?",
];

for (const message of messages) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      team: choice("Which team should handle `message`?", {
        billing: "Charges, invoices, refunds, or payment methods.",
        orders: "Order status, delivery, returns, or replacements.",
        account: "Login, password, or account settings.",
        product: "Problems using a product, such as pairing, charging, or sound quality.",
      }),
    },
  });

  console.log(message);
  console.log(`  ${answers.team.choice}, confidence ${answers.team.confidence.toFixed(2)}`);
}
