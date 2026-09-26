import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "Hi! Do you have a store in Amsterdam where I can try the Aria headphones before buying?",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    team: choice("Which team should handle `message`?", {
      billing: "Charges, invoices, refunds, or payment methods.",
      orders: "Order status, delivery, returns, or replacements.",
      account: "Login, password, or account settings.",
      product: "Problems using a product, such as pairing, charging, or sound quality.",
      other: "The message doesn't fit any of the other teams.",
    }),
  },
});

console.log("Send to:", answers.team.choice);
console.log("confidence:", answers.team.confidence.toFixed(2));
