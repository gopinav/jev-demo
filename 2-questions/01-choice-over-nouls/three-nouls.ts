import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "I can't log in to download the invoice for last month's charge.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    billing: noul("Is `message` about charges, invoices, refunds, or subscriptions?"),
    orders: noul("Is `message` about order status, delivery, cancellation, or returns?"),
    account: noul("Is `message` about login, password, profile, or security?"),
  },
});

console.log("billing:", answers.billing.noul.toFixed(2));
console.log("orders: ", answers.orders.noul.toFixed(2));
console.log("account:", answers.account.noul.toFixed(2));

const teams = Object.entries(answers)
  .filter(([, answer]) => answer.noul >= 0.5)
  .map(([team]) => team);

console.log("Send to:", teams.join(" and ") || "nobody");
