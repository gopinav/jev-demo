import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message:
    "Hi, I'm trying to download the invoice for my Aria headphones for an expense claim, but I can't log in. " +
    "It keeps saying my password is wrong, and the reset email never arrives. I need the invoice by Friday.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    team: choice("Which team should handle `message`?", {
      billing: "Charges, invoices, refunds, or payment methods.",
      orders: "Order status, delivery, returns, or replacements.",
      account: "Login, password, or account settings.",
      product: "Problems using a product, such as pairing, charging, or sound quality.",
    }),
  },
});

console.log("Send to:", answers.team.choice);
console.log("probabilities:", answers.team.probabilities);
