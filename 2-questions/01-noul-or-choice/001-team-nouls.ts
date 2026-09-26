import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message:
    "Hi, I'm trying to download the invoice for my Aria headphones for an expense claim, but I can't log in. " +
    "It keeps saying my password is wrong, and the reset email never arrives. I need the invoice by Friday.",
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

for (const [team, answer] of Object.entries(answers)) {
  console.log(`${team}:`, answer.noul.toFixed(2));
}
