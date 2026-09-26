import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message:
    "I ordered the charging case on the 10th and the tracking hasn't updated in five days. " +
    "Also, can you confirm you only charged me once? My bank shows two pending payments.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    tag: choice("Which team should handle `message`?", {
      billing: "Charges, invoices, refunds, or payment methods.",
      orders: "Order status, delivery, returns, or replacements.",
      account: "Login, password, or account settings.",
      product: "Problems using a product, such as pairing, charging, or sound quality.",
    }),
  },
});

console.log("Tags:", [answers.tag.choice]);
console.log("probabilities:", answers.tag.probabilities);
