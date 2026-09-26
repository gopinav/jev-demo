import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "I want a refund and I want to change my password.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    team: choice("Which team should handle `message`?", {
      billing: "Charges, invoices, refunds, or subscriptions.",
      orders: "Order status, delivery, cancellation, or returns.",
      account: "Login, password, profile, or security.",
    }),
  },
});

console.log("probabilities:", answers.team.probabilities);
console.log("Send to:", answers.team.choice);
