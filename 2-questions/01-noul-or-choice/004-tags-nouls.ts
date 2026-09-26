import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message:
    "I ordered the charging case on the 10th and the tracking hasn't updated in five days. " +
    "Also, can you confirm you only charged me once? My bank shows two pending payments.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    billing: noul("Is `message` about charges, invoices, refunds, or payment methods?"),
    orders: noul("Is `message` about order status, delivery, returns, or replacements?"),
    account: noul("Is `message` about login, password, or account settings?"),
    product: noul("Is `message` about a problem using a product, such as pairing, charging, or sound quality?"),
  },
});

const tags = Object.entries(answers)
  .filter(([, answer]) => answer.noul >= 0.5)
  .map(([tag]) => tag);

for (const [tag, answer] of Object.entries(answers)) {
  console.log(`${tag}:`, answer.noul.toFixed(2));
}
console.log("Tags:", tags);
