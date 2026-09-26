import { choice, noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const tickets = [
  {
    message: "Please refund my order. The mug arrived chipped.",
    order: { total_usd: 18, days_since_delivery: 5 },
  },
  {
    message: "I want my money back for the sofa. It's not what I expected.",
    order: { total_usd: 900, days_since_delivery: 10 },
  },
  {
    message: "Where's my package? It was supposed to arrive yesterday.",
    order: { total_usd: 45, days_since_delivery: null },
  },
  {
    message:
      "You sent the wrong item, charged me twice, and the replacement you sent is broken too.",
    order: { total_usd: 60, days_since_delivery: 3 },
  },
];

for (const ticket of tickets) {
  const { answers } = await client.systemOne({
    state: { message: ticket.message },
    questions: {
      intent: choice("What is the main request in `message`?", {
        refund: "Wants money back for an order.",
        order_status: "Wants to know where an order is.",
        other: "Any other request.",
      }),
      isComplex: noul("Does `message` describe several problems that need a judgment call to resolve?"),
    },
  });

  let route: string;

  if (answers.isComplex.noul >= 0.5) {
    route = "Send to a support agent";
  } else if (answers.intent.choice === "refund") {
    const { total_usd, days_since_delivery } = ticket.order;
    // Business rule, checked exactly in code.
    if (total_usd < 50 && days_since_delivery !== null && days_since_delivery <= 30) {
      route = "Refund automatically";
    } else {
      route = "Send to the billing team";
    }
  } else if (answers.intent.choice === "order_status") {
    route = "Reply with the tracking link";
  } else {
    route = "Send to the general queue";
  }

  console.log(route.padEnd(30), ticket.message);
}
