import { score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "I want a refund and I want to change my password.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    team: score("Which team should handle `message`?", [
      "Billing: charges, invoices, refunds, or subscriptions.",
      "Orders: order status, delivery, cancellation, or returns.",
      "Account: login, password, profile, or security.",
    ]),
  },
});

const teams = ["billing", "orders", "account"];

console.log("score:", answers.team.score.toFixed(2));
console.log("probabilities:", answers.team.probabilities);
console.log("Send to:", teams[Math.round(answers.team.score)]);
