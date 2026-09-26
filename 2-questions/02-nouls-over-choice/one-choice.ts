import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "I was charged twice, and I also can't log in.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    tag: choice("Which issue does `message` describe?", {
      billing: "Charges, invoices, refunds, or subscriptions.",
      orders: "Order status, delivery, cancellation, or returns.",
      account: "Login, password, profile, or security.",
    }),
  },
});

console.log("Tags:", [answers.tag.choice]);
