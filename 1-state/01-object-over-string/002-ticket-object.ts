import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  ticket: {
    subject: "Headphones stopped charging",
    status: "open",
    channel: "email",
  },
  customer: {
    name: "Maya",
    plan: "Plus",
    plan_benefits:
      "Free replacement for faulty items within one year of purchase.",
  },
  order: {
    item: "Aria wireless headphones",
    price_usd: 129,
    purchased: "3 weeks ago",
  },
  message:
    "Hi, I bought the Aria wireless headphones about three weeks ago and they've stopped charging. " +
    "The light doesn't come on at all, and I've tried two different cables. Can you help?",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    faultyProduct: noul("Does `message` describe a faulty product?"),
    coveredByPlan: noul("Is `order.item` covered for a free replacement by `customer.plan_benefits`?"),
  },
});

console.log("faultyProduct:", answers.faultyProduct.noul.toFixed(2));
console.log("coveredByPlan:", answers.coveredByPlan.noul.toFixed(2));
