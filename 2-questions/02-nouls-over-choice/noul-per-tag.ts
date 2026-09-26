import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "I was charged twice, and I also can't log in.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    billing: noul("Does `message` describe an issue with charges, invoices, refunds, or subscriptions?"),
    orders: noul("Does `message` describe an issue with order status, delivery, cancellation, or returns?"),
    account: noul("Does `message` describe an issue with login, password, profile, or security?"),
  },
});

const tags = Object.entries(answers)
  .filter(([, answer]) => answer.noul >= 0.5)
  .map(([tag]) => tag);

console.log("Tags:", tags);
