import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "I sent the jacket back two weeks ago. Has it arrived yet? When will I see the money?",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    team: choice("Which team should handle `message`?", {
      billing: {
        what: "Charges, invoices, refunds, or subscriptions",
        not_for: "Shipping an item back or getting a return label",
        examples: ["I was charged twice", "Where is my refund?"],
      },
      orders: {
        what: "Order status, delivery, cancellation, or returns",
        not_for: "Refund status or charges",
        examples: ["Where is my package?", "How do I return this?"],
      },
      account: {
        what: "Login, password, profile, or security",
        not_for: "Charges or delivery",
        examples: ["I can't log in", "Change my email"],
      },
    }),
  },
});

console.log("Send to:", answers.team.choice);
console.log("probabilities:", answers.team.probabilities);
