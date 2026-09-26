import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  customer: { name: "Maya", plan: "Plus" },
  order: { item: "Aria wireless headphones", purchased: "3 weeks ago" },
  message:
    "Hi, my Aria headphones stopped charging. The light doesn't come on at all, and I've tried two different cables. " +
    "I use them for work calls every day, so I'd really like this sorted quickly. Can you help?",
};

const startedAt = performance.now();

const { answers, usage } = await client.systemOne({
  state,
  questions: {
    team: choice("Which team should handle `message`?", {
      billing: "Charges, invoices, refunds, or payment methods.",
      orders: "Order status, delivery, returns, or replacements.",
      account: "Login, password, or account settings.",
      product: "Problems using a product, such as pairing, charging, or sound quality.",
    }),
    frustration: score("How frustrated is the customer in `message`?", [
      "Not frustrated. Just asking for help.",
      "Disappointed or annoyed, but still polite.",
      "Angry, making complaints or threats.",
    ]),
    isUrgent: noul("Does `message` say the problem needs to be fixed quickly?"),
    isFaulty: noul("Does `message` describe a faulty product?"),
    triedToFix: noul("Has the customer already tried to fix the problem themselves?"),
    wantsRefund: noul("Does `message` ask for a refund?"),
    chargedIncorrectly: noul("If `message` is about a charge, does the customer say they were charged incorrectly?"),
  },
});

const elapsedMs = performance.now() - startedAt;

console.log("Requests: 1");
console.log(`Elapsed: ${elapsedMs.toFixed(0)} ms`);
console.log("Input tokens:", usage.input_tokens);
console.log("team:", answers.team.choice);

if (answers.team.choice === "billing") {
  console.log("chargedIncorrectly:", answers.chargedIncorrectly.noul.toFixed(2));
} else {
  console.log("Not about a charge, so chargedIncorrectly is ignored.");
}
