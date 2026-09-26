import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state =
  "Ticket subject: Headphones stopped charging. Status: open. Channel: email. " +
  "Customer: Maya. Plan: Plus. " +
  "Plan benefits: Free replacement for faulty items within one year of purchase. " +
  "Order: Aria wireless headphones, $129, purchased 3 weeks ago. " +
  'Customer message: "Hi, I bought the Aria wireless headphones about three weeks ago ' +
  "and they've stopped charging. The light doesn't come on at all, " +
  "and I've tried two different cables. Can you help?\"";

const { answers } = await client.systemOne({
  state,
  questions: {
    faultyProduct: noul("Does the customer's message describe a faulty product?"),
    coveredByPlan: noul("Is the ordered item covered for a free replacement by the customer's plan benefits?"),
  },
});

console.log("faultyProduct:", answers.faultyProduct.noul.toFixed(2));
console.log("coveredByPlan:", answers.coveredByPlan.noul.toFixed(2));
