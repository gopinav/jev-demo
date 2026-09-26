import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "I sent the jacket back two weeks ago. Has it arrived yet? When will I see the money?",
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

console.log("Send to:", answers.team.choice);
console.log("probabilities:", answers.team.probabilities);
